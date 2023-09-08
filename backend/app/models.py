from django.db import models


class Skill(models.Model):
    name = models.CharField(max_length=255, unique=True)
    vector = models.JSONField()

    def __str__(self):
        return self.name

    class Meta:
        indexes = [
            models.Index(fields=['name'], name='skill_name_idx'),
        ]



