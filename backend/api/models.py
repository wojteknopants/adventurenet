from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.validators import FileExtensionValidator
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from datetime import date


# Create your models here.

class UserAccountManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError("User must have an email address")
        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, email, password=None):
        user = self.create_user(email=email, password=password)
        user.is_staff = True
        user.is_superuser = True
        user.save()
        return user

    

class UserAccount(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    is_active = models.BooleanField(default=False) #should be activated by djoser with email
    is_staff = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    

    def __str__(self):
        return self.email


class UserProfile(models.Model):
    user = models.OneToOneField(
        UserAccount,
        on_delete=models.CASCADE,
        related_name='userprofile'
    )
    name = models.CharField(max_length=20, null=True, blank=True)
    surname = models.CharField(max_length=20, null=True, blank=True)
    country = models.CharField(max_length=20, null=True, blank=True, default="Poland")
    bio = models.CharField(max_length=200, null=True, blank=True, default= "This is your example bio. Edit this however you want it.")
    username = models.CharField(max_length=20, null=True, blank=True, unique=True)
    profile_picture = models.ImageField(upload_to='profile_pictures/', null=True, blank=True)
    background_image = models.ImageField(upload_to='background_images/', null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "Profile of " + self.user.email 

class Tag(models.Model):
    name = models.CharField(max_length=100, unique=True)
    # Optionally, add more fields to store additional info like type (city, country, etc.)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

class Post(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='posts')
    title = models.CharField(max_length=255)
    content = models.TextField()
    comments_count = models.IntegerField(default=0)
    likes_count = models.IntegerField(default=0)
    tags = models.ManyToManyField(Tag, related_name='posts')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    #for debug
    def recount_comments(self):
        self.comments_count= Comment.objects.filter(post=self).count()
        self.save()
    
    
    #for debug
    def recount_likes(self):
        self.likes_count= PostLike.objects.filter(post=self).count()
        self.save()
    
    def __str__(self):
        return f"Post #{self.pk} user #{self.user.pk} from {self.created_at}"
    

class Comment(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    content = models.CharField(max_length=255, null=False, blank=False)
    likes_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    #for debug
    def recount_likes(self):
        self.likes_count = CommentLike.objects.filter(comment=self).count()
        self.save()

    def __str__(self):
        return f"Comment #{self.pk} user #{self.user.pk} from {self.created_at}"
    

class PostLike(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes')
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

 

class CommentLike(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='likes')
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

   

class Image(models.Model):
    post = models.ForeignKey(Post, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='posts/images/') #following part is probably not needed, is checked by default ->  #, validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png'])])
    user = models.ForeignKey(UserAccount, related_name='images', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class Itinerary(models.Model):
    user = models.ForeignKey(UserAccount, related_name='itineraries', on_delete=models.CASCADE)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


#CHAT MODELS

class ChatMessage(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='user')
    sender = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='sender')
    reciever = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='reciever')
    
    message = models.CharField(max_length=1000)
    is_read = models.BooleanField(default=False)
    date = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['date']
        verbose_name_plural = 'Message'
    
    def __str__(self):
        return f'{self.sender} - {self.reciever}'
    
    @property
    def sender_profile(self):
        sender_profile = UserProfile.objects.get(user=self.sender)
        return sender_profile
    
    @property
    def reciever_profile(self):
        reciever_profile = UserProfile.objects.get(user=self.reciever)
        return reciever_profile
    
    
class SavedItem(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='saved_items')
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.PositiveIntegerField()
    content_object = GenericForeignKey('content_type', 'object_id')
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'content_type', 'object_id')

    def __str__(self):
        return f"{self.content_type.model} saved on {self.created_at}"

class Adventure(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='adventures')
    participants = models.ManyToManyField(UserAccount, related_name='participating_adventures', blank=True)
    tags = models.ManyToManyField(Tag, related_name="adventures", blank=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    itinerary = models.ForeignKey(Itinerary, on_delete=models.SET_NULL, null=True, blank=True)
    desired_year_month = models.DateField(null=True)
    desired_participants = models.PositiveIntegerField()


    def __str__(self):
        return self.title

class AdventureJoinRequest(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='join_requests')
    adventure = models.ForeignKey(Adventure, on_delete=models.CASCADE, related_name='join_requests')
    status = models.CharField(max_length=20, choices=[('pending', 'PENDING'), ('accepted', 'ACCEPTED'), ('rejected', 'REJECTED')], default='pending')

    def __str__(self):
        return f"User ID {self.user.pk} request to join - Adventure ID {self.adventure.pk} - {self.status}"
    