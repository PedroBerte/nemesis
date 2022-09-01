import { auth, db } from "../../../services/firebase-config";
import { setDoc, doc, updateDoc } from "firebase/firestore";

export default async function createWorkout(GymAvail, GymDays, uid) {
  const a3 = {
    name: "Treino A",
    muscles: "Peito-Tríceps-Ombro",
    workoutsList: [
      {
        name: "Supino Reto",
        rep: "3x15",
      },
      {
        name: "Supino Inclinado",
        rep: "3x15",
      },
      {
        name: "Crucifixo",
        rep: "3x15",
      },
      {
        name: "Supino Vertical",
        rep: "3x15",
      },
      {
        name: "Tríceps corda",
        rep: "3x15",
      },
      {
        name: "Francês halter",
        rep: "3x15",
      },
      {
        name: "Pulley pronado",
        rep: "3x15",
      },
      {
        name: "Elevação lateral",
        rep: "3x15",
      },
      {
        name: "Desenvolvimento",
        rep: "3x15",
      },
      {
        name: "Encolhimento halteres",
        rep: "3x15",
      },
    ],
  };

  const b3 = {
    name: "Treino B",
    muscles: "Costa-Bíceps",
    workoutsList: [
      {
        name: "Pulley frente",
        rep: "3x15",
      },
      {
        name: "Pulley triângulo",
        rep: "3x15",
      },
      {
        name: "Pulldown",
        rep: "3x15",
      },
      {
        name: "Remada curvada",
        rep: "3x15",
      },
      {
        name: "Rosca direta",
        rep: "3x15",
      },
      {
        name: "Rosca martelo",
        rep: "3x15",
      },
      {
        name: "Rosca scott",
        rep: "3x15",
      },
      {
        name: "Rosca inversa",
        rep: "3x15",
      },
      {
        name: "Extensão lombar",
        rep: "3x15",
      },
      {
        name: "Abd inverso",
        rep: "3x15",
      },
    ],
  };

  const c3 = {
    name: "Treino C",
    muscles: "Perna Completa",
    workoutsList: [
      {
        name: "Agachamento smith",
        rep: "3x15",
      },
      {
        name: "Agachamento sumô",
        rep: "3x15",
      },
      {
        name: "Cadeira flexora",
        rep: "3x15",
      },
      {
        name: "Cadeira extensora",
        rep: "3x15",
      },
      {
        name: "Mesa flexora",
        rep: "3x15",
      },
      {
        name: "Gêmeos horizontal",
        rep: "3x15",
      },
      {
        name: "Gêmeos sóleo",
        rep: "3x15",
      },
      {
        name: "Prancha",
        rep: "3x15",
      },
      {
        name: "Abd elevação tronco",
        rep: "3x15",
      },
    ],
  };

  const a4 = {
    name: "Treino A",
    muscles: "Peito-Tríceps",
    workoutsList: [
      {
        name: "Supino reto",
        rep: "3x15",
      },
      {
        name: "Supino Inclinado",
        rep: "3x15",
      },
      {
        name: "Peck fly / Peckdeck",
        rep: "3x15",
      },
      {
        name: "Crucifixo inclinado",
        rep: "3x15",
      },
      {
        name: "Testa c/ halteres",
        rep: "3x15",
      },
      {
        name: "Tríceps banco",
        rep: "3x15",
      },
      {
        name: "Tríceps pulley V",
        rep: "3x15",
      },
      {
        name: "Abd. infra paralela",
        rep: "3x15",
      },
      {
        name: "Prancha lateral",
        rep: "3x15",
      },
    ],
  };

  const b4 = {
    name: "Treino B",
    muscles: "Costa-Bíceps",
    workoutsList: [
      {
        name: "Pulley frente",
        rep: "3x15",
      },
      {
        name: "Pulley inverso",
        rep: "3x15",
      },
      {
        name: "Remada baixa",
        rep: "3x15",
      },
      {
        name: "Pulldown",
        rep: "3x15",
      },
      {
        name: "Remo cerrote",
        rep: "3x15",
      },
      {
        name: "Rosca direta barra",
        rep: "3x15",
      },
      {
        name: "Rosca banco inclinado",
        rep: "3x15",
      },
      {
        name: "Rosca concentrada",
        rep: "3x15",
      },
      {
        name: "Abd. bola suíça",
        rep: "3x15",
      },
    ],
  };

  const c4 = {
    name: "Treino C",
    muscles: "Ombro-Panturrilha",
    workoutsList: [
      {
        name: "Elevação lateral",
        rep: "3x15",
      },
      {
        name: "Desenvolvimento barra guiada",
        rep: "3x15",
      },
      {
        name: "Remada alta",
        rep: "3x15",
      },
      {
        name: "Crucifixo inverso",
        rep: "3x15",
      },
      {
        name: "Panturrilha leg 45°",
        rep: "3x15",
      },
      {
        name: "Gêmeos sóleo",
        rep: "3x15",
      },
      {
        name: "Abd. russo",
        rep: "3x15",
      },
      {
        name: "Elevação tronco",
        rep: "3x15",
      },
    ],
  };

  const d4 = {
    name: "Treino D",
    muscles: "Perna Completa",
    workoutsList: [
      {
        name: "Agachamento smith",
        rep: "3x15",
      },
      {
        name: "Leg horizontal",
        rep: "3x15",
      },
      {
        name: "Cadeira flexora",
        rep: "3x15",
      },
      {
        name: "Passada c/ halteres",
        rep: "3x15",
      },
      {
        name: "Cadeira extensora",
        rep: "3x15",
      },
      {
        name: "Stiff c/ barra ou halter",
        rep: "3x15",
      },
      {
        name: "Cadeira abdutora",
        rep: "3x15",
      },
      {
        name: "Cadeira adutora",
        rep: "3x15",
      },
      {
        name: "Mesa flexora",
        rep: "3x15",
      },
    ],
  };

  const a5 = {
    name: "Treino A",
    muscles: "Peito-Tríceps",
    workoutsList: [
      {
        name: "Supino reto",
        rep: "3x15",
      },
      {
        name: "Supino Inclinado",
        rep: "3x15",
      },
      {
        name: "Crossover",
        rep: "3x15",
      },
      {
        name: "PeckDeck",
        rep: "3x15",
      },
      {
        name: "Crucifixo inclinado",
        rep: "3x15",
      },
      {
        name: "Tríceps corda",
        rep: "3x15",
      },
      {
        name: "Tríceps pulley",
        rep: "3x15",
      },
      {
        name: "Testa na polia",
        rep: "3x15",
      },
    ],
  };

  const b5 = {
    name: "Treino B",
    muscles: "Costa-Bíceps",
    workoutsList: [
      {
        name: "Pulley frente",
        rep: "3x15",
      },
      {
        name: "Pulley triângulo",
        rep: "3x15",
      },
      {
        name: "Remo baixo aberto",
        rep: "3x15",
      },
      {
        name: "Remo cerrote",
        rep: "3x15",
      },
      {
        name: "Extensão lombar",
        rep: "3x15",
      },
      {
        name: "Rosca direta polia",
        rep: "3x15",
      },
      {
        name: "Rosca martelo alternada",
        rep: "3x15",
      },
      {
        name: "Rosca Scott",
        rep: "3x15",
      },
      {
        name: "Rosca 21",
        rep: "3x15",
      },
    ],
  };

  const c5 = {
    name: "Treino C",
    muscles: "Posterior-Glúteos",
    workoutsList: [
      {
        name: "Levantamento terra",
        rep: "3x15",
      },
      {
        name: "Cadeira flexora",
        rep: "3x15",
      },
      {
        name: "Mesa flexora",
        rep: "3x15",
      },
      {
        name: "Agachamento sumô",
        rep: "3x15",
      },
      {
        name: "Elevação pélvica",
        rep: "3x15",
      },
      {
        name: "Cadeira abdutora",
        rep: "3x15",
      },
      {
        name: "Afundo búlgaro",
        rep: "3x15",
      },
    ],
  };

  const d5 = {
    name: "Treino D",
    muscles: "Ombro-Panturrilha",
    workoutsList: [
      {
        name: "Desenvolvimento",
        rep: "3x15",
      },
      {
        name: "Elevação frontal",
        rep: "3x15",
      },
      {
        name: "Elevação lateral",
        rep: "3x15",
      },
      {
        name: "Remo alto",
        rep: "3x15",
      },
      {
        name: "Crucifixo inverso",
        rep: "3x15",
      },
      {
        name: "Encolhimento halteres",
        rep: "3x15",
      },
      {
        name: "Gêmeos horizontal",
        rep: "3x15",
      },
      {
        name: "Gêmeos sóleo",
        rep: "3x15",
      },
    ],
  };

  const e5 = {
    name: "Treino E",
    muscles: "Quadriceps",
    workoutsList: [
      {
        name: "Agachamento livre",
        rep: "3x15",
      },
      {
        name: "Leg 45°",
        rep: "3x15",
      },
      {
        name: "Leg 90°",
        rep: "3x15",
      },
      {
        name: "Cadeira extensora",
        rep: "3x15",
      },
      {
        name: "Cadeira adutora",
        rep: "3x15",
      },
      {
        name: "Avanço c/ passada",
        rep: "3x15",
      },
    ],
  };

  const na = {
    name: "Treino A",
    muscles: "Peito-Tríceps-Ombro",
    workoutsList: [
      {
        name: "Flexão de braço",
        rep: "3x15",
      },
      {
        name: "Flexão declinada",
        rep: "3x15",
      },
      {
        name: "Flexão diamante",
        rep: "3x15",
      },
      {
        name: "Tríceps banco (apoio)",
        rep: "3x15",
      },
      {
        name: "Abd. supra c/ perna vertical",
        rep: "3x15",
      },
      {
        name: "Prancha",
        rep: "3x15",
      },
    ],
  };

  const nb = {
    name: "Treino B",
    muscles: "Costa-Bíceps-Abdômen",
    workoutsList: [
      {
        name: "Barra fixa",
        rep: "3x15",
      },
      {
        name: "Barra fixa pegada inversa",
        rep: "3x15",
      },
      {
        name: "Remada invertida",
        rep: "3x15",
      },
      {
        name: "Prancha c/ antebraço",
        rep: "3x15",
      },
      {
        name: "Abd. inverso",
        rep: "3x15",
      },
      {
        name: "Abd. escalador (alpinista)",
        rep: "3x15",
      },
    ],
  };

  const nc = {
    name: "Treino C",
    muscles: "Perna Completas",
    workoutsList: [
      {
        name: "Agachamento",
        rep: "3x15",
      },
      {
        name: "Agachamento sumô",
        rep: "3x15",
      },
      {
        name: "Afundo búlgaro",
        rep: "3x15",
      },
      {
        name: "Avanço c/ passada",
        rep: "3x15",
      },
      {
        name: "Burpee",
        rep: "3x15",
      },
      {
        name: "Abd. russo",
        rep: "3x15",
      },
    ],
  };

  try {
    if (GymAvail == "GYM-S") {
      switch (GymDays) {
        case "GYM-DAYS-3":
          await updateDoc(doc(db, "users", uid), {
            workouts: [
              {
                day: "Segunda-Feira",
                workoutsInfos: a3,
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
          await updateDoc(doc(db, "users", uid), {
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
          await updateDoc(doc(db, "users", uid), {
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
      await updateDoc(doc(db, "users", uid), {
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
