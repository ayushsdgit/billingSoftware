import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Menubar from './components/Menubar/Menubar';
import ManageItems from './pages/ManageItems/ManageItems';
import ManageUsers from './pages/ManageUsers/ManageUsers';
import Dashboard from './pages/Dashboard/Dashboard';
import ManageCategory from './pages/ManageCategory/ManageCategory';
import Explore from './pages/Explore/Explore';
import { Toaster } from 'react-hot-toast';
import Login from './pages/Login/Login';
import { useLocation } from 'react-router-dom';





const App = () => {
  const location = useLocation();

    return(
  <>
    {location.pathname !== "/login" && <Menubar/>}
    <Toaster/>
    
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/manage-category" element={<ManageCategory />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/manage-items" element={<ManageItems />} />
        <Route path="/manage-users" element={<ManageUsers />} />
        <Route path="/login" element={<Login />} />
      </Routes>
   
  </>
  )
}

export default App
