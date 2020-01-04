import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from './Header';
import * as actions from '../actions';
import Landing from './Landing.js';
import LoadingComponent from './LoadingComponent.js'
import Dashboard from './Dashboard.js'
import SurveyNew from './surveys/SurveyNew.js'


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
                {this.props.isLoading ? 
                
                <LoadingComponent/> : 
                
                <div>
                <Route path="/" exact component={this.props.auth == null ? null : this.props.auth ? Dashboard : Landing }/>
                <Route path="/surveys" exact component={Dashboard}/>
                <Route path="/surveys/new" exact component={SurveyNew}/>
                </div>}
                
            </div>
          </BrowserRouter>
        </div>
     );
  }
}

function mapStateToProps(state){
    return({
        auth : state.auth.userData,
        isLoading : state.auth.isLoading
    });
}

export default connect(mapStateToProps,actions)(App);
