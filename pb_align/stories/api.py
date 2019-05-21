from rest_framework import viewsets, permissions, generics

from stories.models import Story, Alignment
from .serializers import (StorySerializer, AlignmentSerializer)


class StoryViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = StorySerializer

    # queryset =  Story.objects.all

    def get_queryset(self):
        return Story.objects.all()


class AlignmentAPI(generics.ListAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = AlignmentSerializer

    def get_queryset(self):
        story_id = self.kwargs['story_id']
        print(story_id)
        return Alignment.objects.filter(story_id=story_id)
