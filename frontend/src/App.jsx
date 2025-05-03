import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import PlannerPage from './pages/PlannerPage';
import HomePage from './pages/HomePage';
import Layout from './components/Layout';

function App() {
  const location = useLocation();
  const isAuthPage = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <Routes>
      <Route
        path="/"
        element={
          !isAuthPage ? (
            <Layout>
              <HomePage />
            </Layout>
          ) : (
            <HomePage />
          )
        }
      />
      <Route
        path="/planner"
        element={
          !isAuthPage ? (
            <Layout>
              <PlannerPage />
            </Layout>
          ) : (
            <PlannerPage />
          )
        }
      />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
