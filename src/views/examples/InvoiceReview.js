import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    API_URL_INVOICE_REVIEW_LIST,
} from "../../api/Urls";
import { InvoiceRow } from './InvoicesRow'
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
  Row,Col
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { useHistory } from "react-router-dom";


const InvoiceReview = () => {
  const [invoices, setInvoices] = useState([]);
  const getInvoices = async () => {
    const invoices_response = await axios.get(API_URL_INVOICE_REVIEW_LIST, {headers:{Authorization: 'Token ' + localStorage.getItem('token')}})
    setInvoices(previosInvoices => invoices_response.data)
  }
  const history = useHistory()
  useEffect(() => {
    getInvoices();
  }, []);

  return (
    <>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Счета</h3>
                  </Col>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Организация</th>
                    <th scope="col">Cумма</th>
                    <th scope="col">Статус</th>
                    <th scope="col">Проверяющий</th>
                    <th scope="col">Тип</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                    {invoices.map((invoice) => (
                      <InvoiceRow 
                      key={invoice.id}
                      id={invoice.id}
                      total_price={invoice.total_price}
                      organization={invoice.organization.name}
                      approver={invoice.approver.user.email}
                      type={invoice.type}
                      status={invoice.status}
                      review={true}
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

export default InvoiceReview;
