const mysql = require('mysql');

// TODO: add db creds when put onto heroku
const isLocal = false;
const user = isLocal ? 'root' : 'b5d0939bd17b98';
const password = isLocal ? '' : '786b3e3f';
const host = isLocal ? 'localhost' : 'us-cdbr-iron-east-02.cleardb.net';
const database = isLocal ? '336_final' : 'heroku_8741d37b292ac19';

module.exports = {
    /**
    * Create db connections, and returns it
    */
    createConnection: () => {
        const conn = mysql.createConnection({
            host: host,
            user: user,
            password: password,
            database: database
        });

        return conn;
    }
}