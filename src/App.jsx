import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AddUser from './components/AddUser'
import Navbar from './components/Navbar'
import Home from './components/Home'
import EditUser from './components/EditUser'
import Delete from './components/Delete'
import { ToastContainer } from 'react-toastify'

const App = () => {
  return (
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create-user' element={<AddUser />}/>
        <Route path='/edit-user/:id' element={<EditUser />} />
        <Route path='/delete-user/:id' element={<Delete />} />
      </Routes>
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App