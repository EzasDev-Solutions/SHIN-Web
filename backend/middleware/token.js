const pool = require('../model/databaseConfig')

const getUserByToken = (req, res, next) => {
    let token = req.headers['authorization']; //retrieve authorization header’s content
    if (!token || !token.includes('Bearer')) return res.status(403).send('Not authorized')
    token = token.split('Bearer ')[1]
    pool.query(`Select * from user u, token t where u.id = t.fk_user_id and t.token = ?`, token, (error, result) => {
        if (error || result.length === 0) res.status(403).send('Not authorized')
        if (result.length === 0) res.status(403).send('Not authorized')
        next()
    })
}

module.exports = getUserByToken