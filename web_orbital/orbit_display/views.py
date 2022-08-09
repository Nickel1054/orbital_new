from django.shortcuts import render
from django.views.generic import TemplateView, FormView
from orbit_display.models import CelestialBody
from orbit_display.forms import CelestialBodiesChecked
from orbit_display.utils.utils import get_data_from_model, get_data_api, set_custom
from orbit_display.utils.SpaceRock import run_orbits
from json import dumps


# Create your views here.


# class OrbitVisPage(TemplateView):
#     template_name = 'orbit_home.html'
#
#     def get_context_data(self, **kwargs):
#         context = super().get_context_data()
#         context['planets'] = CelestialBody.objects.order_by('a')
#         return context
#
#
# def calculate_orbits(request):
#     if request.method == 'POST':
#         print()


class CheckedBodiesView(FormView):
    template_name = 'orbit_home.html'
    form_class = CelestialBodiesChecked
    # success_url = '/plot/'

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context['planets'] = CelestialBody.objects.order_by('a')
        print("CONTEXT: \n", context['planets'])
        return context

    def form_valid(self, form):
        form.show_checked()
        return super(CheckedBodiesView, self).form_valid(form)


class PlotView(TemplateView):
    template_name = 'orbit_plot.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context['bodies'] = self.kwargs['objects']


def plot_orbits(request):
    if request.method == 'POST':
        # res = request.POST.getlist('check-Mercury')
        planets = [k.split('-')[-1] for k, v in request.POST.items() if k.startswith('check-')]
        existing_fields = [v for k, v in request.POST.items() if k.startswith('textfields-existing-')]
        custom_fields = [k.split('-')[2] for k, v in request.POST.items() if k.startswith('textfields-custom-')]
        custom_values = [v for k, v in request.POST.items() if k.startswith('textfields-custom-')]
        print(custom_fields)
        print(custom_values)
        custom = set_custom(custom_values)
        existing = get_data_api(existing_fields)
        orbital_data = get_data_from_model(planets)
        print(orbital_data)
        orbital_data.extend(existing)
        orbital_data.extend(custom)
        orbital_data = run_orbits(orbital_data)
        orbital_data = dumps(orbital_data)
        return render(request, 'orbit_plot.html', {'result': orbital_data})

