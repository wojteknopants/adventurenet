from django.urls import path
from .views import (UserProfileListCreateView, UserProfileRetrieveUpdateView, 
                    PostRetrieveUpdateDeleteView, PostListCreateView, UserPostListView,
                    CommentRetrieveUpdateDeleteView, PostCommentListCreateView, UserCommentListView, CommentListView)

urlpatterns = [
    #profiles
    path('profiles/', UserProfileListCreateView.as_view(), name='userprofile_list_create'),
    path('profiles/<str:user__pk>/', UserProfileRetrieveUpdateView.as_view(), name='userprofile_retrieve_update'), #can use profiles/me/ to capture user__id from JWT token
    
    #posts
    path('posts/<int:pk>/', PostRetrieveUpdateDeleteView.as_view(), name='post_retrieve_update_delete'),
    path('posts/', PostListCreateView.as_view(), name='posts_list_create'), 
    path('profiles/<str:user__pk>/posts/', UserPostListView.as_view(), name='user_posts_list'),

    #comments
    path('comments/', CommentListView.as_view(), name='comments_list'), #totally all comments from the app, just for admins (for now)
    path('comments/<int:pk>/', CommentRetrieveUpdateDeleteView.as_view(), name='comment_retrieve_update_delete'),
    path('posts/<int:post_id>/comments/', PostCommentListCreateView.as_view(), name='comments_list_create'), 
    path('profiles/<str:user__pk>/comments/', UserCommentListView.as_view(), name='user_comments_list'), #retrieve all comments made by particular user (may be useful)


]