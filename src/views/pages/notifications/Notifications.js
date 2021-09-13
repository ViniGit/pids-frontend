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

import Header from "components/Headers/ListHeader.js";
import getToken from '../../../functions/getToken';

import CardNotifications from 'components/card/Notifications/CardEquipments';



const Notifications = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  const { user } = useAuth();
  const [notifications, setNotifications] = useState([{}]);
  const [reserveEquipment, setReserveEquipment] = useState([]);
  const [reserveRooms, setReserveRooms] = useState([]);
  const [reserveSportCourts, setReserveSportCourts] = useState([]);
  const history = useHistory();

  const config = getToken();


  useEffect(() => {
    api.get('/messages/admin', config).then(response => {
      setNotifications(response.data);
    })
  }, []);
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

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
          NOTIFICAÇÕES
        </h4>
      </div>

      {notifications.length == 0 ?
        <div className="p-4">
          < h4 className="p-3">Não possui nenhuma Reserva Pendente!</h4>
        </div> :
        <Container className="mt--7 pt-8" fluid>
          <Row>
            <Col className="order-xl-1" xl="10">
              < Card className="bg-secondary shadow" >

                {

                  notifications.map(notification => (



                    <div className="container d-flex d-sm-inline-flex " >
                      <CardNotifications notification={notification}></CardNotifications>
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

export default Notifications;
