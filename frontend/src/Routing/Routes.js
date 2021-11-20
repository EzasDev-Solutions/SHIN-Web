import React, { useState, useEffect } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

import Navbar from './Navbar/Navbar';
import ListingsPage from '../Listings/ListingsPage';
import ListingDetails from '../ListingDetails/ListingDetails';
import OrderHistory from '../OrderHistory/OrderHistory';
import Payment from '../Payment/Payment';

function Routes() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        if (localStorage.getItem('apiToken')) {
            setIsLoggedIn(true)
        }
    }, [])

    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/ladies"></Redirect>
                </Route>

                <Route exact path="/ladies">
                    <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} >
                        <ListingsPage category="Ladies" />
                    </Navbar>
                </Route>

                <Route exact path="/men">
                    <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
                        <ListingsPage category="Men" />
                    </Navbar>
                </Route>

                <Route exact path="/model/:id">
                    <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
                        <ListingDetails isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
                    </Navbar>
                </Route>

                <Route exact path="/orderHistory">
                    {isLoggedIn 
                    ? (<Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
                            <OrderHistory />
                        </Navbar>)
                    : (
                        <Redirect to="/ladies"></Redirect>
                    )}
                </Route>

                <Route exact path="/payment/:id">
                    {isLoggedIn 
                    ? (<Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}>
                            <Payment />
                        </Navbar>)
                    : (
                        <Redirect to="/ladies"></Redirect>
                    )}
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes

