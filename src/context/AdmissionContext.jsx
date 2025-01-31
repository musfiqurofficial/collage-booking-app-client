/* eslint-disable react/prop-types */
import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AdmissionContext = createContext();

export const AdmissionProvider = ({ children }) => {
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(
        "https://collage-booking-app-server.vercel.app/api/reviews"
      );
      setReviews(response.data);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <AdmissionContext.Provider value={{ reviews, fetchReviews }}>
      {children}
    </AdmissionContext.Provider>
  );
};

export const useAdmissions = () => useContext(AdmissionContext);
