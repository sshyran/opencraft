import React from 'react';
import { setupComponentForTesting } from "utils/testing";
import { DomainSettings } from './DomainSettings';

it('renders without crashing', () => {
    const tree = setupComponentForTesting(<DomainSettings />).toJSON();
    expect(tree).toMatchSnapshot();
});
