from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

class CustomUser(AbstractUser):
    username = None  # Disable the username field
    email = models.EmailField(_('email address'), unique=True)  # Make email unique and the primary identifier

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    phone_number = models.CharField(max_length=20)