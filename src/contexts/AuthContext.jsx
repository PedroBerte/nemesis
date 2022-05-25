import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export default function AuthContextProvider(props) {
  const [user, setUser] = useState();
  const [userInformation, setUserInformation] = useState();

  useEffect(() => {
    try {
      const storagedUserInfos = localStorage.getItem(
        "@Nemesis:userInformation"
      );
      setUserInformation(JSON.parse(storagedUserInfos));
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, setUser, userInformation, setUserInformation }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
