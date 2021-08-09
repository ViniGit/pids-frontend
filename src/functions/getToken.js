import React from 'react';

const getToken = () => {

  const token = localStorage.getItem('@EReserva:token');

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };

  return config;
}

export default getToken;