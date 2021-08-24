import React, { useEffect, useState } from 'react';
import api from '../../../services/api';


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
import CardRooms from '../../../components/card/Rooms/CardRooms';

const DetailReserveRoom = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  const [room, setRoom] = useState([{}]);
  const [equipment, setReserveEquipment] = useState([{}]);
  const history = useHistory();


  const config = getToken();

  useEffect(() => {

    const url = props.location.pathname.split("/"); //posição 3 do array se encontra o id do equipamento
    api.get(`/reserves/rooms/${url[3]}`, config).then(response => {
      setRoom(response.data);
    })
  }, []);

  function acceptReserve(reserve) {
    console.log('config');
    console.log(config);
    api.put(`/reserves/${reserve.id}/accept`, {}, config).then(response => {
      console.log(response.data);
      history.push('/admin/index')
    })

  }

  function denyReserve(reserve) {

    api.put(`/reserves/${reserve.id}/deny`, {}, config).then(response => {
      console.log(response.data);
    })


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
          Dados da Reserva
        </h6>
      </div>
      {
        <Container className="mt--7 pt-8" fluid>
          <Row>
            <Col className="order-xl-1" xl="10">
              {
                room.starts_at = new Date(room.starts_at), //pegando o time stamp e transformando e data
                room.ends_at = new Date(room.ends_at),

                < Card className="bg-secondary shadow" >

                  <div className="container d-flex d-sm-inline-flex" >

                    {room.status ?
                      <div className={`card w-50 m-2 `}>
                        {/* <a href="/admin/index" className="link" > */}
                        <div className="card-body">
                          <h4 className="card-title">{room.room.name}</h4>
                          <p className="card-text">Tipo da sala: <strong>{(room.room.type == "lab" ? "Laboratório" : (room.room.type == "auditorium" ? "Auditório" : (room.type == "room" ? "Sala" : null)))}</strong></p>
                          <p className="card-title">Descrição: {room.room.description}</p>
                          <p className="card-text">Solicitante: <strong>{room.user.name}</strong></p>
                          <p className="card-text">E-mail: <strong>{room.user.email}</strong></p>
                          <p className="card-text">CPF: <strong>{room.user.cpf}</strong></p>
                          <p className="card-text">De: {`${room.starts_at.getDate()}/${room.starts_at.getMonth()}/${room.starts_at.getFullYear()}`} Horário: {room.starts_at.getHours()}:{room.starts_at.getMinutes()}</p>
                          <p className="card-text">Até: {`${room.ends_at.getDate()}/${room.ends_at.getMonth()}/${room.ends_at.getFullYear()}`} Horário: {room.ends_at.getHours()}:{room.ends_at.getMinutes()}</p>
                          <p className="card-text">Status da Reserva: <strong>{(room.status == "accepted" ? "Aprovada" : (room.status == "pending" ? "Pendente" : (room.status == "denied" ? "Negado" : null)))}</strong></p>
                        </div>
                        {/* </a> */}

                        {room.room.type == "lab" && room.status == "pending" ?
                          <div className="p-4">
                            <div>
                              <Button className="mt-4" color="primary" onClick={() => acceptReserve(room)} >
                                Aprovar
                              </Button>
                              <Button className="mt-4" color="danger" onClick={() => denyReserve(room)}>
                                Negar
                              </Button>
                            </div>
                          </div>
                          :
                          null}
                      </div>
                      :
                      null}
                  </div>

                </Card>
              }


            </Col>
          </Row>

        </Container>
      }

    </>
  );
};

export default DetailReserveRoom;
