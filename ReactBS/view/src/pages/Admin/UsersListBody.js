import React, { Component } from "react";
import { toggleUserAdminStatus, editUserEmail, toggleUserAccountStatus } from "../../redux/actions";
import { Button, ButtonGroup, FormControl, InputGroup, Popover, OverlayTrigger, ListGroup } from "react-bootstrap";

class UsersListBody extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const users = this.props.users;
        return (
            <ListGroup className="mt-5">
                <ListGroup.Item>Cras justo odio</ListGroup.Item>
                <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
                <ListGroup.Item>Morbi leo risus</ListGroup.Item>
                <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
                <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
            </ListGroup>
        )
    }
}

export default UsersListBody;