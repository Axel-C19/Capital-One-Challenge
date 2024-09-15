import React, { useEffect, useState } from "react";
import axios from "axios";
import DestroyedPlanet from "../Components/threeJsComponents/destroyedPlanet";
import Earth from "../Components/threeJsComponents/earth";
import IncomPlanet from "../Components/threeJsComponents/incomPlanet";
import Planetoid from "../Components/threeJsComponents/planetoid";
import Navbar from "../Components/NavBar";
import ProgressBar from "../Components/progressBar"; // Import ProgressBar

const Home = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:5000/api/user", {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        setUserData(response.data); // Save the user data in state
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  if (!userData) {
    return <div>Loading...</div>; // Show loading while fetching user data
  }

  // Render different components based on the progress value in userData
  const renderComponentByProgress = () => {
    const { progress } = userData; // Assuming progress is stored in userData

    if (progress <= 25) {
      return <DestroyedPlanet />;
    } else if (progress > 25 && progress <= 50) {
      return <IncomPlanet />;
    } else if (progress > 50 && progress <= 75) {
      return <Planetoid />;
    } else {
      return <Earth />;
    }
  };

  return (
    <>
      <Navbar />
      <div className="relative w-full h-full flex justify-center items-center">
        {renderComponentByProgress()}
        {/* Add ProgressBar with user progress */}
        <ProgressBar progress={userData.progress} />
      </div>
    </>
  );
};

export default Home;
