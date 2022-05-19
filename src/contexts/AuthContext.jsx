import { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider(props) {
  const [user, setUser] = useState();
  const [userInformation, setUserInformation] = useState();
  return (
    <AuthContext.Provider
      value={{ user, setUser, userInformation, setUserInformation }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
