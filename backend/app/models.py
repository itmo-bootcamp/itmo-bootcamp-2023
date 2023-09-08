from django.db import models


class Skill(models.Model):
    name = models.CharField(max_length=255, unique=True)
    vector = models.JSONField(null=True, blank=True)
    skill_list = models.JSONField()

    def __str__(self):
        return self.name

    class Meta:
        indexes = [
            models.Index(fields=['name'], name='skill_name_idx'),
        ]


class Course(models.Model):
    name = models.CharField(max_length=255, unique=True)
    link = models.URLField(null=True, blank=True)
    vector = models.JSONField(null=True, blank=True)
    course_list = models.JSONField()

    def __str__(self):
        return self.name

    class Meta:
        indexes = [
            models.Index(fields=['name'], name='course_name_idx'),
        ]


