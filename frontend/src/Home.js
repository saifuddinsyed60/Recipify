import banner from './assets/food.png';
import { useState,useEffect } from 'react';
import {Button,Form} from 'react-bootstrap';
import './ViewPort.css';
import { IoMdTrendingUp } from "react-icons/io";
import { Link } from 'react-router-dom';
import Recipes from './Recipes.js'
import Modal from 'react-bootstrap/Modal';
import './Home.css';
import RecipeCreator from './RecipeCreator.js';
import Comments from './Comments.js';


function Home() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  
  const[updateKey,setUpdateKey]=useState(null);

  const handleRecipeCreated = () => {
    console.log("Before updating key:", updateKey);
    setUpdateKey((prevKey) => prevKey + 1); 
  };

  useEffect(() => {
    console.log("updateKey updated:", updateKey);
  }, [updateKey]);

  return (<>
    <img className="banner" src={banner} alt="Banner" />
    <div clas="home-container">
      <Link className='trending' to="/">
        <h1>&nbsp;&nbsp;&nbsp;Trending<IoMdTrendingUp /></h1>
      </Link>
      <Button variant="warning" onClick={handleShow} className='b'>+ Add new Recipe</Button>
    <RecipeCreator onRecipeCreated={handleRecipeCreated} show={show} setShow={setShow}/>
    </div>
    <Recipes key={updateKey} userFilter="" showAll={true} />

  </>
  )
}
export default Home;