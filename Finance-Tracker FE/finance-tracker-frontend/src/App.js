import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LoginPage from './pages/login';
import Signup from './pages/signup';
import Transaction from './pages/transaction';
import './App.css';
import Home from './pages/home';
import EditTransaction from './pages/editTransaction';

function App() {
  return (
    <Router>
      <Header />
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/transaction" element={<Transaction />} />
          <Route path="/transaction/:id" element={<EditTransaction />} />        
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;