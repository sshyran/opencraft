import React from 'react';
import { setupComponentForTesting } from "utils/testing";
import { LogosSidebar } from './LogosSidebar';


describe("Console Page", function() {
  it('Correctly renders LogosSidebar', () => {
      const tree = setupComponentForTesting(
        <LogosSidebar
            history={()=>{}}
        />).toJSON();
      expect(tree).toMatchSnapshot();
  });
});
