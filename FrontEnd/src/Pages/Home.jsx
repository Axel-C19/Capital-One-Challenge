import { Link } from "react-router-dom";
import DestroyedPlanet from "../Components/threeJsComponents/destroyedPlanet";
import Earth from "../Components/threeJsComponents/earth";
import IncomPlanet from "../Components/threeJsComponents/incomPlanet";
import Planetoid from "../Components/threeJsComponents/planetoid";
import Asteroid from "../Components/threeJsComponents/Asteroid";

const Home = () => {
  return (
    <>
      <h1>Home/FEED</h1>
      <Asteroid />
      <Link to="/">
        <button>Go to landing</button>
      </Link>
    </>
  );
};

export default Home;
