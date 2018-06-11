import React from "react";
//import ReactDOM from "react-dom";
import App from './app';
import RegisterPage from './register_page';
import HomePage from './main_page';
import Pics from "./showing_pics";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import ReactDOM from 'react-dom';
import {Router, browserHistory} from 'react-router';
import routes from './routes';
import Sample from "./smaple";
import {createStore} from "redux";
import {reducer} from "./reducer";
import {Provider} from "react-redux";


const store = createStore(reducer);
const Application = ()=>{
    return(
         <Provider store ={store}>
        <Router history={browserHistory} routes ={routes}/>
        </Provider>
    );
}

//import 'bootstrap/dist/css/bootstrap.min.css';

// ReactDOM.render(<HomePage />, document.getElementById('divContainer'));
ReactDOM.render(<Application/>, document.getElementById('divContainer'));
//React.render(<Sample/>, document.getElementById('test'));