import React, { useState } from "react";
import axios from "axios";
import { API_URL_SIGNUP } from "../../api/Urls";
import { useHistory } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col
} from "reactstrap";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const [message, setMessage] = useState("");
  const history = useHistory();

  function handleSubmit(event) {

    event.preventDefault();
    let data = { email: email, password: password };
    axios
      .post(API_URL_SIGNUP, data)
      .then((response) => {
        setMessage(response.data.message)
        setShowResponse(true);
      })
      .catch((error) => {
        setShowResponse(true);
        if (error.response) {
          let errors = '';
          for (let key in error.response.data) {
            errors = errors.concat(key, " - ", error.response.data[key][0], " ");
          }
          setMessage(errors)
        } else{
          setMessage(error.message);
        }
      });
  }

  return (
    <>
      <Col lg="6" md="8">
      <Alert
          color="warning"
          isOpen={showResponse}
        >
          {message}
        </Alert>
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Создайте свою систему по управление организацией</small>
            </div>
            <Form role="form">
              <FormGroup>
                <InputGroup className="input-group-alternative mb-3">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <Row>
          <Col xs="6">
            <a
              href="/auth/login"
              className="text-light"
              onClick={
                (e) => 
                {
                  e.preventDefault();
                  history.push('/auth/login');
                }
              }
            >
              <small>Войти в аккаунт</small>
            </a>
          </Col>
        </Row>
              <div className="text-center">
                <Button className="mt-4" color="primary" type="submit" onClick={handleSubmit}>
                  Создайть аккаунт
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Register;
