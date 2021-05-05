//Import React JS Components.
import React, { Component, Fragment } from 'react';//ReactJS Lib.
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';//React's Router (Document Object Model) Library.
//Import React-Bootstrap Components.
import { Container, Navbar, Nav } from "react-bootstrap";//ReactJS Library for Bootstrap.
//Import React-Redux System (Web State/Storage) Library.
import { connect } from "react-redux";//Redux Store System Connector. This enables the web "store" to share Web ReactJS-State between web pages and components.
import { updateUserAuthenticationStatus } from "./redux/actions";//Update Redux Store: Current User that is using this applcation Authentication Status (if they are logged into this application system or not).
//Import the Application's Web/View of the MVC Pages.
import Home from './pages/Home/Home';//Pulling Home Component Class.
import Admin from './pages/Admin/Admin';//Pulling Admin Component Class.
import LogIn from './pages/LogIn/LogIn';//Pulling Log In Component Class.
import UserProfile from './pages/UserProfile/UserProfile';//Pulling User Profile Component Class.
//import logo from './logo.svg';//Web Browser's Icon.
//Import CSS Style Sheets for the whole Application.
import './index.css';//Index Style Sheet.
import './App.css';//Application Style Sheet.
//Authentication and Authorization for the Website Security Hosted by Identity Server.
import { ApplicationName } from './constants';//Pulling Global Application Variables used throughout this application system.
import AuthorizeRoute from './security/authorizations/AuthorizeRoute';//Pulling Authorization JSX Element to be used in the React Router DOM.
import ApiAuthorizationRoutes from './security/authorizations/ApiAuthorizationRoutes';//Collection of Routes to be used with Identity Server. (i.e. places in website that require a login authorization approval)
import authService from './security/authorizations/AuthorizeService';//Pulling Authorization Methods for Identity Server for Pre and POST Authentication Processes.
import { ApplicationPaths } from './security/authorizations/ApiAuthorizationConstants';//Pulling Application Paths for Identity Server to use during Authentication Processes.
//Define App Class as the Index and Default Application.
class App extends Component {
    constructor(props) {//Constructor with no props as this is the Root of the Front-Side Application. These update when using ReactJS with respect.
        super(props);//Example of Props for future Components Classes, this one is ideally empty as we're in the root of the application.
        this.state = {//Example and Use of React's State and Redux Storage Stage Object.
            isAuthenticated: false,//Is the User Authenticated with the Website? Default is false, but this is changed after Authentication Process (via registering and then logging into the website).
            user: {},//Empty User Object for the Authentication Process to use and updates POST successful authentications.
            populateState: this.populateState()//Authentication State that updates constantly checking if the User is Authenticated in miliseconds.
        };//End App Component State.
    }//End Constructor.
    //Documents on how this began are found on Tutorials in MSVS and starting on MS website here: https://docs.microsoft.com/en-us/aspnet/core/security/authentication/identity-api-authorization?view=aspnetcore-5.0#authenticate-api-requests-react
    componentDidMount() {//React Method to establish if the User is Authenticated already and returning to the website when loading this application.
        this._subscription = authService.subscribe(() => this.state.populateState);//Processing to see if the User has Logged into the website.
        this.populateState();//Update the Redux State with the attempt of seeing the User is currently authorized with the website (logged in) or if the User is not authorized (signed into) the Identity Server.
    }//End ComponentDidMount
    //Prepare to Unsubcribe the User from the website (Logging them Out of Identity4Server).
    componentWillUnmount() {//React Method that will fire when User is closing the Application (browser tab). 
        authService.unsubscribe(this._subscription);
    }//End of UnMount Method
    //Update Redux Storage State System with the User's Authenticated Credentials -- if any.
    async populateState() {//Asyncing Authentication Credentials, if any, with Redux Here.
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()]);//This Auth Service.
        this.setState({ isAuthenticated: isAuthenticated, user: user });//This is updating Redux Storage State.
        this.props.updateUserAuthenticationStatus(isAuthenticated, user);//This is updating Redux Storage state again.
        /* These are useful for debugging whether the User is Authenticated or not in Console.... Try not to delete them from here.
        console.log("AppLevelState-isAuthenticated: " + this.state.isAuthenticated);
        console.log("AppLevelState-User: Start");
        console.log(this.state.user);
        console.log("AppLevelState-User: End");
        */
    }
    //Authentication Views are decided here based on if the User is Authenticated in IdentityServer4 or not.
    authViewAssembler = () => {//Authenticated View Paths for Identity4 to Use.
        if (!this.state.isAuthenticated) {//Authentication is (False)
            const registerPath = `${ApplicationPaths.Register}`;//Assemble Register Link as a String.
            const loginPath = `${ApplicationPaths.Login}`;//Assemble Login String.
            return this.anonymousView(registerPath, loginPath);//Return Method.
        } else {//UnAuthenticated View for Identity to use. Authentication is (True)
            const profilePath = `${ApplicationPaths.Profile}`;//Profile Link as String into this Variable.
            const logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };//LogOut Link as a String.
            return this.authenticatedView(this.state.user.name, profilePath, logoutPath);//Return Method.
        }//End Decision.
    }//Decide which View to use: (A || B)
    //This View us Called when the authViewAssembler() method decides if the User is Authenticated.
    authenticatedView() {//This gets returned as a piece of HTML code to the NavBar when the User is authenticated.
        return (//Return this React JSX code to the NavBar.
            <Fragment>
                <Nav.Link href="/admin">Admin Tools</Nav.Link>
                <Nav.Link tag={Link} href="/profile" to="/profile">Profile</Nav.Link>
                <Nav.Link tag={Link} href="/authentication/logout" to="/authentication/logout">Logout</Nav.Link>
                <Nav.Link tag={Link} href="Identity/Account/Manage/Index" to="Identity/Account/Manage/Index">Logged as: {this.state.user.name}</Nav.Link>
            </Fragment>
        );//Original Example: <Nav.Link tag={Link} href={foo} to={bar}>Public-Text-String</Nav.Link>        
    }//This is for View A: authenticated User's view.
    //This View us Called when the authViewAssembler() method decides if the User is NOT Authenticated.
    anonymousView(registerPath, loginPath) {
        return (//Return this React JSX code to the NavBar.
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
                            {this.authViewAssembler()}
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
        );//End of Return
    }//End of Render
}//End of Class

export default connect(
    null,
    { updateUserAuthenticationStatus }//Update the Page/Application/Website with the User's Authentication Status.
)(App);//End of React-Redux Connect.
