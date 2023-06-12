import * as types from "../actions/actionType"

const initialState = {
    users:[],
    user:[],
}

export const  userReducer = (state = initialState,action) =>
{
    switch (action.type) {
      case types.GET_USERS:
        return{
            ...state,
            users:action.payload,
        }
        case types.ADD_USER:
            return{
                ...state,
                user:action.payload,
            }
        case types.DELETE_USER:
            return{
                ...state,
                user:action.payload,
            }
        default:
            return state;
    }     

}
