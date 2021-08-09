
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from "yup";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../../services/api';
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
import getToken from 'functions/getToken';



const ListRooms = () => {

  const [modal, setModal] = useState(false);

  const [room, setRoom] = useState({});

  const config = getToken();

  const history = useHistory();

  const [rooms, setRooms] = useState([]);


  useEffect(() => {
    api.get('rooms', config).then(response => {
      setRooms(response.data);
    })
  }, []);


  const toggle = (room) => {
    setModal(!modal);
    setRoom(room);

  };

  async function deletar(room) {

    var id = room.id;
    setModal(!modal);
    await api.delete(`rooms/${room.id}`, config).
      then(response => {
        if (response.status == 204) {
          toast.success("Registro inativado com sucesso!", { autoClose: 3000, });
          setRooms(rooms.filter(u => { return u.id != id }))
        }
      });

  }

  function editRoom(room) {

    history.push({
      pathname: `/admin/update-room/${room.id}`,
      // roomData: room,
    });

  }



  return (
    <>
      <div>
        <Modal isOpen={modal} toggle={toggle} className="">

          <ModalHeader toggle={toggle}></ModalHeader>
          <ModalBody>
            Tem certeza que deseja Inativar os dados dessa Sala?
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => { deletar(room) }}>Confirmar</Button>
            <Button color="danger" onClick={toggle}>Cancelar</Button>
          </ModalFooter>
        </Modal>
      </div>
      <Header />
      {/* Page content */}
      <Container className="mt--7" fluid>

        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="border-0">
                <h3 className="mb-0"></h3>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Nome</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Tipo</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {
                    rooms.map(room => (
                      <tr>
                        <th scope="row">
                          <Media>
                            <span className="mb-0 text-sm">
                              {room.name}
                            </span>
                          </Media>
                        </th>
                        <th scope="row">
                          <Media>
                            <span className="mb-0 text-sm">
                              {room.description}
                            </span>
                          </Media>
                        </th>
                        <th scope="row">
                          <Media>
                            <span className="mb-0 text-sm">
                              {room.type == 'laboratory' ? 'Laboratório' : (room.type == 'auditorium' ? 'Auditório' : (room.type == 'room' ? 'Sala' : null))}
                            </span>
                          </Media>
                        </th>


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
                                onClick={() => editRoom(room)}
                              >
                                Editar
                              </DropdownItem>
                              <DropdownItem
                                onClick={() => toggle(room)}

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

export default ListRooms;
