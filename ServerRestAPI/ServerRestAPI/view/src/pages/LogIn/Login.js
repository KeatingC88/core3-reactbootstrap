import React, { Component } from 'react';
import { Jumbotron, Container, Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-dom';

class LogIn extends Component {
    
    render() {
        return (
            <Jumbotron fluid>
                <Container>
                    <h1>Use an Email Address to:</h1>
                    <ButtonGroup>
                        <Button tag={Link} className="text-white btn-sm" href="/authentication/login" to="/authentication/login">
                            Login!
                        </Button>
                        <Button tag={Link} className="text-white btn-sm" href="/authentication/register" to="/authentication/register">
                            Register!
                        </Button>
                    </ButtonGroup>
                    <h1>Use a Discord Account to:</h1>
                    <h1>Use a Facebook Account to:</h1>
                    <h1>Use a Google Account to:</h1>
                    <h1>Use a Telephone Number to:</h1>
                    <h1>Use a Finger Print to:</h1>
                    <h1>Use a QR Code to:</h1>
                </Container>
            </Jumbotron>
        )
    }
}

export default LogIn;