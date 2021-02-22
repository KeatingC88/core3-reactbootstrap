//React-Bootstrap
import React, { Component } from 'react';
import {
    Row, Col,
    Card,
    Tab, Tabs,
    Alert,
    Jumbotron,
    Container
} from 'react-bootstrap';
//Redux Store Connector
import { connect } from "react-redux";
//Page Components
import AddUser from './AddUser/AddUser';
import UsersTable from './UsersTable/UsersTable';
import UsersListGroup from './UsersListGroup/UsersListGroup';
import UsersAccordion from './UsersAccordion/UsersAccordion';
//Redux Store Components
import { getUsersByVisibilityFilter } from "../../redux/selectors";
import { startUsersAPI } from "../../redux/actions";
//Web-App Icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTable } from "@fortawesome/free-solid-svg-icons";
import { faCompressAlt } from "@fortawesome/free-solid-svg-icons";
import { faList } from "@fortawesome/free-solid-svg-icons";

class Admin extends Component {    
    
    constructor(props) {
        super(props);
        this.state = {
            key: "home",//Default Tab that acts as a Cover-Page.
        }
    }
    
    render() {
        this.props.startUsersAPI();//This fetches the USER API consistently.
        //Icon Elements
        const tableIcon = <FontAwesomeIcon icon={faTable} />;
        const accordionIcon = <FontAwesomeIcon icon={faCompressAlt} />;
        const listIcon = <FontAwesomeIcon icon={faList} />;
        //...
        return (
            <Row className="mt-5">
                <Col>
                    <Jumbotron fluid>
                        <Container>
                            <h1>Admin Panel</h1>
                        </Container>
                    </Jumbotron>
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
                                            <h1 className="text-center">{tableIcon} Table</h1>                                            
                                            <UsersTable users={this.props.users} />
                                        </Tab>                                        
                                        <Tab eventKey="accordion" title="Accordion">
                                            <h1 className="text-center">{accordionIcon} Accordion</h1>                                            
                                            <UsersAccordion users={this.props.users} />                                            
                                        </Tab>
                                        <Tab eventKey="list" title="List">                   
                                            <h1 className="text-center">{listIcon} List</h1>
                                            <UsersListGroup users={this.props.users} />                                            
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