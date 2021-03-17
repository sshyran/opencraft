import React from 'react';
import { setupComponentForTesting } from "utils/testing";
import { DomainItem } from './DomainItem';

it('renders without crashing', () => {
    const tree = setupComponentForTesting(<DomainItem />).toJSON();
    expect(tree).toMatchSnapshot();
});
