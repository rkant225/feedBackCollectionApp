import React from 'react';

class SurveyField extends React.Component{
    render(){        
        return(
            <div>
                <label>{this.props.label}</label>
                <input style={{marginBottom : "2px"}} {...this.props.input} />
                {this.props.meta.touched && this.props.meta.error && <div style={{marginBottom : "20px"}} className="red-text">{this.props.meta.error}</div>}
            </div>
        );
    }
}

export default SurveyField;
