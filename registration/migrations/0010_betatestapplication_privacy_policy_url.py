# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2019-03-28 10:58
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('registration', '0009_validate_colors'),
    ]

    operations = [
        migrations.AddField(
            model_name='betatestapplication',
            name='privacy_policy_url',
            field=models.URLField(blank=True, help_text='URL to the privacy policy.', null=True, verbose_name='URL to Privacy Policy'),
        ),
    ]