import React,{Component} from "react" ;// {Component} is not actually necessary if you are using React.Component at class declaration
import ReactDOM from "react-dom";
import axios from "axios";
import Contact from "./contactStateLess";
import RegisterPage from "./register_page";
//var contacts =[];
//const proxyurl = "https://cors-anywhere.herokuapp.com/";
const url = "http://localhost:3000"; 
var num =5;

export default class App extends Component{
    
    constructor(props){
        super(props);

        this.state={
            contacts:[],
            checkedContacts:[],
            newName:"",
            newNumber:""
        };
        this.addContact =this.addContact.bind(this);
        this.validateDetails =this.validateDetails.bind(this);
        this.deleteContact =this.deleteContact.bind(this);
        this.dispName =this.dispName.bind(this);
        this.dispNumber =this.dispNumber.bind(this);
        this.select =this.select.bind(this);
    }
    componentDidMount(){
        axios.get(url)
        .then( (response)=> {
           // console.log(this.state.contacts);
            //console.log(this.state.checkedContacts);
         this.setState({contacts:response.data});
         //console.log(contacts);
         //ReactDOM.render(<App contacts={contacts}/>, document.getElementById("divContainer"));
         //ReactDOM.render(<RegisterPage/>, document.getElementById("divContainer"));
      });


    }

    validateDetails(){
        //console.log(this);
        let flag=0;
        if(this.refs.number.value=="") {flag=1; alert("Contact number can't be empty !!")}
            else if(this.refs.name.value=="") {flag=1; alert("Contact name can't be empty !!")}
            else {
                 this.state.contacts.map((contact)=> {
                     if(contact.name==this.state.newName) {flag=1; alert("Contact name already exists !!")}
                     else if(contact.number==this.state.newNumber) {flag=1; alert("Contact number already exists !!")}
            
        })}

        return flag;
    }

    addContact(event){
        //console.log(this);
        event.preventDefault();// stop form from auto submitting
        let flag=this.validateDetails();
        //console.log(flag)

        if(flag==0){
                      
            document.getElementById("test").innerHTML="Contact Added";
            setTimeout(()=>{document.getElementById("test").innerHTML="";},2000)
            
            let p1 =new Promise((resolve,reject)=>{
                this.setState({
            contacts:[...this.state.contacts,{name:this.state.newName,number:this.state.newNumber
            }],newName:"",newNumber:""});

            resolve();   
        });
        
        
        p1.then(
                ()=>{
                      axios.post("http://localhost:3000/putData", {
               newData: this.state.contacts
            })
                }     
            )             
        }

      

            
            // Adding new contact to contacts and again seting new variables to ""
    }

    deleteContact(){
        let tempContacts=this.state.contacts; 
        let index2=0;
        // first loop is over selected contacts
        this.state.checkedContacts.map((name)=>{
            
            //debugger; 
            let index=0;
            // second loop is over  contacts to get hold of the selected object and splice it
            this.state.contacts.map((contact)=>{
               // debugger; 
                    if(contact.name==name){  
                    tempContacts.splice(index,1)
                    }
                 index++;
                 })
        });

        if(!this.state.checkedContacts[0]);
        else{ 
            this.setState({contacts:tempContacts,checkedContacts:[]})
            document.getElementById("test").innerHTML="Contact(s) Deleted"
             setTimeout(()=>{axios.post("http://localhost:3000/putData", {
               newData: this.state.contacts
            })
            .then(function (response) {
                    //console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error.data);
                    });}, 500)
            setTimeout(()=>{document.getElementById("test").innerHTML="";},2000)
        }
        
        
       // document.write("Hello There"+"<a href='index.html'> Back to index.html </a>  ",2+3)
        // the above statement is a success !! You can write proper html in document.write but+ within the ""
        //document.write("Hello There"+"<br/>")
       
    }

    dispName(){
        //console.log(this);
        this.setState({newName:this.refs.name.value.substr(0,15)})
    }

    dispNumber(){
        //let a="5...";
        //console.log(this);
         this.setState({newNumber:parseInt(this.refs.number.value.toString().substr(0,10))});
        //this.setState({newNumber:parseInt(a)})
    }

    select(event,name){
        if(event.target.checked) this.setState({checkedContacts:[...this.state.checkedContacts,name]})
        else {let index=this.state.checkedContacts.indexOf(name); 
                let tempContacts=this.state.checkedContacts;
                tempContacts.splice(index,1)
                this.setState({checkedContacts:tempContacts})
        }
    }

    render(){
        
        return(
            <div>
                <form>
                <input type="text" value={this.state.newName}  ref="name" placeholder="Enter Name" onChange={this.dispName}/> {"\t"}
                <input type="Number" value={this.state.newNumber} ref="number" placeholder="Enter Phone Number" onChange={this.dispNumber}/>{"\t"}
                <button onClick={this.addContact}>Add Contact</button> {"\t"}
                </form>

               
           

              
               <table  style={{border:"3px solid blue",height:"50px", width:"500px", borderCollapse:"collapse"}} >
               <tbody>
                    <tr style={{width:"10px"}}>
                        <th style={{border:"1px solid blue",height:"30px"}}>Select</th>
                        <th style={{border:"1px solid blue"}}>Name</th>
                        <th style={{border:"1px solid blue"}}>Number</th>
                    </tr>    
                    {this.state.contacts.map((contact)=><Contact contact={contact} select={this.select} key={contact.name}/>)} 
                 </tbody>                
                </table> <br/>
                
                 <button onClick={this.deleteContact.bind(this)}>Delete Selected Contacts</button>
              
               
            </div>
        )
    }

}

// axios.get(url).then(function (response) {
//          contacts = response.data;
//          console.log(contacts);
//          //ReactDOM.render(<App contacts={contacts}/>, document.getElementById("divContainer"));
//          ReactDOM.render(<RegisterPage/>, document.getElementById("divContainer"));
//       });

