import React from "react";
export default class ModalBox extends React.Component{
    constructor(props){
        super(props);
    }   
    render(){
    const backdropStyle = {
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'rgba(1,1,1,0.3)',
      padding: 50
    };
    const modalStyle = {
      backgroundColor: '#666',
      borderRadius: 5,
      maxWidth: 400,
      minHeight: 400,
      margin: '0 auto',
      padding: 30
    };
        if(!this.props.isOpen){
            return null;
        }
        
        return(
            <div style={backdropStyle}>
            <div style={modalStyle}>
                <div>{this.props.details.gender}</div>
                <div>{this.props.details.gender}</div>
                <div>{this.props.details.gender}</div>
                <div>{this.props.details.gender}</div>
                <div className="footer"><button onClick = {this.props.toggle}>Close</button></div>    
            </div>
        </div>
        );
    }

}

// const ModalBox=({detail,toggle,isOpen})=>
    
        // <div>
        //     <div>
        //         <div>{details.name.first+" "+details.name.last}</div>
        //         <div>{details.email}</div>
        //         <div>{details.phone}</div>
        //         <div><button onClick = {(e)=>{toggle()}}>Close</button></div>    
        //     </div>
        // </div>
    


//export default ModalBox;