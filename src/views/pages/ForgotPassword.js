
import React, { useCallback } from "react";
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { isValidCpf } from 'functions/isValidCpf';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api';
import { FiArrowLeft} from 'react-icons/fi';
import { AiTwotoneMail } from 'react-icons/ai';


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

const ForgotPassWord = () => {

  const history = useHistory();

  const { signIn } = useAuth();


  const validationSchema = Yup.object({
    // cpf: Yup
    //   .string()
    //   .test('CPF valido', 'CPF inválido!', value => isValidCpf(value))
    //   .required("Campo Obrigatório!"),

    email: Yup
      .string()
      .email("E-mail Inválido!").required("Campo Obrigatório!"),
  });

  const handleSubmitt = useCallback(
    async (values) => {
      const { email } = values;

      const data = {
        email
      }

      // signIn({
      //   cpf: data.cpf,
      //   password: data.password,
      // });


    }, []);

  const { handleSubmit, handleChange, values, errors, touched } = useFormik({
    initialValues: {
      email: "",
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
              <h1>Recuperar senha</h1>
            </div>
            <Form onSubmit={handleSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <AiTwotoneMail />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="E-mail"
                    type="CPF"
                    autoComplete="new-email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />

                </InputGroup>
                {touched.email && errors.email ? <p className="mt-2 text-warning">{errors.email}</p> : null}

              </FormGroup>
              {/* <FormGroup>
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

              </FormGroup> */}

              <div className="text-center">
                <Button className="my-4" color="primary" type="submit" onClick={handleSubmit}>
                  Recuperar
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3 mr-1">
          <Col className="text-right" xs="12">
            <Link
              className="text-light"
              to="/auth/login"
            >
              <FiArrowLeft size={20} />
               Voltar ao login
            </Link>
          </Col>

        </Row>
        <ToastContainer />

      </Col>
    </>
  );
};

export default ForgotPassWord;
