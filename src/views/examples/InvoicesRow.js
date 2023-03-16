import {
    Badge,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
  } from "reactstrap";
import { useHistory } from "react-router-dom";

export function InvoiceRow(props){
  const history = useHistory();

  let statusClassName;
  switch(props.status){
    case "Оплачен":
      statusClassName = "bg-success";
      break;
    case "Отменен":
      statusClassName = "bg-info";
      break;
    case "Выставлен":
      statusClassName = "bg-danger";
      break;
    default:
      statusClassName = "bg-warning";
  }

    return (
      <tr>
        <th scope="row">
        <Media className="align-items-center">
          <Media>
            <span className="mb-0 text-sm">
              {props.organization}
            </span>
          </Media>
        </Media>
      </th>
      <td>{props.total_price ? props.total_price : 0} BYN</td>
      <td>
        <Badge color="" className="badge-dot mr-4">
          <i className={statusClassName} />
          {props.status}
        </Badge>
      </td>
      <th scope="row">
        <Media className="align-items-center">
          <Media>
            <span className="mb-0 text-sm">
            {props.approver}
            </span>
          </Media>
        </Media>
      </th>
      <th scope="row">
        <Media className="align-items-center">
          <Media>
            <span className="mb-0 text-sm">
            {props.type}
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
            <DropdownItem
              onClick={(e) => {e.preventDefault();
              if (props.review){
                history.push(`/admin/invoice-review/${props.id}`)

              }else{
              history.push(`/admin/invoices/${props.id}`)}
            }
              }
            >
              { props.review ? "Проверить": "Просмотреть" }
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </td>
      </tr>

    );
}