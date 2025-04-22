
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React from 'react'
import Home from './pages/Home'
import Navbar from './pages/NavBar'
import Registration from './pages/Registration'

import Login from './pages/Login'
import Logout from './pages/Logout'
import About from './pages/About'
import { AuthProvider } from './store/auth'
import Contactus from './pages/Contactus'
import Servicespage from './pages/Services'
import Admindashboard from './pages/Admindashbord'
import AdminServices from './component/Adminservices'
import AdminContact from './component/Admincontact'
import AdminUser from './component/Adminuser'


function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Servicespage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contactus />} />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/logout" element={<Logout />} />
            <Route path='/admin' element={<Admindashboard />}>
              <Route path="user" element={<AdminUser />} />
              <Route path="*" element={<AdminUser />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="contact" element={<AdminContact />} />
            </Route>
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
