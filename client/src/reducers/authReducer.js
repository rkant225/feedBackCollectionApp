import {FETCH_USER,START_SERVICE_CALL, SUBMIT_SURVEY} from '../actions/types';

const initialState ={
    userData : {},
    isLoading : false
}
export default function(state = initialState, action){
    switch (action.type){
        case START_SERVICE_CALL:
            return{
                ...state,
                isLoading : true
            }
        case FETCH_USER:
            return {
                ...state,                
                userData : action.payload || false,
                isLoading : false
            };        
        default:
            return state;
    }
}
