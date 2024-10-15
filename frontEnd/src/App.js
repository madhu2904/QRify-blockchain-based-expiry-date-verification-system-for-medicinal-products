import './App.css';
import React from 'react';
import { BrowserRouter as Router ,Route,Routes} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {MainPage} from './pages/main/mainpage';
import {Register} from './pages/register/register';
import {Login} from './pages/login/login';
import {Scan} from './pages/scan/scan';
import {Product} from './pages/product/product';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


function App() {
  
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/scan" element={<Scan/>}/>
        <Route path="/product" element={<Product/>}/>
      </Routes>
     </Router>

    </div>
  );
}

export default App;