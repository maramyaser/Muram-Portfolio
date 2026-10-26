from django.contrib import admin
from .models import Project, ProjectMedia, ProjectLink


class ProjectMediaInline(admin.TabularInline):
    model = ProjectMedia
    extra = 1
    fields = (
        "media_type",
        "url",
        "file",
        "caption",
        "order",
    )


class ProjectLinkInline(admin.TabularInline):
    model = ProjectLink
    extra = 1
    fields = ("label", "url", "order")


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "technologies", "created_at")
    search_fields = ("title", "description", "technologies")
    ordering = ("-created_at",)

    inlines = [
        ProjectMediaInline,
        ProjectLinkInline,
    ]