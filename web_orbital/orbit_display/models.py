from django.db import models

# Create your models here.


class CelestialBodyType(models.Model):
    group = models.CharField(max_length=64)

    def __str__(self):
        return self.group


class CelestialBody(models.Model):
    name = models.CharField(max_length=64)
    group = models.ForeignKey('CelestialBodyType', related_name='body_type', on_delete=models.CASCADE)
    a = models.FloatField()
    e = models.FloatField()
    i = models.FloatField()
    w = models.FloatField()
    node = models.FloatField()
    tp = models.FloatField()

    def __str__(self):
        return self.name
