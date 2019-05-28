from rest_framework import serializers

from .models import Story, Alignment


class StorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Story
        fields = ('id', 'source_text', 'translation_text', 'state', 'title')


class AlignmentListSerializer(serializers.ListSerializer):
    def update(self, instance, validated_data):
        print(instance)
        print(validated_data)
        # Maps for id->instance and id->data item.
        alignment_mapping = {alignment.id: alignment for alignment in instance}
        data_mapping = {item['id']: item for item in validated_data}

        # Perform creations and updates.
        ret = []
        for alignment_id, data in data_mapping.items():
            alignment = alignment_mapping.get(alignment_id, None)
            if alignment is None:
                ret.append(self.child.create(data))
            else:
                ret.append(self.child.update(alignment, data))

        # Perform deletions.
        for alignment_id, alignment in alignment_mapping.items():
            if alignment_id not in data_mapping:
                alignment.delete()

        return ret


class AlignmentSerializer(serializers.ModelSerializer):
    id = serializers.IntegerField()

    class Meta:
        model = Alignment
        fields = ('id', 'story_id', 'source', 'translation', 'state')
        list_serializer_class = AlignmentListSerializer
