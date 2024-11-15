import banner from './assets/food.png';
import { useState } from 'react';
import {Button,Form} from 'react-bootstrap';
import './ViewPort.css';
import { IoMdTrendingUp } from "react-icons/io";
import { Link } from 'react-router-dom';
import Recipes from './Recipes.js'
import Modal from 'react-bootstrap/Modal';
import './Home.css';
import RecipeCreator from './RecipeCreator.js';


function Home() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  
  const[updateKey,setUpdateKey]=useState(0);

  const handleRecipeCreated=()=>{
    setUpdateKey(updateKey+1);
  }

  return (<>
    <img className="banner" src={banner} alt="Banner" />
    <div clas="home-container">
      <Link className='trending' to="/">
        <h1>&nbsp;&nbsp;&nbsp;Trending<IoMdTrendingUp /></h1>
      </Link>
      <Button variant="warning" onClick={handleShow} className='b'>+ Add new Recipe</Button>
    <RecipeCreator onRecipeCreated={handleRecipeCreated} show={show} setShow={setShow}/>
    </div>
    <Recipes key={updateKey} userFilter="" />

  </>
  )
}
export default Home;