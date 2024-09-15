import * as React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as THREE from "three";

export default function SignUp() {
  const navigate = useNavigate();
  const canvasRef = React.useRef(null);
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    password: "",
  });

  React.useEffect(() => {
    // Setup Three.js scene
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
    const starCount = 5000;
    const starVertices = [];

    for (let i = 0; i < starCount; i++) {
      const x = THREE.MathUtils.randFloatSpread(2000);
      const y = THREE.MathUtils.randFloatSpread(2000);
      const z = THREE.MathUtils.randFloatSpread(2000);
      starVertices.push(x, y, z);
    }

    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starVertices, 3)
    );

    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.5,
    });

    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);

    camera.position.z = 1;

    const animate = function () {
      requestAnimationFrame(animate);
      stars.rotation.x += 0.0005;
      stars.rotation.y += 0.0005;
      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );
      if (response.status === 201) {
        navigate("/Home");
      }
    } catch (error) {
      console.error(
        "Error during signup",
        error.response?.data?.message || error.message
      );
    }
  };

  // Function to navigate to the home page when clicking the logo
  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-900">
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <div className="flex justify-center">
            <img
              className="w-20 h-20 cursor-pointer"
              src="/Planetary Capital.png"
              alt="Planetary Capital Logo"
              onClick={handleLogoClick}
            />
          </div>
          <h2 className="text-center text-2xl font-bold text-gray-800 my-4">
            Sign Up
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Sign Up
            </button>
            <div className="text-center mt-4">
              <a
                href="/SignIn"
                className="text-sm text-indigo-600 hover:underline"
              >
                Already have an account? Sign in
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
