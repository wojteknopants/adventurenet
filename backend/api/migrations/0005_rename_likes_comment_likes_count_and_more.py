# Generated by Django 4.1.7 on 2023-06-17 20:12

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_comment_likes_post_likes_postlike_commentlike'),
    ]

    operations = [
        migrations.RenameField(
            model_name='comment',
            old_name='likes',
            new_name='likes_count',
        ),
        migrations.RenameField(
            model_name='post',
            old_name='likes',
            new_name='likes_count',
        ),
        migrations.AlterField(
            model_name='comment',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='api.post'),
        ),
        migrations.AlterField(
            model_name='commentlike',
            name='comment',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='likes', to='api.comment'),
        ),
        migrations.AlterField(
            model_name='post',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='postlike',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='likes', to='api.post'),
        ),
    ]