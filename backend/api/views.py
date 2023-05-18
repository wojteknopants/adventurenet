from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView
from .models import UserProfile, UserAccount
from .serializers import UserProfileSerializer

class UserProfileListCreateAPIView(ListCreateAPIView):
    """It returns list of UserProfiles when GET,
    it creates new object when POST"""
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class UserProfileRetrieveUpdateAPIView(RetrieveUpdateAPIView):
    """It returns single object when GET, updates (writes on) object when POST or PATCH, and destroys when DELETE"""
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    lookup_field = 'user__pk'