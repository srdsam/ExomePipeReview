import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav'
import { Link } from 'react-router-dom';

class Navibar extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand href="/home">ExomePipe</Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link as={Link} to="/login">Logout</Nav.Link>
                </Nav>
            </Navbar>
        )
    }
}

export { Navibar };

