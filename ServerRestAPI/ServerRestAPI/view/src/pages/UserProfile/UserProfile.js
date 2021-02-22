import React, { Component } from 'react';
import { Jumbotron, Container, Col, Row } from 'react-bootstrap';

class UserProfile extends Component {
    render() {
        return (
            <Jumbotron fluid>
                <Container>
                    <Row>
                        <Col>
                            <h1 className="text-center">User's Profile</h1>
                        </Col>
                    </Row>
                </Container>
            </Jumbotron>
        )
    }
}

export default UserProfile;