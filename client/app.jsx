import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './redux/store'; 
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ProtectedRouteOwner } from './components/ProtectedRouteOwner.jsx';
// import HomePage from './pages/HomePage';
import SignupPage from './pages/SignupPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';
// import NotFoundPage from './pages/NotFoundPage';
import DashboardPage from './pages/DashboardPage';
import ReservationPage from './pages/ReservationPage.jsx';
import PersonalPage from './pages/PersonalPage.jsx';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './redux/store.js';

const queryClient = new QueryClient();
const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Routes>
              {/* <Route path="/" element={<HomePage />} /> */}
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/dashboard/*" element={<DashboardPage />} />
              <Route path="/reserve/:id" element={<ReservationPage />} />
              <Route path="/personal" element={<PersonalPage />} />
              {/* <Route path="*" element={<NotFoundPage />} /> */}
            </Routes>
          </Router>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);
