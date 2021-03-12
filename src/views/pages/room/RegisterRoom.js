/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
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
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";

const RegisterRoom = () => {
  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>

          <Col className="order-xl-1" xl="11">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    {/* <h3 className="mb-0">Cadastro de Usuário</h3> */}
                  </Col>

                </Row>
              </CardHeader>
              <CardBody>
                <Form>
                  <h6 className="heading-small text-muted mb-4">
                    Informações da Sala
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="8">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Nome
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            id="input-username"
                            placeholder=""
                            type="text"
                          />
                        </FormGroup>
                      </Col>



                      <Col lg="8">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            Descrição
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            id="input-username"
                            placeholder=""
                            type="text"
                          />
                        </FormGroup>
                      </Col>


                    </Row>







                    <Button className="mt-4" color="primary" type="button">
                      Cadastrar
                    </Button>

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

export default RegisterRoom;
