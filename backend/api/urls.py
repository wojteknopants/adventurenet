from django.urls import path
from .views import UserProfileListCreateAPIView, UserProfileRetrieveUpdateAPIView

urlpatterns = [
    path('profiles/', UserProfileListCreateAPIView.as_view(), name='userprofile_list_create'),
    path('profiles/<str:user__pk>/', UserProfileRetrieveUpdateAPIView.as_view(), name='userprofile_retrieve_update'), #can use profiles/me/ to capture user__id from JWT token
]