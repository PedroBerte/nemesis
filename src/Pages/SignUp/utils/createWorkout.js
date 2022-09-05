import { auth, db } from "../../../services/firebase-config";
import { setDoc, doc, updateDoc } from "firebase/firestore";

import {
  workA_day3,
  workB_day3,
  workC_day3,
  workA_day4,
  workB_day4,
  workC_day4,
  workD_day4,
  workA_day5,
  workB_day5,
  workC_day5,
  workD_day5,
  workE_day5,
  workA_noGym,
  workB_noGym,
  workC_noGym,
} from "./workouts";

export default async function createWorkout(GymAvail, GymDays, uid) {
  try {
    if (GymAvail == "GYM-S") {
      switch (GymDays) {
        case "GYM-DAYS-3":
          await setDoc(doc(db, "workouts", uid), {
            uid: uid,
            workouts: [
              {
                day: "Segunda-Feira",
                workoutInfos: workA_day3,
              },
              {
                day: "Terça-Feira",
                workoutInfos: workB_day3,
              },
              {
                day: "Quarta-Feira",
                workoutInfos: workC_day3,
              },
              {
                day: "Quinta-Feira",
                workoutInfos: {},
              },
              {
                day: "Sexta-Feira",
                workoutInfos: {},
              },
              {
                day: "Sábado",
                workoutInfos: {},
              },
              {
                day: "Domingo",
                workoutInfos: {},
              },
            ],
          });
          break;
        case "GYM-DAYS-4":
          await setDoc(doc(db, "workouts", uid), {
            uid: uid,
            workouts: [
              {
                day: "Segunda-Feira",
                workoutInfos: workA_day4,
              },
              {
                day: "Terça-Feira",
                workoutInfos: workB_day4,
              },
              {
                day: "Quarta-Feira",
                workoutInfos: workC_day4,
              },
              {
                day: "Quinta-Feira",
                workoutInfos: workD_day4,
              },
              {
                day: "Sexta-Feira",
                workoutInfos: {},
              },
              {
                day: "Sábado",
                workoutInfos: {},
              },
              {
                day: "Domingo",
                workoutInfos: {},
              },
            ],
          });
          break;
        case "GYM-DAYS-5":
          await setDoc(doc(db, "workouts", uid), {
            uid: uid,
            workouts: [
              {
                day: "Segunda-Feira",
                workoutInfos: workA_day5,
              },
              {
                day: "Terça-Feira",
                workoutInfos: workB_day5,
              },
              {
                day: "Quarta-Feira",
                workoutInfos: workC_day5,
              },
              {
                day: "Quinta-Feira",
                workoutInfos: workD_day5,
              },
              {
                day: "Sexta-Feira",
                workoutInfos: workE_day5,
              },
              {
                day: "Sábado",
                workoutInfos: {},
              },
              {
                day: "Domingo",
                workoutInfos: {},
              },
            ],
          });
          break;
      }
    } else {
      await setDoc(doc(db, "workouts", uid), {
        uid: uid,
        workouts: [
          {
            day: "Segunda-Feira",
            workoutInfos: workA_noGym,
          },
          {
            day: "Terça-Feira",
            workoutInfos: workB_noGym,
          },
          {
            day: "Quarta-Feira",
            workoutInfos: workC_noGym,
          },
        ],
      });
    }
  } catch (error) {
    console.error(error);
  }
}
