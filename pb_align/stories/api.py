from rest_framework import viewsets, permissions, status
from rest_framework.decorators import list_route
from rest_framework.generics import UpdateAPIView
from rest_framework.response import Response
from rest_framework.views import APIView

from stories.models import Story, Alignment
from .serializers import (StorySerializer, AlignmentSerializer)


class StoryViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = StorySerializer

    # queryset =  Story.objects.all

    def get_queryset(self):
        return Story.objects.all()


class BaseManageView(APIView):
    """
    The base class for ManageViews
        A ManageView is a view which is used to dispatch the requests to the appropriate views
        This is done so that we can use one URL with different methods (GET, PUT, etc)
    """

    def dispatch(self, request, *args, **kwargs):
        if not hasattr(self, 'VIEWS_BY_METHOD'):
            raise Exception('VIEWS_BY_METHOD static dictionary variable must be defined on a ManageView class!')
        if request.method in self.VIEWS_BY_METHOD:
            return self.VIEWS_BY_METHOD[request.method](request, *args, **kwargs)

        return Response(status=405)

    # def dispatch(self, request, *args, **kwargs):
    #     if not hasattr(self, 'VIEWS_BY_METHOD'):
    #         raise Exception('VIEWS_BY_METHOD static dictionary variable must be defined on a ManageView class!')
    #     if request.method in self.VIEWS_BY_METHOD:
    #         return self.VIEWS_BY_METHOD[request.method]()(request, *args, **kwargs)
    #
    #     return super().dispatch(request, *args, **kwargs)


class AlignmentListAPI(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = AlignmentSerializer

    @list_route()
    def get_sentences(self, request, story_id):
        print(story_id)
        alignments = self.get_alignments(story_id)
        return Response(AlignmentSerializer(alignments, many=True).data)

    @staticmethod
    def get_alignments(story_id):
        return Alignment.objects.filter(story_id=story_id)


class AlignmentUpdateAPI(UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated, ]
    serializer_class = AlignmentSerializer

    def put(self, request, *args, **kwarg):
        story_id = self.kwargs['story_id']
        sentences = request.data
        for sentence in sentences:
            sentence['modified_id'] = request.user.id
        serializer = self.get_serializer(data=sentences, many=True)

        if serializer.is_valid():
            serializer.update(AlignmentListAPI.get_alignments(story_id), serializer.data)
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)


class SentenceManageView(BaseManageView):
    VIEWS_BY_METHOD = {
        'GET': AlignmentListAPI.as_view({'get': 'get_sentences'}),
        'PUT': AlignmentUpdateAPI.as_view(),
    }
