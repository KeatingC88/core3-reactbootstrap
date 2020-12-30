import {
    ADD_USER,
    EDIT_USER,
    SET_FILTER,
    FETCH_USERAPI,
    TOGGLE_USER_ACCOUNT_STATUS
} from "./actionTypes";

import axios from "axios";

let idCount = 0;
/*Add a User by Email to the User List on the Admin Page.*/
export const addUser = (email) => {    
    return function (dispatch) {
        const userObject = {
            id: ++idCount,//Assigning the ID from Client-side level.
            email: email,//User must provide an email.
            admin: false,//Default accounts are not admins.
            active: true//Default enables the account to be active.
        }//userObject.
        return axios.post('https://localhost:44338/api/users/', userObject).then(({ data }) =>
        {
            //Dispatch to the ReduxStore.
            dispatch(addUserToState(data))
            //...
        })//then(Data)
    }
}//addUser Method.
/*Add User to the Redux Store after adding a user by param to the User List on the Admin Page.*/
export const addUserToState = (data) => ({
    type: ADD_USER,
    payload: data
});//addUserToState

export const editUserEmail = (id, user, newEmail) => {
    user.email = newEmail;
    return axios.put('https://localhost:44338/api/users/' + id, user).then(
        editUserEmailToState()
    )
}

export const editUserEmailToState = () => ({
    type: EDIT_USER
});

//Fetch User API for User List on the Admin Page.
export const startUsersAPI = () => {
    return function (dispatch) {
        return axios.get('https://localhost:44338/api/users').then(({ data }) => {
            dispatch(setUsersAPIDataToState(data))
            idCount = data.length;
        });
    }
}

//After Fetching Users, Update the Redux Store for the User List on the Admin Page.
export const setUsersAPIDataToState = (data) => ({
    type: FETCH_USERAPI,
    payload: data
});

//Toggle Admin Status on the User List on the Admin Page.
export const toggleUserAdminStatus = (id, user) => {
    return function (dispatch) {//Dispatching to Redux Store.
        user.admin = !user.admin;//Toggle Boolean for User Admin Status.
        return axios.put('https://localhost:44338/api/users/' + id, user).then(() => {//Put Request Then
            dispatch(toggleUserAdminStatusToState())//Dispatch to Redux Store using this Method Criteria.
        })//HTTP PUT Request Then use the specified method.
    }//Dispatched to Redux Store.
}//toggleUserAdminStatus

/*Dispatch*/
export const toggleUserAdminStatusToState = () => ({
    type: TOGGLE_USER_ACCOUNT_STATUS
});

//Toggle Active/Inactive Accounts on the {User List} found on the {Admin Page}.
export const toggleUserAccountStatus = (user) => {//toggleUserAccountStatus
    return function (dispatch) {//Dispatching to Redux Store
        user.active = !user.active;//Toggle Boolean for User Active Status.
        return axios.put('https://localhost:44338/api/users/' + user.id, user).then((data) => {
            dispatch(toggleUserAccountStatusToState(data))//Dispatch using this method.
        })//HTTP Put Requested and Then finished using the method.
    }//Dispatched to Redux Store.
}//toggleUserAccountStatus.

//After Toggling the Account by Active/Inactive, then update the Redux Store.
export const toggleUserAccountStatusToState = () => ({
    type: TOGGLE_USER_ACCOUNT_STATUS
});

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });