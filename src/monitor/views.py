from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import Patient
from rest_framework.response import Response
from rest_framework import generics
from .serializers import PatientUpdateSerializer, PatientListSerializer, PatientCreateSerializer
@login_required
def index(request, path):
    return render(request, "index.html")

class PatientList(generics.ListCreateAPIView):
    def get_serializer_class(self, *args, **kwargs):
        if self.request.method == "GET":
            return PatientListSerializer
        else:
            return PatientCreateSerializer

    def get_queryset(self, *args, **kwargs):
        if self.request.user.is_authenticated:
            return Patient.objects.filter(doctor=self.request.user)
        else:
            return Patient.objects.all()

    def post(self, *args, **kwargs):
        serializer = self.get_serializer_class()(data=self.request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(doctor=self.request.user)
        return Response(serializer.data)

class PatientDetailUpdate(generics.RetrieveUpdateAPIView):
    serializer_class = PatientUpdateSerializer
    def get_queryset(self, *args, **kwargs):
        if self.request.user.is_authenticated:
            return Patient.objects.filter(doctor=self.request.user)
        else:
            return Patient.objects.all()

    def put(self, *args, **kwargs):
        print(self.request.data)
        return super(PatientDetailUpdate, self).put(*args, **kwargs)