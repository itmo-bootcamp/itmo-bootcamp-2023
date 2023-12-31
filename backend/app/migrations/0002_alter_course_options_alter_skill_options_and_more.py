# Generated by Django 4.2.5 on 2023-09-08 17:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='course',
            options={},
        ),
        migrations.AlterModelOptions(
            name='skill',
            options={},
        ),
        migrations.RemoveField(
            model_name='skill',
            name='skill_list',
        ),
        migrations.AlterField(
            model_name='course',
            name='link',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='course',
            name='vector',
            field=models.JSONField(blank=True, null=True),
        ),
        migrations.AddIndex(
            model_name='course',
            index=models.Index(fields=['name'], name='course_name_idx'),
        ),
        migrations.AddIndex(
            model_name='skill',
            index=models.Index(fields=['name'], name='skill_name_idx'),
        ),
    ]
