from django.contrib import admin


from .models import UserAccount, UserProfile

@admin.register(UserAccount)
class UserAccountAdmin(admin.ModelAdmin):
    list_display = ('email', 'is_active', 'is_staff', 'created_at', 'updated_at')
    # Customize other options as needed

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'surname', 'country', 'bio', 'username', 'created_at','updated_at')
    # Customize other options as needed