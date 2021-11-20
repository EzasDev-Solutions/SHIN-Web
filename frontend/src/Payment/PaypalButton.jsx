import React, { useState, useEffect, useRef } from 'react'
import { addOrder } from '../Services/orderService'

export default function PaypalButton({ model, timing, date }) {
    let paypalRef = useRef()
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
                addOrder({
                    fk_model_id: model.model_id, total_amount: model.rate * timing.length, date: date.toISOString().slice(0, 10),
                    duration: `${timing.length}hrs`, transaction_id: order.id,
                    fk_user_id: JSON.parse(localStorage.getItem('user')).user_id,
                    start_time: timing
                })
                console.log(order);
                window.location = 'http://localhost:3000/orderHistory'
            },
            onError: err => {
                console.error(err);
            },
        })
        window.myButton.render(paypalRef.current)
    }, [timing, date])
    return (
        <>
            <div ref={paypalRef} style={{ width: 400, marginTop: 50 }} />
        </>
    )
}