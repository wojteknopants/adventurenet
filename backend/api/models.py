from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.core.validators import FileExtensionValidator

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
    
class Post(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='posts')
    title = models.CharField(max_length=255)
    content = models.TextField()
    likes_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def count_likes(self):
        return PostLike.objects.filter(post=self).count()
    
    def __str__(self):
        return f"Post #{self.pk} user #{self.user.pk} from {self.created_at}"
    

class Comment(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')
    content = models.CharField(max_length=255, null=False, blank=False)
    likes_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def count_likes(self):
        return CommentLike.objects.filter(comment=self).count()

    def __str__(self):
        return f"Comment #{self.pk} user #{self.user.pk} from {self.created_at}"
    

class PostLike(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes')
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        super(PostLike, self).save(*args, **kwargs)
        self.post.likes = self.post.count_likes()
        self.post.save()

    def delete(self, *args, **kwargs):
        self.post.likes -= 1
        self.post.save()
        super(PostLike, self).delete(*args, **kwargs)

class CommentLike(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='likes')
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        super(CommentLike, self).save(*args, **kwargs)
        self.comment.likes = self.comment.count_likes()
        self.comment.save()

    def delete(self, *args, **kwargs):
        self.comment.likes -= 1
        self.comment.save()
        super(CommentLike, self).delete(*args, **kwargs)


class Image(models.Model):
    post = models.ForeignKey(Post, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='posts/images/') #probably not needed, is checked by default ->  #, validators=[FileExtensionValidator(allowed_extensions=['jpg', 'jpeg', 'png'])])
    user = models.ForeignKey(UserAccount, related_name='images', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


