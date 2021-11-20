import React, { useState, useEffect } from 'react'
import { Modal, Button } from '@material-ui/core'
import { login, register, setApiToken, getApiToken, setUserInfo, getUserInfo, logout } from '../Services/authService'
import { MdClose } from "react-icons/md";
import user from "../assets/images/user.png";
import swal from "sweetalert";
import { useHistory } from 'react-router';


export default function Login({ openModal, setOpenModal, setIsLoggedIn, from, id }) {
    const [modalNo, setModalNo] = useState(1)

    const history = useHistory();

    const onRegister = async (e) => {
        e.preventDefault()
        await register({
            username: e.target.name.value, email: e.target.email.value, password: e.target.password.value,
            role: 'customer'
        })
        e.target.email.value = ''
        e.target.password.value = ''
        setModalNo(1)
        swal("Registration successful", "Your account has been created!", "success")
    }

    const onLogin = async (e) => {
        e.preventDefault()
        await login({ email: e.target.email.value, password: e.target.password.value })
        setOpenModal(false)
        setIsLoggedIn(true)

        if (from === "listingDetails" && id) {
            history.push(`/payment/${id}`)
        }
    }
    const onLogout = async () => {
        await logout(JSON.parse(localStorage.getItem('user')).user_id);
        setOpenModal(false);
        setIsLoggedIn(false);
        history.push('/');
    }
    return (
        <Modal open={openModal} onClose={() => { setOpenModal(false); setModalNo(1) }}>
            {localStorage.getItem('apiToken') === null ? <div id='loginModal' style={{ width: 600, height: modalNo === 2 ? 740 : 680 }}>
                <div style={{ textAlign: 'right' }}>
                    <MdClose style={{ fontSize: 36, cursor: 'pointer' }} onClick={() => { setOpenModal(false); setModalNo(1) }} />
                </div>
                <div style={{ paddingInline: 20 }}>
                    <h1 style={{ textAlign: 'left', fontSize: 36 }}>{modalNo === 2 ? 'Join us' : 'Welcome back'},</h1>
                    <div style={{
                        display: 'flex', borderBottom: '2px solid', width: 222, marginTop: 40, paddingInline: 3,
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
                                style={{ width: 485, height: 48, borderRadius: 6, border: '1px solid', marginBottom: 20, paddingLeft: 10 }} /><br />
                        </>}
                        <label for="email">Email Address</label><br />
                        <input type="text" name="email"
                            style={{ width: 485, height: 48, borderRadius: 5, border: '1px solid', marginBottom: 20, paddingLeft: 10 }} /><br />
                        <label for="password">Password</label><br />
                        <input type="password" name="password"
                            style={{ width: 485, height: 48, borderRadius: 5, border: '1px solid', paddingLeft: 10 }} /><br />

                        <Button type="submit" style={{
                            width: 485, height: 55, backgroundColor: '#3D3D3D', borderRadius: 0, marginTop: modalNo === 2 ? 110 : 150,
                            color: '#FFF', textTransform: 'none', fontSize: 24, fontFamily: 'Medio', }}>
                                {modalNo === 2 ? 'Register' : 'Login'}
                        </Button>
                    </form>
                </div>
            </div> :
                <div id='loginModal' style={{ width: 600, height: 680 }}>
                    <div style={{ textAlign: 'right' }}>
                        <MdClose style={{ fontSize: 36, cursor: 'pointer' }} onClick={() => { setOpenModal(false); setModalNo(1) }} />
                    </div>
                    <h1 style={{ textAlign: 'left', fontSize: 36 }}>Profile</h1>
                    <img src={user} width={140} height={140} style={{ border: '2px solid', borderRadius: 100, marginTop: 30 }} />
                    <h1 style={{ textAlign: 'center', fontSize: 28, marginTop: 20 }}>{JSON.parse(localStorage.getItem('user')).username}</h1>
                    <h2 style={{ textAlign: 'center', fontSize: 20, }}>{JSON.parse(localStorage.getItem('user')).email}</h2>
                    <div style={{ paddingInline: 20 }}>
                        <Button style={{
                            width: 485, height: 55, backgroundColor: '#3D3D3D', borderRadius: 0, marginTop: 190,
                            color: '#FFF', textTransform: 'none', fontSize: 24, fontFamily: 'Medio' }} onClick={() => onLogout()}>
                                Logout
                        </Button>
                    </div>
                </div>}
        </Modal >
    )
}