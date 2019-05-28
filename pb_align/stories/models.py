from django.db import models
from django.contrib.auth.models import User


class Story(models.Model):
    STATE_CHOICES = (
        ('P', 'InProgress'),
        ('S', 'ToStart'),
        ('C', 'Completed'),
    )
    title = models.TextField(default='Title')
    source_text = models.TextField()
    translation_text = models.TextField()
    state = models.CharField(max_length=1, choices=STATE_CHOICES, default='S')
    created_at = models.DateTimeField(auto_now_add=True)
    assigned_to = models.ForeignKey(User, related_name="stories_assigned", on_delete=models.CASCADE, null=True)

    def __str__(self):
        return "Source: %s ; Translation %s" % (self.source_text, self.translation_text)


class Alignment(models.Model):
    STATE_CHOICES = (
        ('A', 'Accepted'),
        ('R', 'Rejected'),
        ('S', 'ToStart'),
        ('E', 'Edited'),
    )
    story = models.ForeignKey(Story, related_name="alignments", on_delete=models.CASCADE, null=True)
    modified = models.ForeignKey(User, related_name="alignments", on_delete=models.CASCADE, null=True)
    state = models.CharField(max_length=1, choices=STATE_CHOICES, default='S')
    source = models.TextField()
    translation = models.TextField()
