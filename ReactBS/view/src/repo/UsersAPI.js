import React, { Component } from "react";
import { connect } from "react-redux";

class UsersAPI extends Component {

    constructor(props) {
        super(props)
        console.log("userapi");
    }
}
export default connect(

)(UsersAPI);


    //getUserByID
    //getUserByEmail
    //addUserByEmailAccount
    //addUserByAdminPanel
    //updateUserByAdminPanel
    //updateUserByProfileInput
    //deleteUser