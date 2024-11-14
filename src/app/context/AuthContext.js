import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(null);
  const [count, setcount] = useState(false);
  const [profile_auth, setProfile] = useState("");
  useEffect(() => {
    // Load the auth state from localStorage or an API
    const token = localStorage.getItem("user-token");
    const profile = JSON.parse(localStorage.getItem("user-profile"));
    if(profile){
      setProfile(profile);
    }
    if (token) {
      setAuth({ token });
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("user-token", token);
    setAuth({ token });
  };

  const logout = () => {
    localStorage.removeItem("user-token");
    setAuth(null);
  };
  const handleProfileDataSave = (state) => {
    setProfile(state);
  };

  return (
    <AuthContext.Provider value={{ auth, profile_auth, login, logout, handleProfileDataSave }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
