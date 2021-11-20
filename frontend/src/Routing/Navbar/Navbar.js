import React, { useState, useEffect } from 'react'
import { NavLink, Link } from "react-router-dom";
import "../../index.css";
import "./Navbar.css";
import orderHistoryIcon from "../../assets/images/orderhistory-icon.png";
import userIcon from "../../assets/images/user-icon.png";
import searchIcon from "../../assets/images/search-icon.png";
import shinLogo from "../../assets/images/shin-logo.png";
import Login from '../../Login/Login';
function Navbar({ children, setIsLoggedIn, isLoggedIn }) {
    const [openModal, setOpenModal] = useState(false)
    
    // This kind of function I usually just put at the button onClick={() => setOpenModal(true)} since it does one thing only
    const openAccountModal = () => {
        setOpenModal(true);
    }
    return (
        <div>
            <nav className="navbar navbar-light shadow-sm mb-5 bg-white">
                <a className="navbar-brand ml-3" href="/">
                    <img src={shinLogo} alt="SHIN" />
                </a>
                <ul className="navbar-nav mr-auto ml-5">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/ladies">Ladies</NavLink>
                    </li>
                    <li className="nav-item ml-4">
                        <NavLink className="nav-link" to="/men">Men</NavLink>
                    </li>
                </ul>
                <ul className="navbar-nav ml-auto mr-5">
                    <li className="nav-item">
                        <div className="nav-link nav-btn">
                            <img src={searchIcon} alt="Search" />
                        </div>
                    </li>
                    <li className="nav-item ml-4">
                        <div className="nav-link nav-btn" onClick={openAccountModal}>
                            <img src={userIcon} alt="Account" />
                        </div>
                    </li>
                    {isLoggedIn && <li className="nav-item ml-4">
                        <Link className="nav-link" to="/orderHistory">
                            <img src={orderHistoryIcon} alt="Order History" />
                        </Link>
                    </li>}
                </ul>
            </nav>
            <main>
                {children}
            </main>
            <Login openModal={openModal} setOpenModal={setOpenModal} setIsLoggedIn={setIsLoggedIn} />
        </div>
    )
}

export default Navbar
