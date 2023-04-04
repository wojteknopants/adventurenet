from django.db import models

# Create your models here.

class Post(models.Model):
    title = models.CharField(max_length=50, default="Test title", null=False)
    content = models.CharField(max_length=100, default="Test text", null=False)
    created_at = models.DateTimeField(auto_now_add=True)
