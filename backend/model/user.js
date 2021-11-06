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
                    reject({ status: 500, msg: err });
                }
                values[2] = hash
                pool.query(`Insert INTO user(username, email, password, role) values (?,?,?,?)`, values, (error, result) => {
                    if (error) {
                        if (error.code === 'ER_DUP_ENTRY') reject({ status: 403, msg: `Email ${values[1]} is already in use` })
                    }
                    resolve({ status: 201, result: result });
                })
            });
        })
    },
    userLogin: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(`Select * from user where email =?`, data.email, (error, result) => {
                if (error) reject({ status: 500, msg: error })
                if (result.length === 0) reject({ status: 404, msg: 'Email not found' })
                bcrypt.compare(data.password, result[0].password, (err, valid) => {
                    if (err) reject({ status: 500, msg: err })
                    if (!valid) reject({ status: 401, msg: 'Incorrect password' })
                    let sql3 = `Insert into token(token, fk_user_id) values (?,?)`
                    pool.query(`Select * from token where fk_user_id = ?`, result[0].user_id, (error, result2) => {
                        if (error) reject({ status: 500, msg: error })
                        if (result2.length !== 0) reject({status: 403, msg: 'User is already logged in'})
                        pool.query(sql3, [uuidv4(), result[0].user_id], (error, result) => {
                            if (error) reject({ status: 500, msg: error })
                            resolve({ status: 200, result: result })
                        })
                    })
                })
            })
        })
    },
    userLogout: (data) => {
        return new Promise((resolve, reject) => {
            pool.query(`Delete from token where fk_user_id = ?`, data.fk_user_id, (error, result) => {
                if (error) reject({ status: 500, msg: error })
                if (result.affectedRows === 0) reject({ status: 404, msg: 'User not found' })
                resolve({ status: 204, result: 'Logged out' })
            })
        })
    }
}

module.exports = userDB