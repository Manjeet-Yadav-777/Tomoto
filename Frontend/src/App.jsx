import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import './App.css'
import Footer from './components/Footer/Footer'
import LoginPopUp from './components/LoginPopUp/LoginPopUp'
import MyOrders from './pages/MyOrders/MyOrders'
import { ToastContainer } from 'react-toastify'

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>

      {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}

      <Navbar setShowLogin={setShowLogin} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/order' element={<PlaceOrder />} />
        <Route path='/myorders' element={<MyOrders />} />
      </Routes>
      <Footer />

      <ToastContainer />

    </>

  )
}

export default App
