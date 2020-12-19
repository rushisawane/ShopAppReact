import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import 'bootstrap/dist/css/bootstrap.min.css';
import { createStore,combineReducers,applyMiddleware,compose } from 'redux'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import authReducer from './Store/Reducers/Auth';
import cartReducer from './Store/Reducers/Cart';
import orderReducer from './Store/Reducers/Order';
import productReducer from './Store/Reducers/Product';

const rootReducer = combineReducers({authReducer,cartReducer,orderReducer,productReducer});

//const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer,composeEnhancer(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
