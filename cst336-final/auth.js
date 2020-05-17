const mysql = require('mysql');
const bcrypt = require('bcrypt');
const session = require('express-session');
const db = require('./db.js');

module.exports = {
    
    /**
    * Validate username
    */
    isAuthenticated: (req, res, next) => {
        if (!req.session.authenticated) {
            res.redirect('/login');
        } else {
            next();
        }
    },
    
    /**
    * Validate password
    */
    checkPassword: (password, hashedValue) => {
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, hashedValue, (err, result) => {
                resolve(result);
            });
        });
    },

    /**
    * Validate username
    */
    checkUsername: (username) => {
        let sql = 'SELECT * FROM admin WHERE username = ?';
        return new Promise((resolve, reject) => {
            let conn = db.createConnection();
            conn.connect((err) => {
               if (err) throw err;
                conn.query(sql, [username], (errr, rows, fields) => {
                    if (err) throw err;
                    resolve(rows);
                });
            });
        });
    }
}