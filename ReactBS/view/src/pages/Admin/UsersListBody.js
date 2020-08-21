import React, { Component } from "react";
import { connect } from "react-redux";
import UsersListRow from "./UsersListRow";
import { getUsersByVisibilityFilter } from "../../redux/selectors";
import { getUsersAPI } from "../../redux/actions";
import { ListGroup } from "react-bootstrap";

class UsersListBody extends Component {
    constructor(props) {
        super(props);

    }

    render() {        
        return (
            <ListGroup >
                
            </ListGroup >               
        )
    }
} 

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    const users = getUsersByVisibilityFilter(state, visibilityFilter);
    return { users };
};

export default connect(
    mapStateToProps,
    {getUsersAPI}
)(UsersListBody);