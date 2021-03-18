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

const UpdateUser = (props) => {

  useEffect(() => {
    // console.log("PROPIS");
    // console.log(typeof(props.location.userData.course[0].id));
  })

  const [selectedBond, setSelectedBond] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState([]);
  const [roles, setRoles] = useState([]);
  const [bonds, setBonds] = useState([]);
  const [courses, setCourses] = useState([]);


  const history = useHistory();

  useEffect(() => {
    api.get('roles').then(response => {
      setRoles(response.data);
    })
  }, []);

  useEffect(() => {
    api.get('bonds').then(response => {
      setBonds(response.data);
    })
  }, []);

  useEffect(() => {
    api.get('courses').then(response => {
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
      .test('cpf valido', 'Cpf Não é válido', value => isValidCpf(value))
      .required("Campo Obrigatório!"),

    email: Yup
      .string()
      .email("E-mail Inválido!").required("Campo Obrigatório!"),

    password: Yup
      .string()
      .min(6, 'Senha deve possuir no mínimo 6 caracteres!')
      .notRequired(),

    password_confirmation: Yup
      .string()
      .min(6, 'Senha deve possuir no mínimo 6 caracteres!')
      .equals([Yup.ref('password')], 'Senhas devem ser iguais!')
      .notRequired(),

      course_id: Yup
      .string()
      .required("Campo Obrigatório!"),

    bond_id: Yup
      .string()
      .required("Campo Obrigatório!"),

    phone: Yup
      .string()
      .required("Campo Obrigatório!"),
      
      role_id: Yup
      .string()
      .required("Campo Obrigatório!"),


  });

  async function handleSubmitt(values) {
    const { name, email, cpf, password, bond_id, course_id, phone, role_id } = values;

    const user = {
      name,
      email,
      cpf,
      password,
      bond_id: parseInt(bond_id),
      course_id: parseInt(course_id),
      role_id: parseInt(role_id),
      phone
    }


    await api.put(`users/${props.location.userData.id}`, user)
      .then(response => {
        if (response.status == 200) {
          toast.success("Atualização realizada com sucesso!", {
            onClose: () => history.push('/admin/list-users'),
            autoClose: 2000,
          });
        }

      })
      .catch(errors => {
        console.log(errors);
        // if (errors == 400) {
        //   toast.success("Erro ao criar usuário!", {
        //     autoClose: 3000,
        //   });
        // }
      });

  }

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: {
      name: props.location.userData.name,
      cpf: props.location.userData.cpf,
      email: props.location.userData.email,
      phone: props.location.userData.phone,
      password: "",
      password_confirmation: "",
      bond_id: parseInt(props.location.userData.bonds.id),
      course_id: parseInt(props.location.userData.courses[0].id),
      role_id: parseInt(props.location.userData.roles.id),

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
                            defaultValue={props.location.userData.name}
                            id="input-username"
                            placeholder=""
                            type="text"
                            onChange={handleChange}
                            name="name"
                          />
                          {errors.name ? <p className="mt-2 text-warning">{errors.name}</p> : null}
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
                            defaultValue={props.location.userData.cpf}
                            id="input-username"
                            placeholder=""
                            type="text"
                            onChange={handleChange}
                            name="cpf"
                          />
                          {errors.cpf ? <p className="mt-2 text-warning">{errors.cpf}</p> : null}
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
                            defaultValue={props.location.userData.email}
                            id="input-email"
                            placeholder="admin@example.com"
                            type="email"
                            onChange={handleChange}
                            name="email"
                          />
                        </FormGroup>
                        {errors.email ? <p className="mt-2 text-warning">{errors.email}</p> : null}

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
                            defaultValue={props.location.userData.phone}
                            id="input-email"
                            placeholder="(62) 9 9999-9999"
                            type="text"
                            onChange={handleChange}
                            name="phone"
                          />
                        </FormGroup>
                        {errors.phone ? <p className="mt-2 text-warning">{errors.phone}</p> : null}

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
                            id="password"
                            placeholder=""
                            type="password"
                            onChange={handleChange}
                            name="password"
                          />
                          {errors.password ? <p className="mt-2 text-warning">{errors.password}</p> : null}
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
                            id="password-confirmation"
                            placeholder=""
                            type="password"
                            onChange={handleChange}
                            name="password_confirmation"
                          />
                          {errors.password_confirmation ? <p className="mt-2 text-warning">{errors.password_confirmation}</p> : null}

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
                            id="bond"
                            type="select"
                            onChange={handleChange}
                            name="bond_id"
                          >
                            <option value="0">Selecione uma Função</option>

                            {bonds.map(bond => (
                              bond.id === props.location.userData.bond_id ? <option key={bond.id} selected value={parseInt(bond.id)}>{bond.name}</option>:<option key={bond.id} value={parseInt(bond.id)}>{bond.name}</option>
                            ))}

                          </Input>
                          {errors.bond_id ? <p className="mt-2 text-warning">{errors.bond_id}</p> : null}

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
                            id="course"
                            type="select"
                            onChange={handleChange}
                            name="course_id"
                          >

                            <option value="0">Selecione o Curso</option>

                            {courses.map(course => (
                              course.id === props.location.userData.courses[0].id ? <option key={course.id} selected value={course.id}>{course.name}</option>:<option key={course.id} value={course.id}>{course.name}</option>

                            ))}
                          </Input>
                          {errors.course_id ? <p className="mt-2 text-warning">{errors.course_id}</p> : null}

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
                            id="role"
                            type="select"
                            onChange={handleChange}
                            name="role_id"
                          >
                            <option value="0">Selecione uma Função</option>

                            {roles.map(roles => (
                              roles.id === props.location.userData.role_id ? <option key={roles.id} selected value={parseInt(roles.id)}>{roles.name}</option>:<option key={roles.id} value={parseInt(roles.id)}>{roles.name}</option>
                            ))}

                          </Input>
                          {errors.role_id ? <p className="mt-2 text-warning">{errors.role_id}</p> : null}
                        </FormGroup>
                      </Col>        
                   </Row>


                  <div>       

                    <Button className="mt-4" color="primary" type="submit" onClick={handleSubmit}>
                      Atualizar
                    </Button>

                    
                    <Button className="mt-4" color="danger" type="submit" onClick={() => history.push('/admin/list-users')}>
                      Cancelar
                    </Button>
                  </div>

                    </div>
                    <ToastContainer />


                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UpdateUser;
