import 'materialize-css/dist/css/materialize.min.css'
import React from 'react';
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import App from './components/App.js'
import reducers from './reducers';
import reduxThunk from 'redux-thunk';

// Email testing
import axios from 'axios';
window.axios = axios;
// Email testing

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
    <Provider store={ store }><App/></Provider>, document.getElementById("root"));


//import * as serviceWorker from './serviceWorker';

//serviceWorker.unregister();
