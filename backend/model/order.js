const pool = require('./databaseConfig')

const orderDB = {
    getOrderByOrderId: (data) => {

    },
    getOrderByUserId: (data) => {
        return new Promise((resolve, reject) => {
            pool.query('Select * from `order` o, model_booked_slots mbs where o.order_id = mbs.fk_order_id and o.fk_user_id=?'
                + ' group by o.order_id',
                data.user_id, (error, result) => {
                    if (error) {
                        return reject({ status: 500, msg: error })
                    }
                    resolve({ status: 200, result: result })
                })
        })
    },
    getAllOrders: () => {

    },
    addOrder: (data) => {
        let values = Object.keys(data).map(key => data[key])
        console.log(values)
        return new Promise((resolve, reject) => {
            pool.query('Insert INTO `order` (fk_model_id, total_amount, date, duration, transaction_id, fk_user_id) values (?,?,?,?,?,?)',
                values.slice(0, 6), (error, result) => {
                    console.log(error)
                    if (error) {
                        return reject({ status: 500, msg: error.message })
                    }
                    startTimes = values[6]
                    for (let i = 0; i < startTimes.length; i++) {
                        pool.query(`Insert INTO model_booked_slots(start_time, end_time, fk_order_id) values (?,?,?)`,
                            [`${startTimes[i]}:00:00`, `${startTimes[i] + 1}:00:00`, result.insertId], (err2, result2) => {
                                if (err2) {
                                    return reject({ status: 500, msg: error.message })
                                }
                                resolve({ status: 201, result: result });
                            })
                    }
                })
        })
    }
}

module.exports = orderDB