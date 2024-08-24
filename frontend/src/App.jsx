import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import LoginPage from './Pages/LoginPage';
import NotesPage from './Pages/NotesPage';
import NotFound from './Pages/NotFound';
import SignupPage from './Pages/SignupPage';
import ProtectedRoute from './components/Utils/ProtectedRoute';
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/notes" element={<ProtectedRoute><NotesPage /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
