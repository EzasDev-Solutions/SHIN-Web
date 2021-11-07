import React, { useState, useEffect } from 'react'
import { NavLink, Link } from "react-router-dom";
import { Modal, Box, Typography, Button } from '@material-ui/core'
import "../../index.css";
import "./Navbar.css";
import { login, setApiToken, getApiToken, setUserInfo, getUserInfo } from '../../Services/authService'
import orderHistoryIcon from "../../assets/images/orderhistory-icon.png";
import userIcon from "../../assets/images/user-icon.png";
import searchIcon from "../../assets/images/search-icon.png";
import shinLogo from "../../assets/images/shin-logo.png";
import { MdClose } from "react-icons/md";

function Navbar(props) {
    const [openModal, setOpenModal] = useState(false)
    const [modalNo, setModalNo] = useState(1)

    // This kind of function I usually just put at the button onClick={() => setOpenModal(true)} since it does one thing only
    const openAccountModal = () => {
        setOpenModal(true);
    }

    // I use uncontrolled forms(using the event object instead of setting states)
    const onRegister = (e) => {
        e.preventDefault()
        alert('registering')
    }

    const onLogin = (e) => {
        e.preventDefault()
        login({ email: e.target.email.value, password: e.target.password.value })
        // alert(e.target.password.value)
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
            {/* Modal for login and register */}
            <Modal open={openModal} onClose={() => { setOpenModal(false); setModalNo(1) }}>
                <div id='loginModal' style={{ height: modalNo === 2 && 843 }}>
                    <div style={{ textAlign: 'right' }}>
                        <MdClose style={{ fontSize: 36, cursor: 'pointer' }} onClick={() => { setOpenModal(false); setModalNo(1) }} />
                    </div>
                    <div style={{ paddingInline: 20 }}>
                        <h1 style={{ textAlign: 'left', fontSize: 48 }}>{modalNo === 2 ? 'Join us' : 'Welcome back'},</h1>
                        <div style={{
                            display: 'flex', borderBottom: '2px solid', width: 216, marginTop: 40,
                            borderImage: `linear-gradient(to right, ${modalNo === 1 ? '#000 40%' : '#B9B5B4 52%'}, 
                        ${modalNo === 1 ? '#B9B5B4' : '#000'} 10%) 2`
                        }}>
                            <h3 style={{
                                textAlign: 'left', fontSize: 24, color: modalNo === 1 ? '#484848' : '#B9B5B4', cursor: 'pointer',
                                marginRight: 30
                            }} onClick={() => setModalNo(1)}>
                                SIGN IN
                            </h3>
                            <h3 style={{ textAlign: 'left', fontSize: 24, color: modalNo === 2 ? '#484848' : '#B9B5B4', cursor: 'pointer' }}
                                onClick={() => setModalNo(2)}>
                                REGISTER
                            </h3>
                        </div>
                        <form onSubmit={(e) => modalNo === 1 ? onLogin(e) : onRegister(e)} style={{ textAlign: 'left', marginTop: 61 }}>
                            {modalNo === 2 && <>
                                <label for="name">Name</label><br />
                                <input type="text" name="name"
                                    style={{ width: 563, height: 59, borderRadius: 6, border: '1px solid' }} /><br />
                            </>}
                            <label for="email">Email Address</label><br />
                            <input type="text" name="email"
                                style={{ width: 563, height: 59, borderRadius: 6, border: '1px solid' }} /><br />
                            <label for="password">Password</label><br />
                            <input type="password" name="password"
                                style={{ width: 563, height: 59, borderRadius: 6, border: '1px solid' }} /><br />
                            <Button type="submit" style={{
                                width: 563, height: 77, backgroundColor: '#3D3D3D', borderRadius: 0, marginTop: 158 + (modalNo === 2 && 20),
                                color: '#FFF', textTransform: 'none', fontSize: 35, fontFamily: 'Arial'
                            }}>{modalNo === 2 ? 'Register' : 'Login'}</Button>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Navbar
