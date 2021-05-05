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
                    <Jumbotron fluid>
                        <Container>
                            <h1 className="text-center">Discord</h1>
                        </Container>
                        <iframe src="https://discord.com/widget?id=836118510689976414&theme=dark"
                            width="350" height="500"
                            allowtransparency="true"
                            frameborder="0"
                            sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts">
                        </iframe>
                    </Jumbotron>
                </Col>                
            </Row>
        )
    }
}

export default Home;