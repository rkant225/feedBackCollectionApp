import React from 'react';
import {reduxForm, Field} from 'redux-form';
import SurveyField from './SurveyField.js'
import {Link} from 'react-router-dom'
import validateEmails from '../../utills/validateEmails.js'

const FIELDS =[
        {label : "Survey title", name : "title"},
        {label : "Subject line", name : "subject"},
        {label : "Email body", name : "body"},
        {label : "Recipient list", name : "emails"}
    ];

class SurveyForm extends React.Component {    
    
    
    renderFields(){
        return(
            <div>
                {FIELDS.map((field,i) => <Field key={i} label={field.label} type="text" name={field.name} component={SurveyField}/>)}
            </div>
        );
    }
    
    render(){
      return (
        <div>
            <form onSubmit={this.props.handleSubmit((values)=>{this.props.onNextClick()})}>
                {this.renderFields()}
                
                <Link to="/surveys" className="btn left red">Cancel</Link>
                
                <button className="btn right" type="submit">
                    <i className="material-icons right">done</i>
                    Next
                </button>
            </form>            
        </div>
     );
  }
}

function validate(values){

    const errors = {};
    /*
    if(!values.title){
        errors.title = "You must provide title."
    }
    if(!values.subject){
        errors.subject = "You must provide subject."
    }
    if(!values.body){
        errors.body = "You must provide body."
    }
    */
    
    errors.emails = validateEmails(values.emails || "");
    
    FIELDS.map(field => {
        if(!values[field.name]){            
            errors[field.name] = "You must provide a value."
        }
        
        return [];
    })
    
    
    return errors;
}

export default reduxForm({
    validate : validate,
    form : 'surveyForm',
    destroyOnUnmount : false
})(SurveyForm);

