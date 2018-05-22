import React from "react";
import axios from "axios";
//const URL = "https://randomuser.me/api/?results=500";
const URL = "http://localhost:3000/random_users";
import ModalBox from "./modalBox";
import {Col,Row} from "react-bootstrap";
import Pagination from "./pagination";
export default class Pics extends React.Component{
    constructor(){
        super();
        this.state = {details:[],
            pictures:[],
            currentpic:[],
            searchterm:"",
            background:true,
            searched_img:"",
            search_success:false,
            clicked:false,
            isOpen:false,
            currentPage:1,
            suggestions:[],
            changeFlag:false
            };
        this.searchFunction = this.searchFunction.bind(this);
        this.updateSearch = this.updateSearch.bind(this);
        //this.showDetails = this.showDetails.bind(this);
        this.modalData = this.modalData.bind(this);
        this.toggle = this.toggle.bind(this);
        this.backToPage = this.backToPage.bind(this);
        this.rememberPage = this.rememberPage.bind(this);
    }
    componentDidMount(){
        //debugger
        axios.get(URL)
        .then(
        
            response=>{
                let details = response.data.results.map(result=>
                    this.filterData(result)
            )
            let filteredData = details.filter((detail)=> detail != undefined);
            //console.log(filteredData);
                
                this.setState({details:filteredData});  
            }).then(
                ()=>{
                    this.setState({pictures:this.state.details.map((detail,index)=>{
                        return(
                            
                            <Row key = {index}>
                            <Col  md = {4}>
                            <img src = {detail.picture.large}/></Col>
                            <Col md = {4}><h5><a href = "#" onClick = {()=>{this.modalData(detail)}}>{detail.name.first}  {detail.name.last}</a></h5></Col>
                            </Row>    
                        );
                    })
                })
            })
        
    }
    filterData(result){
        let flag = true;
        for(let i =0;i<result.name.first.length;i++){
            if(!(result.name.first.charAt(i).charCodeAt(0)>66 && result.name.first.charAt(i).charCodeAt(0)<123)){
                flag = false;
                break;
            }
        }
        if(flag){
            return (result);
        }
    }

     
    backToPage(){
        this.setState({clicked:false});
    }
    rememberPage(value){
    this.setState({currentPage:value});
    }
    searchFunction(name){
        //e.preventDefault();
        this.setState({clicked:true});
        //console.log(name);
        let flag = false;
        let prom = new Promise((resolve,reject)=>{
         this.state.details.map((detail)=>{
            if((detail.name.first == name)){
                this.setState({searched_img:detail.picture.large});
                flag = true;
            }
         })
         resolve();
         }).then(()=>{
             this.setState({searchterm:"",search_success:flag,suggestions:[]});
                //console.log(this.state.searched_img);
                //console.log(this.state.search_success);
         })
   
    }
    getSuggestions(term){
        let prom = new Promise((resolve,reject)=>{
        let val = term.trim().slice();
         let len = val.length;
         if(len>0){
         let suggestionList = this.state.details.filter((detail)=>detail.name.first.trim().slice(0,len) == val);
         this.setState({suggestions:suggestionList});
         }
         else{
             this.setState({suggestions:[]});   
            }
        })
        .then(()=>{
            
            this.setState({search_success:true});
        
        
        })
         //console.log(suggestionList.length);
         
            
         
         
    }
    updateSearch(e){
        this.setState({changeFlag:true});
         this.setState({searchterm:e.target.value});
         this.getSuggestions(e.target.value);

         //console.log(this.state.searchterm);
    }
    modalData(detail){
        //console.log("hi");
            
            let prom = new Promise((resolve,reject)=>{
            this.setState({isOpen:true,background:false});
            this.setState({currentpic:detail});
            resolve();
        })
        // prom.then(()=>{
        //     //console.log(this.state.currentpic);

        //     return(
        //     <ModalBox details = {this.state.currentpic} isOpen = {this.state.isOpen} toggle = {this.toggle}/>
        //     );
        // })
    }
    toggle()
    {this.setState({isOpen:!this.state.isOpen,background:!this.state.background})};
    
    render(){
        console.log(this.state.search_success);
        return(<div>
                {this.state.background?
                 <div >
                     <h1>Search for a  picture</h1>
                     {!this.state.clicked?
                    <div>
                        <input refs = "ref1" value = {this.state.searchterm} placeholder = "search" tpye ="text" onChange ={this.updateSearch}/>
                       {this.state.suggestions.length?
                       (this.state.changeFlag?
                        <ul>
                            {this.state.suggestions.map((suggestion,key)=>{return(
                                <li key = {key}><a href = "#" onClick = {()=>{this.searchFunction(suggestion.name.first)}}>
                                    {suggestion.name.first}
                                </a></li>
                            )}
                        )}
                        </ul>:
                       <div>Sod try again</div> ):""}
                    </div>
                    :<button onClick = {this.backToPage}>Back to List</button>}
                    {this.state.clicked?(this.state.search_success?<div><img src= {this.state.searched_img}/></div>:<div></div>):""}
                    {!this.state.clicked?
                    <div>
                        <h1>Enjoy entire List</h1>
                        
                               <Pagination todos = {this.state.pictures} rememberPage = {this.rememberPage} currentPage = {this.state.currentPage}/>
                                   
                    </div>:""}
                    
                </div>:<ModalBox details = {this.state.currentpic} isOpen = {this.state.isOpen} toggle = {this.toggle}/>}
  
                </div>
        );
    }
}
// 