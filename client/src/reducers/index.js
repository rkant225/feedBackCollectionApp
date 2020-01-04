import {combineReducers} from 'redux';
import authReducer from './authReducer.js';
import {reducer as surveyReducer} from 'redux-form';

export default combineReducers({
    auth : authReducer,
    form : surveyReducer
});
