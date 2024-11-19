import { useState } from 'react';
import { Container, Row, Col, Form, Card, Button ,Alert} from 'react-bootstrap';
import config from './config';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
function Signup() {
    const [validated, setValidated] = useState(false);
    const [name,setName]=useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); //For showing errors

    const navigate=useNavigate();



    const hostname = config.backendUrl;
    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(hostname + '/signup', {
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
                    //setError("Username not found in response");
                }
            })
            .then(dataObj => {
               //setIsAuthenticated(true);
                navigate("/login"); // Redirect to login page



            })
            .catch(err => {
                console.error(err);
                setError("Invalid email or password, SignUp failed");
            });

        setPassword(""); // Clear the password field after the request
    }

   
    return (
        <Container className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <Row>
                <Col>
                {error && ( // Conditionally render the Alert
                        <Alert variant="danger" onClose={() => setError("")} dismissible>
                            {error}
                        </Alert>
                    )}
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
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
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
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
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
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
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
