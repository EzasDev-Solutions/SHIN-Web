import React from 'react'
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
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/ladies"></Redirect>
                </Route>

                <Route exact path="/ladies">
                    <Navbar>
                        <ListingsPage category="Ladies" />
                    </Navbar>
                </Route>

                <Route exact path="/men">
                    <Navbar>
                        <ListingsPage category="Men" />
                    </Navbar>
                </Route>

                <Route exact path="/model/:id">
                    <Navbar>
                        <ListingDetails />
                    </Navbar>
                </Route>

                <Route exact path="/orderHistory">
                    <Navbar>
                        <OrderHistory />
                    </Navbar>
                </Route>

                <Route exact path="/payment/:id">
                    <Navbar>
                        <Payment />
                    </Navbar>
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes

