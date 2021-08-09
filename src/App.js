import react from 'react';
import ReactDOM from "react-dom";

import { BrowserRouter, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";

import { AuthProvider } from './Context/AuthContext';

import { ToastProvider } from './Context/ToastContext';


import Route from './routes/routes';

const App = () => (
  <>

    <AuthProvider>
      <Route path="/auth" component={AuthLayout} />
      <Route path="/admin" isPrivate component={AdminLayout} />

      {/* <Route path='/dashboard' component={Dashboard} isPrivate />
              <Route path="/auth" component={(props) => <AuthLayout {...props} />} />
        <Route path="/admin" isPrivate component={(props) => <AdminLayout {...props} />} />
      */}

    </AuthProvider>
  </>


);

export default App;