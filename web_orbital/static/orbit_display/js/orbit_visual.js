'use strict';
// orbit_data = orbit_data['orbit'];
let size_planet = 5;

function get_max_value(array) {
    let largest = 0
    for (let i = 0; i < array.length; i++) {
        if (largest < array[i]) {
            largest = array[i];
        }
    }
    return largest;
}

function set_colors(name, obj, type) {
    switch (name) {
        case 'Mercury':
            Object.assign(obj.marker, {color: 'rgb(152,90,28)'});
            if (type === 'scatter'){
                Object.assign(obj.marker, {size: size_planet});
            }
            break;
        case 'Venus':
            Object.assign(obj.marker, {color: 'rgb(224,190,60)'});
            if (type === 'scatter'){
                Object.assign(obj.marker, {size: size_planet});
            }
            break;
        case 'Earth':
            Object.assign(obj.marker, {color: 'rgb(41,98,224)'});
            if (type === 'scatter'){
                Object.assign(obj.marker, {size: size_planet});
            }
            break;
        case 'Mars':
            Object.assign(obj.marker, {color: 'rgb(253,72,5)'});
            if (type === 'scatter'){
                Object.assign(obj.marker, {size: size_planet});
            }
            break;
        case 'Jupiter':
            Object.assign(obj.marker, {color: 'rgb(255,105,50)'});
            // Object.assign(obj.marker, {size: 2});
            if (type === 'scatter'){
                Object.assign(obj.marker, {size: size_planet});
            }
            break;
        case 'Saturn':
            Object.assign(obj.marker, {color: 'rgb(255,199,17)'});
            // Object.assign(obj.marker, {size: 2});
            if (type === 'scatter'){
                Object.assign(obj.marker, {size: size_planet});
            }
            break;
        case 'Uranus':
            Object.assign(obj.marker, {color: 'rgb(5,208,253)'});
            // Object.assign(obj.marker, {size: 2});
            if (type === 'scatter'){
                Object.assign(obj.marker, {size: size_planet});
            }
            break;
        case 'Neptune':
            Object.assign(obj.marker, {color: 'rgb(46,95,255)'});
            // Object.assign(obj.marker, {size: 2});
            if (type === 'scatter'){
                Object.assign(obj.marker, {size: size_planet});
            }
            break;
        default:
            Object.assign(obj.marker, {color: 'rgb(166,166,166)'});
            if (type === 'scatter'){
                Object.assign(obj.marker, {size: size_planet});
            }
    }
}

function get_range(obj) {
    let max_value = [];

    for (const [key1, value1] of Object.entries(obj)) {
        let max_coord = [];
        for (const [key2, value2] of Object.entries(value1['orbit'])) {
            let arr = value2.map(Math.abs);
            max_coord.push(get_max_value(arr));
        }
        max_value.push(get_max_value(max_coord));
    }
    return get_max_value(max_value) + get_max_value(max_value) * 0.5;
}

let max_coord = get_range(orbit_data);



let traces = [];

let sun = {
    x: [0],
    y: [0],
    z: [0],
    mode: 'scatter',
    name: 'Sun',
    marker: {
        color: 'rgb(255,236,23)',
        size: 7,
        symbol: 'circle',

        line: {
            color: 'rgb(255,75,75)',
            width: 1
        },
        opacity: 0.8
    },
    type: 'scatter3d'
};

traces.push(sun);


for (const object in orbit_data) {
    let trace_i = {
        x: orbit_data[object]['orbit']['x'],
        y: orbit_data[object]['orbit']['y'],
        z: orbit_data[object]['orbit']['z'],
        mode: 'line',
        name: object,
        showlegend: false,
        marker: {
            size: 1,
            symbol: 'circle',

            opacity: 0.8
        },
        type: 'scatter3d'
    };
    let trace_pos = {
        x: orbit_data[object]['position']['x'],
        y: orbit_data[object]['position']['y'],
        z: orbit_data[object]['position']['z'],
        mode: 'scatter',
        name: object,
        marker: {
            size: 5,
            symbol: 'circle',

            line: {
                color: 'rgb(204, 204, 204)',
                width: 1
            },
            opacity: 0.8
        },
        type: 'scatter3d'
    };
    set_colors(object, trace_i);
    traces.push(trace_i);
    set_colors(object, trace_pos, 'planet');
    traces.push(trace_pos);
}

let axes = [{
    x: [0, max_coord],
    y: [0, 0],
    z: [0, 0],
    mode: 'line',
        name: 'x (EQUINOX)',
        showlegend: false,
        marker: {
            color: 'rgb(220,37,37)',
            size: 1,
            symbol: 'circle',

            opacity: 0.8
        },
        type: 'scatter3d'
    },
{
    x: [0, 0],
    y: [0, max_coord],
    z: [0, 0],
    mode: 'line',
        name: 'y',
        showlegend: false,
        marker: {
            color: 'rgb(117,255,36)',
            size: 1,
            symbol: 'circle',

            opacity: 0.8
        },
        type: 'scatter3d'
    },
{
    x: [0, 0],
    y: [0, 0],
    z: [0, max_coord],
    mode: 'line',
        name: 'z',
        showlegend: false,
        marker: {
            color: 'rgb(37,82,255)',
            size: 1,
            symbol: 'circle',

            opacity: 0.8
        },
        type: 'scatter3d'
    },
]

// traces.push(axes);

var layout = {
    plot_bgcolor:"black",
    paper_bgcolor:"#000000",
    width: 1200,
    height: 700,
    scene: {
        aspectmode: "manual",
        aspectratio: {
            x: 1, y: 1, z: 1,
        },
        xaxis: {
            range: [-max_coord, max_coord],

        },
        yaxis: {
            range: [-max_coord, max_coord],

        },
        zaxis: {
            range: [-max_coord, max_coord],
        }
    },
};


Plotly.newPlot('visualisation', traces, layout);
