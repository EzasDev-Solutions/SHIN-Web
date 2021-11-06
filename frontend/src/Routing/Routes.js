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

function Routes() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <Redirect to="/ladies"></Redirect>
                </Route>

                <Route exact path="/ladies">
                    <Navbar>
                        <ListingsPage category="Ladies"/>
                    </Navbar>
                </Route>

                <Route exact path="/ladies/:id">
                    <Navbar>
                        <ListingDetails />
                    </Navbar>
                </Route>

                <Route exact path="/men">
                    <Navbar>
                        <ListingsPage category="Men"/>
                    </Navbar>
                </Route>

                <Route exact path="/men/:id">
                    <Navbar>
                        <ListingDetails />
                    </Navbar>
                </Route>

                <Route exact path="/orderhistory">
                    <Navbar>
                        <div>Order History</div>
                    </Navbar>
                </Route>

                <Route exact path="/orderhistory/:id">
                    <div>Order History Details</div>
                </Route>

                <Route exact path="/payment/:id">
                    <div>Payment</div>
                </Route>
            </Switch>
        </Router>
    )
}

export default Routes

