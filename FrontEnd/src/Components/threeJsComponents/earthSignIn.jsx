import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const EarthSignIn = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Set up lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    // Load the GLB model (Earth.glb)
    const loader = new GLTFLoader();
    let planet;
    loader.load(
      "/Earth.glb",
      (gltf) => {
        planet = gltf.scene;
        planet.scale.set(1.5, 1.5, 1.5); // Adjust size to make the Earth smaller
        planet.position.set(0, 0, 0); // Adjust position if needed
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

    // Add some slight rotation to the planet
    const animate = () => {
      requestAnimationFrame(animate);
      if (planet) {
        planet.rotation.y += 0.001; // Slow rotation on Y axis
      }
      renderer.render(scene, camera);
    };

    // Set up OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false; // Disable zoom for simplicity
    controls.enableRotate = false; // Disable manual rotation

    camera.position.z = 10; // Adjust distance of the camera

    animate();

    // Clean up on component unmount
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        overflow: "hidden",
      }}
    />
  );
};

export default EarthSignIn;
