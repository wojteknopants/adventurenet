from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import UserProfile
User = get_user_model()

# class UserAccountSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserAccount
#         fields = ('id', 'email', 'is_active', 'created_at')
    
class UserCreateSerializer(UserCreateSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'password')


class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['name', 'surname', 'country', 'bio', 'username']