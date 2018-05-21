import React from 'react'
import {Router, Route, IndexRoute} from 'react-router';

import LoginPage from './login_page';
import RegisterPage from './register_page';
import Pics from './showing_pics';
import Home from './home';

import Main from './common/main';

export default(
    <Route component={Main}>
        <Route path="/" component={Home}/>
        <Route path="/login" component={LoginPage}/>
        <Route path="/register" component={RegisterPage}/>
        <Route path="/App" component={Pics}/>
    </Route>
);
