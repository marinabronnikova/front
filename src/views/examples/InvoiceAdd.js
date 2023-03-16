import {
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Container,
    Row,
    Col, Alert,Button
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    API_URL_INVOICE_LIST,
    API_URL_ORGANIZATION_LIST,
    API_URL_PRODUCTS_LIST,
    API_URL_STAFF_LIST
} from "../../api/Urls";
import { useParams } from "react-router-dom";


const InvoiceAdding = (props) => {
    const [mainForm, setMainForm] = useState({type:"Поступление", pay_to:new Date().toISOString().slice(0, -1)});
    const [message, setMessage] = useState("");
    const [errorResponse, setErrorResponse] = useState(false);
    const [organizations, setOrganizations] = useState([]);
    const [products, setProducts] = useState([]);
    const [employees, setEmployees] = useState([]);

    const [organization, setOrganizationID] = useState("");
    const [approver, setApproverID] = useState("");



    const [formProductFields, setFormProductFields] = useState([
        { product_id: '', amount: '', price: '' },
      ])
    
    const handleFormProductChange = (event, index) => {
    let data = [...formProductFields];
    data[index][event.target.name] = event.target.value;
    setFormProductFields(data);
    console.log(formProductFields);
    }

    const addProductFields = () => {
        let obj = { product_id: '', amount: '', price: '' };
        setFormProductFields([...formProductFields, obj]);
        console.log(formProductFields);
      }


    const getOrganization = async () => {
        const organizations = await axios.get(API_URL_ORGANIZATION_LIST, { headers: { Authorization: 'Token ' + localStorage.getItem('token') } })
        setOrganizations(previosInvoices => organizations.data);
    }

    const getProducts = async () => {
        const products = await axios.get(API_URL_PRODUCTS_LIST, { headers: { Authorization: 'Token ' + localStorage.getItem('token') } })
        setProducts(previosProducts => products.data);
    }

    const getApprovers = async () => {
        const employees = await axios.get(API_URL_STAFF_LIST, { headers: { Authorization: 'Token ' + localStorage.getItem('token') } })
        setEmployees(previosEmployees => employees.data);
    }

    const handleChange = (e) => {
        e.persist();
        setMainForm((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }));
        console.log(mainForm);
      };

    useEffect(() => {
        getOrganization();
        getProducts();
        getApprovers();
    }, []);
    const onSubmit = () => {
        let data = {...mainForm, organization: organization, approver: approver, payment_items: formProductFields};
        for (let payment of formProductFields){
            if (payment.amount<=0 || payment.price<=0){
                setErrorResponse(true);
                setMessage("Проверьте количество продуктов и их цену!");
                return
            }
        }
        axios
          .post(API_URL_INVOICE_LIST, data,  {headers:{Authorization: 'Token ' + localStorage.getItem('token')}})
          .then((response) => {
            setErrorResponse(false);
            setMessage("Счет был создан!")
          })
          .catch((error) => {
            if (error.response) {
              let errors = '';
              for (let key in error.response.data) {
                errors = errors.concat(key, " - ", error.response.data[key][0], " ");
              }
              setErrorResponse(true);
              setMessage(errors);
            } else{
              setErrorResponse(true);
              setMessage("Проверьте корректность данных в форме!");
            }
          });
    }

    // if (Object.keys(invoiceData).length === 0){
    //     return null
    // }
    return (
        <>
            <UserHeader />
            <Container className="mt--8" fluid>
                <Alert
                    color={errorResponse ? "warning" : "success"}
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
                                        <h3 className="mb-0">Новый счет </h3>
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
                                                        className="form-control-alternative"
                                                        id="input-username"
                                                        type="select"
                                                        name="type"
                                                        onChange={handleChange}
                                                        >
                                                        <option disabled selected value> -- Выберите тип -- </option>

                                                        <option>
                                                            Поступление
                                                        </option>
                                                        <option>
                                                            Расходы
                                                        </option>
                                                    </Input>

                                                </FormGroup>
                                            </Col>
                                        </Row>
                                        <Row>
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
                                                        onChange={handleChange}
                                                    />
                                                </FormGroup>
                                            </Col>
                                            <Col>
                                                <FormGroup>
                                                    <label
                                                        className="form-control-label"
                                                        htmlFor="input-last-name"
                                                    >
                                                        Организация, которой или которая выставляет счет
                                                    </label>
                                                    <Input
                                                        className="form-control-alternative"
                                                        id="input-last-name"
                                                        type="select"
                                                        name="organization_id"
                                                        onChange={event => setOrganizationID(event.target.value)}
                                                        >
                                                        <option disabled selected value> -- Выберите организацию -- </option>

                                                        {organizations.map((organization) => (
                                                            <option 
                                                            value={organization.id}
                                                            key={organization.id}>
                                                                {organization.name}
                                                            </option>
                                                        ))}
                                                    </Input>
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
                                                type="select"
                                                name="approver_id"
                                                onChange={event => setApproverID(event.target.value)}
                                            >
                                                <option disabled selected value> -- Выберите проверяющего -- </option>
                                                {employees.map((employee) => (
                                                    <option 
                                                    value={employee.id}
                                                    key={employee.id}>
                                                        {`${employee.user.email}-${employee.position}`}
                                                    
                                                    </option>
                                                ))}
                                            </Input>
                                        </FormGroup>
                                    </div>
                                    <hr className="my-4" />
                                    <h6 className="heading-small text-muted mb-4">
                                        Продукты и услуги
                                    </h6>
                                    {
                                        formProductFields.map((payment, index) => (
                                            <div key={index} className="pl-lg-4">
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
                                                                type="select"
                                                                onChange={event => handleFormProductChange(event, index)}
                                                                name="product_id"
                                                            >
                                                                <option disabled selected value> -- Выберите продукт, услугу -- </option>

                                                                {products.map((product) => (
                                                                    <option 
                                                                    value={product.id}
                                                                    key={product.id}>
                                                                        {product.name}
                                                                    </option>
                                                                ))}

                                                            </Input>
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
                                                                className="form-control-alternative"
                                                                id="bank-detail"
                                                                type="number"
                                                                required
                                                                min="0"
                                                                name="price"
                                                                onChange={event => handleFormProductChange(event, index)}
                                                                value={payment.price}
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
                                                                className="form-control-alternative"
                                                                id="bank-detail"
                                                                type="number"
                                                                required
                                                                min="0"
                                                                name="amount"
                                                                onChange={event => handleFormProductChange(event, index)}
                                                                value={payment.amount}
                                                            />
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                            </div>
                                        ))
                                    }
                                </Form>
                    <Row className="align-items-center">

                  <Col className="text-right" xs="4">
                    <Button
                      color="primary"
                      href=""
                      onClick={(e) => {
                        addProductFields()
                          }}
                      size="sm"
                    >
                      Добавить
                    </Button>
                  </Col>
                </Row>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}; 
export default InvoiceAdding;
