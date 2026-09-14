export function getLevelFromXP(xp) {
  return Math.floor(xp / 100) + 1;
}

export function getXPForNextLevel(level) {
  return level * 100;
}

export function getXPProgress(xp) {
  const level = getLevelFromXP(xp);
  const previousLevelXP = (level - 1) * 100;

  return xp - previousLevelXP;
}

export function loadProgress() {
  const saved = localStorage.getItem("soloLevelingProgress");

  if (saved) {
    return JSON.parse(saved);
  }

  return {
    xp: 0,
    streak: 0,
    lastWorkoutDate: null,
    completedWorkouts: 0
  };
}

export function saveProgress(progress) {
  localStorage.setItem(
    "soloLevelingProgress",
    JSON.stringify(progress)
  );
}

export function getToday() {
  return new Date().toISOString().split("T")[0];
}

export function updateStreak(progress) {
  const today = getToday();

  if (!progress.lastWorkoutDate) {
    return {
      ...progress,
      streak: 1,
      lastWorkoutDate: today
    };
  }

  if (progress.lastWorkoutDate === today) {
    return progress;
  }

  const lastDate = new Date(progress.lastWorkoutDate);
  const currentDate = new Date(today);

  const difference =
    (currentDate - lastDate) /
    (1000 * 60 * 60 * 24);

  if (difference === 1) {
    return {
      ...progress,
      streak: progress.streak + 1,
      lastWorkoutDate: today
    };
  }

  return {
    ...progress,
    streak: 1,
    lastWorkoutDate: today
  };
}