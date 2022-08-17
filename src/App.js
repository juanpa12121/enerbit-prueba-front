import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import InventoryPage from './pages/InventoryPage'
import LoginPage from './pages/LoginPage'
import ProductList from './components/ProductList'

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
        <Route path="/inventory" element={<InventoryPage ProductList={ProductList} />} />
      </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App