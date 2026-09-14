function StreakBadge({ streak }) {
  return (
    <div className="streak-badge">

      <span>🔥</span>

      <div>
        <small>STREAK</small>

        <strong>
          {streak} DAYS
        </strong>
      </div>

    </div>
  );
}

export default StreakBadge;