import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Payments from './Payments.js'

class Header extends React.Component{
    renderContent(){
        switch (this.props.auth){
            case null:
                return "";
            case false:
                return <li><a href="/auth/google">{"Login with google"}</a></li>
            default:
                return [
                    <li key="1">{this.props.auth && <Payments/>}</li>,
                    <li key="2"style={{margin : "0 10px"}}>
                        <span style={{margin : "0 10px"}}>{this.props.auth && this.props.auth.displayName}</span>
                        Credits : {this.props.auth && this.props.auth.credits}
                    </li>,
                    <li key="3"><a href="/api/logout">{"Logout"}</a></li>
                       ]
        }

    }
    render(){        
        return(
          <div>
            <nav className="nav-wrapper">
                <div>
                    <Link to={this.props.auth ? "/surveys" : "/"} className="brand-logo">Emaily</Link>
                    <ul className="right">
                        {this.renderContent()}
                    </ul>
                </div>
            </nav>
        </div>
        );        
    }
}



function mapStateToProps(state){
    return({
        auth : state.auth
    });
}

export default connect(mapStateToProps)(Header);
