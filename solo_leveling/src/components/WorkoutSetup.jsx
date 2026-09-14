import { useState } from "react";

function WorkoutSetup({ onComplete }) {
  const [step, setStep] = useState(1);
  const [level, setLevel] = useState("");
  const [goal, setGoal] = useState("");

  const nextStep = () => {
    setStep(step + 1);
  };

  return (
    <div className="setup-box">

      {step === 1 && (
        <>
          <h2>CHOOSE YOUR LEVEL</h2>

          <button onClick={() => { setLevel("Beginner"); nextStep(); }}>
            BEGINNER
          </button>

          <button onClick={() => { setLevel("Intermediate"); nextStep(); }}>
            INTERMEDIATE
          </button>

          <button onClick={() => { setLevel("Advanced"); nextStep(); }}>
            ADVANCED
          </button>
        </>
      )}

      {step === 2 && (
        <>
          <h2>WHAT IS YOUR AIM?</h2>

          <button onClick={() => { setGoal("Lose Body Fat"); nextStep(); }}>
            LOSE BODY FAT
          </button>

          <button onClick={() => { setGoal("Stay Fit"); nextStep(); }}>
            STAY FIT
          </button>

          <button onClick={() => { setGoal("Build Muscle"); nextStep(); }}>
            BUILD MUSCLE
          </button>
        </>
      )}

      {step === 3 && (
        <>
          <h2>CHOOSE YOUR BATTLEFIELD</h2>

          <button onClick={() => onComplete("home", level, goal)}>
            HOME WORKOUT
          </button>

          <button onClick={() => onComplete("gym", level, goal)}>
            GYM WORKOUT
          </button>
        </>
      )}

    </div>
  );
}

export default WorkoutSetup;