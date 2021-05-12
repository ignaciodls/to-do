from django.db import models
from apps.authentication.models import User

# Create your models here.

class Task(models.Model):

    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length = 150)

    
    