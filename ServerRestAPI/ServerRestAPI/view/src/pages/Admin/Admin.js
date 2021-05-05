import React, { Component } from 'react';//Import ReactJS.
import {
    Row, Col,
    Card,
    Tab, Tabs,
    Alert,
    Jumbotron,
    Container
} from 'react-bootstrap';//Import Bootstrap Components from this ReactJS Lib.
//Importing Redux Store Connector.
import { connect } from "react-redux";
//Importinging Page Components that need to be called to Admin Component.
import AddUser from './AddUser/AddUser';//Pull the Add User
import UsersTable from './UsersTable/UsersTable';//Pull the User Table
import UsersListGroup from './UsersListGroup/UsersListGroup';//Pull the User List Group
import UsersAccordion from './UsersAccordion/UsersAccordion';//Pull the User Accordion
//Import Redux Store Components that need to be called to Admin Component.
import { getUsersByVisibilityFilter } from "../../redux/selectors";//This enables what to be visible in act of real-time from Redux Storage System.
import { startUsersAPI } from "../../redux/actions";//This is an action.js where we pull the Users in the Database from Redux Storage System.
//Import Web-App Icons that need to be used in Admin Component.
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";//Pull Icons.
import { faTable, faListOl, faInfo, faBars, faEye, faDatabase, faList } from "@fortawesome/free-solid-svg-icons";//Pull Font Awesome Icons.
//Define the Admin Component
class Admin extends Component {//Extend ReactJS Component Class
    //Define the constructor for this class/component.
    constructor(props) {//Inject Props from the Parent Class.
        super(props);//Super the Props from the Parent Class so we can use the injected/incoming props.
        this.state = {//Define Admin's Class State.
            key: "home",//Define the Default Tab that acts as a Cover-Page for the User Client.
        }//Close State.
    }//Close Constructor.
    //...
    render() {//Default React Component Class that gets overwritten as a clone. This Renders code to the visible page of the browser.
        this.props.startUsersAPI();//This fetches the USER API consistently when placed exactly here(moved from componentdidmount() from reactjs -- as it's deprecated).
        //Icon Elements        
        const barsIcon = <FontAwesomeIcon icon={faBars} />;
        const listOlIcon = <FontAwesomeIcon icon={faListOl} />;//Numeric 1,2,3 List Symbol
        const databaseIcon = <FontAwesomeIcon icon={faDatabase} />;//Database Symbol
        const eyeIcon = <FontAwesomeIcon icon={faEye} />;//Eye Ball Symbol
        const infoIcon = <FontAwesomeIcon icon={faInfo} />;//Information Symbol
        const listIcon = <FontAwesomeIcon icon={faList} />;//Unordered List Symbol
        const tableIcon = <FontAwesomeIcon icon={faTable} />;//Data Table Symbol
        //...
        return (
            <Row className="mt-5">
                <Col>
                    <Jumbotron fluid>
                        <Container>
                            <h1 className="text-center"><b><u>Administrator Control Panel</u></b></h1>
                        </Container>
                    </Jumbotron>
                    <Card className="w-50 mx-auto mt-5" id="admin-useraccountdb-card">
                        <Card.Body>
                            <Row>
                                <Col>
                                    <h4 className="text-center">{eyeIcon} Data-Viewing Options for the User Accounts Database {databaseIcon}</h4>
                                    <Tabs activeKey={this.state.key} onSelect={(key) => this.setState({ key })}>
                                        <Tab eventKey="home">
                                            <h1 className="text-center">User List {infoIcon}nformation</h1>
                                            <Alert variant="dark">
                                                <b>Select</b> on how you would like to view this list of users from the database, simply, by using the tab buttons at the top left corner of this component.
                                            </Alert>
                                        </Tab>
                                        <Tab eventKey="table" title={tableIcon}>
                                            <h1 className="text-center">{tableIcon} | Table | {databaseIcon}</h1>                                            
                                            <UsersTable users={this.props.users} />
                                        </Tab>                                        
                                        <Tab eventKey="accordion" title={barsIcon}>
                                            <h1 className="text-center">{barsIcon} | Accordion | {databaseIcon}</h1>                                            
                                            <UsersAccordion users={this.props.users} />                                            
                                        </Tab>
                                        <Tab eventKey="list" title={listOlIcon}>                   
                                            <h1 className="text-center">{listIcon} | List | {databaseIcon}</h1>
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
        )//End Return
    }//End Render
}//End Admin

const mapStateToProps = state => {
    const { visibilityFilter } = state;
    const users = getUsersByVisibilityFilter(state, visibilityFilter);
    return { users };
};

export default connect(
    mapStateToProps,
    { startUsersAPI }
)(Admin);