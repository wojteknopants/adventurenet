from django.urls import path
from .views import UserProfileListCreateView, UserProfileRetrieveUpdateView, PostRetrieveUpdateDeleteView, PostListCreateView, UserPostListView

urlpatterns = [
    #profiles
    path('profiles/', UserProfileListCreateView.as_view(), name='userprofile_list_create'),
    path('profiles/<str:user__pk>/', UserProfileRetrieveUpdateView.as_view(), name='userprofile_retrieve_update'), #can use profiles/me/ to capture user__id from JWT token
    
    #posts
    path('posts/<int:pk>/', PostRetrieveUpdateDeleteView.as_view(), name='post_retrieve_update_delete'),
    path('posts/', PostListCreateView.as_view(), name='posts_list_create'), 
    path('profiles/<str:user__pk>/posts/', UserPostListView.as_view(), name='user_posts_list'),

]