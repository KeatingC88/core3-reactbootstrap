import { React, Component } from "react";
import { connect } from "react-redux";
import { toggleUserAdminStatus, editUserEmail, toggleUserAccountStatus } from "../../redux/actions";
import { ListGroup } from "react-bootstrap";

class UsersListRow extends Component {
    constructor(props) {
        super(props);
        
    }


    render() {
        return (
            <ListGroup.Item>
                
            </ListGroup.Item>    
        )
    }
}

export default connect(
    null,
    { toggleUserAdminStatus, editUserEmail, toggleUserAccountStatus }
)(UsersListRow);