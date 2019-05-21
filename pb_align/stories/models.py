from django.db import models
from django.contrib.auth.models import User


class Story(models.Model):
    source_text = models.TextField()
    translation_text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return "Source: %s ; Translation %s" % (self.source_text, self.translation_text)


class Alignment(models.Model):
    story = models.ForeignKey(Story, related_name="alignments", on_delete=models.CASCADE, null=True)
    modified = models.ForeignKey(User, related_name="alignments", on_delete=models.CASCADE, null=True)
    source = models.TextField()
    translation = models.TextField()
