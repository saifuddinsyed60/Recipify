import { Modal, Form, Button, Toast, ListGroup } from 'react-bootstrap';
import { useState } from 'react';
import { FaPlus, FaTimes } from 'react-icons/fa';
import config from './config';
import Cookies from 'js-cookie';
function RecipeCreator({ onRecipeCreated, show, setShow }) {
    const handleClose = () => setShow(false);

    const [showToast, setShowToast] = useState(false);
    const toggleShowToast = () => setShowToast(!showToast);

    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState([]);
    const [steps, setSteps] = useState([]);
    const [username, setUsername] = useState('');


    const [imagePreviewUrl, setImagePreviewUrl] = useState(''); //To display selected image
    const [image, setImage] = useState('');

    const hostName = config.backendUrl;

    //Adding Ingredients
    const [isAddingIngredient, setIsAddingIngredient] = useState(false);
    const [newIngredient, setNewIngredient] = useState('');
    const handleAddIngredient = () => {
        setIngredients([...ingredients, newIngredient]);
        // Reset form fields
        setNewIngredient('');
        setIsAddingIngredient(false); // Hide the form after adding
    };

    //Adding Step
    const [isAddingStep, setIsAddingStep] = useState(false);
    const [newStep, setNewStep] = useState('');
    const handleAddStep = () => {
        // Add new item to the list
        setSteps([...steps, newStep]);
        // Reset form fields
        setNewStep('');
        setIsAddingStep(false); // Hide the form after adding
    };


    const handleAddRecipe = (e) => {
        e.preventDefault();
        console.log("Form Submitted!"); // Debugging log
        setUsername(Cookies.get("username"));
        const r = {
            "recipeName": name,
            "ingredients": ingredients,
            "steps": steps,
            "imageFile": image,
            "username": username
        };
        createRecipe(r);//sent Post request
        console.log("Calling onRecipeCreated() from RecipeCreator")
        onRecipeCreated(); //To trigger refresh

    }

    async function createRecipe(r) {
        const formData = new FormData();

        // Append the fields to the form data
        formData.append('recipeName', r.recipeName);
        formData.append('username', Cookies.get("username"));
        formData.append('ingredients', JSON.stringify(r.ingredients)); // If ingredients is an array
        formData.append('steps', JSON.stringify(r.steps)); // If steps is an array
        formData.append('imageFile', r.imageFile); // Assuming r.imageFile is a File object
        console.log(Array.isArray(r.ingredients))
        const response = await fetch(hostName + "/addRecipe", {
            method: 'POST',
            headers: {
                "Authorization": "Basic " + Cookies.get("base64")
            },
            body: formData // No need to set Content-Type, it will be set automatically by FormData
        });

        console.log(response);
        if (response.status === 200) {
            setName('');
            setIngredients([]);
            setSteps([]);
            setUsername('');
            setShowToast(true);
            setShow(false);
        } else {
            setShowToast(true);
        }
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        setImage(file);
        if (file) {
            const previewURL = URL.createObjectURL(file); // Generate a URL for preview
            setImagePreviewUrl(previewURL);
            console.log(previewURL);
        }
    };
    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false}>
                <Form onSubmit={handleAddRecipe}>

                    <Modal.Header closeButton>
                        <Modal.Title>Add new Recipe</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload an Image</Form.Label>
                            <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                            {imagePreviewUrl && <img src={imagePreviewUrl} alt="Preview" style={{ width: '100%', marginTop: '10px' }} />}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="recipe-name">
                            <Form.Label>Recipe name</Form.Label>
                            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter recipe name" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="recipe-ingredients">
                            <Form.Label>Ingredients</Form.Label>
                            <div>
                                {/* Button to toggle the form */}
                                <Button onClick={() => setIsAddingIngredient(!isAddingIngredient)} variant="primary">
                                    {isAddingIngredient ? (
                                        <>
                                            <FaTimes /> Cancel
                                        </>
                                    ) : (
                                        <>
                                            <FaPlus /> Add Ingredient
                                        </>
                                    )} </Button>

                                {/* Form for adding a new item (only shows when isAddingIngriedient is true) */}
                                {isAddingIngredient && (
                                    <div className="mt-3">
                                        <Form>
                                            <Form.Group controlId="formTitle">
                                                <Form.Label>Ingredient</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={newIngredient}
                                                    onChange={(e) => setNewIngredient(e.target.value)}
                                                    placeholder="Enter ingredient"
                                                />
                                            </Form.Group>
                                            <Button variant="success" onClick={handleAddIngredient}>
                                                Add Ingredient
                                            </Button>
                                        </Form>
                                    </div>
                                )}

                                {/* List of items */}
                                <ListGroup className="mt-3">
                                    {ingredients.map((ing, index) => (
                                        <ListGroup.Item key={index}>
                                            <p>{ing}</p>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </div>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="recipe-steps">
                            <Form.Label>Steps</Form.Label>
                            <div>
                                {/* Button to toggle the form */}
                                <Button onClick={() => setIsAddingStep(!isAddingStep)} variant="primary">
                                    {isAddingStep ? (
                                        <>
                                            <FaTimes /> Cancel
                                        </>
                                    ) : (
                                        <>
                                            <FaPlus /> Add Step
                                        </>
                                    )} </Button>


                                {/* Form for adding a new item (only shows when isAddingStep is true) */}
                                {isAddingStep && (
                                    <div className="mt-3">
                                        <Form>
                                            <Form.Group controlId="formTitle">
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={newStep}
                                                    onChange={(e) => setNewStep(e.target.value)}
                                                    placeholder="Enter instructions"
                                                />
                                            </Form.Group>
                                            <Button variant="success" onClick={handleAddStep}>
                                                Add Step
                                            </Button>
                                        </Form>
                                    </div>
                                )}

                                {/* List of items */}
                                <ListGroup className="mt-3">
                                    {steps.map((step, index) => (
                                        <ListGroup.Item key={index}>
                                            <p>{step}</p>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </div>
                        </Form.Group>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button type="submit" variant="primary">
                            Submit
                        </Button>
                    </Modal.Footer>

                </Form>
            </Modal>

            <Toast show={showToast} onClose={toggleShowToast}>
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">Recipify</strong>
                    <small>Just now</small>
                </Toast.Header>
                <Toast.Body>Yay! 🎉 Your recipe has been added! 🍳✨ Time to share the deliciousness with the world!</Toast.Body>
            </Toast>
        </>
    )
}
export default RecipeCreator;