# Generated by Django 4.1.7 on 2023-12-27 20:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_alter_adventure_desired_year_month'),
    ]

    operations = [
        migrations.RenameField(
            model_name='adventure',
            old_name='destination_tags',
            new_name='tags',
        ),
    ]
