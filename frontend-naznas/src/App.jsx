import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPages from './pages/LandingPages'
import Header from './components/Header'
import Footer from './components/Footer'

export default function App() {
  return (
    <Router>
      <Header/>
      <Routes>
        <Route path="/" element={<LandingPages/>}/>
      </Routes>
      <Footer/>
    </Router>
  )
}
