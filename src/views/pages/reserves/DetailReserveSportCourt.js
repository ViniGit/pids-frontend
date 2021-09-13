import React, { useEffect, useState } from 'react';
import api from '../../../services/api';


import { useAuth } from "Context/AuthContext";

import "./style.css";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
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

const DetailReserveSportCourt = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  const { user } = useAuth();
  const [reserve, setReserve] = useState({});
  const [reserveEquipment, setReserveEquipment] = useState([{}]);
  const [room, setroom] = useState([{}]);
  const [sportCourts, setSportCourt] = useState([{}]);


  const config = getToken(props);

  useEffect(() => {

    const url = props.location.pathname.split("/"); //posição 3 do array se encontra o id do equipamento
    api.get(`/reserves/sportcourts/${url[3]}`, config).then(response => {
      console.log(response.data);
      setSportCourt(response.data);
    })
  }, []);



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

                sportCourts.starts_at = new Date(sportCourts.starts_at), //pegando o time stamp e transformando e data
                sportCourts.ends_at = new Date(sportCourts.ends_at),

                < Card className="bg-secondary shadow" >

                  <div className="container2 d-flex d-sm-inline-flex" >

                    {sportCourts.status ?
                      <div className={`card w-50 m-2 `}>
                        {/* <a href="/admin/index" className="link" > */}
                        <div className="card-body">
                          <h4 className="card-title">{sportCourts.sport_court.name}</h4>
                          <p className="card-title">Descrição: {sportCourts.sport_court.description}</p>
                          <p className="card-text">Solicitante: <strong>{sportCourts.user.name}</strong></p>
                          <p className="card-text">E-mail: <strong>{sportCourts.user.email}</strong></p>
                          <p className="card-text">CPF: <strong>{sportCourts.user.cpf}</strong></p>
                          <p className="card-text">Data: {`${sportCourts.starts_at.getDate()}/${sportCourts.starts_at.getMonth()}/${sportCourts.starts_at.getFullYear()}`} Horário: {sportCourts.starts_at.getHours()}:{sportCourts.starts_at.getMinutes()}</p>
                          {/* <p className="card-text">Até: {`${sportCourts.ends_at.getDate()}/${sportCourts.ends_at.getMonth()}/${sportCourts.ends_at.getFullYear()}`} Horário: {sportCourts.ends_at.getHours()}:{sportCourts.ends_at.getMinutes()}</p> */}
                          <p className="card-text">Status da Reserva: <strong>{(sportCourts.status == "accepted" ? "Aprovada" : (sportCourts.status == "pending" ? "Pendente" : (sportCourts.status == "denied" ? "Negado" : null)))}</strong></p>
                        </div>
                        {/* </a> */}
                      </div>
                      :
                      null}
                  </div>

                </Card>
              }

              {/* {sportCourts.status == "pending" ?
                <div>

                  <Button className="mt-4" color="primary" type="submit" >
                    Atualizar
                  </Button>


                  <Button className="mt-4" color="danger" type="submit" >
                    Cancelar
                  </Button>
                </div> :

                null

              } */}



              {/* {reserveRooms.map(room => (

                room.starts_at = new Date(room.starts_at), //pegando o time stamp e transformando e data
                room.ends_at = new Date(room.ends_at),
                <Card className="bg-secondary shadow">

                  <div className="container d-flex d-sm-inline-flex ">

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
              ))} */}





            </Col>
          </Row>





        </Container>
      }

    </>
  );
};

export default DetailReserveSportCourt;
