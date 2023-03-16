import {
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col, Alert, Button
  } from "reactstrap";
  // core components
  import UserHeader from "components/Headers/UserHeader.js";
  import React, { useState, useEffect } from "react";
  import axios from "axios";
  import {
    API_URL_INVOICE_LIST,
  } from "../../api/Urls";
  import { useParams } from "react-router-dom";

  
  const InvoiceDetails = (props) => {
    const [invoiceData, setInvoiceData] = useState({});
    const [message, setMessage] = useState("");
    const [errorResponse, setErrorResponse] = useState(false);
    
    let { id } = useParams();
    
    const getInvoice = async () => {
        const invoice_response = await axios.get(`${API_URL_INVOICE_LIST}${id}`, {headers:{Authorization: 'Token ' + localStorage.getItem('token')}})
        setInvoiceData(Previnvoice => invoice_response.data);
      };
    
      const changeStatus = (invoice_status) => {
        let data = {status: invoice_status};
        axios
        .post(`${API_URL_INVOICE_LIST}${id}/change-status`, data, {headers:{Authorization: 'Token ' + localStorage.getItem('token')}})
        .then((response) => {
            setMessage(response.data.status);
            getInvoice();
        })
        .catch((error) => {
        console.log(error);
        setErrorResponse(true);
          if (error.response) {
            setMessage(error.response.data.message)
          } else{
            setMessage(error.message);
          }
        });
      };

      const sendEmailCustomer = () => {
        axios
        .post(`${API_URL_INVOICE_LIST}${id}/send-customer-invoice`,{} ,{headers:{Authorization: 'Token ' + localStorage.getItem('token')}})
        .then((response) => {
          setErrorResponse(false);
            setMessage(response.data.message);
        })
        .catch((error) => {
        console.log(error);
        setErrorResponse(true);
          if (error.response) {
            setMessage(error.response.data.message)
          } else{
            setMessage(error.message);
          }
        });
      };

    useEffect(() => {
        getInvoice();
    }, [invoiceData.id]);
    if (Object.keys(invoiceData).length === 0){
        return null
    }
    return (
      <>
        <UserHeader />
        <Container className="mt--8" fluid>
        <Alert
            color={errorResponse ? "warning": "success" }
            isOpen={Boolean(message)}
          >
            {message}
          </Alert>
          <Row>
            <Col className="order-xl-1" xxl="8">
              <Card className="bg-secondary shadow">
                <CardHeader className="bg-white border-0">

                    {invoiceData.status === "Выставлен" ? 
                    (
                      <Row className="align-items-center">
                      <Col xs="6">
                        <h3 className="mb-0">Счет #{invoiceData.id}</h3>
                      </Col>
                      {invoiceData.type === "Поступление" && (
                      <Col className="text-right" xs="2">
                    <Button
                        color="info"
                        href="#pablo"
                        onClick={(e) => {
                            e.preventDefault();
                            sendEmailCustomer("Отменен");
                        }}
                        size="sm"
                        >
                        Уведомить заказчика об оплате счета
                    </Button>    
                    </Col>)}

                      <Col className="text-right" xs="2">
                    <Button
                        color="warning"
                        href="#pablo"
                        onClick={(e) => {
                            e.preventDefault();
                            changeStatus("Отменен");
                        }}
                        size="sm"
                        >
                        Отменить
                    </Button>    
                    </Col>
                    <Col className="text-right" xs="2">
                    <Button
                        color="success"
                        href="#pablo"
                        onClick={(e) => {
                            e.preventDefault();
                            changeStatus("Оплачен")

                        }}
                        size="sm"
                        >
                        Пометить как оплачен
                    </Button>    
                    </Col> 
                    </Row>
                  ) : (<Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Счет #{invoiceData.id}</h3>
                  </Col> </Row>)
                    }
                    
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Cчет
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Тип
                            </label>
                            <Input
                              disabled
                              className="form-control-alternative"
                              value={invoiceData.type}
                              id="input-username"
                              type="text"
                              name="type"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Статус
                            </label>
                            <Input
                              disabled
                              className="form-control-alternative"
                              id="input-email"
                              name="status"
                              value={invoiceData.status}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-first-name"
                            >
                              Создано
                            </label>
                            <Input
                                disabled
                              className="form-control-alternative"
                              id="input-first-name"
                              type="datetime-local"
                              name="created_at"
                              value={invoiceData.created_at.slice(0, invoiceData.created_at.lastIndexOf(":"))}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Оплатить до
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-last-name"
                              type="datetime-local"
                              name="pay_to"
                              value={invoiceData.pay_to.slice(0, invoiceData.pay_to.lastIndexOf(":"))}
                              disabled
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-last-name"
                            >
                              Название организации
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-last-name"
                              type="text"
                              name="organization_name"
                              disabled
                              value={invoiceData.organization.name}

                                                          />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <div className="pl-lg-4">
                      <FormGroup>
                      <label
                              className="form-control-label"
                              htmlFor="input-description"
                            >
                              Проверяющий
                            </label>                      
                        <Input
                          className="form-control-alternative"
                          rows="4"
                          type="text"
                          name="approver"
                          disabled
                          value={`${invoiceData.approver.user.email}, должность - ${invoiceData.approver.position}`}

                        />
                      </FormGroup>
                      </div>
                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                      Продукты и услуги
                    </h6>
                    {invoiceData.payment_items.map((payment) => (
                    <div key={payment.id} className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Продукт
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input"
                              type="text"
                              disabled
                              value={`${payment.product.name}, категория - ${payment.product.category.name}`}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              Цена
                            </label>
                            <Input
                              disabled
                              className="form-control-alternative"
                              id="bank-detail"
                              type="text"
                              name="price"
                              value={`${payment.price}`}

                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-city"
                            >
                              Количество
                            </label>
                            <Input
                              disabled
                              className="form-control-alternative"
                              id="bank-detail"
                              type="text"
                              name="amount"
                              value={`${payment.amount}`}

                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    ))
                }
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );
  };
  
  export default InvoiceDetails;
  