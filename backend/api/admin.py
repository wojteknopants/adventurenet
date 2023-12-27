from django.contrib import admin


from .models import UserAccount, UserProfile, Post, Comment, PostLike, CommentLike, Tag, Itinerary, SavedItem, ChatMessage

@admin.register(UserAccount)
class UserAccountAdmin(admin.ModelAdmin):
    list_display = ('email', 'is_active', 'is_staff', 'created_at', 'updated_at')
    # Customize other options as needed

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'surname', 'country', 'bio', 'username', 'created_at','updated_at')
    # Customize other options as needed


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'title', 'display_tags', 'content', 'comments_count', 'likes_count', 'created_at','updated_at')
    # Customize other options as needed

    def display_tags(self, obj):
        """Function to display the tags in the admin list view."""
        return ', '.join([tag.name for tag in obj.tags.all()])
    
    display_tags.short_description = 'Tags'


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('id','post', 'user', 'content', 'likes_count', 'created_at', 'updated_at')
    # Customize other options as needed

@admin.register(PostLike)
class PostLikeAdmin(admin.ModelAdmin):
    list_display = ('id', 'post', 'user', 'created_at')
    # Customize other options as needed

@admin.register(CommentLike)
class CommentLikeAdmin(admin.ModelAdmin):
    list_display = ('id', 'comment', 'user', 'created_at')
    # Customize other options as needed

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_at')

@admin.register(Itinerary)
class ItineraryAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'content', 'created_at')
    
@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_editable = ['is_read']
    list_display = ('sender', 'reciever', 'message', 'is_read')

@admin.register(SavedItem)
class SavedItemAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'content_type', 'object_id', 'created_at')
