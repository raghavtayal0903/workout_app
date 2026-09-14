function LoginBox({ onLogin }) {
  return (
    <div className="login-box">

      <p className="system-text">PLAYER LOGIN</p>

      <h2>ENTER THE SYSTEM</h2>

      <input
        type="text"
        placeholder="Email / Phone Number"
      />

      <input
        type="password"
        placeholder="Password"
      />

      <button onClick={onLogin}>
        ENTER
      </button>

      <p className="signup-text">
        New Hunter? <span>Create Account</span>
      </p>

    </div>
  );
}

export default LoginBox;