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

import "../Headers/stylle.css";
// reactstrap components
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

const Header = () => {
  return (
    <>
      <div className="header bg-ueg pb-8 pt-5 pt-md-8">
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              <Col lg="6" xl="4">
                <a href="/admin/list-users">

                  <Card className="card-stats mb-4 mb-xl-0 pt-4">
                    <CardBody>

                      <Row>

                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Usuários
                        </CardTitle>
                          <span className="h2 font-weight-bold mb-0">924</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-info text-white rounded-circle shadow">
                            <i className="fas fa-users" />
                          </div>
                        </Col>
                      </Row>

                      <p className="mt-4 mb-0 text-muted text-sm">

                      </p>
                    </CardBody>
                  </Card>
                </a>

              </Col>

              <Col lg="6" xl="4">
                <a href="/admin/list-rooms">
                  <Card className="card-stats mb-4 mb-xl-0 pt-4">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Salas
                        </CardTitle>
                          <span className="h2 font-weight-bold mb-0">765</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="ni ni-shop" />
                          </div>
                        </Col>
                      </Row>

                      <p className="mt-4 mb-0 text-muted text-sm">

                      </p>
                    </CardBody>
                  </Card>
                </a>
              </Col>

              <Col lg="6" xl="4">
                <a href="/admin/list-equipments">
                  <Card className="card-stats mb-4 mb-xl-0 pt-4">
                    <CardBody>
                      <Row>
                        <div className="col">
                          <CardTitle
                            tag="h5"
                            className="text-uppercase text-muted mb-0"
                          >
                            Equipamentos
                        </CardTitle>
                          <span className="h2 font-weight-bold mb-0">254</span>
                        </div>
                        <Col className="col-auto">
                          <div className="icon icon-shape bg-warning text-white rounded-circle shadow">
                            <i className="ni ni-tablet-button" />
                          </div>
                        </Col>
                      </Row>

                      <p className="mt-4 mb-0 text-muted text-sm">

                      </p>
                    </CardBody>
                  </Card>
                </a>
              </Col>


            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
