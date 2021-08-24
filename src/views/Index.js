import React, { useEffect, useState } from 'react';
import api from '../services/api';

import Chart from "chart.js";

import { useAuth } from "Context/AuthContext";

import "./style.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import {
  Badge,
  Card,
  CardHeader,
  CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Pagination,
  PaginationItem,
  PaginationLink,
  Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  CardBody,
  CardTitle,
  Col
} from "reactstrap";

import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/ListHeader.js";
import getToken from '../functions/getToken';

import CardSportCourts from '../components/card/sportCourts/CardSportCourts';
import CardRooms from '../components/card/Rooms/CardRooms';
import CardEquipments from '../components/card/Equipments/CardEquipments';



const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  const { user } = useAuth();
  const [reserve, setReserve] = useState({});
  const [reserveEquipment, setReserveEquipment] = useState([]);
  const [reserveRooms, setReserveRooms] = useState([]);
  const [reserveSportCourts, setReserveSportCourts] = useState([]);
  const history = useHistory();

  const config = getToken();


  useEffect(() => {
    api.get('/reserves/pending', config).then(response => {
      setReserve(response.data);
      setReserveEquipment(response.data.equipmentsReserves);
      setReserveRooms(response.data.roomsReserves);
      setReserveSportCourts(response.data.sportCourtsReserves);
      console.log(response.data);
    })
  }, []);
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }
  function redirectDetailsReserveRoom(room) {

    history.push({
      pathname: `/admin/details-reserve-room/${room.id}`,
    });

  }
  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  return (
    <>
      <Header />
      <div className="mt-4 ml-3">
        <h6 className="heading-small mb-4 pl-4">
          Solicitações de Reservas pendentes
        </h6>
      </div>

      {reserveEquipment.length == 0 && reserveRooms.length == 0 && reserveSportCourts == 0 ?
        <div className="p-4">
          < h4>Nenhuma reserva Registrada!</h4>
        </div> :
        <Container className="mt--7 pt-8" fluid>
          <Row>
            <Col className="order-xl-1" xl="10">
              {

                reserveSportCourts.map(sportCourts => (
                  sportCourts.starts_at = new Date(sportCourts.starts_at), //pegando o time stamp e transformando e data
                  sportCourts.ends_at = new Date(sportCourts.ends_at),

                  <Card className="bg-secondary shadow">
                    <div className="container d-flex d-sm-inline-flex " >

                      {sportCourts.status ?
                        <CardSportCourts sportCourts={sportCourts}></CardSportCourts>
                        :
                        null}


                    </div>
                  </Card>
                ))}

              {reserveRooms.map(room => (

                room.starts_at = new Date(room.starts_at), //pegando o time stamp e transformando e data
                room.ends_at = new Date(room.ends_at),
                <Card className="bg-secondary shadow">

                  <div className="container d-flex d-sm-inline-flex" onClick={() => redirectDetailsReserveRoom(room)}>

                    {room.status ?
                      <CardRooms room={room}></CardRooms>
                      :
                      null}

                  </div>

                </Card>
              ))}

              {reserveEquipment.map(equipments => (
                equipments.starts_at = new Date(equipments.starts_at), //pegando o time stamp e transformando e data
                equipments.ends_at = new Date(equipments.ends_at),
                <Card className="bg-secondary shadow">

                  <div className="container d-flex d-sm-inline-flex ">

                    {equipments.status ?
                      <CardEquipments equipments={equipments}></CardEquipments>
                      :
                      null}
                  </div>
                </Card>
              ))}

            </Col>
          </Row>

        </Container>
      }


      {/* 
      <Container className="mt--7" fluid>

        <div className="d-flex ">
          <a href="/admin/index">

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

              </CardBody>
            </Card>


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
              </CardBody>
            </Card>

          </a>
        </div>

      </Container> */}

    </>
  );
};

export default Index;
