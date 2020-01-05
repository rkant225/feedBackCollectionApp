import React from 'react';
import * as actions from '../actions'
import {connect} from 'react-redux'

const divStyle = {
            position: "fixed",
            top: "30%",
            left: "30%",            
            color:"red"
          }

class SurveyListDisplay extends React.Component {    

    componentDidMount(){
        this.props.fetchSurveys();
    }
    
    renderSurveys(){
        return this.props.surveys.reverse().map(survey =>{
            return (
                <div key={survey._id} className="card blue-grey darken-1">
                    <div className="card-content white-text">
                      <span className="card-title">{survey.title}</span>
                      <p>{survey.body}</p>
                      <p className="right">Sent on : {new Date(survey.dateSent).toLocaleDateString()}</p>
                      <div><span><b>Positive response : </b></span> </div>
                      <div><span><b>Negative response : </b></span> {survey.no}</div>
                    </div>
                    <div className="card-action">
                      <a  href="#">YES : {survey.yes}</a>
                      <a className="right" href="#">NO : {survey.no}</a>
                    </div>
                </div>
            );
        })
    }
    
    render(){
      return (
        <div>
            {this.props.surveys.length >0 ? this.renderSurveys() : <h3 style={divStyle}>No Surveys to displey.</h3>}
        </div>
     );
  }
}

const mapStateToProps = (state) =>{
    console.log(state);
    return{
        surveys : state.surveys.surveys,
        isLoading : state.surveys.isLoading
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        fetchSurveys : () => dispatch(actions.fetchSurveys())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(SurveyListDisplay);




