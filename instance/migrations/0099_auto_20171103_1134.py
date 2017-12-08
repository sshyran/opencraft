# -*- coding: utf-8 -*-
# Generated by Django 1.10.7 on 2017-11-03 11:34
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('instance', '0098_openedxinstance_deploy_simpletheme'),
    ]

    operations = [
        migrations.AlterField(
            model_name='openedxinstance',
            name='deploy_simpletheme',
            field=models.BooleanField(default=False, help_text='If set to True, new appservers will use theme settings from the beta application form, if available. A basic theme will be deployed through simple_theme and it may  change colors and images. If set to False, no theme will be created and the default Open edX theme will be used; this is recommended for instances registered before the theme fields were available.', verbose_name='Deploy simple_theme'),
        ),
    ]
