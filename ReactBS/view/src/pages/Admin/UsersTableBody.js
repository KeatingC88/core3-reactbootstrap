import React, { Component } from "react";
import { connect } from "react-redux";
import UserTableRow from "./UserTableRow";
import { getUsersByVisibilityFilter } from "../../redux/selectors";
import { getUsersAPI } from "../../redux/actions";

class UsersTableBody extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getUsersAPI();
    }

    render() {
        const { users } = this.props;
        this.props.getUsersAPI();
        return (
            <tbody>
                {users && users.length
                    ? users.map((user, index) => {
                        return <UserTableRow key={user.id} user={user} />;
                    }) : <tr><td>No Users Found or...</td><td>No Users at all or...</td><td>Codeflow is broken...</td><td>Try Adding a User...</td></tr>
                }
            </tbody>   
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
    { getUsersAPI }
)(UsersTableBody);