import { Claim_List } from '../actions/viewTypes.js'

export const claimReducer = (state,action) =>{

    switch(action.type){
        case Claim_List : 
            state = action.payload;
    }
    return state;
};