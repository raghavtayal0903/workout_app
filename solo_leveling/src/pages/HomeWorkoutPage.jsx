import { useState } from "react";

import homeWorkouts from "../data/homeWorkouts";

import SystemPopup from "../components/SystemPopup";
import StreakBadge from "../components/StreakBadge";

import {
  loadProgress,
  saveProgress,
  getLevelFromXP,
  getXPProgress,
  getXPForNextLevel,
  updateStreak
} from "../utils/xpSystem";

import "../styles/WorkoutPage.css";


function HomeWorkoutPage({ level, goal }) {

  const workouts = homeWorkouts[level];

  const savedProgress = loadProgress();

  const [selectedDay, setSelectedDay] = useState(0);

  const [completed, setCompleted] = useState([]);

  const [xp, setXp] = useState(
    savedProgress.xp
  );

  const [streak, setStreak] = useState(
    savedProgress.streak
  );

  const [popup, setPopup] = useState("");

  const [popupXP, setPopupXP] = useState(0);

  const [showMissedChoice, setShowMissedChoice] =
    useState(false);


  const currentWorkout =
    workouts[selectedDay];


  const currentLevel =
    getLevelFromXP(xp);


  const xpProgress =
    getXPProgress(xp);


  const nextLevelXP =
    getXPForNextLevel(currentLevel);


  const xpPercentage =
    (xpProgress / 100) * 100;


  const showPopup = (message, amount = 0) => {

    setPopup(message);

    setPopupXP(amount);

    setTimeout(() => {
      setPopup("");
      setPopupXP(0);
    }, 2000);

  };


  const completeExercise = (index) => {

    if (completed.includes(index)) {
      return;
    }


    const newCompleted = [
      ...completed,
      index
    ];


    setCompleted(newCompleted);


    const oldXP = xp;

    const newXP = oldXP + 10;


    const oldLevel =
      getLevelFromXP(oldXP);


    const newLevel =
      getLevelFromXP(newXP);


    setXp(newXP);


    saveProgress({
      ...savedProgress,
      xp: newXP,
      streak: streak
    });


    if (newLevel > oldLevel) {

      showPopup(
        `LEVEL UP! LEVEL ${newLevel}`,
        10
      );

    } else {

      showPopup(
        "EXERCISE COMPLETE",
        10
      );

    }


    if (
      newCompleted.length ===
      currentWorkout.exercises.length
    ) {

      setTimeout(() => {
        finishWorkout(newXP);
      }, 500);

    }

  };


  const finishWorkout = (currentXP) => {

    const workoutBonus = 50;

    const finalXP =
      currentXP + workoutBonus;


    let progress = loadProgress();


    progress = {
      ...progress,
      xp: finalXP,
      completedWorkouts:
        (progress.completedWorkouts || 0) + 1
    };


    progress =
      updateStreak(progress);


    saveProgress(progress);


    setXp(finalXP);

    setStreak(progress.streak);


    const oldLevel =
      getLevelFromXP(currentXP);


    const newLevel =
      getLevelFromXP(finalXP);


    if (newLevel > oldLevel) {

      showPopup(
        `LEVEL UP! LEVEL ${newLevel}`,
        workoutBonus
      );

    } else {

      showPopup(
        "DAILY QUEST COMPLETE",
        workoutBonus
      );

    }

  };


  const selectWorkout = (index) => {

    setSelectedDay(index);

    setCompleted([]);

  };


  const continueNormally = () => {

    setShowMissedChoice(false);

    showPopup(
      "QUEST CONTINUED"
    );

  };


  const recoveryQuest = () => {

    setShowMissedChoice(false);

    const bonusXP = 100;

    const newXP = xp + bonusXP;


    let progress = loadProgress();


    progress = {
      ...progress,
      xp: newXP
    };


    progress =
      updateStreak(progress);


    saveProgress(progress);


    setXp(newXP);

    setStreak(progress.streak);


    showPopup(
      "RECOVERY QUEST COMPLETE",
      bonusXP
    );

  };


  return (

    <main className="workout-page">


      <SystemPopup
        message={popup}
        xp={popupXP}
      />


      {showMissedChoice && (

        <div className="missed-overlay">

          <div className="missed-box">

            <p className="system-text">
              SYSTEM WARNING
            </p>

            <h2>
              QUEST MISSED
            </h2>

            <p>
              You missed your previous training day.
              Choose how you want to continue.
            </p>


            <button
              onClick={continueNormally}
            >
              CONTINUE NORMALLY
            </button>


            <button
              onClick={recoveryQuest}
            >
              RECOVERY QUEST +100 XP
            </button>

          </div>

        </div>

      )}


      <header className="workout-header">

        <div>

          <p className="system-text">
            SYSTEM ACTIVE
          </p>

          <h1>
            HOME WORKOUT
          </h1>

          <p className="workout-subtitle">
            Your training ground awaits, Hunter.
          </p>

        </div>


        <div className="player-info">

          <span>
            LEVEL
          </span>

          <strong>
            {currentLevel}
          </strong>


          <span>
            XP
          </span>

          <strong>
            {xp}
          </strong>


          <StreakBadge
            streak={streak}
          />

        </div>

      </header>


      <section className="quest-header">

        <div>

          <p className="system-text">
            DAILY QUEST
          </p>

          <h2>
            TRAIN YOUR BODY
          </h2>

        </div>


        <div className="quest-status">

          <span>
            NEXT LEVEL
          </span>

          <strong>
            {xpProgress} / 100 XP
          </strong>

        </div>

      </section>


      <div className="xp-bar-container">

        <div
          className="xp-bar"
          style={{
            width: `${xpPercentage}%`
          }}
        />

      </div>


      <section className="workout-grid">

        {workouts.map(
          (workout, index) => (

          <div
            className="workout-card"
            key={workout.day}
          >

            <div className="card-top">

              <span>
                {workout.day}
              </span>

              <span>
                QUEST
              </span>

            </div>


            <h2>
              {workout.focus}
            </h2>


            {workout.exercises.length > 0 ? (

              <p className="exercise-count">
                {workout.exercises.length}
                {" "}
                exercises
              </p>

            ) : (

              <p className="exercise-count">
                Recovery Day
              </p>

            )}


            <button
              className="start-button"
              onClick={() =>
                selectWorkout(index)
              }
            >

              {workout.exercises.length > 0
                ? "START QUEST"
                : "RECOVER"}

            </button>

          </div>

        ))}

      </section>


      <section className="today-quest">

        <div className="quest-title">

          <div>

            <p className="system-text">
              SELECTED QUEST
            </p>

            <h2>
              {currentWorkout.focus}
            </h2>

          </div>


          <span>

            {completed.length}
            {" / "}
            {currentWorkout.exercises.length}

          </span>

        </div>


        <div className="exercise-list">

          {currentWorkout.exercises.map(
            (exercise, index) => (

            <div
              className="exercise-row"
              key={index}
            >

              <div className="exercise-number">

                {String(index + 1)
                  .padStart(2, "0")}

              </div>


              <div className="exercise-name">

                <strong>
                  {exercise[0]}
                </strong>

                <span>
                  Exercise
                </span>

              </div>


              <div className="exercise-reps">

                {exercise[1]}

              </div>


              <div className="exercise-check">

                <input
                  type="checkbox"
                  checked={
                    completed.includes(index)
                  }
                  onChange={() =>
                    completeExercise(index)
                  }
                />

              </div>

            </div>

          ))}

        </div>


        {currentWorkout.exercises.length > 0 && (

          <button
            className="begin-quest"
            onClick={() => {

              if (
                completed.length ===
                currentWorkout.exercises.length
              ) {

                finishWorkout(xp);

              } else {

                showPopup(
                  "COMPLETE ALL EXERCISES"
                );

              }

            }}
          >

            BEGIN QUEST

          </button>

        )}

      </section>

    </main>

  );

}


export default HomeWorkoutPage;