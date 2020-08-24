import React, { Component } from "react";
import { Accordion } from 'react-bootstrap';
import { UserAccordionRow } from "./UserAccordionRow";

class UsersAccordion extends Component {

    constructor(props) {
        super(props);        
    }

    render() {
        //...
        const users = this.props.users;        
        return (
            <Accordion defaultActiveKey="0" className="mt-5">
                {users && users.length
                    ? users.map((user) => {
                        return <UserAccordionRow key={user.id} user={user} />;
                    }) : "No Users Found or...No Users at all or...Codeflow is broken...Try Adding a User..."
                }
            </Accordion>
        )
    }

}

export default UsersAccordion;