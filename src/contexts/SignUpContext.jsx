import { createContext, useState, useContext } from "react";

export const SignUpContext = createContext();

export default function SignUpContextProvider(props) {
  const [registerName, setRegisterName] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerConfirmEmail, setRegisterConfirmEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState("");
  const [registerBornDate, setRegisterBornDate] = useState("");
  const [registerSex, setRegisterSex] = useState("");
  const [registerHeight, setRegisterHeight] = useState("");
  const [registerWeight, setRegisterWeight] = useState("");
  const [registerGoal, setRegisterGoal] = useState("");
  const [gymAvailability, setGymAvailability] = useState("");
  const [gymDays, setGymDays] = useState("");
  const [userRes, setUserRes] = useState("");

  const [user, setUser] = useState("");

  const [step, setStep] = useState(1);
  const [userUID, setUserUID] = useState("");

  return (
    <SignUpContext.Provider
      value={{
        step,
        setStep,
        registerName,
        setRegisterName,
        registerEmail,
        setRegisterEmail,
        registerConfirmEmail,
        setRegisterConfirmEmail,
        registerPassword,
        setRegisterPassword,
        registerConfirmPassword,
        setRegisterConfirmPassword,
        registerBornDate,
        setRegisterBornDate,
        registerSex,
        setRegisterSex,
        registerHeight,
        setRegisterHeight,
        registerWeight,
        setRegisterWeight,
        registerGoal,
        setRegisterGoal,
        gymAvailability,
        setGymAvailability,
        gymDays,
        setGymDays,
        userUID,
        setUserUID,
        userRes,
        setUserRes,
        user,
        setUser,
      }}
    >
      {props.children}
    </SignUpContext.Provider>
  );
}

export function useSignUp() {
  const context = useContext(SignUpContext);
  if (!context) {
    throw new Error("useSignUp must be used within a SignUpContextProvider");
  }
  return context;
}
