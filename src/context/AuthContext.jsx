/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const getUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        const response = await axios.get(
          "https://collage-booking-app-server.vercel.app/api/users/me"
        );
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  };

  // Fetch user data on initial load
  useEffect(() => {
    getUser();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(
        "https://collage-booking-app-server.vercel.app/api/users/login",
        { email, password }
      );
      localStorage.setItem("token", response.data.token);
      await getUser();
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
      throw new Error("Login failed");
    }
  };

  // Google login function
  const googleLogin = async (email, name, googleId) => {
    try {
      const response = await axios.post(
        "https://collage-booking-app-server.vercel.app/api/users/google-login",
        { email, name, googleId }
      );
      localStorage.setItem("token", response.data.token);
      await getUser();
      navigate("/");
    } catch (error) {
      console.error("Google login failed:", error);
      throw new Error("Google login failed");
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
