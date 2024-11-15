import { Modal, Form, Button, Toast } from 'react-bootstrap';
import { useState } from 'react';
function RecipeCreator({ onRecipeCreated,show, setShow }) {
    const handleClose = () => setShow(false);

    const [showToast, setShowToast] = useState(false);
    const toggleShowToast = () => setShowToast(!showToast);

    const [name, setName] = useState('');
    const [ingredients, setIngredients] = useState('');
    const [steps, setSteps] = useState('');
    const [username, setUsername] = useState('');


    const [imagePreviewUrl, setImagePreviewUrl] = useState(''); //To display selected image
    const [image, setImage] = useState('');

    const hostName = "http://127.0.0.1:5209";

    const handleAddRecipe = (e) => {
        e.preventDefault();
        console.log("Form Submitted!"); // Debugging log

        const r = {
            "recipeName": name,
            "ingredients": [ingredients],
            "steps": [steps],
            "imageFile": image,
            "username": username
        };
        createRecipe(r);//sent Post request
        onRecipeCreated(); //To trigger refresh

    }

    async function createRecipe(r) {
        const formData = new FormData();
    
        // Append the fields to the form data
        formData.append('recipeName', r.recipeName);
        formData.append('username', r.username);
        formData.append('ingredients', JSON.stringify(r.ingredients)); // If ingredients is an array
        formData.append('steps', JSON.stringify(r.steps)); // If steps is an array
        formData.append('imageFile', r.imageFile); // Assuming r.imageFile is a File object
    console.log(Array.isArray(r.ingredients))
        const response = await fetch(hostName + "/addRecipe", {
            method: 'POST',
            body: formData // No need to set Content-Type, it will be set automatically by FormData
        });
    
        console.log(response);
        if (response.status === 200) {
            setName('');
            setIngredients('');
            setSteps('');
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
                            <Form.Control type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)} placeholder="Enter ingredients separated with ," />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="recipe-steps">
                            <Form.Label>Steps</Form.Label>
                            <Form.Control type="text" value={steps} onChange={(e) => setSteps(e.target.value)} placeholder="Enter recipe steps separated with ," />
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
                    <strong className="me-auto">Bootstrap</strong>
                    <small>11 mins ago</small>
                </Toast.Header>
                <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
            </Toast>
        </>
    )
}
export default RecipeCreator;