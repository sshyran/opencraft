import * as React from 'react';
import './styles.scss';
import { ConsolePage, PreviewBox } from 'newConsole/components';
import { InstancesModel } from 'console/models';
import { connect } from 'react-redux';
import { RootState } from 'global/state';

interface State {}
interface ActionProps {
  updateThemeFieldValue: Function;
}
interface StateProps extends InstancesModel {}
interface Props extends StateProps, ActionProps {}

export class ThemeFooterComponent extends React.PureComponent<Props, State> {
  public render() {
    return (
      <ConsolePage
        contentLoading={this.props.loading}
        showSideBarEditComponent={false}
      >
        <PreviewBox />
      </ConsolePage>
    );
  }
}

export const ThemeFooter = connect<
  StateProps,
  ActionProps,
  {},
  Props,
  RootState
>((state: RootState) => state.console)(ThemeFooterComponent);
