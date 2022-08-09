from django import forms
from .models import CelestialBody
from django.forms import CheckboxSelectMultiple

#
BODIES = [obj.name for obj in CelestialBody.objects.all().order_by('a')]


#
#
class CelestialBodiesChecked(forms.Form):
    # Planets
    bodies = forms.MultipleChoiceField(
        required=False,
        widget=forms.CheckboxSelectMultiple,
        choices=BODIES,
    )
    # get existing body
    existing_body_name = forms.CharField(max_length=64)
    # Custom body
    custom_body_name = forms.CharField(max_length=64)
    a = forms.FloatField()
    e = forms.FloatField()
    i = forms.FloatField()
    w = forms.FloatField()
    node = forms.FloatField()
    tp = forms.DateTimeField()

    def show_checked(self):
        print(self.cleaned_data)


class ExistingCelestialBody(forms.Form):
    body_name = forms.CharField(max_length=64)


class CustomCelestialBody(forms.Form):
    name = forms.CharField(max_length=64)
    a = forms.FloatField()
    e = forms.FloatField()
    i = forms.FloatField()
    w = forms.FloatField()
    node = forms.FloatField()
    tp = forms.DateTimeField()


