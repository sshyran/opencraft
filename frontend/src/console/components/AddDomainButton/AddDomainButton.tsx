import { InstancesModel } from 'console/models';
import * as React from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';
import { RootState } from 'global/state';
import { connect } from 'react-redux';
import { TextInputField } from 'ui/components';
import { WrappedMessage } from 'utils/intl';
import messages from './displayMessages';
import './styles.scss';
import { updateFieldValue } from 'console/actions';


interface State {
  showModal: boolean
  externalDomain?: string
}

interface ActionProps {
  updateFieldValue: Function;
}

interface StateProps extends InstancesModel { }

interface Props extends StateProps, ActionProps { }

class AddDomainButtonComponent extends React.PureComponent<Props, State> {

  constructor(props: Props) {
    super(props);

    this.state = {
      showModal: false,
      externalDomain: ""
    }

    if (props.activeInstance.data) {
      this.state = {
        showModal: false,
        externalDomain: props.activeInstance.data.externalDomain
      }
    }
  }

  private handleShow = () => {
    this.setState({
      showModal: true
    })
  }

  private handleHide = () => {
    this.setState({
      showModal: false
    })
  }

  private handleClose = () => {
    this.setState({
      showModal: false
    })
  }

  private handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    this.setState({
      externalDomain: value
    })
  }

  private handleUpdateExternalDomain = () => {
    const instance = this.props.activeInstance;
    if (instance.data) {
      this.props.updateFieldValue(instance.data.id, 'externalDomain', this.state.externalDomain)
    }
  }

  public componentDidUpdate(prevProps: Props) {
    if (
      prevProps.activeInstance!.data!.externalDomain !== this.props.activeInstance!.data!.externalDomain
    ) {
      this.setState({
        showModal: false
      })
    }
  }

  public render() {
    const instance = this.props.activeInstance;

    // Do not render if instance data is not present or if externalDomain is present
    // in instance data.
    if (!instance.data || (instance.data && instance.data.externalDomain)) {
      return null;
    }

    return (
      <div>
        <Button className="addBtn" size="lg" onClick={this.handleShow}>
          <WrappedMessage messages={messages} id="buttonText" />
        </Button>

        <Modal size="lg" show={this.state.showModal} onClose={this.handleClose} centered>
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
                    value={this.state.externalDomain}
                    onChange={this.handleChange}
                    type="domain"
                    messages={messages}
                    fieldName="externalDomain"
                    error={instance.feedback.externalDomain}
                  />
                </Col>
              </Row>
              <div className="d-flex flex-row">
                <div className="verify-btn">
                  <Button variant="primary" onClick={this.handleUpdateExternalDomain}>
                    <WrappedMessage messages={messages} id="addDomainBtn" />
                  </Button>
                </div>
                <div>
                  <Button variant="outline-primary" onClick={this.handleHide}>
                    Cancel
                </Button>
                </div>
              </div>
            </Container>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export const AddDomainButton = connect<
  StateProps,
  ActionProps,
  {},
  Props,
  RootState
>((state: RootState) => state.console, {
  updateFieldValue
})(AddDomainButtonComponent);
