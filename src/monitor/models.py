from django.db import models
import channels.layers
from asgiref.sync import async_to_sync

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils import timezone

from django.contrib.auth import get_user_model
User = get_user_model()
GENDERS = [
    (0, 'Male'),
    (1, 'Female'),

]

class Patient(models.Model):
    name = models.CharField(max_length=255)
    doctor = models.ForeignKey(
        User, on_delete=models.SET_NULL, blank=True, null=True)
    temp = models.FloatField(null=True, blank=True)
    heartrate = models.FloatField(null=True, blank=True)
    emg = models.TextField(blank=True, null=True)
    age = models.IntegerField(default=25)
    gender = models.IntegerField(choices=GENDERS, default='Male')

    def __str__(self):
        return self.name

    @property
    def group_name(self):
        """
        Returns the Channels Group name that sockets should subscribe to to get sent
        messages as they are generated.
        """
        return "room-%s" % self.id


class PatientHistory(models.Model):
    patient = models.ForeignKey('Patient', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now=True)
    temp = models.FloatField(null=True, blank=True)
    heartrate = models.FloatField(null=True, blank=True)
    emg = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.patient.name} - {self.timestamp}"

@receiver(post_save, sender=Patient, dispatch_uid="update_patient_readings")
def update_patient(sender, instance, **kwargs):
    group_name = 'room-{}'.format(instance.id)
    channel_layer = channels.layers.get_channel_layer()
    if timezone.now().minute % 5 == 0:
        PatientHistory.objects.create(
            patient=instance,
            temp=instance.temp,
            heartrate=instance.heartrate,
            emg=instance.emg
        )
    async_to_sync(channel_layer.group_send)(
        group_name,
        {
            "type": "chat.message",
            "patient_id": instance.id,
                    "username": None,
                    "message": {
                        "temp": instance.temp,
                        "heartrate": instance.heartrate,
                        "emg": instance.emg
                    },
        }
    )
