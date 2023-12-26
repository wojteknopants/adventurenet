from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers
from .models import UserProfile, Post, Comment, PostLike, CommentLike, Image, Tag, Itinerary, SavedItem
from django.contrib.contenttypes.models import ContentType
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
    is_saved = serializers.SerializerMethodField()

   
    images = ImageSerializer(many=True, read_only=True)
    new_images = serializers.ListField(child=serializers.ImageField(), write_only=True, max_length=10, required=False)
    new_tags = serializers.ListField(child=serializers.CharField(), write_only=True, max_length=10, required=False)

    user_profile = UserProfileSerializer(read_only=True, source='user.userprofile')  # Assuming the relation name from User to UserProfile is 'userprofile'


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
        fields = ('id', 'user', 'user_profile', 'title','tags', 'new_tags', 'content', 'images', 'new_images','images_to_delete', 'comments_count', 'likes_count', 'is_liked', 'is_saved', 'created_at', 'updated_at')
        read_only_fields = ('id', 'user', 'images', 'comments_count', 'likes_count', 'is_liked', 'is_saved', 'created_at', 'updated_at', 'user_pfp')
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
    
    def get_is_saved(self, obj):
        user = self.context.get('request').user if self.context.get('request') else None
        if user and user.is_authenticated:
            content_type = ContentType.objects.get_for_model(obj)
            return SavedItem.objects.filter(
                user=user, 
                content_type=content_type, 
                object_id=obj.id
            ).exists()
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

class GenerateItinerarySerializer(serializers.Serializer):
    latitude = serializers.FloatField()
    longitude = serializers.FloatField()
    number_of_days = serializers.IntegerField(min_value=1)
    intensiveness = serializers.ChoiceField(choices=["hard", "easy"])

class ItinerarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Itinerary
        fields = ['id', 'user', 'content', 'created_at', 'updated_at']

class ContentTypeField(serializers.Field):
    #helper field for SavedItemSerializer
    def to_representation(self, value):
        return value.model

    def to_internal_value(self, data):
        if data not in ['post', 'itinerary']:
            raise serializers.ValidationError("Content type must be 'post' or 'itinerary'.")

        try:
            # Ensure the ContentType exists for the given model name
            if data == 'post':
                return ContentType.objects.get_for_model(Post)
            elif data == 'itinerary':
                return ContentType.objects.get_for_model(Itinerary)
        except ContentType.DoesNotExist:
            raise serializers.ValidationError(f"Content type '{data}' does not exist.")

class SavedItemSerializer(serializers.ModelSerializer):
    content_object = serializers.SerializerMethodField()
    content_type = ContentTypeField()  # Custom field

    class Meta:
        model = SavedItem
        fields = ('id', 'user', 'content_type', 'object_id', 'content_object', 'created_at')
        read_only_fields = ('id', 'user', 'created_at')

    def get_content_object(self, obj):
        if isinstance(obj.content_object, Post):
            # Pass the current context to the nested serializer
            return PostSerializer(obj.content_object, context=self.context).data
        elif isinstance(obj.content_object, Itinerary):
            return ItinerarySerializer(obj.content_object, context=self.context).data
        return None


    def create(self, validated_data):
        user = self.context['request'].user
        content_type = validated_data.get('content_type')
        object_id = validated_data.get('object_id')

        # Check if the item is already saved by the user
        existing_saved_item = SavedItem.objects.filter(
            user=user, 
            content_type=content_type, 
            object_id=object_id
        ).first()

        if existing_saved_item:
            raise serializers.ValidationError('This item is already saved.')

        # Proceed to create a new saved item if it's not already saved
        saved_item = SavedItem.objects.create(
            user=user, 
            content_type=content_type, 
            object_id=object_id, 
            **validated_data
        )

        return saved_item

