import { React, Component } from "react";
import { toggleUserAdminStatus, editUserEmail, toggleUserAccountStatus } from "../../redux/actions";
import { ListGroup } from "react-bootstrap";

class UsersListRow extends Component {
    constructor(props) {
        super(props);
        
    }
    render( ) {
        return (
            <div>
                {this.props.user.email}
            </div>
        )        
    }
}

export default UsersListRow;