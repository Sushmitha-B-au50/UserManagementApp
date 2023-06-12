import * as types from "./actionType";
import {API } from "../API";


const getUsers = (users) =>(
    {
        type:types.GET_USERS,
        payload:users,
    });


const AddUser = (user) =>(
    {
        type:types.ADD_USER

    });
const UpdateUser = (Product) =>(
    {
        type:types.ADD_USER

    });
const DeleteUser = () =>(
    {
        type:types.DELETE_USER
    });
    



export const loadUsers = () => {
    return async (dispatch) => {
            debugger;
            const response = await API.get('/users/');
            dispatch(getUsers(response.data));
            return response;
    }
  }

export const adduser=(user) => async dispatch =>
{
    debugger;
     try{
        const response = await API.post('/users/addUser',user);
        dispatch(AddUser());
         return response;
     }
    catch(err){
                return err;
             }
}


export const updateuser=(id,user) => async dispatch =>
{
    debugger;
     try{
        const response = await API.put(`/users/${id}`,user);
        dispatch(UpdateUser());
        return response;
     }
    catch(err){
                return err;
             }
}


export const deleteUser=(email) => async dispatch =>
{
    debugger;
     try{
        const response = await API.delete(`/users/${email}`);
        dispatch(DeleteUser());
        return response;
     }
    catch(err){
                return err;
             }
}

