import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Payments extends React.Component{
    render(){
        return(
            <StripeCheckout
            name={"--Emaily--"}
            description={"Each dolar will count as one credit."}
            amount={500}
            token={(token)=>{this.props.handleToken(token)}}
            stripeKey={process.env.REACT_APP_STRIPE_KEY}>
            <button className="btn">Add credits</button>
            </StripeCheckout>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleToken : (token) => dispatch(actions.handleToken(token))
    }    
}

export default connect(null,mapDispatchToProps)(Payments);

