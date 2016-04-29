# -*- coding: utf-8 -*-
#
# OpenCraft -- tools to aid developing and hosting free software projects
# Copyright (C) 2015-2016 OpenCraft <contact@opencraft.com>
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
"""
Worker tasks for instance hosting & management
"""

# Imports #####################################################################

import logging

from huey.contrib.djhuey import db_task

from instance.models.openedx_instance import OpenEdXInstance


# Logging #####################################################################

logger = logging.getLogger(__name__)


# Tasks #######################################################################

@db_task()
def provision_instance(instance_ref_id):
    """
    Run provisioning on an existing instance
    """
    logger.info('Retrieving instance: ID=%s', instance_ref_id)
    instance = OpenEdXInstance.objects.get(ref_set__pk=instance_ref_id)

    logger.info('Spawning new AppServer on %s', instance)
    instance.spawn_appserver()
