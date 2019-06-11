from rest_framework import serializers
from .models import Patient, GENDERS

class PatientListSerializer(serializers.ModelSerializer):
    gender = serializers.CharField(source='get_gender_display')
    class Meta:
        model = Patient
        fields = [
            "id",
            "name",
            "temp",
            "heartrate",
            "emg",
            "gender",
            "age",
            "doctor"
        ]
class PatientCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = '__all__'
class PatientUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Patient
        fields = [
            "id",
            "temp",
            "heartrate",
            "emg"
        ]