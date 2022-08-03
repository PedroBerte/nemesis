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
  let age = moment().diff(bornDate, "years");

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
          await updateDoc(doc(db, "users", uid), {
            cal: result,
          });
        }
      }
    }
  } catch (error) {
    console.error(error);
  }
}
