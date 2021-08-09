
import React from "react";

import {
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
  Col,
} from "reactstrap";

const Login = () => {
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h1>Login</h1>
            </div>
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-key-25" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="CPF"
                    type="CPF"
                    autoComplete="new-email"
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
                    placeholder="Senha"
                    type="password"
                    autoComplete="new-password"
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="primary" type="button">
                  Entrar
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3 mr-1">
          <Col className="text-right" xs="12">
            <a
              className="text-light"
              href="/auth/register"
              onClick={(e) => e.preventDefault()}
            >
              <small>Cadastrar-se</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
