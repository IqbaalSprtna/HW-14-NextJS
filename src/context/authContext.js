import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/router";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = window.localStorage.getItem("token");
      setIsLogin(!!token);
    }
  }, []);

  const login = (token) => {
    window.localStorage.setItem("token", token);
    setIsLogin(true);
  };

  const logout = () => {
    window.localStorage.removeItem("token");
    setIsLogin(false);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
