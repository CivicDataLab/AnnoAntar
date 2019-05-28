from rest_framework import serializers

from .models import Story, Alignment


class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = ('id', 'source_text', 'translation_text', 'state', 'title')


class AlignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alignment
        fields = ('id', 'story_id', 'source', 'translation', 'state')
