//React-Bootstrap
import React, { Component } from 'react';
import { Row, Col, Card, Table, Tab, Tabs, Accordion, Alert } from 'react-bootstrap';
//Redux Store Connector
import { connect } from "react-redux";
//Page Components
import AddUser from './AddUser';
import UsersTableBody from './UsersTableBody';
import UsersListBody from './UsersListBody';
//Redux Store Components
import { getUsersByVisibilityFilter } from "../../redux/selectors";
import { startUsersAPI } from "../../redux/actions";
//Web-App Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

class Admin extends Component {    
    
    constructor(props) {
        super(props);
        this.state = {
            key: "home",//Default Tab that acts as a Cover-Page.
        }

    }
    
    render() {
        this.props.startUsersAPI();//This fetches the USER API consistently and only applied on the Admin Page Currently.
        //...
        //const elementz = <FontAwesomeIcon icon={faCoffee} />;
        return (
            <Row className="mt-5">
                <Col>
                    <h1 className="text-center mb-5">Admin Panel</h1>
                    <Card className="w-50 mx-auto mt-5">
                        <Card.Body>
                            <Row>
                                <Col>
                                    <h4>Data Viewing Selections</h4>
                                    <Tabs activeKey={this.state.key} onSelect={(key) => this.setState({ key })}>
                                        <Tab eventKey="home">
                                            <h1 className="text-center">User List</h1>
                                            <Alert variant="dark">
                                                Select How to View Users by using the tabs at the top left.
                                            </Alert>
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
                                                <UsersTableBody users={this.props.users}  />
                                            </Table>
                                        </Tab>                                        
                                        <Tab eventKey="accordion" title="Accordion">

                                        </Tab>
                                        <Tab eventKey="list" title="List">                                            
                                            <UsersListBody users={this.props.users} />                                            
                                        </Tab>
                                    </Tabs>
                                </Col>
                            </Row>                            
                        </Card.Body>
                        <Card.Footer>
                            <Row>
                                <Col>
                                    <AddUser />
                                </Col>
                            </Row>
                        </Card.Footer>
                    </Card>
                </Col>
            </Row>
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
    { startUsersAPI }
)(Admin);