# Generated by Django 2.2.4 on 2019-10-14 00:30

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('instance', '0118_auto_20190808_1030'),
    ]

    operations = [
        migrations.AddField(
            model_name='openedxinstance',
            name='periodic_builds_interval',
            field=models.DurationField(default=datetime.timedelta(1), help_text='Time interval between periodic builds. Note that this will not be precise; This interval will be the minimum time between the start of one build to the start of the next build. If a previous appserver is still provisioning when this interval is past, it will wait until it is finished before spawning a new appserver. Expects data in the format "DD HH:MM:SS.uuuuuu" or as specified by ISO 8601 (e.g. P4DT1H15M20S which is equivalent to 4 1:15:20) or PostgreSQL’s day-time interval format (e.g. 3 days 04:05:06).'),
        ),
        migrations.AddField(
            model_name='openedxinstance',
            name='periodic_builds_enabled',
            field=models.BooleanField(default=False, help_text='Enable automatically rebuilding and deploying new appservers at intervals'),
        ),
        migrations.AddField(
            model_name='openedxinstance',
            name='periodic_builds_retries',
            field=models.PositiveIntegerField(default=0, help_text='Number of times to retry spawning a new appserver if it fails (for periodic builds).'),
        ),
    ]