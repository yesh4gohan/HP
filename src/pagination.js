import React from "react";
import {Col,Row} from "react-bootstrap"; 
export default class Pagination extends React.Component {
      constructor(props) {
         //console.log(this.props.currentPage);
        super(props);
        this.state = {
          currentPage: null,
          todosPerPage: 4
        };
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handlePrevPage = this.handlePrevPage.bind(this);
        //this.savePage = this.savePage.bind(this);
      }
      componentDidMount(){
        //console.log(this.props.currentPage);
       this.setState({currentPage:this.props.currentPage});
         // {this.props.background?this.setState({currentPage:this.state.rememberPage}):this.setState({currentPage:1})};
      }
      componentWillReceiveProps(nextProps){
        //console.log(this.props.currentPage+"::::::"+nextProps.currentPage);
        this.setState({currentPage:nextProps.currentPage});
      }
//Above logic reqiured to change currentpage in state accordingly with global state
      handleNextPage(event) {
        
          this.props.updateCurrentPage(Number(this.props.currentPage+1));
        
        //this.setState({currentPage:this.props.currentPage});
        
      }

      handlePrevPage(event) {
        
          this.props.updateCurrentPage(Number(this.props.currentPage-1));
          //this.setState({currentPage:this.props.currentPage});
        
      }
      

      render() {
       
        const {todosPerPage,currentPage}  = this.state;
        //console.log("rem"+this.state.rememberPage);
            //console.log("curr"+this.state.currentPage);
        // Logic for displaying current todos
        const indexOfLastTodo = currentPage * todosPerPage;
        const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
        const currentTodos = this.props.todos.slice(indexOfFirstTodo, indexOfLastTodo);

        const renderTodos = currentTodos.map((todo, index) => {
          return <li key={index}>{todo}</li>;
        });

        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(this.props.todos.length / todosPerPage); i++) {
          pageNumbers.push(i);
        }
        // const renderPageNums = pageNumbers.map((pagenum)=>{
        //   return (<span onClick = {()=>this.props.updateCurrentPage(pagenum)}>{pagenum} {"\t"} {"\t"}</span>);
        // })
        // const renderPageNums = pageNumbers.map((pagenum)=>{return(
        //   <button key = {pagenum} onClick = {()=>{this.props.updateCurrentPage(pagenum)}}>{pagenum}</button>
        // );
        // })
    const Button = {
    color: 'Green',/* Green */
    border: 'none',
    fontSize: 20
}
         const renderPageNums = ()=>{
          let first = 1;
          let last = this.props.todos.length;
          let mid = this.props.currentPage;
          if(mid <= 3){
            first = 1;
            last = (mid + 2);
          }
          else{
          first = (mid - 2);
          last = (mid + 2);
          }
          var page_arr = [];
          for(let i = first;i<=last;i++){
            {i != this.props.currentPage?
            page_arr.push(<button key = {i} onClick = {()=>{this.props.updateCurrentPage(i)}}>{i}</button>):
            page_arr.push(<button style = {Button} key = {i} onClick = {()=>{this.props.updateCurrentPage(i)}}>{i}</button>)};
          }
          return page_arr;  
        }
        return (
            
          <div>
            <ul>
              {renderTodos}
            </ul>
            
            <div id="page-numbers">
            {this.props.currentPage>1?<button onClick = {this.handlePrevPage}>prev Page</button>:""}
            {"\t"}
              {
                renderPageNums()
              }  
            {"\t"}
            <button onClick = {this.handleNextPage}>Next Page</button>
            </div>
          </div>
        );
      }
    }
