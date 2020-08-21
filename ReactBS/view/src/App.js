import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from "react-bootstrap";
import { connect } from "react-redux";

import Home from './pages/Home/Home';
import Admin from './pages/Admin/Admin';

import logo from './logo.svg';
import './index.css';
import './App.css';
import Navbar from './pages/Layout/Navbar';

class App extends Component {

    constructor(props) {
        super(props)
    }

    render = () => {
        return (            
            <Container fluid>
                <Navbar />
                <Router>
                    <Route exact path="/" component={Home} />
                    <Route path="/Home" component={Home} />
                    <Route path="/Admin" component={Admin} />
                </Router>
            </Container>
        )
    }
}

export default connect(
    null
)(App);
