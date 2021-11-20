import React, { useState, useEffect } from 'react'
import { getModelDetails } from '../Services/listingsService';
import { getOrderDetails } from '../Services/orderService';
function OrderItem({ data, handleLinkClick, order_id }) {
    const [model, setModel] = useState(null)
    const [orderDetail, setOrderDetail] = useState()
    useEffect(() => {
        const getOrderDetailsData = async () => {
            const response = await getOrderDetails(order_id)
            setOrderDetail(response.data)
        }
        const getModelDetailsData = async () => {
            const response = await getModelDetails(data.fk_model_id);
            setModel(response.data);
        }
        getModelDetailsData()
        getOrderDetailsData()
    }, [])
    return (
        <>
            <div className="col-12 order-item">
                <div className="row">
                    <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 text-left">
                                <img src={model && model.image_link[0]} alt={model && model.model_name} className="model-image" />
                            </div>
                            <div className="col-lg-9 col-md-9 col-sm-8 col-xs-12 text-left">
                                <h4 className="font-weight-bold">{model && model.model_name}</h4>
                                <div className="row mt-3 payment-details">
                                    <div className="key col-lg-4 col-md-3 col-sm-4">
                                        Booking No.
                                    </div>
                                    <div className="value col-lg-6 col-md-6 col-sm-8 text-right">
                                        {data.transaction_id}
                                    </div>
                                </div>

                                <div className="row mt-3 payment-details">
                                    <div className="key col-lg-4 col-md-3 col-sm-5">
                                        Payment Date
                                    </div>
                                    <div className="value col-lg-6 col-md-6 col-sm-7 text-right">
                                        {new Date(data.created_at).toUTCString().slice(0, 16)}
                                    </div>
                                </div>

                                <div className="row mt-3 payment-details">
                                    <div className="key col-lg-4 col-md-3 col-sm-5">
                                        Paid Amount
                                    </div>
                                    <div className="value col-lg-6 col-md-6 col-sm-7 text-right">
                                        SGD&nbsp;${data.total_amount}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 text-right">
                        <div className="d-flex flex-wrap mt-5">
                            <div className="w-25 text-left">Date</div>
                            <div className="w-75 text-right">{new Date(data.date).toUTCString().slice(0, 16)}</div>
                        </div>
                        <div className="d-flex flex-wrap mt-4">
                            <div className="w-25 text-left">Time Slot</div>
                            <div className="w-75 text-right">
                                {orderDetail && orderDetail.map(c => Number(c.start_time.slice(0, 2))).sort((a, b) => a - b)
                                    .map((o, index) => (
                                        <>
                                            &nbsp;{o > 11 ?
                                                `${o - (o !== 12 ? 12 : 0)}pm` :
                                                `${o}am`} {index !== orderDetail.length - 1 && '|'}
                                        </>
                                    ))}
                            </div>
                        </div>
                        <div onClick={() => handleLinkClick(data.fk_model_id)} className="text-primary custom-link">
                            <u>View Model Listing</u>
                        </div>
                    </div>
                </div>
            </div>
            <div className="seperator"></div>
        </>
    )
}

export default OrderItem
