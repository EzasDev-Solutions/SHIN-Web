const pool = require('./databaseConfig')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt')
const saltRounds = 10

const userDB = {
    userRegister: (data) => {
        let values = Object.keys(data).map(key => data[key])
        return new Promise((resolve, reject) => {
            bcrypt.hash(values[2], saltRounds, (err, hash) => {
                if (err) {
                    console.log(err)
                    return reject({ status: 500, msg: err });
                }
                values[2] = hash
                pool.query(`Insert INTO user(username, email, password, role) values (?,?,?,?)`, values, (error, result) => {
                    if (error) {
                        if (error.code === 'ER_DUP_ENTRY') return reject({ status: 400, msg: `Email ${values[1]} is already in use` })
                        return reject({ status: 500, msg: error })
                    }
                    resolve({ status: 201, result: result });
                })
            });
        })
    },
    userLogin: (data) => {
        let sql = 'Insert into token(token, fk_user_id) values (?,?);Select token from token where fk_user_id = ?'
        return new Promise((resolve, reject) => {
            pool.query(`Select * from user where email =?`, data.email, (error, result) => {
                if (error) return reject({ status: 500, msg: error })
                if (result.length === 0) return reject({ status: 404, msg: 'Email not found' })
                bcrypt.compare(data.password, result[0].password, (err, valid) => {
                    if (err) return reject({ status: 500, msg: err })
                    if (!valid) return reject({ status: 400, msg: 'Incorrect password' })
                    pool.query(`Select * from token where fk_user_id = ?`, result[0].user_id, (error, result2) => {
                        if (error) return reject({ status: 500, msg: error })
                        // if (result2.length !== 0) return reject({ status: 403, msg: 'User is already logged in' })
                        if (result2.length !== 0) {
                            sql = 'Update token set token=? where fk_user_id=?;Select token from token where fk_user_id = ?'
                        }
                        pool.query(sql, [uuidv4(), result[0].user_id, result[0].user_id], (error, result3) => {
                            if (error) return reject({ status: 500, msg: error })
                            resolve({ status: 200, result: { result: result[0], apiToken: result3[1][0].token } })
                        })
                    })
                })
            })
        })
    },
    userLogout: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(`Delete from token where fk_user_id = ?`, data.fk_user_id, (error, result) => {
                console.log(result)
                console.log(error)
                if (error) return reject({ status: 500, msg: error })
                if (result.affectedRows === 0) return reject({ status: 404, msg: 'User not found' })
                resolve({ status: 204, result: 'Logged out' })
            })
        })
    },
}

module.exports = userDB