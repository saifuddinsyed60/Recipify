import profile_banner from './assets/fav.jpg';
import './Recipes.js'
import Recipes from './Recipes.js';
import { Button, Form } from 'react-bootstrap';
import { useState,useEffect } from 'react';
import RecipeCreator from './RecipeCreator.js';
import Cookies from 'js-cookie';
import "./Favorites.css";
import config from './config.js';

function Profile() {
    const [show, setShow] = useState(false);
    const [favId, setFavId] = useState([]);

    const [updateKey, setUpdateKey] = useState(null);

    const hostName = config.backendUrl;

    useEffect(() => {
        const fetchFavorites = async () => {
          try {
            const username = Cookies.get("username"); // Replace with actual username from session or props
            const response = await fetch(`${hostName}/getFavorites/${username}`);
            
            if (response.ok) {
              const data = await response.json();
              console.log("Favorites from backend"+data);
              setFavId(data); // Set the fetched favorite recipe IDs
            } else {
              console.error("Failed to fetch favorites");
            }
          } catch (error) {
            console.error("Error fetching favorites:", error);
          }
        };
      
        fetchFavorites();
      }, []);

    return (
        <div className='image-container'>
            <img className='profile-image' style={{ width: "1200px", height: "628px" }} src={profile_banner} />
            <br /><br />
            <Recipes key={updateKey} favId={favId} showAll={false} />
        </div>

    );
}
export default Profile;