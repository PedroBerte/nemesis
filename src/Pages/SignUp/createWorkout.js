import { auth, db } from "../../services/firebase-config";
import { setDoc, doc, updateDoc } from "firebase/firestore";

export default async function createWorkout(GymAvail, GymDays, uid) {
  try {
    if (GymAvail == "GYM-S") {
      switch (GymDays) {
        case "GYM-DAYS-3":
          await updateDoc(doc(db, "users", uid), {
            workouts: [
              {
                name: "Treino A",
                muscles: "Peito-Tríceps-Ombro",
                day: "Segunda-Feira",
                workoutsInfos: [
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
              },
              {
                name: "Treino B",
                muscles: "Costa-Bíceps",
                day: "Terça-Feira",
                workoutsInfos: [
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
              },
              {
                name: "Treino C",
                muscles: "Perna Completa",
                day: "Quarta-Feira",
                workoutsInfos: [
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
              },
            ],
          });
          break;
        case "GYM-DAYS-4":
          await updateDoc(doc(db, "users", uid), {
            workouts: [
              {
                name: "Treino A",
                muscles: "Peito-Tríceps",
                day: "Segunda-Feira",
                workoutsInfos: [
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
              },
              {
                name: "Treino B",
                muscles: "Costa-Bíceps",
                day: "Terça-Feira",
                workoutsInfos: [
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
              },
              {
                name: "Treino C",
                muscles: "Ombro-Panturrilha",
                day: "Quarta-Feira",
                workoutsInfos: [
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
              },
              {
                name: "Treino D",
                muscles: "Perna Completa",
                day: "Quinta-Feira",
                workoutsInfos: [
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
              },
            ],
          });
          break;
        case "GYM-DAYS-5":
          await updateDoc(doc(db, "users", uid), {
            workouts: [
              {
                name: "Treino A",
                muscles: "Peito-Tríceps",
                day: "Segunda-Feira",
                workoutsInfos: [
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
              },
              {
                name: "Treino B",
                muscles: "Costa-Bíceps",
                day: "Terça-Feira",
                workoutsInfos: [
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
              },
              {
                name: "Treino C",
                muscles: "Posterior-Glúteos",
                day: "Quarta-Feira",
                workoutsInfos: [
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
              },
              {
                name: "Treino D",
                muscles: "Ombro-Panturrilha",
                day: "Quinta-Feira",
                workoutsInfos: [
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
              },
              {
                name: "Treino E",
                muscles: "Quadriceps",
                day: "Sexta-Feira",
                workoutsInfos: [
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
              },
            ],
          });
          break;
      }
    } else {
      await updateDoc(doc(db, "users", uid), {
        workouts: [
          {
            name: "Treino A",
            muscles: "Peito-Tríceps-Ombro",
            day: "Segunda-Feira",
            workoutsInfos: [
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
          },
          {
            name: "Treino B",
            muscles: "Costa-Bíceps-Abdômen",
            day: "Terça-Feira",
            workoutsInfos: [
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
          },
          {
            name: "Treino C",
            muscles: "Perna Completas",
            day: "Quarta-Feira",
            workoutsInfos: [
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
          },
        ],
      });
    }
  } catch (error) {
    console.error(error);
  }
}
