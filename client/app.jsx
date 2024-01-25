import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store'; 
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
// import NotFoundPage from './pages/NotFoundPage';
// import DashboardPage from './pages/DashboardPage';
// import ReservationPage from './pages/ReservationPage.js';
// import PersonalPage from './pages/PersonalPage';

const queryClient = new QueryClient();
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            {/* <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/reservation" element={<ReservationPage />} />
            <Route path="/personal" element={<PersonalPage />} />
            <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </Router>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
