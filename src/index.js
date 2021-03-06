import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect, } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";


import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Redirect exact from="/" to="/auth/login" />
      <Redirect exact from="/argon-dashboard-react" to="/auth/login" />
      <App />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);

// const index = (
//   <>
//     <BrowserRouter>
//       <Switch>
//         <AuthContext>
//           <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
//           <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
//           <Redirect from="/" to="/admin/index" />
//         </AuthContext>
//       </Switch>
//     </BrowserRouter>
//   </>
// );

// ReactDOM.render(index, document.getElementById('root'));