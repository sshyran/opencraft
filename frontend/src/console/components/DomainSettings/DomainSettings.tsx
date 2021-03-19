import * as React from 'react';
import { InstancesModel } from 'console/models';
import { ConsolePage, PreviewBox } from 'newConsole/components';
import { WrappedMessage } from 'utils/intl';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { RootState } from 'global/state';
import { connect } from 'react-redux';
import './styles.scss';
import { INTERNAL_DOMAIN_NAME } from 'global/constants';
import { TextInputField } from 'ui/components';
import { updateFieldValue } from 'console/actions';
import { DomainListItem } from '../DomainItem';
import messages from './displayMessages';

interface State {
  title: string;
  subtitle: string;
  // extra state to manage the empty title and subtitle and rendering
  renderBool: boolean;
}

interface ActionProps {
  updateFieldValue: Function;
}

interface StateProps extends InstancesModel {}

interface Props extends StateProps, ActionProps {}

interface AddModalProps {
  instanceId?: number;
  updateFieldValueHandler: Function;
}

const AddDomainButton: React.FC<AddModalProps> = (props: AddModalProps) => {
  const [show, setShow] = React.useState(false);
  const [domain, setDomain] = React.useState('');

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAddDomain = () => {
    if (props.instanceId) {
      props.updateFieldValueHandler(props.instanceId, 'externalDomain', domain);
    }
  };
  const handleDomainChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDomain(e.target.value);
  };

  return (
    <div>
      <Button className="addBtn" size="lg" onClick={handleShow}>
        <WrappedMessage messages={messages} id="buttonText" />
      </Button>

      <Modal size="lg" show={show} onClose={handleClose} centered>
        <Modal.Body>
          <Container className="add-domain-modal">
            <h2>
              <WrappedMessage messages={messages} id="modalTitle" />
            </h2>
            <Row>
              <Col className="add-domain-modal-description">
                <p>
                  <WrappedMessage messages={messages} id="modalDescription" />
                </p>
              </Col>
            </Row>
            <Row>
              <Col lg={8}>
                <TextInputField
                  value={domain}
                  onChange={handleDomainChange}
                  type="domain"
                  messages={messages}
                  fieldName="domainInput"
                />
              </Col>
            </Row>
            <div className="d-flex flex-row">
              <div className="verify-btn">
                <Button variant="primary" onClick={handleAddDomain}>
                  <WrappedMessage messages={messages} id="addDomainBtn" />
                </Button>
              </div>
              <div>
                <Button variant="outline-primary" onClick={handleClose}>
                  Cancel
                </Button>
              </div>
            </div>
          </Container>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export class DomainSettingsComponent extends React.PureComponent<Props, State> {
  private deleteExternalDomain = () => {
    const instance = this.props.activeInstance;
    if (instance.data) {
      this.props.updateFieldValue(instance.data.id, 'externalDomain', '');
    }
  };

  public render() {
    let subdomain;
    let externalDomain;
    let dnsConfigState;
    let externalDomainComponent;
    const instance = this.props.activeInstance;
    if (instance && instance.data) {
      subdomain = instance.data.subdomain;
      externalDomain = instance.data.externalDomain;
      dnsConfigState = instance.data.dnsConfigurationState;
    }

    if (externalDomain) {
      externalDomainComponent = (
        <>
          <hr />
          <DomainListItem
            domainName={externalDomain}
            isExternal
            dnsState={dnsConfigState}
            onDelete={this.deleteExternalDomain}
          />
        </>
      );
    } else {
      externalDomainComponent = (
        <AddDomainButton
          instanceId={instance.data?.id}
          updateFieldValueHandler={this.props.updateFieldValue}
        />
      );
    }

    return (
      <ConsolePage contentLoading={false} showSideBarEditComponent={false}>
        <PreviewBox>
          <Container className="domain-settings-container">
            <h2>
              <WrappedMessage messages={messages} id="title" />
            </h2>
            <Row>
              <Col className="domain-settings-description">
                <p>
                  <WrappedMessage messages={messages} id="description" />
                </p>
              </Col>
            </Row>
            <div>
              <DomainListItem
                domainName={subdomain + INTERNAL_DOMAIN_NAME}
                isExternal={false}
              />
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
