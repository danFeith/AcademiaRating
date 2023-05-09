import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Login from './components/Login/login.component';
import Profile from './components/Profile/profile';
import HomePage from './components/Home/home..component';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </div>

  );
}

export default App;
