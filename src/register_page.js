import React from 'react';
import axios from "axios";
import LoginData from "./logindata";
import {LoginPage} from "./login_page";
import {withRouter} from "react-router-dom";

//import ReactDOM from "react-dom";
const URL = 'http://localhost:3000/register';
class RegisterPage extends React.Component{
    constructor(){
        super();
        this.state = {user_id:"",password:"",user_pair:[],register_flag:false};
        this.setPassword =this.setPassword.bind(this);
        this.setUserId =this.setUserId.bind(this);
        this.updateDetails =this.updateDetails.bind(this);
        this.handlerRedirect = this.handlerRedirect.bind(this);
    }
    componentDidMount(){
        axios.get(URL)
        .then((response)=>{
            this.setState({user_pair:response.data,register_flag:false});
        })
        
    }
    setUserId(e){
        this.setState({user_id:e.target.value});
    }
    setPassword(e){
        this.setState({password:e.target.value});
    }
    updateDetails(e){
        e.preventDefault();
        let prom = new Promise((resolve,reject)=>{
            this.setState({user_pair:[...this.state.user_pair,{user_id:this.state.user_id,password:this.state.password}],user_id:"",password:""});
            resolve();
    });
    prom.then(
        ()=>{
            axios.post('http://localhost:3000/putuserdata',{
                newData:this.state.user_pair
            })
        })
        // document.getElementById("test").innerHTML="Successfully registered";
        //     setTimeout(()=>{document.getElementById("test").innerHTML="";},2000);
            this.setState({register_flag:true});
    }
    handlerRedirect(){
        if(this.state.register_flag)
         this.props.history.push('/login');
    }
    render(){
        
        return(
            
            <div>
                {!this.state.register_flag?<h1>Welcome to my app enter details and register!!!</h1>:""}
                <div>
                    <LoginData
                    setId = {this.setUserId}
                    setPassword = {this.setPassword}
                    updateDetails = {this.updateDetails}
                    id = {this.state.user_id}
                    password = {this.state.password}
                    registered = {this.state.register_flag}
                    handlerRedirect  = {this.handlerRedirect}
                        />
                </div>
            </div>
        );
    }
}
export default RegisterPage;



