const request = require('request');
const mysql = require('mysql');
const isLocal = true;
// TODO: set prod credentials once we have hosted db up
var user = isLocal ? 'root' : '';
var password = isLocal ? '' : '';
var host = isLocal ? 'localhost' : '';
var database = isLocal ? 'img_gallery' : '';

module.exports = {    
    /**
    * Create db connection
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
