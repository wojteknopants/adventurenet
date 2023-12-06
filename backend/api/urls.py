from django.urls import path

from .views import (LogoutView, LogoutAllView,
                    UserProfileListCreateView, UserProfileRetrieveUpdateView, 
                    PostRetrieveUpdateDeleteView, PostListCreateView, UserPostListView,
                    CommentRetrieveUpdateDeleteView, PostCommentListCreateView, UserCommentListView, CommentListView,
                    PostLikeView, CommentLikeView, PostLikesListView, CommentLikesListView,
                    UserImagesListView, FlightOffersAPIView, CitySearchAPIView, POISearchAPIView, ToursActivitiesSearchAPIView)

urlpatterns = [
    #logout - blacklist JWT refresh token
    path('auth/jwt/logout/', LogoutView.as_view(), name='auth_logout'),
    path('auth/jwt/logoutall/', LogoutAllView.as_view(), name='auth_logoutall'),

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

    #likes
    path('posts/<int:pk>/like/', PostLikeView.as_view(), name='post_like'),
    path('comments/<int:pk>/like/', CommentLikeView.as_view(), name='comment_like'),
    path('posts/<int:pk>/like_list/', PostLikesListView.as_view(), name='post_like_list'),
    path('comments/<int:pk>/like_list/', CommentLikesListView.as_view(), name='comment_like_list'),

    #images
    path('profiles/<str:user__pk>/images/', UserImagesListView.as_view(), name='user_images_list'), #retrieve all images from posts made by particular user

    #flights
    path('flight-offers/', FlightOffersAPIView.as_view(), name='flight_offers'),

    #amadeus
    path('city-search/', CitySearchAPIView.as_view(), name='city_search'),
    path('poi-search/', POISearchAPIView.as_view(), name='poi_search'),
    path('tours-activities-search/', ToursActivitiesSearchAPIView.as_view(), name='tours_activities_search'),




]