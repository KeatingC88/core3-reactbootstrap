import {
    ADD_USER, EDIT_USER, SET_FILTER, FETCH_USERAPI, TOGGLE_USER_ACCOUNT_STATUS
} from "./actionTypes";

import axios from "axios";

let idCount = 0;
//Add a User by Email to the User List on the Admin Page.
export const addUser = (email) => {    
    return function (dispatch) {
        const userObject = {
            id: ++idCount,
            email: email,
            admin: false,
            active: true
        }//post-write to this api
        return axios.post('https://localhost:44338/api/users/', userObject).then(({ data }) => {
            dispatch(addUserToState(data))
            }
        )
    }
}
//Add User to the Redux Store after adding a user by param to the User List on the Admin Page.
export const addUserToState = (data) => ({
    type: ADD_USER,
    payload: data
});

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
    return function (dispatch) {
        if (user.admin === false) {
            user.admin = true;
        } else {
            user.admin = false;
        }
        return axios.put('https://localhost:44338/api/users/' + id, user).then((data) => {
            dispatch(toggleUserAdminStatusToState())
        })
    }
}

export const toggleUserAdminStatusToState = () => ({
    type: TOGGLE_USER_ACCOUNT_STATUS
});

//Toggle Active/Inactive Accounts on the {User List} for the {Admin Page}.
export const toggleUserAccountStatus = (user) => {
    return function (dispatch) {
        if (user.active === false) {
            user.active = true;
        } else {
            user.active = false;
        }
        return axios.put('https://localhost:44338/api/users/' + user.id, user).then((data) => {
            dispatch(toggleUserAccountStatusToState(data))
        })
    }
}
//After Toggling the Account by Active/Inactive, then update the Redux Store.
export const toggleUserAccountStatusToState = () => ({
    type: TOGGLE_USER_ACCOUNT_STATUS
});

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });