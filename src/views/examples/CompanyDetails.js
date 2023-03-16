import React, { useState, useEffect } from "react";
import axios from "axios";
import UserHeader from "components/Headers/UserHeader.js";

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col, Alert
  } from "reactstrap";
import {
    API_COMPANY,
} from "../../api/Urls";

const CompanyDetail = () => {
    const [company, setCompany] = useState({});
    const [message, setMessage] = useState("");
    const [errorResponse, setErrorResponse] = useState(false);
    const [companyFormData, setCompanyFormData] = useState({})
    const [bankFormData, setBankFormData] = useState({})


    const getCompany = async () => {
        const company = await axios.get(`${API_COMPANY}`, {headers:{Authorization: 'Token ' + localStorage.getItem('token')}})
        setCompany(Prev => company.data[0]);
      };
    
    const updateCompany = async () => {
    let data = {...company, ...companyFormData};
    data.bank_detail = {...data.bank_detail, ...bankFormData};
    axios.put(`${API_COMPANY}${company.id}`,data, {headers:{Authorization: 'Token ' + localStorage.getItem('token')}}).then((response) => {
        setErrorResponse(false);
        setMessage("Организация была обновлена!");
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 500){
            setErrorResponse(true);
            setMessage("Что-то пошло не так(");
            return
          }
          let errors = '';
          if ('bank_detail' in error.response.data) {
            for (let key in error.response.data.bank_detail) {
            errors = errors.concat(key, " - ", error.response.data.bank_detail[key][0], " ");}
          } else{
          for (let key in error.response.data) {
            errors = errors.concat(key, " - ", error.response.data[key][0], " ");
          }
        }
          setErrorResponse(true);
          setMessage(errors);
        } else{
          setErrorResponse(true);
          setMessage(error.message);
        }
      });
    };

    const onSubmit = (e) => {
        updateCompany();
    }

    useEffect(() => {
        getCompany();
    }, [company.id]);

    const handleCompanyChange = (e) => {
        e.persist();
        setCompanyFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
      };

    const handleBankChange = (e) => {
    e.persist();
    setBankFormData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }));
    };
  
    return (    
        <>
        <UserHeader text="Обновите данные вашей организации!"/>
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
                  <Row className="align-items-center">
                    <Col xs="8">
                      <h3 className="mb-0">Организация</h3>
                    </Col>
                    <Col className="text-right" xs="4">
                      <Button
                        color="primary"
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          onSubmit();
                        }}
                        size="sm"
                      >
                        Сохранить
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Данные компании
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-username"
                            >
                              Название
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={company.name || ""}
                              id="input-username"
                              placeholder="Название"
                              type="text"
                              name="name"
                              onChange={handleCompanyChange}
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
                              Описание
                            </label>                      
                        <Input
                          className="form-control-alternative"
                          placeholder="Описание организации ..."
                          rows="4"
                          onChange={handleCompanyChange}
                          defaultValue={company.description || ""}
                          type="textarea"
                          name="description"
                        />
                      </FormGroup>
                      </div>
                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">
                      Банковский счет
                    </h6>
                    
                    <div className="pl-lg-4">
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-address"
                            >
                              Адрес
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={company.bank_detail ? company.bank_detail.address : ""}
                              id="input"
                              type="text"
                              name="address"
                              onChange={handleBankChange}
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
                              Банковский идентификационный код
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={company.bank_detail ? company.bank_detail.bank_number : ""}
                              id="bank-detail"
                              onChange={handleBankChange}
                              placeholder="123456789"
                              type="text"
                              name="bank_number"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup>
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Расчетный счет для оплаты
                            </label>
                            <Input
                              className="form-control-alternative"
                              defaultValue={company.bank_detail ? company.bank_detail.settlement_account : ""}
                              id="input-country"
                              placeholder="123456789"
                              onChange={handleBankChange}
                              type="text"
                              name="settlement_account"
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="4">
                          <FormGroup >
                            <label
                              className="form-control-label"
                              htmlFor="input-country"
                            >
                              Название
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-postal-code"
                              type="text"
                              name="name"
                              onChange={handleBankChange}
                              defaultValue={company.bank_detail ? company.bank_detail.name : ""}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </div>
                    <hr className="my-4" />
                    <h6 className="heading-small text-muted mb-4">Дополнительная информация</h6>
                    <div className="pl-lg-4">
                      <FormGroup>
                        <Input
                          className="form-control-alternative"
                          placeholder="Дополнительная информация..."
                          rows="4"
                          onChange={handleBankChange}
                          defaultValue={company.bank_detail ? company.bank_detail.details : ""}
                          type="textarea"
                          name="details"
                        />
                      </FormGroup>
                    </div>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </>
    );   
  };
  
  export default CompanyDetail;
  