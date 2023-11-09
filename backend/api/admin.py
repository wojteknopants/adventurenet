from django.contrib import admin


from .models import UserAccount, UserProfile, Post, Comment, PostLike, CommentLike

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
    list_display = ('id', 'user', 'title', 'content', 'comments_count', 'likes_count', 'created_at','updated_at')
    # Customize other options as needed


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