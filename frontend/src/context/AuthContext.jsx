import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

const api = axios.create({ baseURL: "/api" });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("srm_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token    = localStorage.getItem("srm_token");
    const stored   = localStorage.getItem("srm_user");
    if (token && stored) {
      setUser(JSON.parse(stored));
      
      api.get("/auth/me")
        .then((res) => {
          setUser(res.data);
          localStorage.setItem("srm_user", JSON.stringify(res.data));
        })
        .catch(() => {
          
          localStorage.removeItem("srm_token");
          localStorage.removeItem("srm_user");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const saveSession = (token, userData) => {
    localStorage.setItem("srm_token", token);
    localStorage.setItem("srm_user", JSON.stringify(userData));
    setUser(userData);
  };

  const register = async ({ name, email, password, program }) => {
    const { data } = await api.post("/auth/register", { name, email, password, program });
    saveSession(data.access_token, data.user);
    return data.user;
  };

  const login = async ({ email, password }) => {
    const { data } = await api.post("/auth/login", { email, password });
    saveSession(data.access_token, data.user);
    return data.user;
  };

  const logout = () => {
    localStorage.removeItem("srm_token");
    localStorage.removeItem("srm_user");
    setUser(null);
  };

  const updateUser = (updated) => {
    const merged = { ...user, ...updated };
    setUser(merged);
    localStorage.setItem("srm_user", JSON.stringify(merged));
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isLoggedIn: !!user,
      register,
      login,
      logout,
      updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

export { api };   