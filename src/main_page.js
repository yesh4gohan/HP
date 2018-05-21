import React from 'react';
import {BrowserRouter as Router,Switch,Route,Link,browserHistory  } from 'react-router-dom';
import RegisterPage from './register_page';
import App from './app';
import Home from './home';
import LoginPage from "./login_page";
export default class HomePage extends React.Component{
    render(){
        return(
            <Router history = {browserHistory}>
                <div>
                <div>
                    <Switch>
                    <Route exact path ="/" component = {Home}/>
                    <Route exact path ="/App" component = {App}/>
                    <Route exact path ="/register" component = {RegisterPage}/>
                    <Route exact path ="/login" component = {LoginPage}/>
                    </Switch>
                </div>
            </div>
            </Router>
        );
    }
}