import React from 'react';

import update from 'immutability-helper';

import { OpenEdXInstanceDeploymentStatusStatusEnum as DeploymentStatus } from 'ocim-client';
import { setupComponentForTesting } from 'utils/testing';

import { NoticeBoard } from './NoticeBoard'

describe('NoticeBoard tests', () => {
  const deployedChanges = [
    [
      'change',
      'some_var1',
      [
        'test',
        'test1'
      ]
    ],
    [
      'change',
      'theme_config.btn-secondary-bg',
      [
        '#000000',
        '#FFFFFF'
      ]
    ],
    [
      'add',
      'theme_config',
      [
        [
          'added-bg',
          '#FFFFFF'
        ]
      ]
    ],
    [
      'remove',
      'theme_config',
      [
        [
          'removed-bg',
          '#FFFFFF'
        ]
      ]
    ],
    [
      'add',
      'static_content_overrides',
      [
        [
          'version',
          0
        ],
        [
          'homepage_overlay_html',
          '<h1>Welcome to Wonderland</h1><p>It works! Powered by Open edX®</p>'
        ]
      ]
    ],
    [
      'change',
      'some_dict.version',
      [
        0,
        1
      ]
    ],
    [
      'add',
      '',
      [
        [
          'instance_name',
          'Wonderland'
        ]
      ]
    ],
    [
      'remove',
      '',
      [
        [
          'some_var2',
          'test'
        ]
      ]
    ]
  ];
  const date = new Date('2020-06-13T15:07:05.158Z');
  // toLocaleDateString will not behave in the same way on each machine.
  // this will make it consistant everywhere during testing.
  date.toLocaleDateString = () => "June 13, 2020"

  const notifications = Object.values(DeploymentStatus).map(status => ({
    status, date, deployedChanges
  }));

  const state = {
    console: {
      loading: false,
      activeInstance: {
        data: {
          id: 1,
          instanceName: "test",
          subdomain: "test",
          lmsUrl: "test-url",
          studioUrl: "test-url",
          isEmailVerified: true,
        },
        deployment: {
          status: "preparing",
          undeployedChanges: [],
          deployedChanges: null,
          type: 'admin',
        }
      },
      instances: [{
        id: 1,
        instanceName: "test",
        subdomain: "test",
      }],
      notifications: notifications,
      notificationsLoading: false
    }
  };

  it('Renders all notification types without crashing', () => {
    const tree = setupComponentForTesting(
      <NoticeBoard />, state, jest.fn()
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('Renders message about non-existent instance if email is not verified', () => {
    const tree = setupComponentForTesting(
      <NoticeBoard getNotifications={() => {}}/>,
      update(state, {
        console: {
          activeInstance: {
            data: {
              isEmailVerified: {
                $set: false
              }
            }
          }
        }
      }),
      jest.fn(),
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
