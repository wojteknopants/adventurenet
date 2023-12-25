from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import UserProfile, Post, Comment, PostLike, CommentLike, Image, Tag, Itinerary, ChatMessage
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

    class Meta:
        model = UserProfile
        fields = ['user', 'name', 'surname', 'country', 'bio', 'username', 'profile_picture', 'background_image', 'created_at', 'updated_at']
        read_only_fields = ('id', 'user', 'created_at', 'updated_at')

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ('id', 'user', 'post', 'image', 'created_at', 'updated_at' )



class PostSerializer(serializers.ModelSerializer):

    is_liked = serializers.SerializerMethodField()
   
    images = ImageSerializer(many=True, read_only=True)
    new_images = serializers.ListField(child=serializers.ImageField(), write_only=True, max_length=10, required=False)
    new_tags = serializers.ListField(child=serializers.CharField(), write_only=True, max_length=10, required=False)

    user_pfp = serializers.SerializerMethodField()

    tags = serializers.SlugRelatedField(
        many=True,
        queryset=Tag.objects.all(),
        slug_field='name',
        required=False
    )

    images_to_delete = serializers.ListField(
        child=serializers.IntegerField(),
        write_only=True,
        required=False
    )

    class Meta:
        model = Post
        fields = ('id', 'user', 'user_pfp' 'title','tags', 'new_tags', 'content', 'images', 'new_images','images_to_delete', 'comments_count', 'likes_count', 'is_liked', 'created_at', 'updated_at')
        read_only_fields = ('id', 'user', 'images', 'comments_count', 'likes_count', 'is_liked', 'created_at', 'updated_at', 'user_pfp')
        write_only_fields = ('new_images','new_tags', 'images_to_delete')
        #images and tags are for outcoming data, new_images and new_tags are for incoming data (these are separate models and needs some workaround when creating/updating)

    def create(self, validated_data):
        tags_data = validated_data.pop('new_tags', [])
        images_data = validated_data.pop('new_images', []), 
        post = Post.objects.create(**validated_data)

        for tag_name in tags_data:
            tag, _ = Tag.objects.get_or_create(name=tag_name)
            post.tags.add(tag)

        for img in images_data:
            Image.objects.create(post=post, image=img, user=post.user)

        return post


    def update(self, instance, validated_data):
        # Extract the tags data if provided
        if 'new_tags' in validated_data:
            tags_data = validated_data.pop('new_tags', [])
            instance.tags.clear()
            for tag_name in tags_data:
                tag, _ = Tag.objects.get_or_create(name=tag_name)
                instance.tags.add(tag)

        # Extract new images data if provided
        images_data = validated_data.pop('new_images', [])

        for img in images_data:
            Image.objects.create(post=instance, image=img, user=instance.user)

        # Extract images to delete data if provided
        images_to_delete_ids = validated_data.pop('images_to_delete', [])
        Image.objects.filter(id__in=images_to_delete_ids).delete()

        # Update the instance with the remaining validated data
        return super().update(instance, validated_data)
    
    def get_is_liked(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            return PostLike.objects.filter(post=obj, user=user).exists()
        return False
    
    def get_user_pfp(self, obj):
        # Assuming each user has a related UserProfile instance
        profile = UserProfile.objects.filter(user=obj.user).first()
        if profile and profile.profile_picture:
            return profile.profile_picture.url
        return None  # Or a default image URL




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

class GenerateItinerarySerializer(serializers.Serializer):
    latitude = serializers.FloatField()
    longitude = serializers.FloatField()
    number_of_days = serializers.IntegerField(min_value=1)
    intensiveness = serializers.ChoiceField(choices=["hard", "easy"])

class ItinerarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Itinerary
        fields = ['id', 'user', 'content', 'created_at', 'updated_at']


#CHAT SERIALIZERS

class ChatMessageSerializer(serializers.ModelSerializer):
    
    reciever_profile = UserProfileSerializer(read_only=True)
    sender_profile = UserProfileSerializer(read_only=True)
    
    class Meta:
        model = ChatMessage
        fields = ['id','user','sender','sender_profile','reciever','reciever_profile','message','is_read','date']