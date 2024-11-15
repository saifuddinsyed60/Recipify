import { useState } from 'react';
import { Container, Row, Col, Form, Card, Button } from 'react-bootstrap';

function Signup() {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };

   
    return (
        <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <Row>
                <Col>
                    <Card className="shadow-lg" style={{ width: '28rem' }}>
                        <Card.Body>
                            <h3 className="text-center mb-4">Sign Up</h3>
                            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                                {/* Name Field */}
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter your name"
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please provide your name.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* Email Field */}
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

                                {/* Password Field */}
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Create a password"
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a password.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* Confirm Password Field */}
                                <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Re-enter your password"
                                        required
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        Please confirm your password.
                                    </Form.Control.Feedback>
                                </Form.Group>

                                {/* Submit Button */}
                                <div className="d-grid mb-3">
                                    <Button variant="success" type="submit">
                                        Sign Up
                                    </Button>
                                </div>
                            </Form>

                     
                            


                            <div className="mt-4 text-center">
                                <p>
                                    Already have an account?{' '}
                                    <a href="/login" className="text-decoration-none">
                                        Login here
                                    </a>
                                </p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Signup;
