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
    API_INVITE_STAFF
  } from "../../api/Urls";

  
  const Inviting = (props) => {
    const [staffEmail, setStaffEmail] = useState('');
    const [message, setMessage] = useState("");
    const [errorResponse, setErrorResponse] = useState(false);
    
      const inviteStaff = () => {
        let data = {email: staffEmail};
        axios
        .post(`${API_INVITE_STAFF}`, data, {headers:{Authorization: 'Token ' + localStorage.getItem('token')}})
        .then((response) => {
            setErrorResponse(false);
            setMessage(response.data.message);
        })
        .catch((error) => {
        console.log(error);
        setErrorResponse(true);
          if (error.response) {
            if (error.response.data.message){
                setMessage(error.response.data.message)
            } else{
                let errors = '';
                for (let key in error.response.data) {
                  errors = errors.concat(key, " - ", error.response.data[key][0], " ");
                }
                setMessage(errors)

            }
          } else{
            setMessage(error.message);
          }
        });
      };

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

                   <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Отослать приглашение в систему сотруднику</h3>
                  </Col> 
                  <Col className="text-right" xs="2">
                    <Button
                        color="success"
                        href="#pablo"
                        onClick={(e) => {
                            e.preventDefault();
                            inviteStaff();

                        }}
                        size="sm"
                        >
                        Отослать приглашение
                    </Button>    
                    </Col> 
                  </Row>
                    
                </CardHeader>
                <CardBody>
                  <Form>
                    <h6 className="heading-small text-muted mb-4">
                      Приглашение
                    </h6>
                    <div className="pl-lg-4">
                      <Row>
                        <Col lg="6">
                          <FormGroup check>
                            <label
                              className="form-control-label"
                              htmlFor="input-email"
                            >
                              Email сотрудника
                            </label>
                            <Input
                              className="form-control-alternative"
                              required
                              id="input-email"
                              name="email"
                              onChange={(e)=>{setStaffEmail(e.target.value)}}
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
  
  export default Inviting;
  