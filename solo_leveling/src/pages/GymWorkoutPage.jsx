import gymWorkouts from "../data/gymWorkouts";
import "../styles/WorkoutPage.css";

function GymWorkoutPage({ level, goal }) {

  const workouts = gymWorkouts[level];

  return (
    <main className="workout-page">

      <header className="workout-header">

        <div>
          <p className="system-text">SYSTEM ACTIVE</p>

          <h1>GYM WORKOUT</h1>

          <p className="workout-subtitle">
            Enter the battlefield, Hunter.
          </p>
        </div>

        <div className="player-info">
          <span>LEVEL</span>
          <strong>{level}</strong>

          <span>GOAL</span>
          <strong>{goal}</strong>
        </div>

      </header>


      <section className="quest-header">

        <div>
          <p className="system-text">DAILY QUEST</p>
          <h2>FORGE YOUR STRENGTH</h2>
        </div>

        <div className="quest-status">
          <span>QUEST STATUS</span>
          <strong>READY</strong>
        </div>

      </section>


      <section className="workout-grid">

        {workouts.map((workout) => (

          <div className="workout-card" key={workout.day}>

            <div className="card-top">
              <span>{workout.day}</span>
              <span>QUEST</span>
            </div>

            <h2>{workout.focus}</h2>

            {workout.exercises.length > 0 ? (
              <p className="exercise-count">
                {workout.exercises.length} exercises
              </p>
            ) : (
              <p className="exercise-count">
                Recovery Day
              </p>
            )}

            <button className="start-button">
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
            <p className="system-text">TODAY'S QUEST</p>
            <h2>{workouts[0].focus}</h2>
          </div>

          <span>0 / {workouts[0].exercises.length}</span>

        </div>


        <div className="exercise-list">

          {workouts[0].exercises.map((exercise, index) => (

            <div className="exercise-row" key={index}>

              <div className="exercise-number">
                {String(index + 1).padStart(2, "0")}
              </div>

              <div className="exercise-name">
                <strong>{exercise[0]}</strong>
                <span>Exercise</span>
              </div>

              <div className="exercise-reps">
                {exercise[1]}
              </div>

              <div className="exercise-check">
                □
              </div>

            </div>

          ))}

        </div>


        <button className="begin-quest">
          BEGIN QUEST
        </button>

      </section>

    </main>
  );
}

export default GymWorkoutPage;