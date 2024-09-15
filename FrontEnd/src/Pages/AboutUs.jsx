import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import Navbar from "../Components/NavBar";
import InfoCard from "../Components/InfoCard";

const AboutUsPage = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
    });
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
      const z = (Math.random() - 0.5) * 2000;
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

    return () => {
      // Clean up Three.js resources
      scene.remove(stars);
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="min-h-screen bg-navy-blue">
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10"
      />
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <InfoCard
          title="What is Planetary Capital?"
          content="A gamified financial tool designed to help users reach their saving goals through a fun and interactive experience."
          emoji="🌍"
        />
        <InfoCard
          title="Your Cosmic Journey"
          content={[
            "Become a planet caretaker and start building your planet from scratch.",
            "Make smart financial investments to grow and evolve your planet into a self-sustaining ecosystem.",
            "Watch your planet thrive as you save and invest wisely!",
            "10 goals completed and claim an awesome reward!",
          ]}
          emoji="🚀🚀"
        />
        <InfoCard
          title="Unlock Exciting Rewards"
          content={[
            "Increased Interest Rate on Savings.",
            "Travel or Lifestyle Rewards",
            "Exclusive Loan Rate Discounts",
            "Exclusive rewards as milestones are achieved.",
          ]}
          emoji="🎁🎁"
        />
        <InfoCard
          title="Our mission"
          content={[
            "Empower individuals to take control of their finances through consistent saving habits.",
            "Help users achieve financial success by fostering good financial practices.",
          ]}
          emoji="🎯🎯"
        />
        <InfoCard
          title="Our vision"
          content="Become a global tool for financial literacy that promotes a strong saving culture."
          emoji="👁"
        />
      </div>
    </div>
  );
};

export default AboutUsPage;
