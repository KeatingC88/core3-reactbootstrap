import React, { Component } from "react";
import UserTableRow from "./UserTableRow";

class UsersTableBody extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const users = this.props.users;
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

export default UsersTableBody;