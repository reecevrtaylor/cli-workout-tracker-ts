import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline";
import {
  addWorkout,
  deleteWorkoutByNumber,
  printWorkouts,
  updateWorkoutByNumber,
} from "./workoutService";

const rl = readline.createInterface({ input, output });

rl.on("close", () => {
  console.log("Goodbye!");
  process.exit(0);
});

export const cmdStart = (): void => {
  rl.question(
    "Would you like to (a)dd to, (l)ist, (d)elete, or (u)pdate your workouts? ",
    (answer) => {
      switch (answer.trim().toLowerCase()) {
        case "a":
          rl.question("What exercise: ", (exercise: string) => {
            rl.question("What weight: ", (weightInput: string) => {
              rl.question("How many reps: ", (repsInput: string) => {
                const weight = Number(weightInput);
                const reps = Number(repsInput);

                if (Number.isNaN(weight) || Number.isNaN(reps)) {
                  console.log("Weight and reps must be numbers.");
                  cmdStart();
                  return;
                }

                addWorkout({
                  exercise: exercise.trim(),
                  weight,
                  reps,
                });

                console.log("Workout added");
                cmdStart();
              });
            });
          });
          break;

        case "l":
          printWorkouts();
          cmdStart();
          break;

        case "d":
          printWorkouts();
          rl.question("Enter workout number to delete: ", (input: string) => {
            const workoutNumber = Number(input);

            if (Number.isNaN(workoutNumber)) {
              console.log("Please enter a valid number.");
              cmdStart();
              return;
            }

            const deleted = deleteWorkoutByNumber(workoutNumber);
            console.log(deleted ? "Workout deleted." : "Workout not found.");
            cmdStart();
          });
          break;

        case "u":
          printWorkouts();
          rl.question("Enter workout number to update: ", (input: string) => {
            const workoutNumber = Number(input);

            if (Number.isNaN(workoutNumber)) {
              console.log("Please enter a valid number.");
              cmdStart();
              return;
            }

            rl.question("New reps: ", (repsInput: string) => {
              const reps = Number(repsInput);

              if (Number.isNaN(reps)) {
                console.log("Please enter a valid number.");
                cmdStart();
                return;
              }

              const updated = updateWorkoutByNumber(workoutNumber, { reps });
              console.log(updated ? "Workout updated." : "Workout not found.");
              cmdStart();
            });
          });
          break;

        case "q":
          rl.close();
          break;

        default:
          console.log("Invalid option");
          cmdStart();
      }
    },
  );
};
