import React from 'react'

function OrderItem({ data, handleLinkClick }) {
    return (
        <>
        <div className="col-12 order-item">
            <div className="row">
                <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
                    <div className="row">
                        <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 text-left">
                            <img src={"https://cdn.shopify.com/s/files/1/1864/9955/products/image_2487a7da-158b-46c0-8f56-c17cb0e7ac9e.jpg?v=1613111014"} alt={data.model_name} className="model-image"/>
                        </div>
                        <div className="col-lg-9 col-md-9 col-sm-8 col-xs-12 text-left">
                            <h4 className="font-weight-bold">Carmen</h4>
                            <div className="row mt-3 payment-details">
                                <div className="key col-lg-4 col-md-3 col-sm-4">
                                    Booking No.
                                </div>
                                <div className="value col-lg-6 col-md-6 col-sm-8 text-right">
                                    59763530
                                </div>
                            </div>

                            <div className="row mt-3 payment-details">
                                <div className="key col-lg-4 col-md-3 col-sm-5">
                                    Payment Date
                                </div>
                                <div className="value col-lg-6 col-md-6 col-sm-7 text-right">
                                    Mon, 22 Feb 2021
                                </div>
                            </div>

                            <div className="row mt-3 payment-details">
                                <div className="key col-lg-4 col-md-3 col-sm-5">
                                    Paid Amount
                                </div>
                                <div className="value col-lg-6 col-md-6 col-sm-7 text-right">
                                    SGD&nbsp;$2400
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 text-right">
                    <div className="d-flex flex-wrap mt-5">
                        <div className="w-25 text-left">Date</div>
                        <div className="w-75 text-right">Mon, 22 Mar 2021</div>
                    </div>
                    <div className="d-flex flex-wrap mt-4">
                        <div className="w-25 text-left">Time Slot</div>
                        <div className="w-75 text-right">11am | 12pm</div>
                    </div>
                    <div onClick={() => handleLinkClick("1")} className="text-primary custom-link">
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
