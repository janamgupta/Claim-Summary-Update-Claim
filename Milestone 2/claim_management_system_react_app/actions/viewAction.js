import { Claim_List } from './viewTypes.js'

export const claimList = claims =>{
    return {
        type : Claim_List,
        payload : claims
    }
}