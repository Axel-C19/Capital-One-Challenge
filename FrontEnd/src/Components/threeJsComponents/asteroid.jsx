import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const Asteroid = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Create the scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Add ambient and directional lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 1.5); // Brighter ambient light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 2); // Strong directional light
    directionalLight.position.set(5, 5, 5); // Position the light to one side
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffffff, 1.5, 100); // Point light for dynamic shadows
    pointLight.position.set(-5, 5, 5);
    scene.add(pointLight);

    // Load the GLB model (Planet.glb)
    const loader = new GLTFLoader();
    let planet;
    loader.load(
      "/Asteroid.glb",
      (gltf) => {
        planet = gltf.scene;
        scene.add(planet);
      },
      undefined,
      (error) => {
        console.error("An error occurred while loading the GLB model", error);
      }
    );

    // Create a starry sky using particles (stars)
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.1,
    }); // Small white stars

    const starCount = 10000; // Number of stars
    const starVertices = [];

    for (let i = 0; i < starCount; i++) {
      const x = THREE.MathUtils.randFloatSpread(2000); // Spread stars randomly in X axis
      const y = THREE.MathUtils.randFloatSpread(2000); // Spread stars randomly in Y axis
      const z = THREE.MathUtils.randFloatSpread(2000); // Spread stars randomly in Z axis
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3)
    );

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    // Set up OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooth controls
    controls.dampingFactor = 0.05;
    controls.enableZoom = false; // Disable zoom for simplicity
    controls.rotateSpeed = 0.5;

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Clean up on component unmount
    return () => {
      controls.dispose();
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default Asteroid;
