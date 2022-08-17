import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import LoginPage from './pages/LoginPage'

const App = () => {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<LoginPage/>} />
      </Routes>
    <Footer/>
    </BrowserRouter>
  )
}

export default App