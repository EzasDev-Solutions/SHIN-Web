import React, { useState, useEffect, useRef } from 'react'
import { useHistory } from 'react-router'
import swal from 'sweetalert';
import { addOrder } from '../Services/orderService'

export default function PaypalButton({ model, timing, date }) {
    let paypalRef = useRef();
    const history = useHistory();

    useEffect(() => {
        if(window.myButton) window.myButton.close();
        window.myButton = window.paypal.Buttons({
            createOrder: (data, actions) => {
                return actions.order.create({
                    intent: "CAPTURE",
                    purchase_units: [
                        {
                            amount: {
                                currency_code: 'SGD',
                                value: (model.rate * timing.length).toFixed(2),
                                breakdown: {
                                    item_total: {
                                        currency_code: 'SGD',
                                        value: (model.rate * timing.length).toFixed(2),
                                    }
                                }
                            },
                            items: [
                                {
                                    name: `${model.model_name} for ${timing.length} ${timing.length > 1 ? 'hours' : 'hour'}`,
                                    description: 'Description',
                                    quantity: 1,
                                    unit_amount: {
                                        currency_code: 'SGD',
                                        value: (model.rate * timing.length).toFixed(2)
                                    }
                                }
                            ]
                        }
                    ]
                });
            },
            onApprove: async (data, actions) => {
                const order = await actions.order.capture();
                await addOrder({
                    fk_model_id: model.model_id, total_amount: model.rate * timing.length, date: date.toISOString().slice(0, 10),
                    duration: `${timing.length}hrs`, transaction_id: order.id,
                    fk_user_id: JSON.parse(localStorage.getItem('user')).user_id,
                    start_time: timing
                })

                console.log(order);
                if(order.status === "COMPLETED") {
                    swal("Payment Sucessful", "Booking has been made sucessfully", "success")
                    history.push('/orderHistory');
                } 
                else {
                    swal("Payment Unsucessful", "Payment not completed, booking has not been made", "error")
                }
            },
            onError: err => {
                console.error(err);
                swal("Payment Unsucessful", JSON.stringify(err), "error")
            },
        })
        window.myButton.render(paypalRef.current)
    }, [timing, date])
    return (
        <>
            <div ref={paypalRef} style={{ marginTop: 50 }} />
        </>
    )
}