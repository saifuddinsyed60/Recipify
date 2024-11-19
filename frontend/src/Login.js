import { useState } from 'react';
import { Container, Row, Col, Form, Card, Button, Alert } from 'react-bootstrap';
import GoogleButton from 'react-google-button';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import config from './config';

function Login({setIsAuthenticated}) {
    const [validated, setValidated] = useState(false);
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState(""); //For showing errors

    const hostname = config.backendUrl;
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(hostname + '/login', {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Authorization": "Basic " + btoa(email + ":" + password)
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        })
            .then(response => {
                if (response.ok) {
                    // Parse the JSON response
                    return response.json(); // This converts the response to JSON
                } else {
                    setError("Username not found in response");
                }
            })
            .then(dataObj => {
                console.log(dataObj.user.username); // Now `dataObj` contains the parsed response data
                Cookies.set('auth', dataObj, { expires: 7 }); // The cookie will expire after 7 days
                Cookies.set('base64', btoa(email + ":" + password), { expires: 7 });
                Cookies.set('username', dataObj.user.username, { expires: 7 }); // Adding username to cookies
                setIsAuthenticated(true);
                navigate("/"); // Redirect to home page



            })
            .catch(err => {
                console.error(err);
                setError("Invalid email or password");
            });

        setPassword(""); // Clear the password field after the request
    }

    const handleGoogleLogin = () => {
        // Redirect to your backend Google OAuth2 endpoint
        window.location.href = 'https://your-backend-url/auth/google';
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <Row>
                <Col>
                    {error && ( // Conditionally render the Alert
                        <Alert variant="danger" onClose={() => setError("")} dismissible>
                            {error}
                        </Alert>
                    )}
                    <Card className="shadow-lg" style={{ width: '24rem' }}>
                        <Card.Body>
                            <h3 className="text-center mb-4">Login</h3>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a valid email.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your password.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <div className="d-grid">
                                    <Button variant="primary" type="submit">
                                        Login
                                    </Button>
                                    <br />

                                    <GoogleButton onClick={handleGoogleLogin} />

                                </div>

                            </Form>
                            <div className="mt-4 text-center">
                                <a href="#!" className="text-decoration-none">
                                    Forgot Password?
                                </a>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;
