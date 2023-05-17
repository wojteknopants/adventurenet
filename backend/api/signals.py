from django.db.models.signals import post_save
from .models import UserAccount, UserProfile
from django.dispatch import receiver

@receiver(post_save, sender = UserAccount)
def create_user_profile(sender, instance, created, **kwargs):
    """signal that creates UserProfile whenever UserAccount is created"""
    if created:
        user_profile = UserProfile(user = instance)
        user_profile.save()

