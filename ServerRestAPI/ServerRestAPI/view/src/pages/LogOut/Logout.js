import React, { Component } from 'react';
import { Jumbotron, Container, Button, Row } from 'react-bootstrap';

class Logout extends Component {
    render() {
        return (
            <Jumbotron fluid>
                <Container>
                    <Row>
                        <Col>
                            <h1 className="text-center">You've Successfully Logged out of the app.</h1>
                            <br />
                            <Button.Group>
                                <Button className="btn-lg" href="/" to="/">Home</Button>
                                <Button className="btn-lg" href="/Login" to="/Login">Login</Button>
                                <Button className="btn-lg" href="" to="">Exit</Button>
                            </Button.Group>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        )
    }
}

export default Logout;