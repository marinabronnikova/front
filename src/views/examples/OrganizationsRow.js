import {
    Badge,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
  } from "reactstrap";
import { Link, useHistory } from 'react-router-dom';

export function OrganizationRow(props){
  const history = useHistory()

    return (
                             <tr>

                            <th scope="row">
                      <Media className="align-items-center">
                        <Media>
                          <span className="mb-0 text-sm">
                            {props.name}
                          </span>
                        </Media>
                      </Media>
                    </th>
                    <td>{props.phone_number}</td>
                   
                    <th scope="row">
                      <Media className="align-items-center">
                        <Media>
                          <span className="mb-0 text-sm">
                          {props.description}
                          </span>
                        </Media>
                      </Media>
                    </th>


                    <td className="text-right">
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem>
                        <Link to={`/admin/organizations/${props.id}`}>
                        Изменить
                        </Link>   
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </td>
                    </tr>

    );
}