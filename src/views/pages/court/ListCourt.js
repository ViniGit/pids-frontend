
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



const ListCourt = () => {

  const [modal, setModal] = useState(false);

  const [court, setCourt] = useState({});

  const history = useHistory();

  const [courts, setCourts] = useState([]);

  const config = getToken();

  useEffect(() => {
    api.get('sportCourts', config).then(response => {
      setCourts(response.data);
    })
  }, []);



  const toggle = (room) => {
    setModal(!modal);
    setCourt(room);

  };

  async function deletar(room) {

    var id = room.id;
    setModal(!modal);
    await api.delete(`sportCourts/${room.id}`, config).
      then(response => {
        if (response.status == 204) {
          toast.success("Registro inativado com sucesso!", { autoClose: 3000, });
          setCourts(courts.filter(u => { return u.id != id }))
        }
      })


  }

  function editRoom(court) {

    history.push({
      pathname: `/admin/update-court/${court.id}`,
      // courtData: court,
    });

  }

  return (
    <>
      <div>
        <Modal isOpen={modal} toggle={toggle} className="">

          <ModalHeader toggle={toggle}></ModalHeader>
          <ModalBody>
            Tem certeza que deseja Inativar os dados dessa Quadra?
        </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => { deletar(court) }}>Confirmar</Button>
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
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {
                    courts.map(court => (
                      <tr>
                        <th scope="row">
                          <Media>
                            <span className="mb-0 text-sm">
                              {court.name}
                            </span>
                          </Media>
                        </th>
                        <th scope="row">
                          <Media>
                            <span className="mb-0 text-sm">
                              {court.description}
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
                                onClick={() => editRoom(court)}
                              >
                                Editar
                          </DropdownItem>
                              <DropdownItem
                                onClick={() => toggle(court)}

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

export default ListCourt;
