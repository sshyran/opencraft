import * as React from 'react';
import './styles.scss';
import { ConsolePage, PreviewBox } from 'newConsole/components';
import { InstancesModel } from 'console/models';
import { connect } from 'react-redux';
import { RootState } from 'global/state';
import { FooterPreview } from 'console/components/FooterPreview';

interface State {}
interface ActionProps {
  updateThemeFieldValue: Function;
}
interface StateProps extends InstancesModel {}
interface Props extends StateProps, ActionProps {}

export class ThemeFooterComponent extends React.PureComponent<Props, State> {
  public render() {
    const instance = this.props.activeInstance;
    let themeData = {};

    if (instance.data && instance.data.draftThemeConfig) {
      themeData = instance.data.draftThemeConfig;
    }

    return (
      <ConsolePage
        contentLoading={this.props.loading}
        showSideBarEditComponent={false}
      >
        <PreviewBox>
          <FooterPreview
            instanceData={instance.data}
            themeData={themeData}
          />
        </PreviewBox>
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
