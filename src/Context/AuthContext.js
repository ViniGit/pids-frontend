import getSecretKey from 'functions/getSecretKey';
import getToken from 'functions/getToken';
import { error } from 'jquery';
import React, { createContext, useCallback, useState, useContext, useEffect } from 'react';

import { ToastContainer, toast } from 'react-toastify';

import api from '../services/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  var jwt = require('jsonwebtoken');
  useEffect(() => {
    // api.get('/users', config).then(response => {
    //   console.log(response.data);
    // }).catch(error => {
    //   if (error.response.status === 401) { //se o usuário não estiver autorizado
    //     signOut();
    //   }
    // })
    const token = localStorage.getItem('@EReserva:token');
    const key = getSecretKey();
    jwt.verify(token, key, function (err, decoded) {
      if (err && err.message === 'jwt expired') {
        signOut();
      }
    })

  }, []);


  const [data, setData] = useState(() => {
    const token = localStorage.getItem('@EReserva:token');
    const user = localStorage.getItem('@EReserva:user');

    if (token && user) {
      return { token, user: JSON.parse(user) };
    }

    return {};
  });

  const signOut = useCallback(() => {
    localStorage.removeItem('@EReserva:token');
    localStorage.removeItem('@EReserva:user');

    setData({});
  })

  const signIn = useCallback(async ({ cpf, password }) => {

    await api.post('sessions', {
      cpf,
      password,
    }).then(response => {
      const { token, user } = response.data;

      localStorage.setItem('@EReserva:token', token);
      localStorage.setItem('@EReserva:user', JSON.stringify(user));

      setData({ token, user });

    }).catch(error => {
      toast.error("Combinação de cpf e senha incorreta!", {
        onClose: () => { },
        autoClose: 2500,
      });

    });
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be use within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };