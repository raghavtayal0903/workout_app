import { useState } from "react";
import AnalysisCard from "../components/AnalysisCard";
import FitnessForm from "../components/FitnessForm";
import "../styles/SetupPage.css";

function SetupPage({ onComplete }) {
  const [profile, setProfile] = useState(null);

  if (profile) {
    return (
      <main className="setup-page">
        <AnalysisCard profile={profile} onContinue={() => onComplete(profile)} />
      </main>
    );
  }

  return (
    <main className="setup-page">
      <section className="setup-panel">
        <p className="system-text">SYSTEM CALIBRATION</p>
        <h1>KNOW YOUR STATS</h1>
        <p className="setup-intro">
          Give the system a starting point. Your first quest will be shaped around you.
        </p>
        <FitnessForm onComplete={setProfile} />
      </section>
    </main>
  );
}

export default SetupPage;
