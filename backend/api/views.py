from rest_framework.generics import ListCreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import IsAdminUser
from djoser.permissions import CurrentUserOrAdminOrReadOnly
from .models import UserProfile, UserAccount
from .serializers import UserProfileSerializer

class UserProfileListCreateAPIView(ListCreateAPIView):
    """It returns list of UserProfiles when GET,
    it creates new object when POST"""
    permission_classes = [IsAdminUser] #only admin can list info of all profiles at once, also only admin can create a new profile (not recommended, profile should be auto created only through registration)
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class UserProfileRetrieveUpdateAPIView(RetrieveUpdateAPIView):
    """It returns single object when GET, updates (writes on) object when POST or PATCH, and destroys when DELETE. Requires user.id as url parameter, e.g. profiles/1/.
    Can be used as profiles/me/ to show profile of JWT Token owner """

    def get_object(self): 
        if self.kwargs['user__pk'] == 'me': #if instead profiles/{user.id}/ we would use profiles/me/ (to capture user.id from JWT token)
            user = self.request.user
            self.kwargs['user__pk'] = user.pk
            return super().get_object()
        else: 
            return super().get_object()
        
    permission_classes = [CurrentUserOrAdminOrReadOnly] #only current user or admin can edit profile info, everybody can read profile info
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    lookup_field = 'user__pk'

    


