import Footer from './Footer.js';
import { useState,useEffect } from 'react';
import { Navbar, Nav, Button, Row, Col, Stack, Container } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './ViewPort.css';
import Home from './Home.js';
import Profile from './Profile.js'
import Login from './Login.js';
import Favorites from './Favorites.js';
import Signup from './Signup.js'; 
import Cookies from 'js-cookie';

function ViewPort() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is authenticated (e.g., check for a cookie)
  useEffect(() => {
    if (Cookies.get("auth")) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    // Clear cookies or token to log out
    Cookies.remove("auth");
    Cookies.remove("base64");
    Cookies.remove("username");
    setIsAuthenticated(false);
  };
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
              &nbsp;  &nbsp; &nbsp; &nbsp;
              {isAuthenticated ? (
                <>
                  <img
                    src={`https://ui-avatars.com/api/?name=${Cookies.get("username")}&background=random`}
                    alt="Profile"
                    style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px",marginTop:"10px" }}
                  /> 
                  <h2 style={{marginTop:"10px"}}>{Cookies.get("username")}</h2>
                  <Nav.Link>
                    <Button variant="danger" style={{ width: '100px' }} onClick={handleLogout}>Logout</Button>
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/Login">
                    <Button variant="primary" style={{ width: '100px' }}>Login</Button>
                  </Nav.Link>
                  <Nav.Link as={Link} to="/Signup">
                    <Button variant="warning" style={{ width: '100px' }}>Sign Up</Button>
                  </Nav.Link>
                </>
              )}
             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Favorites" element={<Favorites />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default ViewPort;
