from django.urls import path

from .views import (LogoutView, LogoutAllView,
                    UserProfileListCreateView, UserProfileRetrieveUpdateView, 
                    PostRetrieveUpdateDeleteView, PostListCreateView, UserPostListView,
                    CommentRetrieveUpdateDeleteView, PostCommentListCreateView, UserCommentListView, CommentListView,
                    PostLikeView, CommentLikeView, PostLikesListView, CommentLikesListView,
                    UserImagesListView, FlightCultureDataAPIView, FlightSearchSuggestAPIView, FlightOffersAPIView, CitySearchAPIView, POISearchAPIView, ToursActivitiesSearchAPIView, GenerateItineraryView,
                    MapboxSuggestView, MapboxRetrieveView, ItineraryListCreateView, ItineraryRetrieveUpdateDestroyView, UserItinerariesListView,
                    SavedItemCreateView, SavedItemCreateDeleteView, SavedItemDestroyView, UserSavedItemListView, AdventureListCreateView, AdventureRetrieveUpdateDestroyView, SpecificUserAdventureListView,
                    AdventureJoinRequestCreateView, IncomingAdventureJoinRequestsListView, AdventureJoinRequestUpdateDestroyView, ThisAdventureJoinRequestsListView, MyInboxView, GetMessagesView, SendMessageView, ProfileDetailsView, SearchUserView)

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
    path('flight-culture-data/', FlightCultureDataAPIView.as_view(), name='flight_culture_data'),
    path('flight-search-suggest/', FlightSearchSuggestAPIView.as_view(), name='flight_search_suggest'),
    path('flight-offers/', FlightOffersAPIView.as_view(), name='flight_offers'),
    

    #amadeus
    path('city-search/', CitySearchAPIView.as_view(), name='city_search'),
    path('poi-search/', POISearchAPIView.as_view(), name='poi_search'),
    path('tours-activities-search/', ToursActivitiesSearchAPIView.as_view(), name='tours_activities_search'),

    #openai narrate itinerary
    path('generate-itinerary/', GenerateItineraryView.as_view(), name='generate_itinerary'),

    #mapbox 
    path('mapbox/search-suggest/', MapboxSuggestView.as_view(), name='mapbox-suggest'),
    path('mapbox/search-retrieve/', MapboxRetrieveView.as_view(), name='mapbox-retrieve'),

    #itineraries
    path('itineraries/<int:pk>/', ItineraryRetrieveUpdateDestroyView.as_view(), name='itinerary_retrieve_update_delete'),
    path('itineraries/', ItineraryListCreateView.as_view(), name='itineraries_list_create'), 
    path('profiles/<str:user__pk>/itineraries/', UserItinerariesListView.as_view(), name='user_itineraries_list'),

    #chat
    path('my-messages/<str:user__pk>/',MyInboxView.as_view()),
    path('get-messages/<sender_id>/<reciever_id>/',GetMessagesView.as_view()),
    path('send-messages/',SendMessageView.as_view()),
    
    path('profile/<int:pk>/',ProfileDetailsView.as_view()),
    path('search/<username>/',SearchUserView.as_view()),

    #saved items (bookmarks) 
    path('profiles/<str:user__pk>/saved-items/', UserSavedItemListView.as_view(), name='saved-item-list'),
    path('saved-items/', SavedItemCreateDeleteView.as_view(), name='saved-item-create-destroy'),
    path('saved-items/<int:pk>/', SavedItemDestroyView.as_view(), name='saved-item-destroy'),

    #adventures (LFG trip offer objects)
    path('adventures/', AdventureListCreateView.as_view(), name='adventure-list-create'),
    path('adventures/<int:pk>/', AdventureRetrieveUpdateDestroyView.as_view(), name='adventure_retrieve_update_delete'),
    path('profiles/<str:user__pk>/adventures/', SpecificUserAdventureListView.as_view(), name='specific-user-adventure-list'),



    #adventure join requests
    path('adventure-join-requests/create/', AdventureJoinRequestCreateView.as_view(), name='adventure-join-request-create'),
    path('adventure-join-requests/incoming/', IncomingAdventureJoinRequestsListView.as_view(), name='incoming-adventure-join-requests'),
    path('adventure-join-requests/<int:pk>/', AdventureJoinRequestUpdateDestroyView.as_view(), name='adventure-join-request-update-destroy'),
    path('adventures/<int:pk>/join-requests/', ThisAdventureJoinRequestsListView.as_view(), name='this-adventure-join-requests'),

]