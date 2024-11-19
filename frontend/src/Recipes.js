import { useState, useEffect, Container } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { IoMdTrendingUp } from "react-icons/io";
import { BiSolidUpvote, BiSolidCommentDetail, BiSolidDownvote } from "react-icons/bi";
import { Link } from 'react-router-dom';
import config from './config';
import Comments from './Comments';
import './Recipes.css'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const hostname = config.backendUrl;

function Recipes({ userFilter,showAll,favId }) {
    const [show, setShow] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    /*const [recipes, setRecipes] = useState([
            {
                "id": 1,
                "recipeName": "Chicken Biryani",
                "ingredients": ["chicken", "basmati rice", "yogurt", "onion", "tomato", "garlic", "ginger", "spices"],
                "steps": [
                    "Marinate chicken with yogurt and spices for 1 hour.",
                    "Cook onions until golden, then add tomatoes and marinated chicken.",
                    "Cook the rice separately until halfway done.",
                    "Layer chicken and rice, then cook on low heat until fully cooked.",
                    "Garnish with fried onions and cilantro, then serve."
                ],
                "image": "/recipeImages/biryani.jpg",
                "username": "chefMike",
                "upvotes": 150
            },
            {
                "id": 2,
                "recipeName": "Vegetable Stir-Fry",
                "ingredients": ["bell peppers", "carrots", "broccoli", "soy sauce", "ginger", "garlic", "olive oil"],
                "steps": [
                    "Heat oil in a pan and add garlic and ginger.",
                    "Add bell peppers, carrots, and broccoli, stir-frying until tender-crisp.",
                    "Add soy sauce and cook for another 2 minutes.",
                    "Serve with rice or noodles."
                ],
                "image": "/recipeImages/vegetable-stirfy.jpg",
                "username": "veggieChef21",
                "upvotes": 85
            },
            {
                "id": 3,
                "recipeName": "Falafel Wrap",
                "ingredients": ["chickpeas", "onion", "garlic", "parsley", "flour", "spices", "pita bread", "lettuce", "tomato", "tahini sauce"],
                "steps": [
                    "Blend chickpeas, onion, garlic, parsley, flour, and spices in a food processor.",
                    "Shape mixture into balls and fry until golden brown.",
                    "Assemble falafel in pita bread with lettuce, tomato, and tahini sauce."
                ],
                "image": "/recipeImages/falafel.jpg",
                "username": "falafelFanatic",
                "upvotes": 110
            },
            {
                "id": 4,
                "recipeName": "Chicken Shawarma",
                "ingredients": ["chicken", "yogurt", "garlic", "lemon juice", "spices", "pita bread", "cucumber", "tomato"],
                "steps": [
                    "Marinate chicken in yogurt, garlic, lemon juice, and spices for 2 hours.",
                    "Grill the chicken until fully cooked, then slice thinly.",
                    "Serve in pita bread with cucumber, tomato, and garlic sauce."
                ],
                "image": "/recipeImages/shawarma.jpg",
                "username": "shawarmaMaster",
                "upvotes": 200
            },
            {
                "id": 5,
                "recipeName": "Hummus",
                "ingredients": ["chickpeas", "tahini", "lemon juice", "garlic", "olive oil", "salt"],
                "steps": [
                    "Blend chickpeas, tahini, lemon juice, garlic, olive oil, and salt until smooth.",
                    "Serve with a drizzle of olive oil and a sprinkle of paprika."
                ],
                "image": "/recipeImages/hummus.jpg",
                "username": "hummusQueen",
                "upvotes": 75
            },
            {
                "id": 6,
                "recipeName": "Butter Chicken",
                "ingredients": ["chicken", "yogurt", "garam masala", "ginger", "garlic", "tomato puree", "cream"],
                "steps": [
                    "Marinate chicken in yogurt and spices for 1 hour.",
                    "Cook chicken until browned, then set aside.",
                    "Make the sauce with tomato puree, cream, and spices, then add chicken back in.",
                    "Simmer until the chicken is cooked through and the sauce is thickened."
                ],
                "image": "/recipeImages/butter-chicken.jpg",
                "username": "butterChick",
                "upvotes": 180
            },
            {
                "id": 7,
                "recipeName": "Vegetable Biryani",
                "ingredients": ["basmati rice", "carrots", "potatoes", "peas", "onion", "yogurt", "spices"],
                "steps": [
                    "Cook vegetables with spices until soft.",
                    "Add yogurt to the vegetables, then layer with rice.",
                    "Simmer until rice is fully cooked and flavors are absorbed."
                ],
                "image": "/recipeImages/veg-biryani.jpg",
                "username": "vegMaster",
                "upvotes": 120
            },
            {
                "id": 8,
                "recipeName": "Lamb Kofta",
                "ingredients": ["ground lamb", "onion", "garlic", "parsley", "spices"],
                "steps": [
                    "Mix ground lamb with onion, garlic, parsley, and spices.",
                    "Shape into small patties or skewers.",
                    "Grill or fry until fully cooked."
                ],
                "image": "/recipeImages/lamb-kofta.avif",
                "username": "lambLover",
                "upvotes": 150
            },
            {
                "id": 9,
                "recipeName": "Tabbouleh Salad",
                "ingredients": ["parsley", "bulgur", "tomato", "cucumber", "lemon juice", "olive oil"],
                "steps": [
                    "Soak bulgur in hot water until soft.",
                    "Chop parsley, tomato, and cucumber finely.",
                    "Mix with bulgur, lemon juice, and olive oil, then serve."
                ],
                "image": "/recipeImages/salad.webp",
                "username": "tabboulehFan",
                "upvotes": 90
            },
            {
                "id": 10,
                "recipeName": "Shakshuka",
                "ingredients": ["eggs", "tomato", "bell pepper", "onion", "spices", "cilantro"],
                "steps": [
                    "Cook onions, peppers, and spices until soft.",
                    "Add tomatoes and simmer until sauce thickens.",
                    "Make wells in the sauce and crack eggs into them.",
                    "Cover and cook until eggs are done to preference."
                ],
                "image": "/recipeImages/shakshuka.webp",
                "username": "shakshukaChef",
                "upvotes": 135
            }
        ]) */
    const [recipes, setRecipes] = useState([]);

    const [userVote, setUserVote] = useState({}); //For upvote/downvote

    const navigate = useNavigate();

    useEffect(() => {
        //Only executed initially when recipes is empty
        if (recipes.length === 0) {
            fetch(hostname + '/getRecipes')
                .then(response => response.json())
                .then(data => {
                    setRecipes(data);
                })
        }

    }, [recipes]);

    const handleClose = () => {
        setShow(false);
        setSelectedRecipe(null);
    };

    const handleShow = (recipe) => {
        setSelectedRecipe(recipe);
        setShow(true);
    };


    // Function to update the rating of a topic
    const updateRecipeRating = async (id, delta) => {
        // Update the frontend state optimistically before making the request
        setRecipes(prevRecipes =>
            prevRecipes.map(recipe =>
                recipe.id === id ? { ...recipe, upvotes: recipe.upvotes + delta } : recipe
            )
        );
    
        try {
            // Construct the URL for the backend API based on the rating change
            const url = delta > 0 ? `${hostname}/upvoteRecipe/${id}` : `${hostname}/downvoteRecipe/${id}`;
    
            // Make the POST request to the backend
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Basic " + Cookies.get("base64")
                },
            });
    
            if (!response.ok) {
                throw new Error(`Error: ${await response.text()}`);
            }
    
             const updatedRecipe = await response.json();
            console.log("Recipe updated from backend:", updatedRecipe);
    
        
        } catch (error) {
          
            
        }
    };
    
    const handleUpvote = (id) => {
        if(Cookies.get("base64")){
        setUserVote(prevVotes => {
            const currentVote = prevVotes[id];
            const newVote = currentVote === 1 ? null : 1;

            if (currentVote === 1) {
                updateRecipeRating(id, -1);  // Remove upvote
            } else {
                updateRecipeRating(id, currentVote === -1 ? 2 : 1);  // Apply or cancel downvote, apply upvote
            }

            return { ...prevVotes, [id]: newVote };
        });
    }
    else {
        navigate("/login"); // Redirect to login page
    }
    };



    const handleDownvote = (id) => {
        if(Cookies.get("base64")){

        
        setUserVote(prevVotes => {
            const currentVote = prevVotes[id];
            const newVote = currentVote === -1 ? null : -1;

            if (currentVote === -1) {
                updateRecipeRating(id, 1);  // Remove downvote
            } else {
                updateRecipeRating(id, currentVote === 1 ? -2 : -1);  // Apply or cancel upvote, apply downvote
            }

            return { ...prevVotes, [id]: newVote };
        });
    }
    else {
        navigate("/login"); // Redirect to login page
    }
    };
    

    const timeAgo = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        let interval = seconds / 31536000;

        if (interval > 1) return Math.floor(interval) + " years ago";
        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + " months ago";
        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + " days ago";
        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + " hours ago";
        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + " minutes ago";
        return "Just now";
    };
    return (
        <>
            <div className="card-container">
                {recipes.filter(recipe => showAll || recipe.username === userFilter || favId.some(id => id === recipe.id)  ) 
                    .map((recipe) => (
                        <Card key={recipe.id} bg="light" text="dark" className="text-center">
                            <Card.Header>{recipe.username}</Card.Header>
                            <Card.Body>
                                <Card.Title>{recipe.recipeName}</Card.Title>
                                <Card.Text>
                                    <img src={`data:image/jpeg;base64,${recipe.imageFileBase64}`}
                                        alt={recipe.recipeName} style={{ width: '302px', height: '302px' }} />
                                </Card.Text>
                                <Button variant="primary" onClick={() => handleShow(recipe)}>
                                    See details
                                </Button>
                            </Card.Body>
                            <Card.Footer className="text-muted d-flex justify-content-between align-items-center">
                                <Button  variant={userVote[recipe.id] === 1 ? "success" : "outline-success"} size='sm' onClick={()=>handleUpvote(recipe.id)}><BiSolidUpvote /></Button>&nbsp;
                                {recipe.upvotes}&nbsp;
                                <Button  variant={userVote[recipe.id] === -1 ? "danger" : "outline-danger"} size='sm' onClick={() => handleDownvote(recipe.id)}><BiSolidDownvote /></Button>
                                &nbsp;
                                <Button size='sm' variant='primary' onClick={() => handleShow(recipe)}> <BiSolidCommentDetail /></Button>
                                <span className="spacing" />
                                {timeAgo(recipe.createdAt)}
                            </Card.Footer>
                        </Card>
                    ))}
            </div>
            {selectedRecipe && (
                <Modal show={show} onHide={handleClose} animation={false}  size="lg" dialogClassName="modal-custom-width">
                    <Modal.Header closeButton>
                        <Modal.Title>{selectedRecipe.recipeName}</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <div style={{ display: 'flex' }}>
                            {/* Left section: Recipe details */}
                            <div style={{ flex: 1, paddingRight: '20px' }}>
                                <img src={`data:image/jpeg;base64,${selectedRecipe.imageFileBase64}`}
                                    style={{ width: '100%', height: 'auto' }} alt={selectedRecipe.recipeName} />
                                <h5>Ingredients:</h5>
                                <ul>
                                    {selectedRecipe.ingredients.map((ingredient, index) => (
                                        <li key={index}>{ingredient}</li>
                                    ))}
                                </ul>
                                <h5>Steps:</h5>
                                <ol>
                                    {selectedRecipe.steps.map((step, index) => (
                                        <li key={index}>{step}</li>
                                    ))}
                                </ol>
                            </div>

                            {/* Right section: Comments */}
                            <div style={{ flex: 1 }}>
                                <Comments recipeId={selectedRecipe.id} />
                            </div>
                        </div>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            )
            }</>
    )
}
export default Recipes;