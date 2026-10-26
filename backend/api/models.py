from django.db import models


class Project(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    technologies = models.CharField(max_length=500)
    github_url = models.URLField(blank=True)
    live_url = models.URLField(blank=True)
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title


class ProjectMedia(models.Model):
    MEDIA_TYPES = (
        ("image", "Image"),
        ("video", "Video"),
    )

    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="media"
    )

    media_type = models.CharField(
        max_length=10,
        choices=MEDIA_TYPES
    )

    file = models.FileField(
        upload_to="projects/",
        blank=True
    )

    url = models.URLField(
        max_length=1000,
        blank=True
    )

    caption = models.CharField(
        max_length=255,
        blank=True
    )

    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.project.title} - {self.media_type}"


class ProjectLink(models.Model):
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="links"
    )

    label = models.CharField(max_length=100)
    url = models.URLField()

    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ["order", "id"]

    def __str__(self):
        return f"{self.project.title} - {self.label}"