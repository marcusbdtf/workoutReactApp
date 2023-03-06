import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import AddWorkoutPage from './components/AddWorkoutPage';
import EditWorkoutPage from './components/EditWorkoutPage';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddWorkoutPage />} />
        <Route path="/edit/:id" element={<EditWorkoutPage />} />
      </Routes>
    </Router>
  );
}

export default App;
