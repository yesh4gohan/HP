import React, {Component} from 'react';
import { Link } from 'react-router';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {login,logout} from "../action";
import {bindActionCreators} from "redux";
const mapStateToProps = state=>{
    if(!(state && state.loggedin))
    return {
        state
    }
    return {logged_in:state.loggedin}
}
const mapDispatchToprops = dispatch=>{
    return bindActionCreators({
        login,
        logout
    },dispatch)     
}

class Main extends Component {
    constructor(){
        super();
        this.logout = this.logout.bind(this);
    }
    logout(){
        this.props.logout();
        
    } 
    render(){
        //console.log(this.props.logged_in+"dcdsfdrfddfd");
        const divStyle1 = {
        color:'red'
    };
    const divStyle2 = {
        color:'green'
        };
        return(
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                       
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li><Link to="/" activeClassName="active" style = {divStyle2}>mainPage</Link></li>
                                <li>{!this.props.logged_in?<Link to="/login" activeClassName="active" style = {divStyle2}>Login</Link>:<h4 style = {divStyle2}>{"Logged in"}</h4>}</li>
                                <li>{this.props.logged_in?<Link to="/register" activeClassName="active">register</Link>:null}</li>
                                <li>{this.props.logged_in?<Link to="/App" activeClassName="active">Search App</Link>:<div>{"not logged in"}</div>}</li>
                                <li>{this.props.logged_in?<Link to = "/" onClick = {this.logout}>Logout</Link>:null}</li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToprops)(Main);