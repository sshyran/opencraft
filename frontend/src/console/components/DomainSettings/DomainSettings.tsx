import * as React from 'react';
import { InstancesModel } from 'console/models';
import { ConsolePage, PreviewBox } from 'newConsole/components';
import { WrappedMessage } from 'utils/intl';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { RootState } from 'global/state';
import { connect } from 'react-redux';
import messages from './displayMessages';
import './styles.scss';
import { DomainListItem } from '../DomainItem';
import { INTERNAL_DOMAIN_NAME } from 'global/constants';
import { TextInputField } from 'ui/components';
import { updateFieldValue } from 'console/actions';
interface State {
  title: string;
  subtitle: string;
  // extra state to manage the empty title and subtitle and rendering
  renderBool: boolean;
}

interface ActionProps {
  updateFieldValue: Function
}

interface StateProps extends InstancesModel { }

interface Props extends StateProps, ActionProps { }


const AddDomainButton: React.FC = () => {
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleVerify = () => { console.log("verifying") }


  return (
    <div>
      <Button
        className="addBtn"
        size="lg"
        onClick={handleShow}
      >
        <WrappedMessage messages={messages} id="buttonText" />
      </Button>

      <Modal
        size={'lg'}
        show={show}
        onClose={handleClose}
        centered>
        <Modal.Body>
          <Container className="add-domain-modal">
            <h2>
              <WrappedMessage messages={messages} id="modalTitle"></WrappedMessage>
            </h2>
            <Row>
              <Col className="add-domain-modal-description">
                <p>
                  <WrappedMessage messages={messages} id="modalDescription"></WrappedMessage>
                </p>
              </Col>
            </Row>
            <Row>
              <Col lg={8}>
                <TextInputField type="domain" messages={messages} fieldName="domainInput"></TextInputField>
              </Col>
            </Row>
            <div className="flex flex-row">
              <div className="verify-btn">
                <Button variant='primary' onClick={handleVerify} disabled>Verify</Button>
              </div>
              <div>
                <Button variant='outline-primary' onClick={handleClose}>Cancel</Button>
              </div>
            </div>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export class DomainSettingsComponent extends React.PureComponent<Props, State> {

  private deleteExternalDomain = () => {
    const instance = this.props.activeInstance;
    if (instance.data) {
      this.props.updateFieldValue(instance.data.id, "externalDomain", "")
    }
  }

  public render() {

    var subdomain;
    var externalDomain;
    var dnsConfigState;
    var externalDomainComponent;
    const instance = this.props.activeInstance;
    if (instance && instance.data) {
      subdomain = instance.data.subdomain;
      externalDomain = instance.data.externalDomain;
      dnsConfigState = instance.data.dnsConfigurationState
    }

    if (externalDomain) {
      externalDomainComponent = (
        <>
          <hr></hr>
          <DomainListItem
            domainName={externalDomain}
            isExternal={true}
            dnsState={dnsConfigState}
            onDelete={this.deleteExternalDomain} />
        </>
      )
    } else {
      externalDomainComponent = (
        <AddDomainButton></AddDomainButton>
      )
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
              {externalDomainComponent}
            </div>
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
>((state: RootState) => state.console, {
  updateFieldValue
})(DomainSettingsComponent);
