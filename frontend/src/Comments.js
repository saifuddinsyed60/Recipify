import React from "react";
import './Comments.css';
import {
    MDBCard, MDBCardBody, MDBCardImage, MDBCol, MDBContainer, MDBIcon, MDBInput, MDBRow,
} from "mdb-react-ui-kit";
import { Button, Form } from 'react-bootstrap';
import { useState, useEffect } from "react";
import config from './config';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

function Comments({ recipeId }) {
    const [comments, setComments] = useState([]);
    const [commentText, setCommentText] = useState("");

    const hostName = config.backendUrl;

    const navigate=useNavigate();

    useEffect(() => {
        console.log("Recipe Id  : " + recipeId);
        fetch(hostName + '/getComments/' + recipeId)
            .then(response => response.json())
            .then(data => {
                setComments(data);
            })
            .catch(error => console.error("Error fetching comments:", error));

    }, recipeId);

    const handleAddComment = (e) => {
        e.preventDefault();
        if(Cookies.get("base64")){
        const commentItem = { comment: commentText, recipeId: recipeId, username: Cookies.get("username") };//Change username later
        fetch(hostName + '/addComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentItem),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                setComments([...comments, data]);
                setCommentText("");
            })
            .catch((error) => {
                console.error('Error:', error);
            });
        }
        else {
            navigate("/login"); // Redirect to login page
        }

    }

    const handleAddFavorites = (e) => {
        e.preventDefault();
       
        fetch(hostName + '/addFavorites/'+Cookies.get("username")+"/"+recipeId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + Cookies.get("base64")
            }
           
        })
            .then(response => response.json())
            .then(data => {
                console.log(data );
            })
            .catch((error) => {
                console.error('Error:', error);
            });


    }

    return (
        <MDBContainer className="mt-5">
            <MDBRow>
                <MDBCol md="8" lg="6">
                    <MDBCard
                        className="shadow-0 border"
                        style={{ backgroundColor: "#f0f2f5" }}
                    >
                        <MDBCardBody>
                            <Form>

                                <Form.Group className="mb-3" controlId="formComment">
                                    <Form.Control type="text" value={commentText} onChange={(e) => (setCommentText(e.target.value))} placeholder="Type comment..." />
                                </Form.Group>

                                <Button variant="success" onClick={handleAddComment} type="submit">+Add comment</Button> &nbsp;
                                <Button variant="warning" onClick={handleAddFavorites} type="submit">Favorites</Button>
                            </Form>
                            <br />

                            {comments.map((comment) => (
                                <MDBCard className="mb-4">
                                    <MDBCardBody>
                                        <p>{comment.comment}</p>
                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex flex-row align-items-center">
                                                <img
                                                    src={`https://ui-avatars.com/api/?name=${comment.username}&background=random`}
                                                    alt="Profile"
                                                    style={{ width: "40px", height: "40px", borderRadius: "50%", marginRight: "10px" }}
                                                />
                                                <p className="small mb-0 ms-2">{comment.username}</p>
                                            </div>
                                            <div className="d-flex flex-row align-items-center">
                                                <p className="small text-muted mb-0">{new Date(comment.createdAt).toLocaleDateString("en-US")}</p>
                                            </div>
                                        </div>
                                    </MDBCardBody>
                                </MDBCard>
                            ))}



                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    );
}
export default Comments;