from orbit_display.models import CelestialBody
from orbit_display.forms import CelestialBodiesChecked
from orbit_display.utils.SpaceRock import SpaceRock
import requests
import pandas as pd
import json


def get_data_from_model(names):
    data = []
    for obj in names:
        planet = CelestialBody.objects.get(name=obj)
        # data.append(planet)
        dict_data = {}
        for field in ([f.name for f in CelestialBody._meta.get_fields()]):
            if field not in ('id', 'group'):
                dict_data[field] = getattr(planet, field)
        data.append(dict_data)

    return data


def get_data_api(object_names):
    res = []
    for name in object_names:
        r = f'https://ssd-api.jpl.nasa.gov/sbdb.api?sstr={name}' # TODO
        resp = requests.get(r)
        err_message = 'message' in json.loads(resp.content)
        if resp.status_code == 200 and not err_message:
            resp = resp.json()
            df = pd.DataFrame(resp['orbit']['elements'])[['title', 'value']].T
            header = df.iloc[0]
            df = df[1:]
            df.columns = header
            df = df.rename(columns={'eccentricity': 'e',
                                    'semi-major axis': 'a',
                                    'inclination; angle with respect to x-y ecliptic plane': 'i',
                                    'longitude of the ascending node': 'node',
                                    'argument of perihelion': 'w',
                                    'time of perihelion passage': 'tp'})
            df = df[['e', 'a', 'i', 'node', 'w', 'tp']]
            df = df.astype('float')
            df['name'] = [resp['object']['fullname']]
            df['a'] = df['a'] * 149_600_000_000
            res.extend(df.to_dict(orient='records'))
    return res

# [, , 'perihelion distance', , , , 'mean anomaly', , 'sidereal orbital period', 'mean motion', 'aphelion distance']
# [{'name': 'Saturn', 'a': 1433236350000.0, 'e': 0.05547, 'i': 2.488035, 'w': 339.392, 'node': 113.863436, 'tp': 2452804.70206886}, {'name': 'Uranus', 'a': 2882766900000.0, 'e': 0.046375, 'i': 0.773374, 'w': 96.999, 'node': 74.123632, 'tp': 2439436.38619405}]


def set_custom(data_list):
    keys = ['name', 'a', 'e', 'i', 'w', 'node', 'tp']
    ls_out = []
    if abs(int(len(data_list) / 7) - len(data_list) / 7) < 1e-5:
        for i in range(int(len(data_list) / 7)):
            # data_list[i:i + 7]
            keys_counter = 0
            temp_dict = {}
            for el in data_list[i*7:i*7 + 7]:
                if keys[keys_counter] == 'a':
                    float_el = float(el)
                    temp_dict[keys[keys_counter]] = float_el * 149_600_000_000
                elif keys[keys_counter] == 'tp':
                    dt = el.split('-')
                    temp_dict[keys[keys_counter]] = SpaceRock().julian_date(int(dt[0]), int(dt[1]), int(dt[2]))
                elif keys[keys_counter] == 'name':
                    temp_dict[keys[keys_counter]] = el
                else:
                    float_el = float(el)
                    temp_dict[keys[keys_counter]] = float_el
                keys_counter += 1
            ls_out.append(temp_dict)
    return ls_out



if __name__ == '__main__':
    set_custom(['Pluto', '40', '0.2', '15', '0', '13', '2022-08-12', 'Ceres', '4', '0.5', '12', '44', '56', '2022-08-12'])
    # get_data_api(['67P'])
    # ['name', 'a', 'e', 'i', 'w', 'node', 'tp', 'name', 'a', 'e', 'i', 'w', 'node', 'tp']
    # ['Pluto', '40', '0.2', '15', '0', '13', '2022-08-12', 'Ceres', '4', '0.5', '12', '44', '56', '2022-08-12']
