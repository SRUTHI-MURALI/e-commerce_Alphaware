
import React from 'react';
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProductListPage from './Pages/ProductListPage';
import Cart from './Pages/Cart';



function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<ProductListPage />} />

          <Route path="/cart" element={<Cart/>} />
          

         
          
        </Routes>
      </Router>
    </>
  );
}

export default App



