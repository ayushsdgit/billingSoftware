import React from 'react'
import './Menubar.css'
import { Link, Links } from 'react-router-dom';
import { assets } from '../../assets/assets';
import { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useEffect } from 'react';
import { useState } from 'react';





const Menubar = () => {
    const navigate = useNavigate();
    const { setAuthData } = useContext(AppContext);
const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("role");
    setAuthData(null, null);
    navigate("/login");
}

  return (
    <>
     <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-2">
    <Link className="navbar-brand" href="#">
        <img src="https://www.svgrepo.com/show/303109/adobe-xd-logo.svg" alt="Logo" height="40"/>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse p-2" id="navbarNav">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
                <Link className="nav-link " aria-current="page" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/explore">Explore</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/manage-category">Manage Category</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/manage-items">Manage Items</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/manage-users">Manage Users</Link>
            </li>
        </ul>
        <ul className="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src={assets.profile1} alt="Profile" className="rounded-circle" width="30" height="30"/>
                </a>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                    <li><a href= "#!" className="dropdown-item" >Profile</a>
                    <a href= "#!" className="dropdown-item" >Activity log</a></li>
                    <li><hr className="dropdown-divider"/></li>
                    <li><a href= "#!" className="dropdown-item" onClick={logout}>Logout</a></li>
                </ul>
            </li>
        </ul>
        <form className="d-flex">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
            <button className="btn btn-outline-light" type="submit">Search</button>
        </form>
    </div>
</nav>
</>
  )
}

export default Menubar;
