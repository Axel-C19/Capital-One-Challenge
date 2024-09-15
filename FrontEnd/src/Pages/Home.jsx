import { Link } from "react-router-dom";
import DestroyedPlanet from "../Components/threeJsComponents/destroyedPlanet";
import Earth from "../Components/threeJsComponents/earth";
import IncomPlanet from "../Components/threeJsComponents/incomPlanet";
import Planetoid from "../Components/threeJsComponents/planetoid";
import Asteroid from "../Components/threeJsComponents/Asteroid";
import Navbar from "../Components/NavBar";

const Home = () => {
  return (
    <>
      <Navbar />
      <Asteroid />
      <Link to="/">
        <button>Go to landing</button>
      </Link>
    </>
  );
};

export default Home;
