import { createContext, useContext, useEffect, useState } from "react";
import { login, logout, onUserStateChange } from "../api/firebase";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    onUserStateChange((userData) => {
      setUserData(userData);
    });
  }, []);
  return (
    <AuthContext.Provider value={{ userData, login: login, logout: logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
