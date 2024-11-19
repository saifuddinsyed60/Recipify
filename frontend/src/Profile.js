import profile_banner from './assets/profile.png';
import './Recipes.js'
import Recipes from './Recipes.js';
import {Button,Form} from 'react-bootstrap';
import { useState } from 'react';
import RecipeCreator from './RecipeCreator.js';
import Cookies from 'js-cookie';

function Profile() {
    const [show, setShow] = useState(false);
    const handleShow = () => setShow(true);
    
    const[updateKey,setUpdateKey]=useState(null);
    const handleRecipeCreated=()=>{
        console.log("Recipe created! Updating key...: "+updateKey);
        setUpdateKey(updateKey+1);
      }

    return (
        <div className='image-container'>
           <img className='profile-image' src={profile_banner}/>
           <br/><br/>
           <Button variant="warning" onClick={handleShow} className='b'>+ Add new Recipe</Button> <br/><br/>
           <RecipeCreator onRecipeCreated={handleRecipeCreated} show={show} setShow={setShow}/>
           <Recipes key={updateKey} userFilter={Cookies.get("username")} favId={[0]} showAll={false}/>
        </div>
        
    );
}
export default Profile;