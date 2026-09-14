import LoginBox from "../components/LoginBox";
import "../styles/LoginPage.css";

function LoginPage({ onLogin }) {
  const scrollToLogin = () => {
    document.getElementById("login-box").scrollIntoView({
      behavior: "smooth"
    });
  };

  return (
    <div className="login-page">

      <section className="hero">
        <div className="hero-content">
          <p className="system-text">SYSTEM INITIALIZING...</p>

          <h1>ARISE</h1>

          <h2>YOUR SOLO LEVELING JOURNEY</h2>

          <p>
            You don't need to be the strongest.
            You just need to become stronger than you were yesterday.
          </p>

          <button onClick={scrollToLogin}>
            BEGIN YOUR JOURNEY
          </button>
        </div>
      </section>

      <section id="login-box" className="login-section">
        <LoginBox onLogin={onLogin} />
      </section>

    </div>
  );
}

export default LoginPage;