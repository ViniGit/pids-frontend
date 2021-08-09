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

  const [court, setCourt] = useState([]);
  const config = getToken();
  const history = useHistory();

  useEffect(() => {

    const url = props.location.pathname.split("/"); //posição 3 do array se encontra o id do equipamento

    api.get(`/sportCourts/${url[3]}`, config).then(response => {

      setCourt(response.data);
    });


  }, []);

  const validationSchema = Yup.object({

    name: Yup
      .string()
      .required("Campo Obrigatório!"),
    description: Yup
      .string()
      .required("Campo Obrigatório!")

  });

  async function handleSubmitt(values) {

    const { name } = values;
    const { description } = values;

    const court1 = {
      name: name,
      description: description
    }

    await api.put(`sportCourts/${court.id}`, court1, config)
      .then(response => {
        if (response.status == 200) {
          toast.success("Quadra alterada com sucesso!", {
            onClose: () => history.push('/admin/list-court'),
            autoClose: 2000,
          });
        }

      })
      .catch(error => {
        toast.success("Ocorreu um erro ao cadastrar a Quadra.", {
          onClose: () => { },
          autoClose: 2000,
        });
      });
  }

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      name: court.name,
      description: court.description,
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
                    Informações da Quadra
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
                            defaultValue={court.name}
                            id="course-name"
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
                            defaultValue={court.description}
                            id="course-name"
                            type="text"
                            onChange={handleChange}
                            name="description"
                          />
                        </FormGroup>
                        {errors.description ? <p className="mt-2 text-warning">{errors.description}</p> : null}

                      </Col>
                    </Row>
                    <div>
                      <Button className="mt-4" color="primary" type="submit" onClick={handleSubmit} >
                        Atualizar
                      </Button>
                      <Button className="mt-4" color="danger" type="submit" onClick={() => history.push('/admin/list-court')}>
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
