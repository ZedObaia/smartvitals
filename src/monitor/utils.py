from channels.db import database_sync_to_async

from .exceptions import ClientError
from .models import Patient
from django.contrib.auth import get_user_model
User = get_user_model()

# This decorator turns this function from a synchronous function into an async one
# we can call from our async consumers, that handles Django DBs correctly.
# For more, see http://channels.readthedocs.io/en/latest/topics/databases.html
@database_sync_to_async
def get_patient_or_error(patient_id, user):
    """
    Tries to fetch a room for the user, checking permissions along the way.
    """
    # Check if the user is logged in
    print(user)
    if not user.is_authenticated:
        raise ClientError("USER_HAS_TO_LOGIN")
    # Find the room they requested (by ID)
    try:
        patient = Patient.objects.get(pk=patient_id)
    except Patient.DoesNotExist:
        raise ClientError("PATIENT_INVALID")
    # Check permissions
    if not patient in Patient.objects.filter(doctor=user):
        raise ClientError("ACCESS_DENIED")
    return patient


@database_sync_to_async
def get_default_user():
    return User.objects.all()
