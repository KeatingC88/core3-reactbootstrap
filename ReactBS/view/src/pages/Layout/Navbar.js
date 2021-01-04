import React, { Component } from "react";
import { Navbar, Nav } from 'react-bootstrap';
import { LoginMenu } from '../../security/authorizations/LoginMenu';

class NavBar extends Component {
    render() {
        return (
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">React-BootStrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/admin">Admin</Nav.Link>
                        <LoginMenu></LoginMenu>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavBar;