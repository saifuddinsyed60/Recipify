import { useState } from 'react';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';
import GoogleButton from 'react-google-button'

function Login() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

    const handleGoogleLogin = () => {
        // Redirect to your backend Google OAuth2 endpoint
        window.location.href = 'https://your-backend-url/auth/google';
    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <Row>
                <Col>
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
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter your password.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <div className="d-grid">
                                    <Button variant="primary" type="submit">
                                        Login
                                    </Button>
                                    <br/>
                                
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
