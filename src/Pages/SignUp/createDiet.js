import React, { useState } from "react";

import { auth, db } from "../../services/firebase-config";
import { setDoc, doc, updateDoc } from "firebase/firestore";

import moment from "moment";

export default async function createDiet(
  bornDate,
  weight,
  height,
  sex,
  goal,
  res,
  uid
) {
  moment().format();
  var age = moment().diff(bornDate, "years");
  var totalCal;
  try {
    if (goal == "G") {
      if (sex == "M") {
        if (age >= 12 && age <= 18) {
          var heightFormated = height / 100;
          var a = 61.9 * age;
          var b = 26.7 * weight;
          var c = 903 * heightFormated;
          var d = b + c;
          const result = 88.5 - a + 1 * d + 25;
          totalCal = result;
          await updateDoc(doc(db, "users", uid), {
            cal: result,
          });
        } else {
          var heightFormated = height / 100;
          var a = 9.53 * age;
          var b = 15.91 * weight;
          var c = 539.6 * heightFormated;
          var d = b + c;
          const result = 662 - a + 1 * d;
          totalCal = result;
          await updateDoc(doc(db, "users", uid), {
            cal: result,
          });
        }
      } else {
        if (age >= 12 && age <= 18) {
          var heightFormated = height / 100;
          var a = 30.8 * age;
          var b = 10 * weight;
          var c = 934 * heightFormated;
          var d = b + c;
          const result = 135.3 - a + 1 * d + 25;
          totalCal = result;
          await updateDoc(doc(db, "users", uid), {
            cal: result,
          });
        } else {
          var heightFormated = height / 100;
          var a = 6.91 * age;
          var b = 9.36 * weight;
          var c = 726 * heightFormated;
          var d = b + c;
          const result = 354 - a + 1 * d;
          totalCal = result;
          await updateDoc(doc(db, "users", uid), {
            cal: result,
          });
        }
      }
    } else {
      if (sex == "M") {
        if (age >= 12 && age <= 18) {
          var heightFormated = height / 100;
          var a = 50.9 * age;
          var b = 19.5 * weight;
          var c = 1161.7 * heightFormated;
          var d = b + c;
          const result = 114 - a + 1 * d - 500;
          totalCal = result;
          await updateDoc(doc(db, "users", uid), {
            cal: result,
          });
        } else {
          var heightFormated = height / 100;
          var a = 10.1 * age;
          var b = 13.7 * weight;
          var c = 416 * heightFormated;
          var d = b + c;
          const result = 1086 - a + 1 * d - 500;
          totalCal = result;
          await updateDoc(doc(db, "users", uid), {
            cal: result,
          });
        }
      } else {
        if (age >= 12 && age <= 18) {
          var heightFormated = height / 100;
          var a = 41.2 * age;
          var b = 15 * weight;
          var c = 701.6 * heightFormated;
          var d = b + c;
          const result = 389 - a + 1 * d - 500;
          totalCal = result;
          await updateDoc(doc(db, "users", uid), {
            cal: result,
          });
        } else {
          var heightFormated = height / 100;
          var a = 7.95 * age;
          var b = 11.4 * weight;
          var c = 619 * heightFormated;
          var d = b + c;
          const result = 448 - a + 1 * d - 500;
          totalCal = result;
          await updateDoc(doc(db, "users", uid), {
            cal: result,
          });
        }
      }
    }
    if (res == "RES-N") {
      if (totalCal >= 1700 && totalCal <= 2000) {
        await updateDoc(doc(db, "users", uid), {
          diet: [
            {
              meal: "Café da manhã",
              option: [
                {
                  id: 1,
                  foods: [
                    {
                      name: "Mamão formosa",
                      quantity: "1 e 1/2 fatias",
                    },
                    {
                      name: "Semente de linhaça",
                      quantity: "6 colheres de sopa",
                    },
                    {
                      name: "Iogurte desnatado",
                      quantity: "3 unidades",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Café sem açucar (adicionar adoçante)",
                      quantity: "1 xícara",
                    },
                    {
                      name: "Leite integral",
                      quantity: "1 xícara",
                    },
                    {
                      name: "Pão frances sem o miolo",
                      quantity: "2 unidades",
                    },
                    {
                      name: "Queijo prato",
                      quantity: "2 fatias pequenas",
                    },
                  ],
                },
              ],
            },
            {
              meal: "Lanche da manhã",
              option: [
                {
                  id: 1,
                  foods: [
                    {
                      name: "Banana",
                      quantity: "1 unidade",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Maçã",
                      quantity: "1 unidade",
                    },
                  ],
                },
              ],
            },
            {
              meal: "Almoço",
              option: [
                {
                  id: 1,
                  foods: [
                    {
                      name: "Peito de frango",
                      quantity: "1 bife",
                      instruction:
                        "Grelhar com uma colher de sopa de manteiga sem sal.",
                    },
                    {
                      name: "Batata",
                      quantity: "7 unidades",
                    },
                    {
                      name: "Arroz branco",
                      quantity: "3 colheres de sopa",
                    },
                    {
                      name: "Ervilha",
                      quantity: "5 colheres de sopa",
                    },
                    {
                      name: "Folhosos",
                      quantity: "À vontade",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Patinho moído",
                      quantity: "3 colheres de sopa",
                    },
                    {
                      name: "Arroz branco",
                      quantity: "6 colheres de sopa",
                    },
                    {
                      name: "Salada de folhosos",
                      quantity: "À vontade",
                      instruction:
                        "Temperar com uma colher de sopa de azeite extra virgem.",
                    },
                    {
                      name: "Pêra",
                      quantity: "1 unidade",
                    },
                  ],
                },
              ],
            },
            {
              meal: "Lanche da Tarde",
              option: [
                {
                  id: 1,
                  foods: [
                    {
                      name: "Iogurte natural desnatado",
                      quantity: "1 unidade",
                    },
                    {
                      name: "Morango",
                      quantity: "5 unidades",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Salada de frutas",
                      quantity: "1/2 xícara de chá",
                      instruction: "Banana + Maçã + Mamão + Laranja",
                    },
                  ],
                },
              ],
            },
            {
              meal: "Jantar",
              option: [
                {
                  id: 1,
                  foods: [
                    {
                      name: "Peito de frango",
                      quantity: "1 bife",
                    },
                    {
                      name: "Arroz branco",
                      quantity: "3 colheres de sopa",
                    },
                    {
                      name: "Tomate",
                      quantity: "3 fatias",
                    },
                    {
                      name: "Folhosos",
                      quantity: "À vontade",
                      instruction:
                        "Temperar com uma colher de sopa de azeite extra virgem.",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Patinho",
                      quantity: "2 bifes pequenos",
                    },
                    {
                      name: "Macarrão cozido",
                      quantity: "5 colheres de sopa",
                      instruction:
                        "Adicionar 3 colheres de sopa de molho de tomate.",
                    },
                    {
                      name: "Folhosos",
                      quantity: "À vontade",
                    },
                  ],
                },
              ],
            },
          ],
        });
      }
    }
  } catch (error) {
    console.error(error);
  }
}
