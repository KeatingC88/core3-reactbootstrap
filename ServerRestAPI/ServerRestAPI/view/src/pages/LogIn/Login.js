import React, { Component } from 'react';
import { Jumbotron, Container, Button } from 'react-bootstrap';
import { LoginMenu } from '../../security/authorizations/LoginMenu';

class LogIn extends Component {
    render() {
        return (
            <Jumbotron fluid>
                <Container>
                    <h1>Login Methods</h1>
                    <LoginMenu></LoginMenu>
                </Container>
            </Jumbotron>
        )
    }
}

export default LogIn;