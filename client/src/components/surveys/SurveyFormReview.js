import React from 'react';
import {connect} from 'react-redux';
import {submitSurvey} from '../../actions/index.js'
import {withRouter} from 'react-router-dom';


class SurveyFormReview extends React.Component{
    
     sendSurvey = async (formValues, history) =>{
        await this.props.submitSurvey(formValues);
        //<Redirect to="/surveys" />        
        history.push('/surveys')
    }
    
    render(){        
        return(
            <div>
                <b>Please Review the provided details.</b>
                <p><span><b>Title : </b></span> {this.props.formValues.title}</p>
                <p><span><b>Subject : </b></span> {this.props.formValues.subject}</p>
                <p><span><b>Body : </b></span> {this.props.formValues.body}</p>
                <p><span><b>Emails : </b></span> {this.props.formValues.emails}</p>
                
                <button className="btn left darken-3 yellow" onClick={this.props.onMakeChangesClick}>
                    Make changes
                </button>
                
                <button onClick={()=> {this.sendSurvey(this.props.formValues, this.props.history)}} className="btn right green">
                    <i className="material-icons right">email</i>
                    Send Survey
                </button>
            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        formValues : state.form.surveyForm.values
    }
}

function mapDispatchToProps(dispatch){
    return{
        submitSurvey : (surveyData)=> dispatch(submitSurvey(surveyData))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(SurveyFormReview));

