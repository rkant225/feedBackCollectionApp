import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from './Header';
import * as actions from '../actions';
import Landing from './Landing.js';

const Dashboard = () => <h2>Dashboard</h2>
const SurveyNew = () => <h2>SurveyNew</h2>


class App extends React.Component {
    
    componentDidMount(){
        this.props.fetchUser();
    }
    
    render(){
      return (
        <div className="container">
          <BrowserRouter>
            <div>
                <Header />
                <Route path="/" exact component={this.props.auth == null ? null : this.props.auth ? Dashboard : Landing }/>
                <Route path="/surveys" exact component={Dashboard}/>
                <Route path="/survey/new" exact component={SurveyNew}/>
            </div>
          </BrowserRouter>
        </div>
     );
  }
}

function mapStateToProps(state){
    return({
        auth : state.auth
    });
}

export default connect(mapStateToProps,actions)(App);
