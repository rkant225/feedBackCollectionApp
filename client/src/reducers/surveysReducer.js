import {FETCH_SURVEYS, START_FETCH_SURVEYS} from '../actions/types.js';

const initialState ={
    surveys : [],
    isLoading : false
}

export default function(state = initialState, action){
    switch(action.type){
        case START_FETCH_SURVEYS:
            return{
                ...state,
                surveys : [],
                isLoading : true
            }
        case FETCH_SURVEYS:
            return{
                ...state,
                surveys : action.payload,
                isLoading : false
            }
        default:
            return state            
    }
}
