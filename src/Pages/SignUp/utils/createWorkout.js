import { auth, db } from "../../../services/firebase-config";
import { setDoc, doc, updateDoc } from "firebase/firestore";

import {
  a3,
  b3,
  c3,
  a4,
  b4,
  c4,
  d4,
  a5,
  b5,
  c5,
  d5,
  e5,
  na,
  nb,
  nc,
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
                workoutInfos: a3,
              },
              {
                day: "Terça-Feira",
                workoutInfos: b3,
              },
              {
                day: "Quarta-Feira",
                workoutInfos: c3,
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
                workoutInfos: a4,
              },
              {
                day: "Terça-Feira",
                workoutInfos: b4,
              },
              {
                day: "Quarta-Feira",
                workoutInfos: c4,
              },
              {
                day: "Quinta-Feira",
                workoutInfos: d4,
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
                workoutInfos: a5,
              },
              {
                day: "Terça-Feira",
                workoutInfos: b5,
              },
              {
                day: "Quarta-Feira",
                workoutInfos: c5,
              },
              {
                day: "Quinta-Feira",
                workoutInfos: d5,
              },
              {
                day: "Sexta-Feira",
                workoutInfos: e5,
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
            workoutInfos: na,
          },
          {
            day: "Terça-Feira",
            workoutInfos: nb,
          },
          {
            day: "Quarta-Feira",
            workoutInfos: nc,
          },
        ],
      });
    }
  } catch (error) {
    console.error(error);
  }
}
