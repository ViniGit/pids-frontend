import React, { useEffect, useState } from 'react';
import api from '../../../services/api';

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

import Header from "../../../components/Headers/ListHeader.js";
import getToken from '../../../functions/getToken';
import { date } from 'yup/lib/locale';
import CardSportCourts from '../../../components/card/sportCourts/CardSportCourts';
import CardRooms from '../../../components/card/Rooms/CardRooms';
import CardEquipments from '../../../components/card/Equipments/CardEquipments';

const Index = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  const { user } = useAuth();
  const [reserves, setReserves] = useState([{}]);
  const [reserveEquipment, setReserveEquipment] = useState([{}]);
  const [reserveRooms, setReserveRooms] = useState([{}]);
  const [reserveSportCourts, setReserveSportCourts] = useState([{}]);
  const history = useHistory();

  const config = getToken();

  useEffect(() => {
    api.get('/reserves', config).then(response => {
      console.log(response.data);
      setReserves(response.data);
    })
  }, []);

  function redirectDetailsReserveSportCourt(sportCourt) {

    history.push({
      pathname: `/admin/details-reserve-sport-court/${sportCourt.id}`,
    });

  }

  function redirectDetailsReserveEquipment(equipment) {

    history.push({
      pathname: `/admin/details-reserve-equipment/${equipment.id}`,
    });

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
        <h4 className=" mb-4 pl-4">
          SOLICITA????ES DE RESERVAS
        </h4>
      </div>
      {reserves.length == 0 ?
        <div className="p-4">
          < h4 className="p-3">Nenhuma reserva Registrada!</h4>
        </div> :
        <Container className="mt--7 pt-8" fluid>
          <Row>
            <Col className="order-xl-1" xl="10">
              < Card className="bg-secondary shadow" >

                {
                  reserves.map(reserve => (

                    <div>
                      {
                        reserve.sport_court ?
                          <div className="container d-flex d-sm-inline-flex " onClick={() => redirectDetailsReserveSportCourt(reserve)}>
                            <CardSportCourts reserve={reserve}></CardSportCourts>
                          </div>

                          :
                          null
                      }


                      {
                        reserve.room ?
                          <div className="container d-flex d-sm-inline-flex " onClick={() => redirectDetailsReserveRoom(reserve)}>
                            <CardRooms reserve={reserve}></CardRooms>
                          </div>

                          :
                          null
                      }


                      {
                        reserve.equipment ?
                          <div className="container d-flex d-sm-inline-flex " onClick={() => redirectDetailsReserveEquipment(reserve)}>
                            <CardEquipments reserve={reserve}></CardEquipments>
                          </div>

                          :
                          null
                      }
                    </div>

                  ))}
              </Card>

            </Col>
          </Row>

        </Container>
      }

    </>
  );
};

export default Index;
