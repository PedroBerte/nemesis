import React, { useState } from "react";

import { auth, db } from "./../../../services/firebase-config";
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
    if (sex == "M") {
      totalCal = (66 + 13.7 * weight + 5 * height - 6.8 * age) * 0.25;
    } else {
      totalCal = (655 + 9.6 * weight + 1.7 * height - 4.7 * age) * 0.2;
    }
    if (res == "RES-N") {
      if (totalCal <= 2000) {
        await updateDoc(doc(db, "diets", uid), {
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
      if (totalCal > 2000 && totalCal <= 2500) {
        await updateDoc(doc(db, "diets", uid), {
          diet: [
            {
              meal: "Café da manhã",
              option: [
                {
                  id: 1,
                  foods: [
                    {
                      name: "Café sem açúcar",
                      quantity: "1 copo pequeno",
                    },
                    {
                      name: "Leite de vaca integral",
                      quantity: "2 copos cheios",
                    },
                    {
                      name: "Pão frances sem miolo",
                      quantity: "2 unidades",
                    },
                    {
                      name: "Queijo prato",
                      quantity: "3 fatias pequenas",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Suco de laranja",
                      quantity: "1 copo",
                    },
                    {
                      name: "Peito de frango desfiado",
                      quantity: "3 colheres de sopa",
                    },
                    {
                      name: "Tapioca",
                      quantity: "5 colheres de sopa",
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
                    {
                      name: "Granola",
                      quantity: "1 colher de chá",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Mamão",
                      quantity: "1/2 unidade",
                    },
                    {
                      name: "Granola",
                      quantity: "1 colher de chá",
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
                      name: "Folhosos",
                      quantity: "À vontade",
                      instruction:
                        "Temperar com uma colher de sopa de azeite extra virgem.",
                    },
                    {
                      name: "Tomate salada",
                      quantity: "4 fatias grandes",
                    },
                    {
                      name: "Peito de frango",
                      quantity: "2 bifes pequenos",
                    },
                    {
                      name: "Arroz branco",
                      quantity: "10 colheres de sopa",
                    },
                    {
                      name: "Abacaxi",
                      quantity: "3 fatias pequenas",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Folhosos",
                      quantity: "À vontade",
                      instruction:
                        "Temperar com uma colher de sopa de azeite extra virgem.",
                    },
                    {
                      name: "Tomate salada",
                      quantity: "meia unidade",
                    },
                    {
                      name: "Legumes",
                      quantity: "4 colheres de sopa",
                    },
                    {
                      name: "Contra filé",
                      quantity: "2 bifes",
                    },
                    {
                      name: "Arroz branco",
                      quantity: "6 colheres de sopa",
                    },
                    {
                      name: "Feijão",
                      quantity: "2 conchas",
                    },
                    {
                      name: "Suco de laranja",
                      quantity: "1 copo cheio",
                    },
                  ],
                },
              ],
            },
            {
              meal: "Lanche da tarde",
              option: [
                {
                  id: 1,
                  foods: [
                    {
                      name: "Iogurte natural desnatado",
                      quantity: "1 unidade",
                    },
                    {
                      name: "Granola",
                      quantity: "1 colher de sopa",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Pão de forma integral",
                      quantity: "1 fatia",
                    },
                    {
                      name: "Requeijão",
                      quantity: "1 colher de chá",
                    },
                    {
                      name: "Morango",
                      quantity: "5 unidades médias",
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
                      name: "Macarrão cozido",
                      quantity: "9 colheres de sopa",
                    },
                    {
                      name: "Patinho",
                      quantity: "1 e 1/2 bife pequeno",
                    },
                    {
                      name: "Queijo parmesão",
                      quantity: "1 colher de sopa",
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
                      name: "Arroz branco",
                      quantity: "10 colheres de sopa",
                    },
                    {
                      name: "Batata",
                      quantity: "2 unidades médias",
                    },
                    {
                      name: "Feijão Preto",
                      quantity: "1 concha",
                    },
                    {
                      name: "Peito de frango",
                      quantity: "2 bifes pequenos",
                    },
                    {
                      name: "Folhosos",
                      quantity: "À vontade",
                      instruction:
                        "Temperar com uma colher e meia de sopa de azeite extra virgem.",
                    },
                    {
                      name: "Tomate",
                      quantity: "4 fatias grandes",
                    },
                    {
                      name: "Abacaxi",
                      quantity: "3 fatias pequenas",
                    },
                  ],
                },
              ],
            },
          ],
        });
      }
      if (totalCal > 2500) {
        await updateDoc(doc(db, "diets", uid), {
          diet: [
            {
              meal: "Café da manhã",
              option: [
                {
                  id: 1,
                  foods: [
                    {
                      name: "Ovo",
                      quantity: "3 unidades",
                    },
                    {
                      name: "Queijo Prato",
                      quantity: "3 fatias",
                    },
                    {
                      name: "Pão de forma integral",
                      quantity: "2 fatias",
                    },
                    {
                      name: "Chá de Erva Doce",
                      quantity: "200ml",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Panqueca Doce de Banana",
                      quantity: "1 panqueca",
                      instruction:
                        "1 banana + 3 ovos + 5 colheres de sopa de aveia em flocos + 3 colheres de sopa de cacau em pó",
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
                    {
                      name: "Pasta de amendoim",
                      quantity: "1 + 1/2 colher de sopa",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Castanha de Caju",
                      quantity: "10 unidades",
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
                      name: "Folhosos",
                      quantity: "À vontade",
                      instruction:
                        "Temperar com uma colher e meia de sopa de azeite de olíva.",
                    },
                    {
                      name: "Filé de frango",
                      quantity: "1 e 1/2 bife pequeno",
                    },
                    {
                      name: "Arroz",
                      quantity: "6 colheres de sopa",
                    },
                    {
                      name: "Tomate",
                      quantity: "3 fatias",
                    },
                    {
                      name: "Suco de laranja",
                      quantity: "1 copo cheio",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Filé de tilapia",
                      quantity: "1 e 1/2 filé",
                    },
                    {
                      name: "Quinoa cozida",
                      quantity: "6 colheres de sopa",
                    },
                    {
                      name: "Tomate Cereja",
                      quantity: "Meia xícara",
                      instruction:
                        "Temperar com uma colher de sopa de azeite extra virgem.",
                    },
                    {
                      name: "Suco de Uva",
                      quantity: "1 copo cheio",
                    },
                  ],
                },
              ],
            },
            {
              meal: "Lanche da tarde",
              option: [
                {
                  id: 1,
                  foods: [
                    {
                      name: "Iogurte natural desnatado",
                      quantity: "1 unidade",
                    },
                    {
                      name: "Granola",
                      quantity: "1 colher de sopa",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Pão de forma integral",
                      quantity: "1 fatia",
                    },
                    {
                      name: "Requeijão",
                      quantity: "1 colher de chá",
                    },
                    {
                      name: "Morango",
                      quantity: "5 unidades médias",
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
                      name: "Macarrão cozido",
                      quantity: "9 colheres de sopa",
                    },
                    {
                      name: "Patinho",
                      quantity: "1 e 1/2 bife pequeno",
                    },
                    {
                      name: "Queijo parmesão",
                      quantity: "1 colher de sopa",
                    },
                    {
                      name: "Folhosos",
                      quantity: "À vontade",
                      instruction:
                        "Temperar com uma colher de sopa de azeite de olívia extra virgem.",
                    },
                    {
                      name: "Suco de Limão",
                      quantity: "2 copos cheios",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Arroz branco",
                      quantity: "10 colheres de sopa",
                    },
                    {
                      name: "Batata",
                      quantity: "2 unidades médias",
                    },
                    {
                      name: "Feijão Preto",
                      quantity: "1 concha",
                    },
                    {
                      name: "Peito de frango",
                      quantity: "2 bifes pequenos",
                    },
                    {
                      name: "Folhosos",
                      quantity: "À vontade",
                      instruction:
                        "Temperar com uma colher e meia de sopa de azeite extra virgem.",
                    },
                    {
                      name: "Tomate",
                      quantity: "4 fatias grandes",
                    },
                    {
                      name: "Abacaxi",
                      quantity: "3 fatias pequenas",
                    },
                  ],
                },
              ],
            },
          ],
        });
      }
    }
    if (res == "RES-LAC") {
      if (totalCal <= 2000) {
        await updateDoc(doc(db, "diets", uid), {
          diet: [
            {
              meal: "Café da manhã",
              option: [
                {
                  id: 1,
                  foods: [
                    {
                      name: "Mamão formosa",
                      quantity: "1 fatia",
                    },
                    {
                      name: "Banana Prata",
                      quantity: "1 unidade",
                    },
                    {
                      name: "Chia em grãos",
                      quantity: "2 colheres de sopa",
                    },
                    {
                      name: "Farelo de Aveia",
                      quantity: "4 + 1/2 colheres de sopa",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Ovo",
                      quantity: "2 unidades",
                    },
                    {
                      name: "Pão de forma integral",
                      quantity: "2 fatias",
                    },
                    {
                      name: "Maçã",
                      quantity: "1 unidade",
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
                      name: "Abacaxi",
                      quantity: "1 fatia",
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
                      quantity: "1 + 1/2 filé",
                    },
                    {
                      name: "Arroz branco",
                      quantity: "10 colheres de sopa",
                    },
                    {
                      name: "Tomate",
                      quantity: "3 fatias",
                    },
                    {
                      name: "Folhosos",
                      quantity: "À vontade",
                      instruction:
                        "Temperar com 1 colher de sopa de Azeite de Oliva extra virgem",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Contra-filé",
                      quantity: "2 bifes",
                    },
                    {
                      name: "Batata",
                      quantity: "10 colheres de sopa",
                    },
                    {
                      name: "Salada de folhosos",
                      quantity: "À vontade",
                    },
                    {
                      name: "Brócolis",
                      quantity: "1 xícara",
                    },
                    {
                      name: "Pepino",
                      quantity: "1/2 unidade",
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
                      name: "Salada de Frutas",
                      quantity: "1/2 xícara de chá",
                      instruction: "Banana + Maçã + Mamão + Laranja",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Castanha de Caju",
                      quantity: "6 unidades",
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
                    {
                      name: "Suco de laranja",
                      quantity: "1 copo",
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
      if (totalCal > 2000 && totalCal <= 2500) {
        await updateDoc(doc(db, "diets", uid), {
          diet: [
            {
              meal: "Café da manhã",
              option: [
                {
                  id: 1,
                  foods: [
                    {
                      name: "Torrada integral",
                      quantity: "3 unidades (20g)",
                    },
                    {
                      name: "Pasta de amendoim integral",
                      quantity: "1 + 1/2 colher de sopa",
                    },
                    {
                      name: "Smoothie de banana",
                      quantity: "1 copo",
                      instruction:
                        "2 copos de Leite de soja + 2 unidades de Banana prata; bater no liquidificador",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Suco de laranja",
                      quantity: "1 copo",
                    },
                    {
                      name: "Ovo",
                      quantity: "3 unidades",
                    },
                    {
                      name: "Tapioca",
                      quantity: "3 colheres de sopa",
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
                    {
                      name: "Granola",
                      quantity: "1 colher de chá",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Mamão",
                      quantity: "1/2 unidade",
                    },
                    {
                      name: "Granola",
                      quantity: "1 colher de chá",
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
                      name: "Patinho",
                      quantity: "1 + 1/2 bife pequeno",
                      instruction: "Usar 1 colher de azeite no preparo",
                    },
                    {
                      name: "Batata",
                      quantity: "10 colheres de sopa",
                    },
                    {
                      name: "Arroz branco",
                      quantity: "5 colheres de sopa",
                    },
                    {
                      name: "Ervilha",
                      quantity: "6 colheres de sopa",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Folhosos",
                      quantity: "À vontade",
                      instruction:
                        "Temperar com 1 colher de sopa de Azeite de oliva",
                    },
                    {
                      name: "Tomate salada",
                      quantity: "3 fatias grandes",
                    },
                    {
                      name: "Filé de frango",
                      quantity: "1 + 1/2 bife",
                    },
                    {
                      name: "Arroz branco",
                      quantity: "5 colheres de sopa",
                    },
                    {
                      name: "Suco de uva",
                      quantity: "1 copo cheio",
                    },
                  ],
                },
              ],
            },
            {
              meal: "Lanche da tarde",
              option: [
                {
                  id: 1,
                  foods: [
                    {
                      name: "Salada de frutas",
                      quantity: "1 xícara de chá",
                      instruction: "Banana + maçã + mamão + laranja",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Mexerica (Tangerina)",
                      quantity: "1 unidade",
                    },
                    {
                      name: "Castanha de caju",
                      quantity: "6 unidades",
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
                      name: "Mandioca (Aipim) cozida",
                      quantity: "6 colheres de sopa",
                    },
                    {
                      name: "Patinho moído",
                      quantity: "3 colheres de sopa",
                    },
                    {
                      name: "Folhosos",
                      quantity: "À vontade",
                    },
                    {
                      name: "Abacaxi",
                      quantity: "4 fatias",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Arroz branco",
                      quantity: "5 colheres de sopa",
                    },
                    {
                      name: "Ovo",
                      quantity: "3 unidades",
                    },
                    {
                      name: "Beterraba",
                      quantity: "2 colheres de sopa",
                    },
                    {
                      name: "Folhosos",
                      quantity: "À vontade",
                      instruction: "Temperar com 2 colheres de sopa de azeite",
                    },
                    {
                      name: "Suco de limão",
                      quantity: "1 copo",
                    },
                  ],
                },
              ],
            },
          ],
        });
      }
      if (totalCal > 2500) {
        await updateDoc(doc(db, "diets", uid), {
          diet: [
            {
              meal: "Café da manhã",
              option: [
                {
                  id: 1,
                  foods: [
                    {
                      name: "Tapioca",
                      quantity: "5 colheres de sopa",
                    },
                    {
                      name: "Frango desfiado",
                      quantity: "5 colheres de sopa",
                    },
                    {
                      name: "Suco de laranja",
                      quantity: "1 copo",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Panqueca Doce de Banana",
                      quantity: "1 panqueca",
                      instruction:
                        "2 bananas + 4 ovos + 5 colheres de sopa de aveia em flocos + 3 colheres de sopa de cacau em pó",
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
                    {
                      name: "Pasta de amendoim",
                      quantity: "1 + 1/2 colher de sopa",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Castanha de Caju",
                      quantity: "10 unidades",
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
                      name: "Folhosos",
                      quantity: "À vontade",
                      instruction:
                        "Temperar com uma colher e meia de sopa de azeite de olíva extra virgem",
                    },
                    {
                      name: "Filé de frango",
                      quantity: "2 bifes pequeno",
                    },
                    {
                      name: "Arroz",
                      quantity: "10 colheres de sopa",
                    },
                    {
                      name: "Batata",
                      quantity: "2 unidades médias",
                    },
                    {
                      name: "Feijão",
                      quantity: "1 concha cheia",
                    },
                    {
                      name: "Tomate",
                      quantity: "4 fatias",
                    },
                    {
                      name: "Abacaxi",
                      quantity: "3 fatias pequenas",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Filé de tilapia",
                      quantity: "1 e 1/2 filé",
                    },
                    {
                      name: "Quinoa cozida",
                      quantity: "6 colheres de sopa",
                    },
                    {
                      name: "Tomate Cereja",
                      quantity: "Meia xícara",
                      instruction:
                        "Temperar com uma colher de sopa de azeite extra virgem.",
                    },
                    {
                      name: "Suco de Uva",
                      quantity: "1 copo cheio",
                    },
                  ],
                },
              ],
            },
            {
              meal: "Lanche da tarde",
              option: [
                {
                  id: 1,
                  foods: [
                    {
                      name: "Banana",
                      quantity: "1 unidade",
                    },
                    {
                      name: "Maçã",
                      quantity: "1 unidade",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Banana",
                      quantity: "1 unidade",
                    },
                    {
                      name: "Laranja",
                      quantity: "1 unidade",
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
                      name: "Arroz cozido",
                      quantity: "8 colheres de sopa",
                    },
                    {
                      name: "Batata",
                      quantity: "7 colheres de sopa",
                    },
                    {
                      name: "Contra-Filé",
                      quantity: "2 bifes pequenos",
                    },
                    {
                      name: "Tomate",
                      quantity: "4 fatias médias",
                    },
                    {
                      name: "Ervilha",
                      quantity: "8 colheres de sopa",
                    },
                    {
                      name: "Folhosos",
                      quantity: "À vontade",
                      instruction:
                        "Temperar com 1 + 1/2 colher de sopa de azeite de olívia extra virgem.",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Arroz branco",
                      quantity: "6 colheres de sopa",
                    },
                    {
                      name: "Peito de frango",
                      quantity: "1 + 1/2 bife pequeno",
                    },
                    {
                      name: "Folhosos",
                      quantity: "À vontade",
                      instruction:
                        "Temperar com 1 + 1/2 colher de sopa de azeite extra virgem.",
                    },
                    {
                      name: "Tomate",
                      quantity: "3 fatias grandes",
                    },
                    {
                      name: "Suco de laranja",
                      quantity: "1 copo cheio",
                    },
                  ],
                },
              ],
            },
          ],
        });
      }
    }
    if (res == "RES-GLU") {
      if (totalCal <= 2000) {
        await updateDoc(doc(db, "diets", uid), {
          diet: [
            {
              meal: "Café da manhã",
              option: [
                {
                  id: 1,
                  foods: [
                    {
                      name: "Ovo",
                      quantity: "3 unidades",
                    },
                    {
                      name: "Queijo Prato",
                      quantity: "2 fatias",
                    },
                    {
                      name: "Suco de laranja",
                      quantity: "1 copo",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Crepioca",
                      quantity: "1 crepioca",
                      instruction:
                        "3 colheres de sopa de Tapioca + 1 Ovo + + 4 colheres de sopa de frango desfiado",
                    },
                    {
                      name: "Suco de laranja",
                      quantity: "1 copo",
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
                      name: "Melancia",
                      quantity: "2 fatias médias",
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
                      name: "Filé de Peito de frango",
                      quantity: "1 e 1/2 filé",
                    },
                    {
                      name: "Arroz branco",
                      quantity: "10 colheres de sopa",
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
                      name: "Patinho moído",
                      quantity: "3 colheres de sopa",
                    },
                    {
                      name: "Arroz branco",
                      quantity: "6 colheres de sopa",
                    },
                    {
                      name: "Mandioca (Aimpim) cozida",
                      quantity: "5 colheres de sopa",
                    },
                    {
                      name: "Folhosos",
                      quantity: "À vontade",
                      instruction:
                        "Temperar com uma colher de sopa de azeite extra virgem.",
                    },
                    {
                      name: "Abacaxi",
                      quantity: "3 fatias pequenas",
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
                      name: "Mamão",
                      quantity: "Meia unidade",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Pêra",
                      quantity: "1 unidade",
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
                      name: "Ovo de galinha",
                      quantity: "2 unidades",
                    },
                    {
                      name: "Quinoa cozida",
                      quantity: "7 colheres de sopa",
                    },
                    {
                      name: "Grão de bico cozido",
                      quantity: "2 colheres de sopa",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Peito de frango",
                      quantity: "1 e 1/2 unidade pequena",
                    },
                    {
                      name: "Arroz branco",
                      quantity: "5 colheres de sopa",
                    },
                    {
                      name: "Batata inglesa",
                      quantity: "5 colheres de sopa",
                    },
                    {
                      name: "Suco de laranja",
                      quantity: "1 copo",
                    },
                  ],
                },
              ],
            },
          ],
        });
      }
      if (totalCal > 2000 && totalCal <= 2500) {
        await updateDoc(doc(db, "diets", uid), {
          diet: [
            {
              meal: "Café da manhã",
              option: [
                {
                  id: 1,
                  foods: [
                    {
                      name: "Ovo",
                      quantity: "3 unidades",
                    },
                    {
                      name: "Queijo prato",
                      quantity: "3 fatias grandes",
                    },
                    {
                      name: "Suco de laranja",
                      quantity: "1 e 1/2 copo",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Tapioca",
                      quantity: "4 colheres de sopa",
                    },
                    {
                      name: "Frango desfiado",
                      quantity: "5 colheres de sopa",
                    },
                    {
                      name: "Suco de laranja",
                      quantity: "1 copo",
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
                      name: "Iogurte de frutas",
                      quantity: "1 unidade",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Banana",
                      quantity: "1 unidade",
                    },
                    {
                      name: "Morango",
                      quantity: "6 unidades",
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
                      name: "Folhosos",
                      quantity: "À vontade",
                      instruction:
                        "Temperar com uma colher de sopa de azeite extra virgem.",
                    },
                    {
                      name: "Patinho moído",
                      quantity: "6 colheres de sopa",
                    },
                    {
                      name: "Tomate",
                      quantity: "1 unidade",
                    },
                    {
                      name: "Arroz branco",
                      quantity: "9 colheres de sopa",
                    },
                    {
                      name: "Cenoura",
                      quantity: "2 e 1/2 colheres de sopa",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Alcatra sem gordura",
                      quantity: "1 e 1/2 bife pequeno",
                      instruction:
                        "Adicionar 1 colher de sopa de manteiga sem sal",
                    },
                    {
                      name: "Batata inglesa sauté",
                      quantity: "10 colheres de sopa",
                    },
                    {
                      name: "Arroz branco",
                      quantity: "5 colhres",
                    },
                    {
                      name: "Ervilha",
                      quantity: "6 colheres de sopa",
                    },
                  ],
                },
              ],
            },
            {
              meal: "Lanche da tarde",
              option: [
                {
                  id: 1,
                  foods: [
                    {
                      name: "Vitamina de leite com morango",
                      quantity: "1 copo",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Salada de frutas",
                      quantity: "1 xícara de chá",
                      instruction: "Banana + Maçã + Mamão e laranja",
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
                      name: "Ovo",
                      quantity: "3 unidades",
                    },
                    {
                      name: "Arroz branco",
                      quantity: "5 colheres de sopa",
                    },
                    {
                      name: "Cenoura",
                      quantity: "2 colher de sopa",
                      instruction:
                        "Adicionar 2 colheres de sopa de azeite extra virgem.",
                    },
                    {
                      name: "Suco de limão",
                      quantity: "1 copo",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Arroz branco",
                      quantity: "5 colheres de sopa",
                    },
                    {
                      name: "Filé de frango",
                      quantity: "1 e 1/2 bife pequeno",
                    },
                    {
                      name: "Folhosos",
                      quantity: "À vontade",
                      instruction:
                        "Temperar com uma colher e meia de sopa de azeite extra virgem.",
                    },
                    {
                      name: "Tomate",
                      quantity: "3 fatias grandes",
                    },
                    {
                      name: "Suco de laranja",
                      quantity: "1 copo",
                    },
                  ],
                },
              ],
            },
          ],
        });
      }
      if (totalCal > 2500) {
        await updateDoc(doc(db, "diets", uid), {
          diet: [
            {
              meal: "Café da manhã",
              option: [
                {
                  id: 1,
                  foods: [
                    {
                      name: "Vitamina de Mamão com amaranto",
                      quantity: "1 unidade",
                      instruction:
                        "1 fatia de Mamão formosa + 2 copos de leite de vaca desnatado + 8 colheres de chá de cacau + 3 colheres de sopa de amaranto em flocos",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Tapioca",
                      quantity: "5 colheres de sopa",
                    },
                    {
                      name: "Frango desfiado",
                      quantity: "5 colheres de sopa",
                    },
                    {
                      name: "Suco de laranja",
                      quantity: "1 copo",
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
                    {
                      name: "Maçã",
                      quantity: "1 unidade",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Banana",
                      quantity: "1 unidade",
                    },
                    {
                      name: "Laranja",
                      quantity: "1 unidades",
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
                      name: "Patinho moído",
                      quantity: "5 colheres de sopa",
                    },
                    {
                      name: "Mandioca(Aimpim) cozida",
                      quantity: "10 colheres de sopa",
                    },
                    {
                      name: "Couve",
                      quantity: "1 colher de sopa",
                    },
                    {
                      name: "Abacaxi",
                      quantity: "4 fatias pequenas",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Atum em óleo",
                      quantity: "9 colheres de sopa",
                    },
                    {
                      name: "Abobrinha italiana refogada",
                      quantity: "1 escumadeira",
                    },
                    {
                      name: "Pepino",
                      quantity: "Meia unidade",
                    },
                    {
                      name: "Tomate",
                      quantity: "2 fatias",
                    },
                    {
                      name: "Macarrão s/ glúten",
                      quantity: "3 colheres de sopa",
                    },
                    {
                      name: "Azeite de oliva extra virgem",
                      quantity: "2 e 1/2 colheres de sopa",
                    },
                    {
                      name: "Suco de laranja",
                      quantity: "1 copo",
                    },
                  ],
                },
              ],
            },
            {
              meal: "Lanche da tarde",
              option: [
                {
                  id: 1,
                  foods: [
                    {
                      name: "Pera",
                      quantity: "1 unidade",
                    },
                    {
                      name: "Castanha de Caju",
                      quantity: "8 unidades",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Vitamina de leite com frutas",
                      quantity: "1 copo",
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
                      name: "Arroz branco",
                      quantity: "9 colheres de sopa",
                    },
                    {
                      name: "Patinho moído",
                      quantity: "6 colheres de sopa",
                    },
                    {
                      name: "Cenoura",
                      quantity: "2 e 1/2 colheres de sopa",
                    },
                    {
                      name: "Folhosos",
                      quantity: "À vontade",
                      instruction:
                        "Temperar com duas colheres de sopa de azeite de olívia extra virgem e um tomate.",
                    },
                    {
                      name: "Suco de Uva",
                      quantity: "1 copos cheios",
                    },
                  ],
                },
                {
                  id: 2,
                  foods: [
                    {
                      name: "Alcatra sem gordura",
                      quantity: "2 bifes pequenos",
                      instruction:
                        "Fritar com 1 colher de sopa de manteiga sem sal",
                    },
                    {
                      name: "Batata inglesa",
                      quantity: "12 colheres de sopa",
                    },
                    {
                      name: "Arroz branco",
                      quantity: "6 colheres de sopa",
                    },
                    {
                      name: "Peito de frango",
                      quantity: "2 bifes pequenos",
                    },
                    {
                      name: "Ervilha",
                      quantity: "7 colheres de sopa",
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
