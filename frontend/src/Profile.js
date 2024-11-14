import profile_banner from './assets/profile.png';
import './Recipes.js'
import Recipes from './Recipes.js';
import {Button,Form} from 'react-bootstrap';
import { useState } from 'react';
import RecipeCreator from './RecipeCreator.js';

function Profile() {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    
    return (
        <div className='image-container'>
           <img className='profile-image' src={profile_banner}/>
           <br/><br/>
           <Button variant="warning" onClick={handleShow} className='b'>+ Add new Recipe</Button>
           <RecipeCreator show={show} setShow={setShow}/>
           <Recipes userFilter="john-doe123"/>
        </div>
        
    );
}
export default Profile;