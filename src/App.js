import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import HomePage from './components/HomePage';
import Landing from './components/Landing';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/" element={<><Signup /><Login /></>} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/landing" element={<Landing />} />
      </Routes>
    </Router>
  );
}

export default App;
