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
// core components
import UserHeader from "components/Headers/UserHeader.js";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  API_URL_ORGANIZATION_LIST,
} from "../../api/Urls";


const OrganizationForm = (props) => {
  const [organizationData, setOrganizationData] = useState({});
  const [bankData, setBankData] = useState({});
  const [message, setMessage] = useState("");
  const [errorResponse, setErrorResponse] = useState(false);


  const updateOrganization = async () => {
    let data = {...props.organizationData, ...organizationData};
    data.bank_detail = {...data.bank_detail, ...bankData};
    const organization_response = await axios.put(`${API_URL_ORGANIZATION_LIST}${props.organizationData.id}`,data, {headers:{Authorization: 'Token ' + localStorage.getItem('token')}});
    setMessage("Организация была обновлена!");
  };

  const createOrganization = () => {
    let data = {...props.organizationData, ...organizationData};
    data.bank_detail = {...data.bank_detail, ...bankData};

    axios
      .post(API_URL_ORGANIZATION_LIST, data,  {headers:{Authorization: 'Token ' + localStorage.getItem('token')}})
      .then((response) => {
        setErrorResponse(false);
        setMessage("Организация была создана!")
      })
      .catch((error) => {
        if (error.response) {
          let errors = '';
          if ('bank_detail' in error.response.data){
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
    if (Object.keys(props.organizationData).length === 0){
      createOrganization()
    } else{
    updateOrganization()
  }
  }


  const handleOrganizationChange = (e) => {
    e.persist();
    setOrganizationData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBankChange = (e) => {
    e.persist();
    setBankData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(bankData)
  };

  return (
    <>
      <UserHeader text="Создайте контрагента для вашей организации!"/>
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
                    Данные организации
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
                            defaultValue={props.organizationData.name || ""}
                            id="input-username"
                            placeholder="Название"
                            type="text"
                            name="name"
                            onChange={handleOrganizationChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Email
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="jesse@example.com"
                            type="email"
                            name="email"
                            onChange={handleOrganizationChange}
                            defaultValue={props.organizationData.email || ""}
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
                            Телефон
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-first-name"
                            type="text"
                            name="phone_number"
                            onChange={handleOrganizationChange}
                            defaultValue={props.organizationData.phone_number || ""}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Учетный номер плательщика
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-last-name"
                            placeholder="123456789"
                            type="text"
                            name="taxes_number"
                            onChange={handleOrganizationChange}
                            defaultValue={props.organizationData.taxes_number || ""}
                          />
                        </FormGroup>
                      </Col>
                      <Col lg="6">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Адрес организации
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-last-name"
                            placeholder="Minsk"
                            type="text"
                            name="address"
                            onChange={handleOrganizationChange}
                            defaultValue={props.organizationData.address || ""}
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
                        onChange={handleOrganizationChange}
                        defaultValue={props.organizationData.description || ""}
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
                            defaultValue={props.bankData.address || ""}
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
                            defaultValue={props.bankData.bank_number || ""}
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
                            defaultValue={props.bankData.settlement_account || ""}
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
                            defaultValue={props.bankData.name || ""}
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
                        defaultValue={props.bankData.details || ""}
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

export default OrganizationForm;
