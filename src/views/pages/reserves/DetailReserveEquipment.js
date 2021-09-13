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

const DetailReserveEquipment = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");

  const { user } = useAuth();
  const [equipment, setReserveEquipment] = useState([{}]);


  const config = getToken(props);

  useEffect(() => {

    const url = props.location.pathname.split("/"); //posição 3 do array se encontra o id do equipamento
    api.get(`/reserves/equipments/${url[3]}`, config).then(response => {
      console.log(response.data);
      setReserveEquipment(response.data);
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

                equipment.starts_at = new Date(equipment.starts_at), //pegando o time stamp e transformando e data
                equipment.ends_at = new Date(equipment.ends_at),

                < Card className="bg-secondary shadow" >

                  <div className="container2 d-flex d-sm-inline-flex" >

                    {equipment.status ?
                      <div className={`card w-50 m-2 `}>
                        {/* <a href="/admin/index" className="link" > */}
                        <div className="card-body">
                          <h4 className="card-title">{equipment.equipment.name}</h4>
                          <p className="card-title">Descrição: {equipment.equipment.description}</p>
                          <p className="card-text">Solicitante: <strong>{equipment.user.name}</strong></p>
                          <p className="card-text">E-mail: <strong>{equipment.user.email}</strong></p>
                          <p className="card-text">CPF: <strong>{equipment.user.cpf}</strong></p>
                          <p className="card-text">Data: {`${equipment.starts_at.getDate()}/${equipment.starts_at.getMonth()}/${equipment.starts_at.getFullYear()}`} Horário: {equipment.starts_at.getHours()}:{equipment.starts_at.getMinutes()}</p>
                          {/* <p className="card-text">Até: {`${equipment.ends_at.getDate()}/${equipment.ends_at.getMonth()}/${equipment.ends_at.getFullYear()}`} Horário: {equipment.ends_at.getHours()}:{equipment.ends_at.getMinutes()}</p> */}
                          <p className="card-text">Status da Reserva: <strong>{(equipment.status == "accepted" ? "Aprovada" : (equipment.status == "pending" ? "Pendente" : (equipment.status == "denied" ? "Negado" : null)))}</strong></p>
                        </div>
                        {/* </a> */}
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

export default DetailReserveEquipment;
