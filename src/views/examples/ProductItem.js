import {
    Badge,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
  } from "reactstrap";
import { useHistory } from "react-router-dom";

export function ProductRow(props){
  const history = useHistory();
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
      <td>{props.category}</td>
      <td>
          {props.producer}
      </td>
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
            <DropdownItem
              onClick={(e) => {e.preventDefault();
                history.push(`/admin/products/${props.id}`)
            }
              }
            >Просмотреть/Изменить
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
      </tr>

    );
}