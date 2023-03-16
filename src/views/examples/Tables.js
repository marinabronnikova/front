import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  API_URL_INVOICES_LIST,
  API_EXPORT_INVOICES_LIST
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
  Row,Col,Button, Input, Form, FormGroup, InputGroup, InputGroupAddon, InputGroupText
} from "reactstrap";
import {SearchingRow} from "./Serching"
// core components
import Header from "components/Headers/Header.js";
import { useHistory } from "react-router-dom";


const Tables = () => {
  const [invoices, setInvoices] = useState([]);

  const applySearching = (name) => {
      axios.get(`${API_URL_INVOICES_LIST}?search=${name}`, {headers:{Authorization: 'Token ' + localStorage.getItem('token')}}).then(
        response => setInvoices(previosInvoices => response.data));
  }

  const getInvoices = async () => {
    let invoices_response = "";
    invoices_response = await axios.get(API_URL_INVOICES_LIST, {headers:{Authorization: 'Token ' + localStorage.getItem('token')}});
    setInvoices(previosInvoices => invoices_response.data);
  }

  const downloadInvoiceReport = () =>{
    axios.request({url:API_EXPORT_INVOICES_LIST, method:"GET", responseType:'blob', headers:{Authorization: 'Token ' + localStorage.getItem('token')}})
      .then(({ data }) => {
        const downloadUrl = window.URL.createObjectURL(new Blob([data]));
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', `Отчет${new Date().toISOString().slice(0, -1)}.csv`); //any other extension
        document.body.appendChild(link);
        link.click();
        link.remove();
      });
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
                  <Col xs="2">
                    <h3 className="mb-0">Счета</h3>
                  </Col>
                  <Col xs="4">
                  <SearchingRow searching={applySearching} />
                  </Col>
                  <Col className="text-right" xs="2">
                    <Button
                      color="primary"
                      href=""
                      onClick={(e) => {
                        history.push("/admin/invoice-add");
                          }}
                      size="sm"
                    >
                      Добавить
                    </Button>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button
                      color="info"
                      href=""
                      onClick={(e) => {
                        downloadInvoiceReport();
                          }}
                      size="sm"
                    >
                      Выгрузить оплаченные счета в csv файл
                    </Button>
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

export default Tables;
