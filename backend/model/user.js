const pool = require('./databaseConfig')

const userDB = {
    getAllUsers: () => {
        return new Promise((resolve, reject) => {
            let sql = `Select * from users`
            pool.query(sql, (error, result) => {
                if (error) {
                    return reject(error)
                }
                return resolve(result)
            })
        })
    }
}

module.exports = userDB