
import Index from "views/Index.js";

import RegisterUser from "views/pages/user/RegisterUser.js";
import ListUser from "views/pages/user/ListUser.js";
import UpdateUser from "views/pages/user/UpdateUser.js";


import RegisterCourse from "views/pages/courses/RegisterCourse";
import ListCourses from "views/pages/courses/ListCourses";
import UpdateCourse from "views/pages/courses/UpdateCourse";

import RegisterRoom from "views/pages/room/RegisterRoom.js";
import ListRooms from "views/pages/room/ListRooms.js";
import UpdateRoom from "views/pages/room/UpdateRoom.js";

import RegisterEquipment from "views/pages/equipment/RegisterEquipment.js";
import ListEquipment from "views/pages/equipment/ListEquipment.js";
import UpdateEquipment from "views/pages/equipment/UpdateEquipment.js";

import RegisterCourt from "views/pages/court/RegisterCourt.js";
import ListCourt from "views/pages/court/ListCourt.js";
import UpdateCourt from "views/pages/court/UpdateCourt.js";


import ListAllReserves from "views/pages/reserves/Index";
import ReserveDetailsSportCourt from 'views/pages/reserves/DetailReserveSportCourt';
import ReserveDetailsEquipment from 'views/pages/reserves/DetailReserveEquipment';
import ReserveDetailsRom from 'views/pages/reserves/DetailReserveRoom';


import Register from "views/pages/Register.js";
import Login from "views/pages/Login.js";
import ForgotPassWord from "views/pages/ForgotPassword";
import Icons from "views/pages/Icons.js";

import Notifications from "views/pages/notifications/Notifications";


var routes = [
  {
    path: "/notifications",
    name: "Notificações",
    icon: "ni ni-bell-55",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/index",
    name: "Reservas Pendentes",
    icon: "ni ni-watch-time text-ueg",
    component: Index,
    layout: "/admin",
    show: true
  },
  {
    path: "/list-all-reserves",
    name: "Listagem de Reservas",
    icon: "ni ni-folder-17 text-pink",
    component: ListAllReserves,
    layout: "/admin",
    show: true
  },

  {
    path: "/details-reserve-sport-court/",
    name: "Detalhes da Reserva",
    icon: "ni ni-circle-08 text-pink",
    component: ReserveDetailsSportCourt,
    layout: "/admin",
  },
  {
    path: "/details-reserve-equipment/",
    name: "Detalhes da Reserva",
    icon: "ni ni-circle-08 text-pink",
    component: ReserveDetailsEquipment,
    layout: "/admin",
  },
  {
    path: "/details-reserve-room/",
    name: "Detalhes da Reserva",
    icon: "ni ni-circle-08 text-pink",
    component: ReserveDetailsRom,
    layout: "/admin",
  },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "ni ni-planet text-blue",
  //   component: Icons,
  //   layout: "/admin",
  //   show: true
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "ni ni-pin-3 text-orange",
  //   component: Maps,
  //   layout: "/admin",
  // },
  {
    path: "/create-user",
    name: "Cadastro de Usuário",
    icon: "ni ni-single-02 text-info",
    component: RegisterUser,
    layout: "/admin",
    show: true
  },
  {
    path: "/list-users",
    name: "Listagem de Usuários",
    icon: "ni ni-bullet-list-67 text-info",
    component: ListUser,
    layout: "/admin",
    show: true
  },

  {
    path: "/update-user",
    name: "Atualização de Usuário",
    icon: "ni ni-bullet-list-67 text-yellow",
    component: UpdateUser,
    layout: "/admin",
  },
  {
    path: "/create-course",
    name: "Cadastro de Cursos",
    icon: "ni ni-book-bookmark text-danger",
    component: RegisterCourse,
    layout: "/admin",
    show: true
  },
  {
    path: "/list-courses",
    name: "Listagem de Cursos",
    icon: "ni ni-bullet-list-67 text-danger",
    component: ListCourses,
    layout: "/admin",
    show: true
  },

  {
    path: "/update-course",
    name: "Atualização de Curso",
    icon: "ni ni-bullet-list-67 text-danger",
    component: UpdateCourse,
    layout: "/admin",
    show: false
  },

  {
    path: "/update-user",
    name: "Atualização de Usuário",
    icon: "ni ni-bullet-list-67 text-danger",
    component: UpdateUser,
    layout: "/admin",
    show: false
  },

  {
    path: "/create-room",
    name: "Cadastro de Salas",
    icon: "ni ni-shop ",
    component: RegisterRoom,
    layout: "/admin",
    show: true
  },

  {
    path: "/list-rooms",
    name: "Listagem de Salas",
    icon: "ni ni-bullet-list-67 ",
    component: ListRooms,
    layout: "/admin",
    show: true

  },
  {
    path: "/update-room",
    name: "Atualização de Salas",
    icon: "ni ni-bullet-list-67 text-green",
    component: UpdateRoom,
    layout: "/admin",

  },


  {
    path: "/create-court",
    name: "Cadastro de Quadras",
    icon: "ni ni-shop text-warning",
    component: RegisterCourt,
    layout: "/admin",
    show: true
  },

  {
    path: "/list-court",
    name: "Listagem de Quadras",
    icon: "ni ni-bullet-list-67 text-warning",
    component: ListCourt,
    layout: "/admin",
    show: true

  },
  {
    path: "/update-court",
    name: "Atualização da Quadra",
    icon: "ni ni-bullet-list-67 text-green",
    component: UpdateCourt,
    layout: "/admin",
  },

  {
    path: "/create-equipment",
    name: "Cadastro de Equip.",
    icon: "ni ni-tv-2 text-green",
    component: RegisterEquipment,
    layout: "/admin",
    show: true
  },

  {
    path: "/list-equipments",
    name: "Listagem de Equip.",
    icon: "ni ni-bullet-list-67 text-green",
    component: ListEquipment,
    layout: "/admin",
    show: true

  },
  {
    path: "/update-equipment",
    name: "Atualização de Equip.",
    icon: "ni ni-bullet-list-67 text-green",
    component: UpdateEquipment,
    layout: "/admin",
  },


  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    show: false
  },
  {
    path: "/register",
    name: "Register",
    icon: "ni ni-circle-08 text-pink",
    component: Register,
    layout: "/auth",
  },

  {
    path: "/forgot-password",
    name: "Recuperar Senha",
    icon: "ni ni-circle-08 text-pink",
    component: ForgotPassWord,
    layout: "/auth",
  },


];

export default routes;
