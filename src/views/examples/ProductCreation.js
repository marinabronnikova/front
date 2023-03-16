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
    API_PRODUCTS_LIST,API_CATEGORIES_LIST
  } from "../../api/Urls";
  import {useHistory } from "react-router-dom";
  
  const ProductCreatingForm = (props) => {
    const [productData, setProductData] = useState({category: null});
    const [message, setMessage] = useState("");
    const [errorResponse, setErrorResponse] = useState(false);
    const [catetories, setCatetories] = useState([]);
    const history = useHistory();

    // const updateProduct = async () => {
    //   const data = {...props.product, ...productData};
    //   const product_response = await axios.put(`${API_PRODUCTS_LIST}${props.product.id}`,data, {headers:{Authorization: 'Token ' + localStorage.getItem('token')}});
    //   setMessage("Продукт был обновлен!");
    // };

    const getCategories = async () => {
        const cat_response = await axios.get(API_CATEGORIES_LIST, {headers:{Authorization: 'Token ' + localStorage.getItem('token')}})
        console.log(cat_response);
        setCatetories(prev => cat_response.data)
      }
      useEffect(() => {
        getCategories();
      }, []);
  
    const createProduct = () => {
      axios
        .post(`${API_PRODUCTS_LIST}`, productData,  {headers:{Authorization: 'Token ' + localStorage.getItem('token')}})
        .then((response) => {
          setErrorResponse(false);
          setMessage("Продукт был создан!")
        })
        .catch((error) => {
          if (error.response) {
            let errors = '';
            if ('detail' in  error.response.data){
                errors = error.message;
            }else{
            for (let key in error.response.data) {
              errors = errors.concat(key, " - ", error.response.data[key][0], " ");
            }}
            setErrorResponse(true);
            setMessage(errors);
          } else{
            setErrorResponse(true);
            setMessage(error.message);
          }
        });
    };
  
    const onSubmit = (e) => {
        createProduct();
    }
  
  
    const handleProductChange = (e) => {
      setProductData((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
      e.persist();

      console.log(productData);
    };
    return (
      <>
        <UserHeader text="Создание продукта услуги компании..."/>
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
                      <h3 className="mb-0">Услуги и продукты</h3>
                    </Col>
                    <Col className="text-right" xs="2">
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
                    <Col className="text-right" xs="2">
                      <Button
                        color="info"
                        href="#pablo"
                        onClick={(e) => {
                          e.preventDefault();
                          history.goBack();
                        }}
                        size="sm"
                      >
                        Назад
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Данные продукта услуги
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
                              defaultValue={""}
                              id="input-username"
                              placeholder="Название"
                              type="text"
                              name="name"
                              onChange={handleProductChange}
                            />
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
                              Производитель
                            </label>
                            <Input
                              className="form-control-alternative"
                              id="input-last-name"
                              type="text"
                              placeholder="Производитель"
                              name="producer"
                              onChange={handleProductChange}
                              defaultValue={""}
                            />
                          </FormGroup>
                        </Col>
                        </Row>
                        <Row>
                        <Col lg="6">
                        <FormGroup>
                            <label
                                className="form-control-label"
                                htmlFor="input-address"
                            >
                                Категория
                            </label>
                            <Input
                                className="form-control-alternative"
                                id="input"
                                type="select"
                                onChange={event => handleProductChange(event)}
                                name="category"
                            >
                                <option
                                disabled
                                    selected>
                                        -- Выберите категорию --
                                </option>
                                {catetories.map((category) => 
                                  (
                                    <option
                                    value={category.id}
                                    key={category.id}>
                                        {category.name}
                                    </option>
                                ))}

                            </Input>
                        </FormGroup>
                    </Col>
                    </Row>
                    <Row>
                    <Col lg="6">

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
                          onChange={handleProductChange}
                          defaultValue={""}
                          type="textarea"
                          name="description"
                        />
                      </FormGroup>
                      </Col>
                    </Row>
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
  
  export default ProductCreatingForm;
  