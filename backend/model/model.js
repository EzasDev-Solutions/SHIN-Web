const pool = require('./databaseConfig')

const modelDB = {
    getAllModels: () => {
        return new Promise((resolve, reject) => {
            pool.query(`Select * from model`, (error, result) => {
                if (error) {
                    reject({ status: 500, error: error })
                }
                if (result.length === 0) reject({ status: 404, error: 'Model not found' })
                resolve({ status: 200, result: result })
            })
        })
    },
    getModelById: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(`Select * from model where id =?`, [data], (error, result) => {
                if (error) {
                    reject({ status: 500, error: error })
                }
                if (result.length === 0) reject({ status: 404, error: 'Model not found' })
                resolve({ status: 200, result: result })
            })
        })
    },
    searchModel: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(`Select * from model where model_name LIKE ?`, [`%${data}%`], (error, result) => {
                if (error) {
                    reject({ status: 500, error: error })
                }
                if (result.length === 0) reject({ status: 404, error: 'Model not found' })
                resolve({ status: 200, result: result })
            })
        })
    }
}

module.exports = modelDB