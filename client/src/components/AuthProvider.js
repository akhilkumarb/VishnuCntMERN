import React, { createContext, useState, useEffect, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
const [isLoggedIn, setIsLoggedIn] = useState(() => {
  return JSON.parse(localStorage.getItem("isLoggedIn")) || false;
});
useEffect(() => {
  localStorage.setItem("isLoggedIn", JSON.stringify(isLoggedIn));
}, [isLoggedIn]);

  const LoginAuth = () => {
    setIsLoggedIn(true);
  };
  const LogoutAuth = () => {
    setIsLoggedIn(false);
  };
  return (
    <div>
      <AuthContext.Provider value={{ isLoggedIn, LoginAuth, LogoutAuth }}>
       
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export const useAuth = () => {
  return  useContext(AuthContext);
};
