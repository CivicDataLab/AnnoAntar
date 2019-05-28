from django.conf.urls import include, url
from rest_framework import routers

# from stories.api import
from .api import StoryViewSet, SentenceManageView, AlignmentUpdateAPI

router = routers.DefaultRouter()
router.register('stories', StoryViewSet, 'stories')
# router.register('sentences', AlignmentViewSet, 'sentences')
# router.register('sentences', AlignmentListAPI, 'sentences')

urlpatterns = [
    url("^", include(router.urls)),
    url("^sentences/(?P<story_id>.+)/$", SentenceManageView.as_view(), name='get_sentences'),
    # url("^sentences/(?P<story_id>.+)/$", AlignmentListAPI.as_view({'get': 'get_sentences', 'put': 'update'}), name='get_sentences'),
    # url("^sentences/update/(?P<story_id>.+)/$", AlignmentUpdateAPI.as_view(), name='save_sentences'),
    # url("^sentences/(?P<story_id>.+)/$", AlignmentListAPI.as_view({'put': 'save_sentences'}), name='save_sentences'),
]
