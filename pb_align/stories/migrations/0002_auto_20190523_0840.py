# -*- coding: utf-8 -*-
# Generated by Django 1.11.17 on 2019-05-23 08:40
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('stories', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='alignment',
            name='state',
            field=models.CharField(choices=[('A', 'Accepted'), ('R', 'Rejected'), ('S', 'ToStart'), ('E', 'Edited')], default='S', max_length=1),
        ),
        migrations.AddField(
            model_name='story',
            name='assigned_to',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='stories_assigned', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AddField(
            model_name='story',
            name='state',
            field=models.CharField(choices=[('P', 'InProgress'), ('S', 'ToStart'), ('C', 'Completed')], default='S', max_length=1),
        ),
        migrations.AddField(
            model_name='story',
            name='title',
            field=models.TextField(default='Title'),
        ),
    ]
