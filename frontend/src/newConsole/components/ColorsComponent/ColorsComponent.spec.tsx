import React from 'react';
import { setupComponentForTesting } from "utils/testing";
import { ColorsComponent } from './ColorsComponent';

it('renders without crashing', () => {
    const tree = setupComponentForTesting(<ColorsComponent />).toJSON();
    expect(tree).toMatchSnapshot();
});
