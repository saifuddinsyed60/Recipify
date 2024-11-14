import Footer from './Footer.js';
import { useState } from 'react';
import { Navbar, Nav, Button, Row, Col, Stack, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './ViewPort.css';
import Home from './Home.js';
import Profile from './Profile.js'

function ViewPort() {

  return (
    <Router>
      <Navbar bg="white" expand="lg" >
        <Container>
          <Navbar.Brand className='navbar-brand'>Recipify</Navbar.Brand>
          <Navbar.Collapse id="navbarNav">
            <Nav className="mx-auto">
              <Nav.Link as={Link} to="/" className="nav-link">Home</Nav.Link>
              <Nav.Link as={Link} to="/Profile" className="nav-link">Profile</Nav.Link>
              <Nav.Link as={Link} to="/Favorites" className="nav-link">Favorites</Nav.Link>
              <Nav.Link as={Link} to="/Settings" className="nav-link">Settings</Nav.Link>
            </Nav>
            <Button variant="primary">Login</Button>
            &nbsp;&nbsp;
            <Button variant="warning">Sign Up</Button>

          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/Profile" element={<Profile/>}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default ViewPort;
