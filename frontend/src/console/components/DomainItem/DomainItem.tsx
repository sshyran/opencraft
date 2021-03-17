import * as React from 'react';
import { Dropdown } from 'react-bootstrap';
import './styles.scss';

interface State {
  title: string;
  subtitle: string;
  // extra state to manage the empty title and subtitle and rendering
  renderBool: boolean;
}

interface Props {
  domainName?: string,
  isExternal: boolean
}

interface DropdownButtonPropType {
  children?: React.ReactNode,
  onClick?: Function
}


export class DomainListItem extends React.PureComponent<Props, State> {


  private getDropdown() {
    const customToggle = React.forwardRef<null, DropdownButtonPropType>(({ children, onClick }, ref) => {
      return (
        <button
          className="dropdown-toggle flex flex-row"
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

        <Dropdown.Menu>
          <Dropdown.Item>Delete Domain</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }

  public render() {
    return (
      <ul className="domain-list">
        <li className="list-item">
          <div className="flex">
            <div className="domain-name">
              <div>{this.props.domainName}</div>
              {
                this.props.isExternal ?
                  <div className="domain-type">Default Subdomain</div> :
                  <div className="domain-type">Primary Domain</div>
              }
            </div>
            {
              this.props.isExternal ?
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