import React, { Component, Fragment } from 'react';
//import { NavItem, NavLink } from 'reactstrap';
import { Nav, Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import authService from './AuthorizeService';
import { ApplicationPaths } from './ApiAuthorizationConstants';

export class LoginMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false,
            userName: null
        };
    }

    componentDidMount() {
        this._subscription = authService.subscribe(() => this.populateState());
        this.populateState();

        console.log(this._subscription);
        console.log(authService.subscribe());
    }

    componentWillUnmount() {
        authService.unsubscribe(this._subscription);
        console.log(this._subscription);
    }

    async populateState() {
        const [isAuthenticated, user] = await Promise.all([authService.isAuthenticated(), authService.getUser()])
        this.setState({
            isAuthenticated,
            userName: user && user.name
        });
    }

    render() {
        const { isAuthenticated, userName } = this.state;
        if (!isAuthenticated) {
            const registerPath = `${ApplicationPaths.Register}`;
            const loginPath = `${ApplicationPaths.Login}`;
            return this.anonymousView(registerPath, loginPath);
        } else {
            const profilePath = `${ApplicationPaths.Profile}`;
            const logoutPath = { pathname: `${ApplicationPaths.LogOut}`, state: { local: true } };
            return this.authenticatedView(userName, profilePath, logoutPath);
        }
    }

    /*
    authenticatedView(userName, profilePath, logoutPath) {

        console.log(userName);
        console.log(profilePath);
        console.log(logoutPath);

        return (<Fragment>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={profilePath}>Hello {userName}</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={logoutPath}>Logout</NavLink>
            </NavItem>
        </Fragment>);

    }

    anonymousView(registerPath, loginPath) {
        console.log(registerPath);
        console.log(loginPath);
        return (<Fragment>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={registerPath}>Register</NavLink>
            </NavItem>
            <NavItem>
                <NavLink tag={Link} className="text-dark" to={loginPath}>Login</NavLink>
            </NavItem>
        </Fragment>);
    }
    */
    
    authenticatedView(userName, profilePath, logoutPath) {
        return (
            <div>
                <p className="m-0 p-0">Use your email and password.</p>
                <Button tag={Link} className="text-white" href={profilePath}>Hello {userName}</Button>
                <p className="m-0 p-0">Don't have an account?</p>
                <Button tag={Link} className="text-white" href={logoutPath}>Logout</Button>
            </div>
            );
        }

    anonymousView(registerPath, loginPath) {
        return (
            <div>
                <p className="m-0 p-0">Use your email and password.</p>
                <Button tag={Link} className="text-white" href={loginPath}>Login Here</Button>
                <p className="m-0 p-0">Don't have an account?</p>
                <Button tag={Link} className="text-white" href={registerPath}>Register Here</Button>
            </div>
            );
        }
     
     
}
