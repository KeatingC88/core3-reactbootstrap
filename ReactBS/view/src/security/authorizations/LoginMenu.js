import React, { Component, Fragment } from 'react';
import { NavItem, NavLink } from 'reactstrap';
import { Nav } from 'react-bootstrap';
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

        console.log(this.props);
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

        console.log(isAuthenticated);
        console.log(user);

        this.setState({
            isAuthenticated,
            userName: user && user.name
        });
    }

    render() {
        const { isAuthenticated, userName } = this.state;

        console.log(isAuthenticated);
        //console.log(userName);

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
                <Fragment>
                    <Nav.Link tag={Link} className="text-dark" href={profilePath}>Hello {userName}</Nav.Link>
                    <Nav.Link tag={Link} className="text-dark" href={logoutPath}>Logout</Nav.Link>
                </Fragment>
            );
        }

        anonymousView(registerPath, loginPath) {
            return (
                <Fragment>
                    <Nav.Link tag={Link} className="text-dark" href={registerPath}>Register</Nav.Link>
                    <Nav.Link tag={Link} className="text-dark" href={loginPath}>Login</Nav.Link>
                </Fragment>
            );
        }
     
     
}
