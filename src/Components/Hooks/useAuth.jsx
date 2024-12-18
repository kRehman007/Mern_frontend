import React, { createContext, useContext } from "react";
import useUserAuth from "./useUserAuth";

const AuthContext = createContext();

//AuthProvider...
export const AuthProvider = ({ children }) => {
  const auth = useUserAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
