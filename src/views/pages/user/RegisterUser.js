
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { isValidCpf } from 'functions/isValidCpf';
import '../style.css';
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



const RegisterUser = () => {


  const [selectedBond, setSelectedBond] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [roles, setRoles] = useState([]);
  const [bonds, setBonds] = useState([]);
  const [courses, setCourses] = useState([]);


  const config = getToken();

  const history = useHistory();

  useEffect(() => {
    api.get('roles', config).then(response => {
      setRoles(response.data);
    })
  }, []);

  useEffect(() => {
    api.get('bonds', config).then(response => {
      setBonds(response.data);
    })
  }, []);

  useEffect(() => {
    api.get('courses', config).then(response => {
      setCourses(response.data);
    })
  }, []);

  const notifySuccess = () => toast.success("Usuário cadastrado com sucesso!");

  const validationSchema = Yup.object({
    name: Yup
      .string()
      .required("Campo Obrigatório!"),

    cpf: Yup
      .string()
      .test('CPF valido', 'CPF inválido!', value => isValidCpf(value))
      .required("Campo Obrigatório!"),

    email: Yup
      .string()
      .email("E-mail Inválido!").required("Campo Obrigatório!"),

    password: Yup
      .string()
      .min(6, 'Senha deve possuir no mínimo 6 caracteres!')
      .required('Digite sua senha!'),

    password_confirmation: Yup
      .string()
      .min(6, 'Senha deve possuir no mínimo 6 caracteres!')
      .equals([Yup.ref('password')], 'Senhas devem ser iguais!')
      .required('Confirme sua senha!'),

    courseId: Yup
      .string()
      .required("Campo Obrigatório!"),

    bondId: Yup
      .string()
      .required("Campo Obrigatório!"),

    roleId: Yup
      .string()
      .required("Campo Obrigatório!"),

    phone: Yup
      .string()
      .required("Campo Obrigatório!"),


  });

  async function handleSubmitt(values) {
    const { name, email, cpf, password, bondId, courseId, roleId, phone } = values;

    const user = {
      name,
      email,
      cpf,
      password,
      bondId,
      courseId,
      roleId,
      phone
    }


    await api.post('users', user)
      .then(response => {
        //mensagens de sucesso no cadastro
        if (response.status == 201) {
          toast.success("Usuário cadastrado com sucesso!", {
            onClose: () => history.push('/admin/list-users'),
            autoClose: 2000,
          });
        }
      })
      .catch(error => {

        //mensagens de erro no cadastro
        if (error.response.status == 400) {
          toast.error(error.response.data.message, {
            autoClose: 4000,
          });
        }
        if (error.response.status == 500) {
          toast.error("Não foi possível realizar a ação. Ocorreu um erro interno no servidor!", {
            autoclose: 4000,
          });
        }

      });

  }

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      name: "",
      cpf: "",
      email: "",
      phone: "",
      password: "",
      password_confirmation: "",
      bondId: "",
      courseId: "",
      roleId: "",

    },
    validationSchema,

    onSubmit(values) {
      handleSubmitt(values);
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
                    Informações do Usuário
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
                            onChange={handleChange}
                            name="name"
                          />
                          {errors.name && touched.name ? <p className="mt-2 text-warning">{errors.name}</p> : null}
                        </FormGroup>
                      </Col>

                      <Col lg="8">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-username"
                          >
                            CPF
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            id="input-username"
                            placeholder=""
                            type="text"
                            onChange={handleChange}
                            name="cpf"
                          />
                          {touched.cpf && errors.cpf ? <p className="mt-2 text-warning">{errors.cpf}</p> : null}
                        </FormGroup>
                      </Col>


                      <Col lg="8">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            E-mail
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="admin@example.com"
                            type="email"
                            onChange={handleChange}
                            name="email"
                          />
                        </FormGroup>
                        {touched.email && errors.email ? <p className="mt-2 text-warning">{errors.email}</p> : null}

                      </Col>


                      <Col lg="8">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-email"
                          >
                            Telefone
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="input-email"
                            placeholder="(62) 9 9999-9999"
                            type="text"
                            onChange={handleChange}
                            name="phone"
                          />
                        </FormGroup>
                        {touched.phone && errors.phone ? <p className="mt-2 text-warning">{errors.phone}</p> : null}

                      </Col>
                    </Row>



                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Senha
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            id="input-first-name"
                            placeholder=""
                            type="password"
                            onChange={handleChange}
                            name="password"
                          />
                          {touched.password && errors.password ? <p className="mt-2 text-warning">{errors.password}</p> : null}
                        </FormGroup>
                      </Col>



                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Confirmação de senha
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            id="input-last-name"
                            placeholder=""
                            type="password"
                            onChange={handleChange}
                            name="password_confirmation"
                          />
                          {touched.password_confirmation && errors.password_confirmation ? <p className="mt-2 text-warning">{errors.password_confirmation}</p> : null}

                        </FormGroup>
                      </Col>
                    </Row>


                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Função
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            id="input-first-name"
                            placeholder=""
                            type="select"
                            onChange={handleChange}
                            name="bondId"
                          >
                            <option value="0">Selecione uma Função</option>

                            {bonds.map(bond => (
                              <option key={bond.id} value={bond.id}>{bond.name}</option>
                            ))}

                          </Input>
                          {touched.bondId && errors.bondId ? <p className="mt-2 text-warning">{errors.bondId}</p> : null}

                        </FormGroup>
                      </Col>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-last-name"
                          >
                            Curso
                          </label>
                          <Input
                            className="form-control-alternative"
                            defaultValue=""
                            id="input-last-name"
                            placeholder=""
                            type="select"
                            onChange={handleChange}
                            name="courseId"
                          >

                            <option value="0">Selecione o Curso</option>

                            {courses.map(course => (
                              <option key={course.id} value={course.id}>{course.name}</option>
                            ))}
                          </Input>
                          {touched.courseId && errors.courseId ? <p className="mt-2 text-warning">{errors.courseId}</p> : null}

                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Col lg="4">
                        <FormGroup>
                          <label
                            className="form-control-label"
                            htmlFor="input-first-name"
                          >
                            Nível de Acesso
                          </label>
                          <Input
                            className="form-control-alternative"
                            id="bond-name"
                            type="select"
                            onChange={handleChange}
                            name="roleId"
                          >
                            <option value="0">Selecione uma Função</option>

                            {roles.map(roles => (
                              <option key={roles.id} value={roles.id}>{roles.name}</option>

                            ))}

                          </Input>
                          {touched.roleId && errors.roleId ? <p className="mt-2 text-warning">{errors.roleId}</p> : null}
                        </FormGroup>
                      </Col>
                    </Row>

                    <Button className="mt-4" color="primary" type="submit" onClick={handleSubmit}>
                      Cadastrar
                    </Button>


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

export default RegisterUser;
