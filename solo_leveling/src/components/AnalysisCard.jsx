function AnalysisCard({ profile, onContinue }) {
  return (
    <section className="analysis-card">
      <p className="system-text">ANALYSIS COMPLETE</p>
      <h1>PLAYER PROFILE READY</h1>
      <div className="analysis-grid">
        <div>
          <span>BMI</span>
          <strong>{profile.bmi}</strong>
        </div>
        <div>
          <span>EST. BODY FAT</span>
          <strong>{profile.bodyFat}%</strong>
        </div>
      </div>
      <p className="analysis-note">These numbers are estimates to help set a starting point.</p>
      <button onClick={onContinue}>ENTER THE SYSTEM</button>
    </section>
  );
}

export default AnalysisCard;
