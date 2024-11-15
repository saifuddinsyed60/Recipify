import Footer from './Footer.js';
import { useState } from 'react';
import { Navbar, Nav, Button, Row, Col, Stack, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './ViewPort.css';
import Home from './Home.js';
import Profile from './Profile.js'
import Login from './Login.js';
import Signup from './Signup.js'; 

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
              &nbsp;  &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              <Nav.Link as={Link} to="/Login">
                <Button variant="primary" style={{ width: '100px' }}>Login</Button>
              </Nav.Link>
              <Nav.Link as={Link} to="/Signup">
                <Button variant="warning" style={{ width: '100px' }}>Sign Up</Button>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default ViewPort;
