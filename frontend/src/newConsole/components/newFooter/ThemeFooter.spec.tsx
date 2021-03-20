import React from 'react';
import { setupComponentForTesting } from "utils/testing";
import { ThemeFooterSideBar } from './ThemeFooterSideBar';

it('renders without crashing', () => {
    const tree = setupComponentForTesting(<ThemeFooterSideBar />).toJSON();
    expect(tree).toMatchSnapshot();
});
