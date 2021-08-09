import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../services/api';

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
import getToken from 'functions/getToken';

const UpdateRoom = (props) => {

  const [room, setRoom] = useState([]);

  useEffect(() => {

    const url = props.location.pathname.split("/"); //posição 3 do array se encontra o id do equipamento


    api.get(`rooms/${url[3]}`, config).then(response => {

      setRoom(response.data);
    });


  }, []);


  const history = useHistory();

  const config = getToken();

  const validationSchema = Yup.object({

    name: Yup
      .string()
      .required("Campo Obrigatório!"),

    type: Yup
      .string()
      .required("Campo Obrigatório!"),

    description: Yup
      .string()
      .required("Campo Obrigatório!")

  })


  async function handleSubmitt(values) {

    const { name } = values;
    const { description } = values;
    const { type } = values;

    const room1 = {
      name: name,
      description: description,
      type: type,
    }

    console.log(room1);


    await api.put(`rooms/${room.id}`, room1, config)
      .then(response => {
        if (response.status == 200) {
          toast.success("Sala alterada com sucesso!", {
            onClose: () => history.push('/admin/list-rooms'),
            autoClose: 2000,
          });
        }

      })
      .catch(error => {
        toast.error("Erro ao alterar a Sala", {
          autoClose: 2000,
        });
      });
  }

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      name: room.name,
      description: room.description,
      type: room.type,
    },

    enableReinitialize: true,


    validationSchema,
    onSubmit(values) {
      handleSubmitt(values)
    },

  })

  return (
    <>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-1" xl="11">
            <Card className="bg-secondary shadow">

              <CardBody>
                <Form onSubmit={handleSubmit}>
                  <h6 className="heading-small text-muted mb-4 pl-4">
                    Informações do Curso
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="9">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-course-name"
                          >
                            Nome
                          </label>

                          <Input
                            className="form-control-alternative"
                            defaultValue={room.name}
                            id="room-name"
                            type="text"
                            onChange={handleChange}
                            name="name"
                          />
                        </FormGroup>
                        {errors.name ? <p className="mt-2 text-warning">{errors.name}</p> : null}

                      </Col>

                      <Col lg="9">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-course-name"
                          >
                            Descrição
                          </label>

                          <Input
                            className="form-control-alternative"
                            defaultValue={room.description}
                            id="room-description"
                            type="text"
                            onChange={handleChange}
                            name="description"
                          />
                        </FormGroup>
                        {errors.description ? <p className="mt-2 text-warning">{errors.description}</p> : null}

                      </Col>

                      <Col lg="9">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-course-name"
                          >
                            Tipo
                          </label>

                          <Input
                            className="form-control-alternative"
                            defaultValue={room.type}
                            id="input-first-name"
                            placeholder=""
                            type="select"
                            onChange={handleChange}
                            name="type"
                          >
                            <option value="">Selecione uma Função</option>
                            <option selected={room.type == 'room'} value="room">Sala</option>
                            <option selected={room.type == 'laboratory'} value="laboratory">Laboratório</option>
                            <option selected={room.type == 'auditorium'} value="auditorium">Auditório</option>
                            {/* 
                            {room.type == 'laboratory' ? <option selected value="laboratory">Laboratório</option> : <option value="laboratory">Laboratório</option>}
                            {room.type == 'auditorium' ? <option selected value="auditorium">Auditório</option> : <option value="auditorium">Auditório</option>}
                            {room.type == 'room' ? <option selected value="room">Sala</option> : <option value="room">Sala</option>} */}





                          </Input>
                        </FormGroup>
                        {errors.type ? <p className="mt-2 text-warning">{errors.type}</p> : null}

                      </Col>
                    </Row>
                    <div>
                      <Button className="mt-4" color="primary" type="submit" onClick={handleSubmit} >
                        Atualizar
                      </Button>
                      <Button className="mt-4" color="danger" type="submit" onClick={() => history.push('/admin/list-rooms')}>
                        Cancelar
                      </Button>
                    </div>
                    <ToastContainer />

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

export default UpdateRoom;
