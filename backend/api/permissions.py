from rest_framework import permissions
from rest_framework.permissions import SAFE_METHODS

class OwnerOrAdmin(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        user = request.user
        return user.is_staff or obj.user == user.pk


class OwnerOrAdminOrReadOnly(permissions.IsAuthenticated):
    def has_object_permission(self, request, view, obj):
        user = request.user
        if obj.user == user.pk:
            return True
        return request.method in SAFE_METHODS or user.is_staff
