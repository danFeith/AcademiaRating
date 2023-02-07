import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './components/login.component';
import Profile from './components/Profile/profile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>

  );
}

export default App;
