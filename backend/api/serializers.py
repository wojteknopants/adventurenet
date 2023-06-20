from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import UserProfile, Post, Comment, PostLike, CommentLike, Image
User = get_user_model()

# class UserAccountSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = UserAccount
#         fields = ('id', 'email', 'is_active', 'created_at')
    
class UserCreateSerializer(UserCreateSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'password')


class UserProfileSerializer(serializers.ModelSerializer):
    user = serializers.SerializerMethodField()

    def get_user(self, obj):
        return obj.user.id
    
    class Meta:
        model = UserProfile
        fields = ['user', 'name', 'surname', 'country', 'bio', 'username', 'updated_at']
        read_only_fields = ('id', 'user_id', 'created_at', 'updated_at')

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('user', 'post', 'image', 'created_at', 'updated_at' )

class PostSerializer(serializers.ModelSerializer):
    is_liked = serializers.SerializerMethodField()
   
    images = ImageSerializer(many=True, read_only=True)
    new_images = serializers.ListField(child=serializers.ImageField(), write_only=True, max_length=10, required=False)

    class Meta:
        model = Post
        fields = ('id', 'user', 'title', 'content','images', 'new_images','likes_count', 'is_liked', 'created_at', 'updated_at')
        read_only_fields = ('id', 'user', 'images', 'likes_count', 'is_liked', 'created_at', 'updated_at')
        write_only_fields = ('new_images',)

    def create(self, validated_data):
        images_data = validated_data.pop('new_images', [])
        post = Post.objects.create(**validated_data)
        for img in images_data:
            Image.objects.create(post=post, image=img, user=post.user)
        return post

    def update(self, instance, validated_data):
        images_data = validated_data.pop('new_images', [])
        post = super().update(instance, validated_data)
        for img in images_data:
            Image.objects.create(post=post, image=img, user=post.user)
        return post

    def get_is_liked(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            return PostLike.objects.filter(post=obj, user=user).exists()
        return False

class CommentSerializer(serializers.ModelSerializer):
    is_liked = serializers.SerializerMethodField()

    class Meta:
        model = Comment
        fields = ('id', 'user', 'post', 'content', 'likes_count','is_liked', 'created_at', 'updated_at')
        read_only_fields = ('id', 'user', 'post', 'likes_count', 'is_liked', 'created_at', 'updated_at')

        def get_is_liked(self, obj):
            user = self.context['request'].user
            if user.is_authenticated:
                return CommentLike.objects.filter(comment=obj, user=user).exists()
            return False

class PostLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostLike
        fields = ('id', 'post', 'user')

class CommentLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentLike
        fields = ('id', 'comment', 'user')



