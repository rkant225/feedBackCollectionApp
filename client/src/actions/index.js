import axios from 'axios';
import {FETCH_USER,START_SERVICE_CALL} from './types'

//export const fetchUser = () => {
//    return function(dispatch){
//        axios
//            .get('/api/current_user')
//            .then(res => dispatch({type : FETCH_USER, payload : res}))
//    }
//}

export const fetchUser = () =>  async (dispatch) => {
    dispatch({type : START_SERVICE_CALL})
    const res = await axios.get('/api/current_user');    
    dispatch({type : FETCH_USER, payload : res.data})
} 

export const handleToken = (token) => async (dispatch) =>{
    dispatch({type : START_SERVICE_CALL})
    const res = await axios.post('/api/stripe',token);
    dispatch({type : FETCH_USER, payload : res.data});
}

export const submitSurvey = (surveyData) => async (dispatch) =>{
    dispatch({type : START_SERVICE_CALL})
    const res = await axios.post('/api/surveys',surveyData);
    dispatch({type : FETCH_USER, payload : res.data});
    //dispatch({type : SUBMIT_SURVEY, payload : {}})
}

