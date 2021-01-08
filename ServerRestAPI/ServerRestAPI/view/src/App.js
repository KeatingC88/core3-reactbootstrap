//React
import React, { Component, Fragment } from 'react';//React Lib
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';//React's Router

//Redux Application State/Store Library
import { connect } from "react-redux";//Redux Store Connection

//Design
import { Container, Navbar, Nav, Button } from "react-bootstrap";

//Application Pages
import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';
import LogIn from './pages/LogIn/LogIn';

//import logo from './logo.svg';
import './index.css';
import './App.css';
import { ApplicationName } from './constants';

//Authentication and Authorization
import AuthorizeRoute from './security/authorizations/AuthorizeRoute';
import ApiAuthorizationRoutes from './security/authorizations/ApiAuthorizationRoutes';
import authService from './security/authorizations/AuthorizeService';
import { ApplicationPaths } from './security/authorizations/ApiAuthorizationConstants';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            user: {}
        };        
    }

    componentWillMount() {
        this.populateState();
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.populateState());
        this.populateState();
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()]);
        this.setState({ isAuthenticated: isAuthenticated, user: user });

        console.log(this.state.user);
        console.log(this.state.isAuthenticated);
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
    }//Decide which View (A,B)

    authenticatedView(userName, profilePath, logoutPath) {
        //Modified so this works. This is breaking design pattern.
        return (
            <Fragment>
                <Nav.Link href="/admin">Admin</Nav.Link>
                <Nav.Link tag={Link} href="/authentication/logout" to="/authentication/logout">Logout</Nav.Link>
                <Nav.Link tag={Link} href="/authentication/profile" to="/authentication/profile">Profile</Nav.Link>
                <Nav.Link tag={Link} href="Identity/Account/Manage/Index" to="Identity/Account/Manage/Index">Logged as: {this.state.user.name}</Nav.Link>
            </Fragment>
        );
    }//View A

    anonymousView(registerPath, loginPath) {
        return (
            <Fragment>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link tag={Link} href={registerPath} to="/authentication/register">Register via Email</Nav.Link>
            </Fragment>
        );
    }//View B

    render = () => {
        //this.populateState();
        return (

            <Container fluid>

                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="home">{ApplicationName}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/home">Home</Nav.Link>                            
                            {this.authView()}
                            <partial name="_LoginPartial" />
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Router>
                    <Route exact path="/" component={Home} />
                    <Route path="/Home" component={Home} />
                    <Route path="/Admin" component={Admin} />
                    <Route path="/Login" component={LogIn} />
                    <AuthorizeRoute path="/UserProfile" component={Admin} />
                    <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />
                </Router>

            </Container>

        );//Return from Render
    }//Render
}

export default connect(
    null
)(App);
