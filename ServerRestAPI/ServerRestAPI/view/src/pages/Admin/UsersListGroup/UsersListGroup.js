import React, { Component } from "react";
import { ListGroup } from "react-bootstrap";
import UserListRow from './UserListRow/UserListRow';

class UsersListGroup extends Component {

    render() {
        const users = this.props.users;
        return (
            <ListGroup className="mt-5">
                {users && users.length
                    ? users.map((user) => {
                        return <UserListRow key={user.id} user={user} />;
                    }) : "No Users Found or...No Users at all or...Codeflow is broken...Try Adding a User..."
                }
            </ListGroup>
        )
    }
}

export default UsersListGroup;