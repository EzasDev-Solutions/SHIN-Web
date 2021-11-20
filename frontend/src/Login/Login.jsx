import React, { useState, useEffect } from 'react'
import { Modal, Button } from '@material-ui/core'
import { login, register, setApiToken, getApiToken, setUserInfo, getUserInfo, logout } from '../Services/authService'
import { MdClose } from "react-icons/md";
import user from "../assets/images/user.png";
export default function Login({ openModal, setOpenModal, setIsLoggedIn }) {
    const [modalNo, setModalNo] = useState(1)
    // I use uncontrolled forms(using the event object instead of setting states)
    const onRegister = (e) => {
        e.preventDefault()
        register({
            username: e.target.name.value, email: e.target.email.value, password: e.target.password.value,
            role: 'customer'
        })
        e.target.email.value = ''
        e.target.password.value = ''
        setModalNo(1)
    }

    const onLogin = (e) => {
        e.preventDefault()
        login({ email: e.target.email.value, password: e.target.password.value })
        setOpenModal(false)
        setIsLoggedIn(true)
    }
    const onLogout = () => {
        logout(JSON.parse(localStorage.getItem('user')).user_id)
        setOpenModal(false)
        setIsLoggedIn(false)
        window.location = 'http://localhost:3000/'
    }
    return (
        <Modal open={openModal} onClose={() => { setOpenModal(false); setModalNo(1) }}>
            {localStorage.getItem('apiToken') === null ? <div id='loginModal' style={{ height: modalNo === 2 && 843 }}>
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
                                style={{ width: 563, height: 59, borderRadius: 6, border: '1px solid', marginBottom: 20 }} /><br />
                        </>}
                        <label for="email">Email Address</label><br />
                        <input type="text" name="email"
                            style={{ width: 563, height: 59, borderRadius: 6, border: '1px solid', marginBottom: 20 }} /><br />
                        <label for="password">Password</label><br />
                        <input type="password" name="password"
                            style={{ width: 563, height: 59, borderRadius: 6, border: '1px solid' }} /><br />
                        <Button type="submit" style={{
                            width: 563, height: 77, backgroundColor: '#3D3D3D', borderRadius: 0, marginTop: 158,
                            color: '#FFF', textTransform: 'none', fontSize: 35, fontFamily: 'Arial'
                        }}>{modalNo === 2 ? 'Register' : 'Login'}</Button>
                    </form>
                </div>
            </div> :
                <div id='loginModal'>
                    <div style={{ textAlign: 'right' }}>
                        <MdClose style={{ fontSize: 36, cursor: 'pointer' }} onClick={() => { setOpenModal(false); setModalNo(1) }} />
                    </div>
                    <h1 style={{ textAlign: 'left', fontSize: 48 }}>Profile</h1>
                    <img src={user} width={180} height={180} style={{ border: '2px solid', borderRadius: 100, marginTop: 30 }} />
                    <h1 style={{ textAlign: 'center', fontSize: 48, marginTop: 20 }}>{JSON.parse(localStorage.getItem('user')).username}</h1>
                    <h2 style={{ textAlign: 'center' }}>{JSON.parse(localStorage.getItem('user')).email}</h2>
                    <div style={{ paddingInline: 20 }}>
                        <Button style={{
                            width: 563, height: 77, backgroundColor: '#3D3D3D', borderRadius: 0, marginTop: 130,
                            color: '#FFF', textTransform: 'none', fontSize: 35, fontFamily: 'Arial'
                        }} onClick={() => onLogout()}>Logout</Button>
                    </div>
                </div>}
        </Modal >
    )
}