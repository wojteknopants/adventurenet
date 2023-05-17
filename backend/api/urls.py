from django.urls import path
from .views import UserProfileListCreateAPIView, UserProfileRetrieveUpdateAPIView

urlpatterns = [
    path('profiles/', UserProfileListCreateAPIView.as_view(), name='userprofile_list_create'),
    path('profiles/<int:pk>/', UserProfileRetrieveUpdateAPIView.as_view(), name='userprofile_retrieve_update'),
]