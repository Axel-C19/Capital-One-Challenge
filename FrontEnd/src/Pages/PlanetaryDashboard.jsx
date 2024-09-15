import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import NavBar from "../Components/NavBar";

// Sub-components
const PlanetGoals = () => (
  <div className="bg-white p-4 rounded-lg">
    <h2 className="text-xl font-bold mb-4">My 10 Planet Goals</h2>
    <ul>
      {[
        { text: "Increase passive income by 5%", checked: true },
        { text: "Add 300 USD to my investment portfolio", checked: false },
        { text: "Decrease my groceries spending by 10%", checked: false },
        { text: "Pay off credit card completely", checked: false },
        { text: "Earn 300 travel points with Capital One", checked: false },
        { text: "Open a new line of credit for the business", checked: false },
        { text: "Pay rent for next 6 months", checked: true },
        {
          text: "Spend less than 80 USD when going to the mall with friends",
          checked: false,
        },
        { text: "Save 50 USD for Sally's gift", checked: false },
        { text: "Save for my house's down payment", checked: false },
      ].map((goal, index) => (
        <li key={index} className="flex items-center mb-2">
          <div className="w-4 h-4 rounded-full bg-blue-900 mr-2"></div>
          <span>{goal.text}</span>
          <input
            type="checkbox"
            checked={goal.checked}
            readOnly
            className="ml-auto"
          />
        </li>
      ))}
    </ul>
  </div>
);

const Progress = () => (
  <div className="bg-white p-4 rounded-lg">
    <h2 className="text-xl font-bold mb-4">Progress</h2>
    {[
      {
        text: "Add 300 USD to my investment portfolio",
        current: 180,
        total: 300,
      },
      { text: "Pay off credit card completely", current: 420, total: 600 },
      {
        text: "Open a new line of credit for the business",
        current: 0,
        total: 100,
      },
    ].map((item, index) => (
      <div key={index} className="mb-4">
        <div className="flex justify-between mb-1">
          <span>{item.text}</span>
          <span>
            {item.current}/{item.total}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${(item.current / item.total) * 100}%` }}
          ></div>
        </div>
      </div>
    ))}
  </div>
);

const CommunityGoals = () => (
  <div className="bg-white p-4 rounded-lg">
    <h2 className="text-xl font-bold mb-4">Community goals</h2>
    <div className="mb-4">
      <h3 className="font-semibold">Carlos, Juan and Esteban</h3>
      <div className="flex items-center justify-between">
        <span>Save 400 USD for TheWeeknd concert</span>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full border-4 border-blue-500 flex items-center justify-center mr-2">
            <span>230</span>
          </div>
          <span>/400</span>
        </div>
      </div>
    </div>
    <div>
      <h3 className="font-semibold">BinaryBeasts</h3>
      <div className="flex items-center justify-between mb-2">
        <span>Pay the reservation for Cancun AirBnB</span>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full border-4 border-blue-500 flex items-center justify-center mr-2">
            <span>800</span>
          </div>
          <span>/1600</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span>Pay flight tickets first down-payment</span>
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full border-4 border-blue-500 flex items-center justify-center mr-2">
            <span>500</span>
          </div>
          <span>/1200</span>
        </div>
      </div>
    </div>
  </div>
);

const PlanetarySuggestions = () => (
  <div className="bg-white p-4 rounded-lg">
    <h2 className="text-xl font-bold mb-4">Planetary Capital suggestions</h2>
    {[
      "Invest 50 USD in S&P 500",
      "Obtain a Costco card",
      "Accumulate miles with CC",
      "Accumulate 100 USD in cashback",
    ].map((suggestion, index) => (
      <div key={index} className="flex justify-between items-center mb-2">
        <span>{suggestion}</span>
        <button className="bg-blue-900 text-white px-4 py-1 rounded">
          Start
        </button>
      </div>
    ))}
  </div>
);

const NextPlanetGoals = () => (
  <div className="bg-white p-4 rounded-lg">
    <h2 className="text-xl font-bold mb-4">Next planet goals</h2>
    <div className="flex items-center">
      <div className="w-4 h-4 rounded-full bg-blue-900 mr-2"></div>
      <span>Complete house down payment</span>
      <input type="checkbox" className="ml-auto" />
    </div>
  </div>
);

const NewGoal = () => (
  <div className="bg-white p-4 rounded-lg flex items-center justify-center cursor-pointer">
    <span className="text-4xl mr-2">+</span>
    <span className="text-xl">New Goal</span>
  </div>
);

const Dashboard = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Set up Three.js scene (same as in LandingPage)
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create starry sky (same as in LandingPage)
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
    });
    const starVertices = [];
    for (let i = 0; i < 10000; i++) {
      const x = (Math.random() - 0.5) * 2000;
      const y = (Math.random() - 0.5) * 2000;
      const z = -Math.random() * 2000;
      starVertices.push(x, y, z);
    }
    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3)
    );
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      stars.rotation.y += 0.0002;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#000033]">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="relative z-10">
        <NavBar />
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <PlanetGoals />
            <div className="space-y-4">
              <Progress />
              <PlanetarySuggestions />
            </div>
            <div className="space-y-4">
              <CommunityGoals />
              <NextPlanetGoals />
              <NewGoal />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
