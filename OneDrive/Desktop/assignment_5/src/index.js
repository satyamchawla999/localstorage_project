import React from 'react';
import ReactDOM from 'react-dom/client';
import Main from './Components/Main';
import { ToastProvider } from 'react-toast-notifications';
import {AuthProvider} from "./Providers"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastProvider autoDismiss={true} autoDismissTimeout={5000} placement={'top-left'}>
      <AuthProvider>
        <Main />
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>
);
