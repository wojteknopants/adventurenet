from django.db.models.signals import post_save, post_delete
from .models import UserAccount, UserProfile, PostLike, CommentLike, Comment
from django.dispatch import receiver
from django.db.models import F


@receiver(post_save, sender = UserAccount)
def create_user_profile(sender, instance, created, **kwargs):
    """signal that creates UserProfile whenever UserAccount is created"""
    if created:
        user_profile = UserProfile(user = instance)
        user_profile.save()


@receiver(post_save, sender=PostLike)
def increment_post_likes(sender, instance, created, **kwargs):
    """
    Increment the likes_count on Post object when a new PostLike is created.
    """
    if created:
        # Increment likes_count using F() to avoid race conditions.
        instance.post.likes_count = F('likes_count') + 1
        instance.post.save(update_fields=['likes_count'])


@receiver(post_delete, sender=PostLike)
def decrement_post_likes(sender, instance, **kwargs):
    """
    Decrement the likes_count on Post object when a PostLike is deleted.
    """
    # Decrement likes_count using F() to avoid race conditions.
    instance.post.likes_count = F('likes_count') - 1
    instance.post.save(update_fields=['likes_count'])

@receiver(post_save, sender=CommentLike)
def increment_comment_likes(sender, instance, created, **kwargs):
    """
    Increment the likes_count on Comment object when a new CommentLike is created.
    """
    if created:
        # Increment likes_count using F() to avoid race conditions.
        instance.comment.likes_count = F('likes_count') + 1
        instance.comment.save(update_fields=['likes_count'])


@receiver(post_delete, sender=CommentLike)
def decrement_comment_likes(sender, instance, **kwargs):
    """
    Decrement the likes_count on Comment object when a CommentLike is deleted.
    """
    # Decrement likes_count using F() to avoid race conditions.
    instance.comment.likes_count = F('likes_count') - 1
    instance.comment.save(update_fields=['likes_count'])

@receiver(post_save, sender=Comment)
def increment_comment_likes(sender, instance, created, **kwargs):
    """
    Increment the comments_count on Post object when a new Comment is created.
    """
    if created:
        # Increment comments_count using F() to avoid race conditions.
        instance.post.comments_count = F('comments_count') + 1
        instance.post.save(update_fields=['comments_count'])


@receiver(post_delete, sender=Comment)
def decrement_comment_likes(sender, instance, **kwargs):
    """
    Decrement the comments_count on Post object when a Comment is deleted.
    """
    # Decrement comments_count using F() to avoid race conditions.
    instance.post.comments_count = F('comments_count') - 1
    instance.post.save(update_fields=['comments_count'])