//React
import React from "react";
//Redux
import { connect } from "react-redux";
//Action Methods
import { toggleUserAdminStatus, editUserEmail, toggleUserAccountStatus } from "../../../../redux/actions";
//React-BootStrap
import { Button, ButtonGroup, FormControl, InputGroup, Popover, OverlayTrigger, Accordion, Card } from "react-bootstrap";

let input = "";

const handleSubmit = (id, user) => {
    editUserEmail(id, user, input)
}

const updateInput = (_input) => {
    input = _input;
}

export const UserAccordionRow = ({ user, toggleUserAdminStatus, toggleUserAccountStatus }) => (
    <Card>
        <Accordion.Toggle as={Card.Header} eventKey={user.id}>
            {user.email}
        </Accordion.Toggle>
        <Accordion.Collapse eventKey={user.id}>
            <Card.Body>
                <ButtonGroup toggle size="sm" className="float-right">
                    <OverlayTrigger rootClose={true} trigger="click" placement="left" overlay=
                        {
                            <Popover>
                                <Popover.Title>Change {user.email}?</Popover.Title>
                                <Popover.Content>
                                    <InputGroup>
                                        <FormControl placeholder={user.email} onChange={e => updateInput(e.target.value)} />
                                        <InputGroup.Append>
                                            <Button variant="outline-secondary" onClick={() => handleSubmit(user.id, user)}>Save Email</Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Popover.Content>
                            </Popover>
                        }>
                        <Button variant="outline-secondary">Edit</Button>
                    </OverlayTrigger>
                    <Button variant="outline-secondary" onClick={() => toggleUserAdminStatus(user.id, user)}>Admin</Button>
                    <Button variant="outline-secondary" onClick={() => toggleUserAccountStatus(user)}>{user && user.active ? "Disable" : "Enable"}</Button>
                </ButtonGroup>
            </Card.Body>
        </Accordion.Collapse>
    </Card>
);

export default connect(
    null,
    { toggleUserAdminStatus, editUserEmail, toggleUserAccountStatus }
)(UserAccordionRow);