import React, {Component} from 'react';
import { Link } from 'react-router';

class Main extends Component {
    
    
    render(){
        console.log("hi")
        return(
            <div>
                <nav className="navbar navbar-default">
                    <div className="container-fluid">
                       
                        <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                            <ul className="nav navbar-nav">
                                <li><Link to="/" activeClassName="active">mainPage</Link></li>
                                <li><Link to="/login" activeClassName="active">Login</Link></li>
                                <li><Link to="/register" activeClassName="active">register</Link></li>
                                <li><Link to="/App" activeClassName="active">Search App</Link></li>
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

export default Main; 