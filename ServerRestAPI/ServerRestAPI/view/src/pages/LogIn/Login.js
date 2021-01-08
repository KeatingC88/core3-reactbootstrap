import React, { Component } from 'react';
import { Jumbotron, Container, Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-dom';

class LogIn extends Component {
    
    render() {
        return (
            <Jumbotron fluid>
                <Container>
                    <h1>Login Methods</h1>
                    <ButtonGroup>
                        <Button tag={Link} className="text-white btn-sm" href="/authentication/login" to="/authentication/login">
                            Login Here
                        </Button>
                        <Button tag={Link} className="text-white btn-sm" href="/authentication/register" to="/authentication/register">
                            Register Here
                        </Button>
                    </ButtonGroup>
                </Container>
            </Jumbotron>
        )
    }
}

export default LogIn;