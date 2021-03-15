import { InstancesModel } from 'console/models';
import * as React from 'react';
import { ConsolePage } from 'newConsole/components';
// import messages from './displayMessages';
import './styles.scss';
import { ThemeColors } from 'console/components';

interface State {}
interface ActionProps {
  updateThemeFieldValue: Function;
}
interface StateProps extends InstancesModel {}
interface Props extends StateProps, ActionProps {
  history: {
    goBack: Function;
  };
}

export class ColorsComponent extends React.PureComponent<
  Props,
  State
> {
  public render() {
    return(
      <ConsolePage
        contentLoading={this.props.loading}
        goBack={this.props.history.goBack}
        showSideBarEditComponent
      >
        <h1 className="edit-heading">Colors</h1>
        <ThemeColors></ThemeColors>
      </ConsolePage>
    )
  }

}