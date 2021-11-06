import React, { useState } from 'react'
import { NavLink, Link } from "react-router-dom";
import "../../index.css";
import "./Navbar.css";
import orderHistoryIcon from "../../assets/images/orderhistory-icon.png";
import userIcon from "../../assets/images/user-icon.png";
import searchIcon from "../../assets/images/search-icon.png";
import shinLogo from "../../assets/images/shin-logo.png";

function Navbar(props) {
    const [openModal, setOpenModal] = useState(false)

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
                        <div className="nav-link nav-btn" onClick="">
                            <img src={searchIcon} alt="Search" />
                        </div>
                    </li>   
                    <li className="nav-item ml-4">
                        <div className="nav-link nav-btn" onClick={openAccountModal}>
                        <img src={userIcon} alt="Account" />
                        </div>
                    </li>
                    <li className="nav-item ml-4">
                        <Link className="nav-link" to="/orderhistory">
                            <img src={orderHistoryIcon} alt="Order History" />
                        </Link>
                    </li>
                </ul>
            </nav>
            <main>
                {props.children}
            </main>
        </div>
    )
}

export default Navbar
