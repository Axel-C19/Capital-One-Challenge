import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import * as THREE from "three";

const LandingPage = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Set up Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create a starry sky using particles (stars)
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

    // Set camera position
    camera.position.z = 5;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      stars.rotation.y += 0.0002;
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#000033]">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute inset-0 flex flex-col">
        {/* Header with fixed height, white background, and higher z-index */}
        <header className="flex justify-between items-center p-4 bg-white z-50 relative shadow-md h-20">
          {/* Logo with height 100% of the header and adjusted sizing */}
          <img
            src="/Planetary Capital.png"
            alt="Planetary Capital Logo"
            className="h-full object-contain"
          />
          <nav>
            <Link to="/resources" className="text-blue-900 px-4 py-2">
              Resources
            </Link>
            <Link to="/contact" className="text-blue-900 px-4 py-2">
              Contact
            </Link>
            <Link
              to="/signin"
              className="text-white bg-blue-500 px-4 py-2 rounded"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="text-white bg-green-500 px-4 py-2 rounded ml-2"
            >
              Register
            </Link>
          </nav>
        </header>

        {/* Main content */}
        <main className="flex-grow flex flex-col items-center justify-center text-white">
          <h1 className="text-6xl font-bold mb-8">
            Welcome to Planetary Capital
          </h1>
          <p className="text-xl mb-8">
            Invest in Your Future, Build a Thriving Universe
          </p>
          <div>
            <Link
              to="/SignUp"
              className="bg-white text-blue-900 px-6 py-3 rounded-full text-lg font-semibold mr-4"
            >
              JOIN NOW
            </Link>
            <Link
              to="/AboutUs"
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full text-lg font-semibold"
            >
              Learn More
            </Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LandingPage;
