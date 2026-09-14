import { useState } from "react";

const initialForm = {
  experience: "beginner",
  preference: "strength",
  goal: "build-strength",
  age: "",
  height: "",
  weight: "",
  sex: "female"
};

function calculateAnalysis(form) {
  const heightInMeters = Number(form.height) / 100;
  const weight = Number(form.weight);
  const bmi = weight / (heightInMeters * heightInMeters);
  const sexAdjustment = form.sex === "male" ? 1 : 0;
  const bodyFat = 1.2 * bmi + 0.23 * Number(form.age) - 10.8 * sexAdjustment - 5.4;

  return {
    bmi: bmi.toFixed(1),
    bodyFat: Math.max(bodyFat, 3).toFixed(1)
  };
}

function FitnessForm({ onComplete }) {
  const [form, setForm] = useState(initialForm);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onComplete({ ...form, ...calculateAnalysis(form) });
  };

  return (
    <form className="fitness-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Experience level
          <select name="experience" value={form.experience} onChange={updateField}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </label>

        <label>
          Workout preference
          <select name="preference" value={form.preference} onChange={updateField}>
            <option value="strength">Strength</option>
            <option value="cardio">Cardio</option>
            <option value="mixed">Strength + cardio</option>
            <option value="mobility">Mobility</option>
          </select>
        </label>

        <label>
          Primary goal
          <select name="goal" value={form.goal} onChange={updateField}>
            <option value="build-strength">Build strength</option>
            <option value="lose-fat">Lose fat</option>
            <option value="build-muscle">Build muscle</option>
            <option value="improve-fitness">Improve fitness</option>
          </select>
        </label>

        <label>
          Sex
          <select name="sex" value={form.sex} onChange={updateField}>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </label>

        <label>
          Age
          <input name="age" type="number" min="13" max="100" value={form.age} onChange={updateField} required />
        </label>

        <label>
          Height (cm)
          <input name="height" type="number" min="100" max="250" value={form.height} onChange={updateField} required />
        </label>

        <label>
          Weight (kg)
          <input name="weight" type="number" min="30" max="300" value={form.weight} onChange={updateField} required />
        </label>
      </div>

      <button type="submit">ANALYZE MY STATS</button>
    </form>
  );
}

export default FitnessForm;
