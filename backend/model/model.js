const pool = require('./databaseConfig')

const modelDB = {
    getAllModels: () => {
        return new Promise((resolve, reject) => {
            pool.query(`Select * from model m, image i where m.model_id = i.fk_model_id group by m.model_id`, (error, result) => {
                if (error) {
                    return reject({ status: 500, msg: error })
                }
                if (result.length === 0) return reject({ status: 404, msg: 'Model not found' })
                resolve({ status: 200, result: result })
            })
        })
    },
    getModelById: (data) => {
        let languages = []
        let services = []
        let images = []
        return new Promise((resolve, reject) => {
            pool.query(`Select m.model_id, m.model_name, m.country, m.description, m.age, m.rate, m.height, m.booked,
            m.start_date, m.end_date, m.gender, m.created_at, l.language from model m, model_language ml, language l where m.model_id = ml.fk_model_id and 
            ml.fk_language_id = l.language_id and m.model_id =?`, data, (error, result) => {
                if (error) {
                    return reject({ status: 500, msg: error })
                }
                if (result.length === 0) return reject({ status: 404, msg: 'Model not found' })
                pool.query(`Select s.service from model m, model_service ms, service s where m.model_id = ms.fk_model_id and 
                ms.fk_service_id = s.service_id and m.model_id=?`, data, (error2, result2) => {
                    // console.log(result2)
                    if (error2) return reject({ status: 500, msg: error })
                    pool.query(`Select * from model m, image i where m.model_id = i.fk_model_id and m.model_id =?`, data,
                        (error3, result3) => {
                            if (error3) return reject({ status: 500, msg: error })
                            result.map(r => languages.push(r.language))
                            result[0].languages = languages
                            delete result[0].language
                            result2.map(z => services.push(z.service))
                            result[0].services = result2.map(a => a.service)
                            result3.map(f => images.push(f.image_link))
                            result[0]['image_link'] = images
                            resolve({ status: 200, result: result[0] })
                        })
                })
            })
        })
    },
    searchModel: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(`Select * from model where model_name LIKE ?`, [`%${data}%`], (error, result) => {
                if (error) {
                    return reject({ status: 500, msg: error })
                }
                if (result.length === 0) return reject({ status: 404, msg: 'Model not found' })
                resolve({ status: 200, result: result })
            })
        })
    },
    getModelSlots: (data) => {
        return new Promise((resolve, reject) => {
            pool.query('Select * from `order` o, model_booked_slots mbs where o.order_id = mbs.fk_order_id and ' 
            +'o.fk_model_id =? and o.date =?',
                [data.model_id, data.date], (error, result) => {
                    if (error) {
                        return reject({ status: 500, msg: error })
                    }
                    resolve({ status: 200, result: result })
                })
        })
    }
}

module.exports = modelDB