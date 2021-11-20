import React, { useEffect, useState } from 'react';
import { BackdropLoader } from "../ShareComponents/loader";
import { useHistory, useLocation } from "react-router-dom";
import OrderItem from './OrderItem';
import OrderService from '../Services/orderService';
import "./OrderHistory.css";

function OrderHistory() {
    useEffect(() => {
        getOrderHistory();
    }, []);

    const [orderList, setOrderList] = useState([]);
    const [loader, setloader] = useState(false);
    let history = useHistory();

    const getOrderHistory = async () => {
        setloader(true);
        const response = await OrderService.getOrderHistory(JSON.parse(localStorage.getItem('user')).user_id);
        if(response && response.data){
            setOrderList(response.data);
        }
        setloader(false);
    }

    const handleModelClick = (modelId) => {
        history.push(`/model/${modelId}`);
    }

    return (
        <div className="container mb-5">
            <BackdropLoader open={loader} />
            <div className="row">
                <div className="title col-sm-12">Order History</div>
            </div>
            <div className="row">
                {orderList.map((order, index) => {
                    return <OrderItem data={order} key={index} handleLinkClick={handleModelClick} order_id={order.fk_order_id} />
                })}
            </div>
        </div>
    )
}

export default OrderHistory
