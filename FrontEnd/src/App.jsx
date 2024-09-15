import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import Home from "./Pages/Home";
import LandingPage from "./Pages/LandingPage";
import NotFound from "./Pages/notFound";
import Dashboard from "./Pages/PlanetaryDashboard";
import AboutUsPage from "./Pages/AboutUs";
import SolarSystem from "./Components/threeJsComponents/solarSystem";
import ProtectedRoute from "./Components/protectedRoute";
import Friends from "./Pages/Friends";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route
          path="/Dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Friends"
          element={
            <ProtectedRoute>
              <Friends />
            </ProtectedRoute>
          }
        />
        <Route
          path="/SolarSystem"
          element={
            <ProtectedRoute>
              <SolarSystem />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/AboutUs" element={<AboutUsPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
