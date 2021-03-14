import * as React from 'react';
import './styles.scss';
import { ConsolePage } from 'newConsole/components';
import { InstancesModel } from 'console/models';
import { connect } from 'react-redux';
import { RootState } from 'global/state';
import { LogosSidebar } from './LogosSidebar';

interface State {}
interface ActionProps {}
interface StateProps extends InstancesModel {}
interface Props extends StateProps, ActionProps {
  history: {
    goBack: Function;
  };
}

export class LogosComponent extends React.PureComponent<Props, State> {
  public render() {
    return (
      <ConsolePage
        contentLoading={this.props.loading}
        goBack={this.props.history.goBack}
        showSideBarEditComponent
      >
        <LogosSidebar />
      </ConsolePage>
    );
  }
}

export const Logos = connect<StateProps, ActionProps, {}, Props, RootState>(
  (state: RootState) => state.console
)(LogosComponent);
