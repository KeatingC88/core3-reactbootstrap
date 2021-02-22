//React
import React, { Component, Fragment } from 'react';//React Lib
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';//React's Router

//Redux Application State/Store Library
import { connect } from "react-redux";//Redux Store Connection
import { updateUserAuthenticationStatus } from "./redux/actions";//Authenticate the User to the App's State Management System.

//Design
import { Container, Navbar, Nav } from "react-bootstrap";

//Application Pages
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import LogIn from './pages/LogIn/LogIn';
import UserProfile from './pages/UserProfile/UserProfile';

//import logo from './logo.svg';
import './index.css';
import './App.css';
import { ApplicationName } from './constants';

//Authentication and Authorization
import AuthorizeRoute from './security/authorizations/AuthorizeRoute';
import ApiAuthorizationRoutes from './security/authorizations/ApiAuthorizationRoutes';
import authService from './security/authorizations/AuthorizeService';
import { ApplicationPaths } from './security/authorizations/ApiAuthorizationConstants';

//DateTime Lib
//import moment from 'moment';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            user: {},
            populateState: this.populateState()
        };
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.state.populateState);
        this.populateState();
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()]);//This Auth Service.
        this.setState({ isAuthenticated: isAuthenticated, user: user });//This Class State.
        this.props.updateUserAuthenticationStatus(isAuthenticated, user);//This App State.
        /*
        console.log("AppLevelState-isAuthenticated: " + this.state.isAuthenticated);
        console.log("AppLevelState-User: Start");
        console.log(this.state.user);
        console.log("AppLevelState-User: End");
        */
    }

    authView = () => {
        if (!this.state.isAuthenticated) {
            const registerPath = `${ApplicationPaths.Register}`;
            const loginPath = `${ApplicationPaths.Login}`;
            return this.anonymousView(registerPath, loginPath);
        } else {
            const profilePath = `${ApplicationPaths.Profile}`;
            const logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };
            return this.authenticatedView(this.state.user.name, profilePath, logoutPath);
        }
    }//Decide which View to use: (A || B)

    authenticatedView(userName, profilePath, logoutPath) {//Modified, so this works. This is breaking the original code.
        return (
            <Fragment>
                <Nav.Link href="/admin">Admin Tools</Nav.Link>
                <Nav.Link tag={Link} href="/profile" to="/profile">Profile</Nav.Link>
                <Nav.Link tag={Link} href="/authentication/logout" to="/authentication/logout">Logout</Nav.Link>
                <Nav.Link tag={Link} href="Identity/Account/Manage/Index" to="Identity/Account/Manage/Index">Logged as: {this.state.user.name}</Nav.Link>
            </Fragment>
        );//Original Example: <Nav.Link tag={Link} href={foo} to={bar}>Public-Text-String</Nav.Link>        
    }//This is for View A: authenticated User's view.

    anonymousView(registerPath, loginPath) {
        return (
            <Fragment>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link tag={Link} href={registerPath} to="/authentication/register">Register via Email</Nav.Link>
            </Fragment>
        );
    }//This is for View B: unauthenticated User's view.

    /*
     * Protect a client-side route by using the AuthorizeRoute component instead of the plain Route component. 
     * For example, notice how the fetch-data route is configured within the App component:
     * <AuthorizeRoute path='/fetch-data' component={FetchData} />
     * 
     * Protecting a route:
        (-) Doesn't protect the actual endpoint (which still requires an [Authorize] attribute applied to it).
        (-) Only prevents the user from navigating to the given client-side route when it isn't authenticated.
    */
    render = () => {
        return (
            <Container fluid>

                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="home">{ApplicationName}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/home">Home</Nav.Link>                            
                            {this.authView()}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Router>
                    <Route exact path="/" component={Home} />
                    <Route path="/Home" component={Home} />                    
                    <Route path="/Login" component={LogIn} />

                    <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />

                    <AuthorizeRoute path="/Profile" component={UserProfile} />
                    <AuthorizeRoute path="/Admin" component={Admin} />                    
                </Router>

            </Container>
        );//Return from Render
    }//Render
}

export default connect(
    null,
    { updateUserAuthenticationStatus }
)(App);
