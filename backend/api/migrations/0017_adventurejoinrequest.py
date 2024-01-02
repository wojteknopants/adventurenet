# Generated by Django 4.1.7 on 2023-12-29 13:59

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_rename_destination_tags_adventure_tags'),
    ]

    operations = [
        migrations.CreateModel(
            name='AdventureJoinRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('status', models.CharField(choices=[('pending', 'PENDING'), ('accepted', 'ACCEPTED'), ('rejected', 'REJECTED')], default='pending', max_length=20)),
                ('adventure', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='join_requests', to='api.adventure')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='join_requests', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]