/* eslint-disable react/prop-types */
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import NotFound from "../pages/NotFound";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/auth/LoginPage";
import { AuthProvider } from "../context/AuthContext";
import RegisterPage from "../pages/auth/RegisterPage";
import CollegeDetailsPage from "../pages/CollageDetailsPage";
import CollegePage from "../pages/CollagePage";
import AdmissionPage from "../pages/AdmissionPage";
import MyCollegePage from "../pages/MyCollagePage";
import { AdmissionProvider } from "../context/AdmissionContext";

// Helper function to get the token from localStorage
const isAuthenticated = () => !!localStorage.getItem("token");

const ProtectedRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/auth/login" />;
};

const RedirectIfAuthenticatedRoute = ({ children }) => {
  return isAuthenticated() ? <Navigate to="/" /> : children;
};

const AppRouter = () => {
  return (
    <Router>
      <AuthProvider>
        <AdmissionProvider>
          <Routes>
            <Route
              path="/"
              element={
                <MainLayout>
                  <HomePage />
                </MainLayout>
              }
            />
            <Route
              path="/colleges"
              element={
                <MainLayout>
                  <CollegePage />
                </MainLayout>
              }
            />
            <Route
              path="/colleges/:id"
              element={
                <MainLayout>
                  <CollegeDetailsPage />
                </MainLayout>
              }
            />
            <Route
              path="/admission"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <AdmissionPage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-college"
              element={
                <ProtectedRoute>
                  <MainLayout>
                    <MyCollegePage />
                  </MainLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/auth/login"
              element={
                <RedirectIfAuthenticatedRoute>
                  <LoginPage />
                </RedirectIfAuthenticatedRoute>
              }
            />
            <Route
              path="/auth/register"
              element={
                <RedirectIfAuthenticatedRoute>
                  <RegisterPage />
                </RedirectIfAuthenticatedRoute>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AdmissionProvider>
      </AuthProvider>
    </Router>
  );
};

export default AppRouter;
