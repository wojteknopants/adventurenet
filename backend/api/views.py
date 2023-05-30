from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveUpdateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from djoser.permissions import CurrentUserOrAdminOrReadOnly
from .models import UserProfile, Post
from .serializers import UserProfileSerializer, PostSerializer

#PROFILE INFO

class UserProfileListCreateView(ListCreateAPIView):
    """It returns list of UserProfiles when GET,
    it creates new object when POST"""
    permission_classes = [IsAdminUser] #only admin can list info of all profiles at once, also only admin can create a new profile (not recommended, profile should be auto created only through registration)
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer

class UserProfileRetrieveUpdateView(RetrieveUpdateAPIView):
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

#POSTS

class PostRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [CurrentUserOrAdminOrReadOnly]
    lookup_field = 'pk'

class PostListCreateView(ListCreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class UserPostListView(ListAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        user_id = self.kwargs['user__pk'] #keyword variable captured from url
        if self.kwargs['user__pk'] == 'me': #if instead profiles/{user.id}/ we would use profiles/me/ (to capture user.id from JWT token)
            user = self.request.user
            user_id = user.pk
        
        return Post.objects.filter(user_id=user_id)
    


