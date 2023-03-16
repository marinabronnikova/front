// import {
//   Button,
//   Form,
//   Alert
// } from "react-bootstrap";
// import React, { useState } from "react";
// // import "../styles/views/Login.css";
// import axios from "axios";
// import { API_URL_LOGIN } from "../../api/Urls";
// import { useHistory } from "react-router-dom";

// export default function Login() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showError, setShowError] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");
//   const history = useHistory();

//   function validateForm() {
//     return username.length > 0 && password.length > 0;
//   }

//   function handleSubmit(event) {

//     event.preventDefault();
//     let data = { username: username, password: password };
//     axios
//       .post(API_URL_LOGIN, data)
//       .then((response) => {
//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem("logged_in", true);
//         localStorage.setItem("username", username);
//         localStorage.setItem("is_superuser", response.data.user.is_superuser);
//         history.push('/admin/cakes');
//       })
//       .catch((error) => {
//         console.log(error);
//         setShowError(true);
//         if (error.response) {
//           for (let key in error.response.data) {
//             setErrorMessage(error.response.data[key][0]);
//           }
//         }
//         console.log(errorMessage);
//       });
//   }

//   return (
//     <div className="Login">
//       <Form onSubmit={handleSubmit}>
//         <Form.Group size="lg" controlId="username">
//           <Form.Label>Имя</Form.Label>
//           <Form.Control
//             autoFocus
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           />
//         </Form.Group>
//         <Form.Group size="lg" controlId="password">
//           <Form.Label>Пароль</Form.Label>
//           <Form.Control
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//         </Form.Group>

//         <Alert
//           variant="warning"
//           style={{ display: showError ? "block" : "none" }}
//         >
//           {errorMessage}
//         </Alert>
//         <Button
//           block="true"
//           variant="primary"
//           size="lg"
//           type="submit"
//           disabled={!validateForm()}
//         >
//           Вход
//         </Button>
//       </Form>
//     </div>
//   );
// }
import React, { useState } from "react";
import axios from "axios";
import { API_URL_LOGIN } from "../../api/Urls";
import { useHistory } from "react-router-dom";
import {
  Alert,
  Button,
  Card,
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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {

    event.preventDefault();
    let data = { email: email, password: password };
    axios
      .post(API_URL_LOGIN, data)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.user.email);
        history.push('/admin/index');
      })
      .catch((error) => {
        setShowError(true);
        if (error.response) {
          let errors = '';
          for (let key in error.response.data) {
            errors = errors.concat(key, " - ", error.response.data[key][0], " ");
          }
          setErrorMessage(errors)
        } else{
          setErrorMessage(error.message);
        }
      });
  }
  return (
    <>
      <Col lg="5" md="7">
      <Alert
          color="warning"
          isOpen={showError}
        >
          {errorMessage}
        </Alert>
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Логин</small>
            </div>
            <Form className="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
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
                    onChange={(e) => {
                      console.log(e.target.value);
                      setEmail(e.target.value);
                    }

                    }
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
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit" onClick={handleSubmit} >
                 Войти
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row>
          <Col xs="6">
            <a
              className="text-light"
              onClick={
                (e) => 
                {
                  e.preventDefault();
                  history.push('/auth/register');
                }
              }
            >
              <small>Создайте свою организацию</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
