import React, { Component } from 'react';
import { Row, Col, Card, Table, Tab, Tabs, Accordion } from 'react-bootstrap';
import AddUser from './AddUser';
import UsersTableBody from './UsersTableBody';
import UsersListBody from './UsersListBody';
import { connect } from "react-redux";
import { getUsersAPI } from "../../redux/actions";

class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            key: "home",
            users: getUsersAPI()
        }
    }

    componentDidMount() {
        console.log(this.state.users);
        console.log(this.state.users);
    }
    
    render() {
        
        const users = getUsersAPI();
        console.log(users);
        
        return (
            <Row className="mt-5">
                <Col>
                    <h1 className="text-center mb-5">Admin Panel</h1>
                    <Card className="w-50 mx-auto mt-5">
                        <Card.Body>
                            <Row>
                                <Col>
                                    <h4>View Selections</h4>
                                    <Tabs activeKey={this.state.key} onSelect={(key) => this.setState({ key })}>
                                        <Tab eventKey="home">
                                            <h1 className="text-center">User List</h1>
                                        </Tab>
                                        <Tab eventKey="table" title="Table">
                                            <Table striped bordered hover size="sm" className="mt-5">
                                                <thead>
                                                    <tr>
                                                        <th>ID#</th>
                                                        <th>Active</th>
                                                        <th>Admin</th>
                                                        <th>Email</th>
                                                    </tr>
                                                </thead>
                                                <UsersTableBody users={users}  />
                                            </Table>
                                        </Tab>                                        
                                        <Tab eventKey="accordion" title="Accordion">

                                        </Tab>
                                        <Tab eventKey="list" title="List">                                            
                                            <UsersListBody />                                            
                                        </Tab>
                                    </Tabs>
                                </Col>
                            </Row>                            
                        </Card.Body>
                    </Card>
                    <Card className="w-50 mx-auto mt-5">
                        <Card.Body>
                            <Row>
                                <Col>
                                    <AddUser />
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        )
    }
}

export default connect(
    null,
    {getUsersAPI}
)(Admin);