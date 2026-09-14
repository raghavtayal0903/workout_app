import { useState } from "react";

import LoginPage from "./pages/LoginPage";
import SetupPage from "./pages/SetupPage";
import HomePage from "./pages/HomePage";
import HomeWorkoutPage from "./pages/HomeWorkoutPage";
import GymWorkoutPage from "./pages/GymWorkoutPage";

function App() {

  const [page, setPage] = useState("login");

  const [profile, setProfile] = useState(null);

  const [level, setLevel] = useState("");
  const [goal, setGoal] = useState("");

  // Login → BMI / Profile Setup
  const handleLogin = () => {
    setPage("setup");
  };

  // BMI Setup → Workout Selection
  const handleProfileComplete = (profileData) => {
    setProfile(profileData);
    setPage("home");
  };

  // Workout Selection → Home/Gym Workout
  const startWorkout = (type, selectedLevel, selectedGoal) => {

    setLevel(selectedLevel);
    setGoal(selectedGoal);

    if (type === "home") {
      setPage("homeWorkout");
    } else {
      setPage("gymWorkout");
    }
  };

  // LOGIN
  if (page === "login") {
    return (
      <LoginPage onLogin={handleLogin} />
    );
  }

  // BMI / PROFILE SETUP
  if (page === "setup") {
    return (
      <SetupPage onComplete={handleProfileComplete} />
    );
  }

  // WORKOUT SELECTION
  if (page === "home") {
    return (
      <HomePage onComplete={startWorkout} />
    );
  }

  // HOME WORKOUT
  if (page === "homeWorkout") {
    return (
      <HomeWorkoutPage
        level={level}
        goal={goal}
        profile={profile}
      />
    );
  }

  // GYM WORKOUT
  if (page === "gymWorkout") {
    return (
      <GymWorkoutPage
        level={level}
        goal={goal}
        profile={profile}
      />
    );
  }
}

export default App;