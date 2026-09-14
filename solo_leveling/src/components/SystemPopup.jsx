function SystemPopup({ message, xp }) {
  if (!message) {
    return null;
  }

  return (
    <div className="system-popup">

      <p>SYSTEM</p>

      <h2>{message}</h2>

      {xp > 0 && (
        <strong>+{xp} XP</strong>
      )}

    </div>
  );
}

export default SystemPopup;