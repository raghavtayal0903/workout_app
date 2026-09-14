import WorkoutSetup from "../components/WorkoutSetup";
import "../styles/WorkoutSetup.css";

function HomePage({ onComplete }) {
  return (
    <div className="main-page">

      <h1>WELCOME, HUNTER</h1>

      <p>Build your body. Level up your life.</p>

      <WorkoutSetup onComplete={onComplete} />

    </div>
  );
}

export default HomePage;