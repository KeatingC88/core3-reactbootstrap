import {
    ADD_USER,
    EDIT_USER,
    SET_FILTER,
    FETCH_USER_DATA_FROM_USERS_API,
    TOGGLE_USER_ACCOUNT_STATUS,
    UPDATE_USER_AUTHENTICATION_STATUS,

} from "./actionTypes";//APP Variable Action Types.

import axios from "axios";//HTTPS Library for RESTFUL Services.
import authService from '../security/authorizations/AuthorizeService';//Authentication Tokens for the Server Security Check.
let idCount = 0;//Counter for Database Records and Incrementation for Future User Accounts to be made by the Client User.

/*This function is to Add a User by an Email Input to store the User List (Database) on the /Admin Page and the User must be an Admin Account.*/
export const addUser = (email, admin) => {
    return async function (dispatch) {

        const token = await authService.getAccessToken();//Authentication Token is Required.

        const data = {//Data to be Sent to the Server an Object.
            id: ++idCount,//Assigning the ID based on IdCount Int Mutation.
            email: email,//User must provide an email.
            admin: admin,//User must provide an Admin Account Status.
            active: true//By Default enables the account to be active.
        }//Data Object for the New Email Account that is made by an Admin Account that has Authorization.
        
        return axios.post('https://localhost:44338/api/users/', data, {//Location of the Web API and HTTP Method.
            headers: {
                'Content-Type': 'application/json',//Required by the Web API to successfully make the call.
                'Authorization': 'Bearer ' + token//Set Token to gain Permission Access to the Web API.
            },
        })
        .then((response) => {
            console.log('response', response.data)
            //Record The Email that added the User Account and Description Why.
            //Record who submitted and the email that was entered with the date/time of the local and server.
        })
        .catch((error) => {
            alert('error', error.response)
            //dispatch(userUpdateProfileFail())
        })
        //console.log('response: ', data)
        //dispatch(userUpdateProfileSuccess(data))
    }
}//addUser Method.
/*Add User to the Redux Store after adding a user by param to the User List on the Admin Page.*/
export const addUserToState = (data) => ({
    type: ADD_USER,
    payload: data
});//addUserToState

export const editUserEmail = (id, user, newEmail) => {
    return async function(dispatch) {
        const token = await authService.getAccessToken();//Post Authentication Token is Required.
        const data = {//Data to be Sent to the Server.
            id: id,//Assigning the ID from Client-side level.
            email: newEmail,//User must provide an email.
            admin: user.admin,//User must provide an Admin Account Status.
            active: user.active//By Default enables the account to be active.
        }//Object of Data for the New Email Account that is made by an Admin Account.

        console.log("email: " + user.email);

        return await axios.put('https://localhost:44338/api/users/' + id, data, {
            headers: { 'Authorization': 'Bearer ' + token }//Set Token to gain Permission Access to the Web API.            
        }).then((response) => {
            console.log('response: ', response.data)
            dispatch(editUserEmailToState(response))
        }).catch((error) => {
            alert('error', error.response)
            console.log(error.response);
        })

    } 
}

export const editUserEmailToState = (data) => ({
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
    type: FETCH_USER_DATA_FROM_USERS_API,
    payload: data
});

//Toggle Admin Status on the User List on the Admin Page.
export const toggleUserAdminStatus = (id, user) => {
    return async function (dispatch) {//Dispatching to Redux Store.
        const token = await authService.getAccessToken();//Post Authentication Token is Required.   
        user.admin = !user.admin;//Toggle Boolean for User Admin Status.
        const data = {//Data to be Sent to the Server.
            id: id,//Assigning the ID from Client-side level.
            email: user.email,//User must provide an email.
            admin: user.admin,//User must provide an Admin Account Status.
            active: user.active//By Default enables the account to be active.
        }//Object of Data for the New Email Account that is made by an Admin Account.

        return await axios.put('https://localhost:44338/api/users/' + data.id, data, {
            headers: { 'Authorization': 'Bearer ' + token }//Set Token to gain Permission Access to the Web API.
        }).then(response => { 
            console.log(response)
            dispatch(toggleUserAdminStatusToState(response))//Dispatch to Redux Store using this Method Criteria.
        }).catch(error => {
            alert(error)
            //console.log(error)
        })//HTTP PUT Request Then use the specified method.
    }//Dispatched to Redux Store.
}//toggleUserAdminStatus

/*Dispatch*/
export const toggleUserAdminStatusToState = (data) => ({
    type: TOGGLE_USER_ACCOUNT_STATUS
});

//Toggle Active/Inactive Accounts on the {User List} found on the {Admin Page}.
export const toggleUserAccountStatus = (user) => {//toggleUserAccountStatus
    return async function (dispatch) {//Dispatching to Redux Store
        const token = await authService.getAccessToken();//Post Authentication Token is Required.
        user.active = !user.active;//Toggle Boolean for User Active Status.
        return axios.put('https://localhost:44338/api/users/' + user.id, user, {
            headers: {'Authorization': 'Bearer ' + token}//Set Token to gain Permission Access to the Web API.
        }).then((response) => {
            console.log('response', response.data)
            dispatch(toggleUserAccountStatusToState(response.data))//Dispatch using this method.
        }).catch((error) => {
                alert('error', error.response)
                console.log(error.response);
        })//HTTP Put Method Requested and Then Update the Selected User Account State to the Redux State.
    }//Dispatch to Redux Store.
}//toggleUserAccountStatus.

//After Toggling the Account by Active/Inactive, then update the Redux Store.
export const toggleUserAccountStatusToState = () => ({
    type: TOGGLE_USER_ACCOUNT_STATUS
});

export const setFilter = filter => ({ type: SET_FILTER, payload: { filter } });

//This is for an Authenticated User who has Logged in through the Authentication/Authorization the System.
export const updateUserAuthenticationStatus = (bool, data) => {
    return function (dispatch) {
        dispatch(updateUserAuthenticationStatusToState(bool, data));
    }
}

//This is for an Authenticated User who has Logged in through the Authentication/Authorization the System.
export const updateUserAuthenticationStatusToState = (bool, data) => ({
    type: UPDATE_USER_AUTHENTICATION_STATUS,
    authenticated: bool,
    user: data
});

