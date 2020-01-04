import React from 'react';
import SurveyForm from './SurveyForm.js'
import SurveyFormReview from './SurveyFormReview.js';
import {reduxForm} from 'redux-form';

class SurveyNew extends React.Component {    
    constructor(props){
        super(props);
        this.state= {
            showReviewPage : false
        }
    }
    
    render(){
      const content = this.state.showReviewPage ? 
      <SurveyFormReview  onMakeChangesClick={() => this.setState({showReviewPage : false}) } /> : 
      <SurveyForm onNextClick={() => this.setState({showReviewPage : true}) }/>;
      return (
        <div>
            {content}
        </div>
     );
  }
}



export default reduxForm({
    form :'surveyForm'
})(SurveyNew);
