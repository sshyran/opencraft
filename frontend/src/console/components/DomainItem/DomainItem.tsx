import { EXTERNAL_DOMAIN_CNAME_VALUE } from 'global/constants';
import { OpenEdXInstanceConfigUpdateDnsConfigurationStateEnum as DnsStateEnum } from 'ocim-client';
import * as React from 'react';
import { Button, Col, Container, Dropdown, Modal, Row, Table } from 'react-bootstrap';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import { WrappedMessage } from 'utils/intl';
import messages from './displayMessages';
import './styles.scss';

interface State {
  title: string;
  subtitle: string;
  // extra state to manage the empty title and subtitle and rendering
  renderBool: boolean;
}

interface Props {
  domainName?: string,
  isExternal: boolean,
  dnsState?: DnsStateEnum,
  onDelete?: Function
}

interface DropdownButtonPropType {
  children?: React.ReactNode,
  onClick?: React.MouseEventHandler,
}

interface DomainConfigHelpProps {
  domainName?: string
}

const DomainConfigHelp: React.FC<DomainConfigHelpProps> = ({domainName}) => {

  const [show, setShow] = React.useState(false)

  return (
    <>
      <div className="flex flex-col items-center justify-center flex-grow check-dns-btn" onClick={() => setShow(true)}>
        <div className="flex flex-row">
          <div className="dns-config-icon"><i className="fas fa-exclamation-triangle"></i></div>
          <div className="flex-grow dns-config">Check DNS Configuration</div>
        </div>
      </div >
      <Modal show={show} centered size={'lg'}>
        <Modal.Body>
          <Container className="dns-config-help-modal">
            <h2>
              <WrappedMessage messages={messages} id="helpTitle"></WrappedMessage>
            </h2>
            <Row>
              <Col className="dns-config-help-modal-description">
                <p>
                  <WrappedMessage messages={messages} id="helpDescription"></WrappedMessage>
                </p>
              </Col>
            </Row>
            <Table bordered>
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>TYPE</th>
                  <th>VALUE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{domainName}</td>
                  <td>CNAME</td>
                  <td>{EXTERNAL_DOMAIN_CNAME_VALUE}</td>
                </tr>
                <tr>
                  <td>*.{domainName}</td>
                  <td>CNAME</td>
                  <td>{EXTERNAL_DOMAIN_CNAME_VALUE}</td>
                </tr>
              </tbody>
            </Table>
            <div className="flex flex-row">
              <div>
                <Button size="lg" className="addBtn" variant='primary' onClick={() => setShow(false)}>I have made these changes</Button>
              </div>
            </div>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  )
}

export class DomainListItem extends React.PureComponent<Props, State> {

  private getDropdown() {
    const customToggle = React.forwardRef<null, DropdownButtonPropType>(({ children, onClick }, ref) => {
      return (
        <button
          className="options-dropdown-toggle flex flex-row"
          ref={ref}
          onClick={
            (e) => {
              e.preventDefault();
              if (onClick) {
                onClick(e);
              }
            }
          }>
          {children}
          <i className="dropdown-toggle-caret fas fa-angle-down"></i>
        </button>
      );
    });

    return (
      <Dropdown className="flex flex-col items-center justify-center">
        <Dropdown.Toggle as={customToggle} id="domain-dropdown">
          <span>Options</span>
        </Dropdown.Toggle>

        <DropdownMenu alignRight>
          <Dropdown.Item
            onClick={(event: any) => {
              event.preventDefault();
              if (this.props.onDelete) {
                this.props.onDelete();
              }
            }
            }
          >Delete Domain</Dropdown.Item>
        </DropdownMenu>
      </Dropdown>
    )
  }

  public render() {

    // Determine the color of the domain name text based on DNS config status
    var domainColor: string = 'color-green';
    if (this.props.isExternal && this.props.dnsState !== DnsStateEnum.Verified) {
      domainColor = '';
    }

    return (
      <ul className="domain-list">
        <li className={`list-item ${domainColor}`}>
          <div className="flex flex-wrap">
            <div className="domain-name flex-1">
              <div>{this.props.domainName}</div>
              {
                this.props.isExternal ?
                  <div className="domain-type">Primary Domain</div> :
                  <div className="domain-type">Default Subdomain</div>
              }
            </div>
            {
              this.props.isExternal && this.props.dnsState !== DnsStateEnum.Verified ?
                <DomainConfigHelp domainName={this.props.domainName}/> : null
            }
            {
              this.props.isExternal ?
                this.getDropdown() :
                null
            }
          </div>
        </li>
      </ul>
    )
  }
}
