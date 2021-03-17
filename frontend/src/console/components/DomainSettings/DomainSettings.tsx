import * as React from 'react';
import { InstancesModel } from 'console/models';
import { ConsolePage, PreviewBox } from 'newConsole/components';
import { WrappedMessage } from 'utils/intl';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { RootState } from 'global/state';
import { connect } from 'react-redux';
import messages from './displayMessages';
import './styles.scss';
import { DomainListItem } from '../DomainItem';
import { INTERNAL_DOMAIN_NAME } from 'global/constants';

interface State {
  title: string;
  subtitle: string;
  // extra state to manage the empty title and subtitle and rendering
  renderBool: boolean;
}

interface ActionProps {
  clearErrorMessage: Function;
  updateThemeFieldValue: Function;
  updateImages: Function;
}

interface StateProps extends InstancesModel { }

interface Props extends StateProps, ActionProps { }

export class DomainSettingsComponent extends React.PureComponent<Props, State> {
  public render() {

    var subdomain;
    var externalDomain;
    const instance = this.props.activeInstance;
    if (instance && instance.data){
      subdomain = instance.data.subdomain;
      externalDomain = instance.data.externalDomain;
    }

    return (
      <ConsolePage
        contentLoading={false}
        showSideBarEditComponent={false}
      >
        <PreviewBox>
          <Container className="domain-settings-container">
            <h2>
              <WrappedMessage messages={messages} id="title"></WrappedMessage>
            </h2>
            <Row>
              <Col className="domain-settings-description">
                <p>
                  <WrappedMessage messages={messages} id="description"></WrappedMessage>
                </p>
              </Col>
            </Row>
            <div>
              <DomainListItem domainName={subdomain + INTERNAL_DOMAIN_NAME} isExternal={false}></DomainListItem>
              <hr></hr>
              <DomainListItem domainName={externalDomain} isExternal={true}></DomainListItem>
            </div>
            <Button
              className="addBtn"
              size="lg"
            >
              <WrappedMessage messages={messages} id="buttonText" />
            </Button>
          </Container>
        </PreviewBox>
      </ConsolePage>
    );
  }
}

export const DomainSettings = connect<
  StateProps,
  ActionProps,
  {},
  Props,
  RootState
>((state: RootState) => state.console)(DomainSettingsComponent);
