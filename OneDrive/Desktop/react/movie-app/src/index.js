import React from 'react';
import ReactDOM from 'react-dom/client';
import { legacy_createStore as createStore } from 'redux';
import './index.css';
import App from './components/App';
import rootReducer from './reducers'


const store = createStore(rootReducer)
console.log('store',store);
// console.log('before state',store.getState())

// store.dispatch({
//   type:'ADD_MOVIES',
//   movies:{name:'superman'}
// })

// console.log('after state',store.getState())


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
