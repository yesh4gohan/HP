import React from "react";
import { Link } from 'react-router';
import {Router, Route, IndexRoute} from 'react-router';
export default class Sample extends React.Component{
    render(){
        //debugger
        return(<div><Link to ="/App">Click ME</Link></div>);
    }
}
