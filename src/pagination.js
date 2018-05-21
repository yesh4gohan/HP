import React from "react";
import {Col,Row} from "react-bootstrap"; 
export default class TodoApp extends React.Component {
      constructor(props) {
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
       this.setState({currentPage:this.props.currentPage});
         // {this.props.background?this.setState({currentPage:this.state.rememberPage}):this.setState({currentPage:1})};
      }
      componentWillUnmount(){
          this.props.rememberPage(this.state.currentPage);
      }

    //   componentWillReceiveProps(nextProps){
    //       console.log(nextProps.background)
    //         if(nextProps.background == !this.props.background){
    //             console.log(nextProps.background+"tunne unnu")
    //             this.setState({currentPage:this.state.rememberPage});
    //         }
    //   }
      handleNextPage(event) {
        let prom = new Promise((resolve,reject)=>{this.setState({
          currentPage: Number(this.state.currentPage) + 1
        });
        resolve();
        })
      }

      handlePrevPage(event) {
        let prom = new Promise((resolve,reject)=>{this.setState({
          currentPage: Number(this.state.currentPage) - 1
        });
        resolve();
        })
      }
      

      render() {
        const { currentPage, todosPerPage } = this.state;
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
        return (
            
          <div>
            <ol>
              {renderTodos}
            </ol>
            <div id="page-numbers">
            {this.state.currentPage>1?<button onClick = {this.handlePrevPage}>prev Page</button>:""}
            {"\t"}
            {this.state.currentPage}
            {"\t"}
            <button onClick = {this.handleNextPage}>Next Page</button>
            </div>
          </div>
        );
      }
    }
