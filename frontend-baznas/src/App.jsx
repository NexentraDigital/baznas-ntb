import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPages from './pages/LandingPages'
import Header from './components/Header'
import Footer from './components/Footer'
import ChanelPembayaranPage from './pages/chanelPembayaranPage'
import JemputZakat from './pages/jemputZakat'

export default function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<LandingPages/>}/>
        <Route path="/payment" element={<ChanelPembayaranPage/>}/>
        <Route path="/JemputZakat" element={<JemputZakat/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}
