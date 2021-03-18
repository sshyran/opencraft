import { OpenEdXInstanceConfigUpdateDnsConfigurationStateEnum as DnsStateEnum } from 'ocim-client';
import * as React from 'react';
import { Dropdown } from 'react-bootstrap';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
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
              this.props.isExternal && this.props.dnsState === DnsStateEnum.Failed ?
                <div className="flex flex-col items-center justify-center flex-grow">
                  <div className="flex flex-row">
                    <div className="dns-config-icon"><i className="fas fa-exclamation-triangle"></i></div>
                    <div className="flex-grow dns-config">Check DNS Configuration</div>
                  </div>
                </div> : null
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
