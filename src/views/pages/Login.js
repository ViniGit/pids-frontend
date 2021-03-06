
import React, { useCallback } from "react";
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { isValidCpf } from 'functions/isValidCpf';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api';
import { FiArrowRight } from 'react-icons/fi';


import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { useAuth } from "../../Context/AuthContext";

const Login = () => {

  const history = useHistory();

  const { signIn } = useAuth();


  const validationSchema = Yup.object({
    cpf: Yup
      .string()
      .test('CPF valido', 'CPF inválido!', value => isValidCpf(value))
      .required("Campo Obrigatório!"),

    password: Yup
      .string()
      .required('Digite sua senha!'),
  });

  const handleSubmitt = useCallback(
    async (values) => {
      const { cpf, password } = values;

      const data = {
        cpf,
        password,
      }

      signIn({
        cpf: data.cpf,
        password: data.password,
      });


      // declarações para manipular quaisquer exceções não especificadas
      // logMyErrors(e); // passa o objeto de exceção para o manipulador de erro
      // addToast({
      //   type: 'error',
      //   title: 'Erro na autenticação!',
      //   description: 'Ocorreu um erro ao fazer login, cheque as credenciais.',
      // });


      // await api.post('sessions', data)
      //   .then(response => {
      //     //mensagens de sucesso no login
      //     if (response.status == 201) {
      //       toast.success("Login realizado com sucesso!", {
      //         onClose: () => history.push('/admin/index'),
      //         autoClose: 1500,
      //       });
      //     }
      //   })
      //   .catch(error => {
      //     console.log(error.response);

      //     //mensagens de erro no login

      //     if (error.response.status == 400) {
      //       toast.warning(error.response.data.message, {
      //         autoClose: 4000,
      //       });
      //     }

      //     if (error.response.status == 401) {
      //       toast.warning(error.response.data.message, {
      //         autoClose: 4000,
      //       });
      //     }
      //     if (error.response.status == 500) {
      //       toast.error("Não foi possível realizar a ação. Ocorreu um erro interno no servidor!", {
      //         autoclose: 4000,
      //       });
      //     }

      //   });

    }, []);

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      cpf: "",
      password: "",
    },
    validationSchema,

    onSubmit(values) {
      handleSubmitt(values);
    },

  });

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <h1>Login</h1>
            </div>
            <Form onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-key-25" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="CPF"
                    type="CPF"
                    autoComplete="new-email"
                    name="cpf"
                    value={values.cpf}
                    onChange={handleChange}
                  />

                </InputGroup>
                {touched.cpf && errors.cpf ? <p className="mt-2 text-warning">{errors.cpf}</p> : null}

              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Senha"
                    type="password"
                    autoComplete="new-password"
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                  />
                </InputGroup>
                {touched.password && errors.password ? <p className="mt-2 text-warning">{errors.password}</p> : null}

              </FormGroup>
              <div className="text-center">
                <Button className="my-4" color="primary" type="submit" onClick={handleSubmit}>
                  Entrar
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3 mr-1">
          <Col className="text-right" xs="12">
            <Link
              className="text-light"
              to="/auth/forgot-password"
            >
              Esqueci minha senha
            <FiArrowRight size={20} />

            </Link>
          </Col>

        </Row>
        <ToastContainer />

      </Col>
    </>
  );
};

export default Login;
