import { InstancesModel } from 'console/models';
import * as React from 'react';
import { ConsolePage } from 'newConsole/components';
import messages from './displayMessages';
import './styles.scss';
import { ThemeColors } from 'console/components';
import { connect } from 'react-redux';
import { RootState } from 'global/state';
import { updateThemeFieldValue } from 'console/actions';
import { WrappedMessage } from 'utils/intl';

interface State {}
interface ActionProps {
  updateThemeFieldValue: Function;
}
interface StateProps extends InstancesModel {}
interface Props extends StateProps {
  history: {
    goBack: Function;
  };
}

class ColorsComponent extends React.PureComponent<
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
        <h1 className="edit-heading">
          <WrappedMessage messages={messages} id="colors"/>
        </h1>
        <ThemeColors></ThemeColors>
      </ConsolePage>
    )
  }
}

export const Colors = connect<
  StateProps,
  ActionProps,
  {},
  Props,
  RootState
>((state: RootState) => state.console, {
  updateThemeFieldValue
})(ColorsComponent);