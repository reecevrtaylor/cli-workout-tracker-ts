import { Workout } from "./types";

const workouts: Workout[] = [];

export const addWorkout = (workout: Omit<Workout, "id">): void => {
  const uniqueId = crypto.randomUUID();
  workouts.push({ id: uniqueId, ...workout });
};

export const listWorkouts = (): Workout[] => {
  return workouts;
};

export const getWorkoutByNumber = (
  workoutNumber: number,
): Workout | undefined => {
  if (workoutNumber < 1 || workoutNumber > workouts.length) {
    return undefined;
  }

  return workouts[workoutNumber - 1];
};

export const deleteWorkoutById = (id: string): boolean => {
  const index = workouts.findIndex((workout) => workout.id === id);

  if (index === -1) {
    return false;
  }

  workouts.splice(index, 1);
  return true;
};

export const deleteWorkoutByNumber = (workoutNumber: number): boolean => {
  const workout = getWorkoutByNumber(workoutNumber);

  if (!workout) {
    return false;
  }

  return deleteWorkoutById(workout.id);
};

export const printWorkouts = (): void => {
  if (workouts.length === 0) {
    console.log("No workouts logged yet.");
    return;
  }

  workouts.forEach((workout, index) => {
    console.log(
      `${index + 1}) ${workout.exercise} - ${workout.weight}kg x ${workout.reps} reps`,
    );
  });
};

export const updateWorkoutById = (
  id: string,
  fieldsToUpdate: Partial<Omit<Workout, "id">>,
): boolean => {
  if (!Object.keys(fieldsToUpdate).length) {
    return false;
  }

  const index = workouts.findIndex((workout) => workout.id === id);

  if (index === -1) {
    return false;
  }

  workouts[index] = { ...workouts[index], ...fieldsToUpdate };
  return true;
};

export const updateWorkoutByNumber = (
  workoutNumber: number,
  fieldsToUpdate: Partial<Omit<Workout, "id">>,
): boolean => {
  const workout = getWorkoutByNumber(workoutNumber);

  if (!workout) {
    return false;
  }

  return updateWorkoutById(workout.id, fieldsToUpdate);
};
