import {combineReducers} from 'redux';
import authReducer from './authReducer.js';
import {reducer as surveyReducer} from 'redux-form';
import fetchSurveysReducer from './surveysReducer.js';

export default combineReducers({
    auth : authReducer,
    form : surveyReducer,
    surveys : fetchSurveysReducer
});
