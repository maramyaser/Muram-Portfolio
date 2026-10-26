from rest_framework import serializers
from .models import Project, ProjectMedia, ProjectLink


class ProjectMediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectMedia
        fields = [
            "id",
            "media_type",
            "file",
            "url",
            "caption",
            "order",
        ]


class ProjectLinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectLink
        fields = [
            "id",
            "label",
            "url",
            "order",
        ]


class ProjectSerializer(serializers.ModelSerializer):
    media = ProjectMediaSerializer(many=True, read_only=True)
    links = ProjectLinkSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            "id",
            "title",
            "description",
            "technologies",
            "github_url",
            "live_url",
            "media",
            "links",
        ]