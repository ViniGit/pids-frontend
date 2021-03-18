
import React, { useEffect, useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';


import api from '../../../services/api';

import UpdateUser from 'views/pages/user/UpdateUser';


// reactstrap components
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
  ModalFooter
} from "reactstrap";
// core components
import Header from "components/Headers/UserHeader.js";


const ListUser = () => {

  const [users, setUsers] = useState([]);
  const [bond, setBond] = useState([]);
  const [id_course, setIdCourse] = useState(0);
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState({});

  const toggle = (user) => {
    setModal(!modal);
    setUser(user);

  };

  const history = useHistory();

  useEffect(() => {
    api.get('users').then(response => {
      setUsers(response.data);
      console.log(response.data);
    })
  }, [])

  function editUser(obj) {

    history.push({
      pathname: '/admin/update-user',
      userData: obj
    });

  }

  async function deletar(user) {

    var id = user.id;
    setModal(!modal);
    await api.delete(`users/${user.id}`).
      then(response => {
        console.log(response.status);
        if (response.status == 204) {
          toast.success("Registro inativado com sucesso!", { autoClose: 3000 });
          setUsers(users.filter(u => { return u.id != id}))
        }
      })
  }
  return (
    <>
      <Header />


      <Container className="mt--7" fluid>
        {/* modal para inativar user */}
        <div>
          <Modal isOpen={modal} toggle={toggle} className="">

            <ModalHeader toggle={toggle}></ModalHeader>
            <ModalBody>
              Tem certeza que deseja Inativar o cadastro de {user.name}?
        </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => { deletar(user) }}>Confirmar</Button>
              <Button color="secondary" onClick={toggle}>Cancelar</Button>
            </ModalFooter>
          </Modal>
        </div>



        {/* Table */}
        <Row>
          <div className="col pt-2">
            <Card className="shadow">

              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">CPF</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Telefone</th>
                    <th scope="col">Curso</th>
                    <th scope="col">Vínculo</th>
                    <th scope="col">Papel no sistema</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {
                    users.map(user => (
                      <tr>
                        <th scope="row">
                          <Media>
                            <span className="mb-0 text-sm">
                              {user.name}
                            </span>
                          </Media>
                        </th>
                        <td>{user.cpf}</td>
                        <td>
                          {user.email}
                        </td>
                        <td>
                          {user.phone}
                        </td>
                        <td>
                          {user.courses.map(course => (
                            course.name
                          ))}{/* errado */}
                        </td>
                        <td>
                          {user.bonds.name}
                        </td>
                        <td>
                          {user.roles.name}
                        </td>

                        <td className="text-right">
                          <UncontrolledDropdown>
                            <DropdownToggle
                              className="btn-icon-only text-light"
                              role="button"
                              size="sm"
                              color=""
                              onClick={(e) => e.preventDefault()}
                            >
                              <i className="fas fa-ellipsis-v" />
                            </DropdownToggle>
                            <DropdownMenu className="dropdown-menu-arrow" right>
                              <DropdownItem
                                onClick={() => editUser(user)}
                              >
                                Editar
                              </DropdownItem>
                              <DropdownItem
                                href="#pablo"
                                onClick={(e) => toggle(user)}

                              >
                                Inativar
                          </DropdownItem>

                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    ))
                  }

                </tbody>
              </Table>
              <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
            </Card>
            <ToastContainer />
          </div>
        </Row>
        {/* Dark table */}



      </Container>
    </>
  );
};

export default ListUser;
