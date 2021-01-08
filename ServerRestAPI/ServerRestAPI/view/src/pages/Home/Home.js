import React, { Component } from 'react';
import {
    Row, Col,
    Jumbotron, Container
} from 'react-bootstrap';

class Home extends Component {
    render() {
        return (
            <Row>
                <Col>
                    <Jumbotron fluid>
                        <Container>
                            <h1 className="text-center">Home</h1>
                        </Container>
                    </Jumbotron>
                </Col>                
            </Row>
        )
    }
}

export default Home;