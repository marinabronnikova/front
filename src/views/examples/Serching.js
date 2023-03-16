import {
    Card,
    CardHeader,
    CardFooter,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table,
    Container,
    Row,Col,Button, Input, Form, FormGroup, InputGroup, InputGroupAddon, InputGroupText
  } from "reactstrap";
  // core components
  import { useHistory } from "react-router-dom";


export function SearchingRow(props){
    const onSearching = (e) => {
        props.searching( e.target.value);
    };
    const history = useHistory();
      return (
      <Form className="navbar-search navbar-search form-inline mr-3 d-none d-md-flex ml-lg-auto">
        <FormGroup className="mb-0">
        <InputGroup className="input-group-alternative">
            <InputGroupAddon addonType="prepend">
            <InputGroupText>
                <i className="fas fa-search" />
            </InputGroupText>
            </InputGroupAddon>
            <Input placeholder="Search" type="text" onChange={onSearching}/>
        </InputGroup>
        </FormGroup>
    </Form> );
}