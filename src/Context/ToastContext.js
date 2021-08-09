import React, { createContext, useContext, useCallback, useState } from 'react';
import ToastContainer from '../ToastContainer/index';


import { uuid } from 'uuidv4';

const ToastContext = createContext();

const ToastProvider = ({ children }) => {


  const [messages, setMessages] = useState([]);

  const addToast = useCallback(({ type, title, description }) => {

    const id = uuid();

    const toast = {
      id,
      type,
      title,
      description,
    };

    setMessages((oldMessages) => [...oldMessages, toast]);
  }, []);

  const removeToast = useCallback(() => {

  }, []);

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  )
}

function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast must be use within a ToastProvider');
  }

  return context;

}

export { ToastProvider, useToast };