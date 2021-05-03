import React from "react";
import { connect } from "react-redux";
import cx from "classnames";
import { toggleUserAdminStatus, editUserEmail, toggleUserAccountStatus } from "../../../../redux/actions";
import { Button, ButtonGroup, FormControl, InputGroup, Popover, OverlayTrigger } from "react-bootstrap";

let input = "";

const handleSubmit = (id, user) => {
    //Close PopUp...    
}

const updateInput = (_input) => {
    input = _input;
}

const UserElement = ({ user, toggleUserAdminStatus, toggleUserAccountStatus, editUserEmail }) => (
    <tr>
        <td>
            {user.id}
        </td>
        <td onClick={() => toggleUserAccountStatus(user)}>
            {user && user.active ? "Yes" : "No"} {" "} 
        </td>
        <td onClick={() => toggleUserAdminStatus(user.id, user)}>
            {user && user.admin ? "Yes" : "No"} {" "}
        </td>
        <td 
            className={cx(
                "user-account",
                user && user.adminUser && "admin-account",
                "text-center")}
        >
            {user.email}
            <ButtonGroup toggle size="sm" className="float-center">

                <OverlayTrigger rootClose={true} trigger="click" placement="left" overlay=
                    {
                    <Popover>
                        <Popover.Title>Change {user.email}?</Popover.Title>
                        <Popover.Content>
                            <InputGroup>
                                <FormControl placeholder={user.email} onChange={e => updateInput(e.target.value)}/>
                                <InputGroup.Append>
                                    <Button variant="outline-secondary" onClick={() => {
                                        editUserEmail(user.id,user,input);
                                    }}>Save Email</Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Popover.Content>
                    </Popover>
                }>
                <Button variant="outline-secondary">Edit</Button>
                </OverlayTrigger>

                <Button variant="outline-secondary" onClick={() => toggleUserAdminStatus(user.id, user)}>
                    {user && user.admin ? "Revert to User Account" : "Make Admin Account"}
                </Button>                
                <Button variant="outline-secondary" onClick={() => toggleUserAccountStatus(user)}>
                    {user && user.active ? "Disable Account" : "Enable Account"}
                </Button>
            </ButtonGroup>
        </td>
    </tr>
);

export default connect(
    null,
    { toggleUserAdminStatus, editUserEmail, toggleUserAccountStatus }
)(UserElement);