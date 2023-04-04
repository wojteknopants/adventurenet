

from .views import PostViewSet
from rest_framework.routers import DefaultRouter
from api import views

router = DefaultRouter()
router.register(r'posts', views.PostViewSet, basename='movie')
urlpatterns = router.urls