from django.conf.urls import include, url
from rest_framework import routers

from .api import StoryViewSet, AlignmentAPI

router = routers.DefaultRouter()
router.register('stories', StoryViewSet, 'stories')
# router.register('sentences', AlignmentViewSet, 'sentences')

urlpatterns = [
    url("^", include(router.urls)),
    url("^sentences/(?P<story_id>.+)/$", AlignmentAPI.as_view()),
]
