from django.contrib import admin

from .models import Patient, PatientHistory
admin.site.register(
    Patient,
    list_display=["id", "name", "doctor"],
    list_display_links=["id", "name"],
)

admin.site.register(PatientHistory)