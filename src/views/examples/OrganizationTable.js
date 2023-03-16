import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    API_URL_ORGANIZATION_LIST,
} from "../../api/Urls";
import { OrganizationRow } from './OrganizationsRow'
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,Button,Col
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useHistory } from "react-router-dom";
import { SearchingRow } from "./Serching";

const OrganizationTable = () => {
  const [organizations, setOrganizations] = useState([]);
  
  const applySearching = (name) => {
    axios.get(`${API_URL_ORGANIZATION_LIST}?search=${name}`, {headers:{Authorization: 'Token ' + localStorage.getItem('token')}}).then(
      response => setOrganizations(prev => response.data));
}

  const getOrganization = async () => {
    const organizations = await axios.get(API_URL_ORGANIZATION_LIST, {headers:{Authorization: 'Token ' + localStorage.getItem('token')}})
    setOrganizations(prev => organizations.data)
  }

  useEffect(() => {
    getOrganization();
  }, []);
  const history = useHistory()

  return (
    <>
      <Header />
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
              <Row className="align-items-center">
                  <Col xs="4">
                    <h3 className="mb-0">Организация</h3>
                  </Col>
                  <Col xs="4">
                    <SearchingRow searching={applySearching} />
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href=""
                      onClick={(e) => {
                        history.push("/admin/organization-add");
                          }}
                      size="sm"
                    >
                      Добавить
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Название</th>
                    <th scope="col">Номер телефона</th>
                    <th scope="col">Описание</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                    {organizations.map((organization) => (

                      <OrganizationRow 
                      key={organization.id}
                      id={organization.id}
                      name={organization.name}
                      phone_number={organization.phone_number}
                      description={organization.description}
                      />

                    ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};

export default OrganizationTable;
