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
            dispatch(addUserToState(data))//this one works
            //console.log(data)
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
    return axios.put('https://localhost:44338/api/users/' + id, user)     
}

//Fetch User API for User List on the Admin Page.
export const getUsersAPI = () => {
    return function (dispatch) {
        return axios.get('https://localhost:44338/api/users').then(({ data }) => {
            dispatch(setUsersAPIToState(data))//this one works!
            idCount = data.length;
        });
    }
}

//After Fetching Users, Update the Redux Store for the User List on the Admin Page.
export const setUsersAPIToState = (data) => ({
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
        return axios.put('https://localhost:44338/api/users/' + id, user)
    }
}

export const toggleUserAccountStatus = (user) => {
    return function (dispatch) {
        const userObject = {
            id: user.id,
            email: user.email,
            admin: user.admin,
            active: user.active
        }

        if (userObject.active === false) {
            userObject.active = true;
        } else {
            userObject.active = false;
        }

        return axios.put('https://localhost:44338/api/users/' + userObject.id, userObject).then(({ data }) => {
            dispatch(toggleUserAccountStatusToState(data))//doesnt work
            //console.log(data)
            //console.log(({ data }))
        })
    }
}

export const toggleUserAccountStatusToState = (data) => ({
    type: TOGGLE_USER_ACCOUNT_STATUS,
    payload: data
});

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });