import React from "react";
import axios from "axios";
import LoginData from "./logindata";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {login,logout} from "./action";
const URL = 'http://localhost:3000/register';

const mapStateToProps = state=>{
    return {
        logged_in:state.loggedin
    }
}
const mapDispatchToprops = dispatch=>{
    return bindActionCreators({
        login,
        logout
    },dispatch)     
}

class LoginPage extends React.Component{
    constructor(){
        super();
        this.validateLoginDtails = this.validateLoginDtails.bind(this);
        this.setUserId = this.setUserId.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.handleNavigate = this.handleNavigate.bind(this);
        this.state = {entered_id:"",entered_pass:"",actual_values:[]}
    }
    componentDidMount(){
        axios.get(URL)
        .then((response)=>{
            this.setState({actual_values:response.data});
        })
        
    }
    setUserId(e){
        this.setState({entered_id:e.target.value});
    }
    setPassword(e){
        this.setState({entered_pass:e.target.value});
    }
     validateLoginDtails(e){
         let flag =false;
         //console.log(this.state.actual_values);
          this.state.actual_values.map((value)=>{
              //console.log(value.user_id);
              //console.log(this.state.entered_id);
             // debugger
            if(value.user_id == this.state.entered_id && value.password == this.state.entered_pass){
                flag =true;
            }    
         })
         if(!flag){
             this.props.logout();
             document.getElementById("test").innerHTML="wrong credentilas retry";
                setTimeout(()=>{document.getElementById("test").innerHTML="";},2000);
         }
         else{

             this.props.login();
         }
          this.setDefault();
    }
    setDefault(){
        this.setState({entered_id:"",entered_pass:""});
    }
    handleNavigate(){
    if(this.props.logged_in){

    this.props.history.push('/App');
    }
    }
    render(){
        return(
            <div>{!this.props.logged_in?
            <div>
                <div><input type ="text" placeholder ="enter user_id" onChange ={this.setUserId} value = {this.state.entered_id}/></div>
                <div><input type ="password" placeholder ="enter password" onChange ={this.setPassword} value = {this.state.entered_pass}/></div>
                <div><button onClick ={this.validateLoginDtails} >Login</button></div>
            </div>
            :<div>
                <h1>Yo!!! You are one step away from magic click now.....</h1>
                <button onClick = {this.handleNavigate} className ={"btn btn-success"}>MAGIC</button>
            </div>
            }
            </div>
        );
    }
}
export default connect(mapStateToProps,mapDispatchToprops)(LoginPage);