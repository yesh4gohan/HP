import React from "react";
import { Redirect } from 'react-router-dom';

export default class LoginData extends React.Component{
    constructor(props){
        super(props);
    }

    

    render(){
        return(
        <div>{!this.props.registered ?
            <div>
                <div><input type ="text" placeholder ="enter user_id" onChange ={this.props.setId} value = {this.props.id}/></div>
                <div><input type ="password" placeholder ="enter password" onChange ={this.props.setPassword} value = {this.props.password}/></div>
                <div><button onClick ={this.props.updateDetails}>Register</button></div>
            </div>
        :
        <div>
            <h3>You have successfully registered click below to login!!!</h3> 
            <button onClick = {this.props.handlerRedirect}>Login</button>   
        </div>
        }
        </div>
        );
    }
}