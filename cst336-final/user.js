const mysql = require('mysql');
const bcrypt = require('bcrypt');
const session = require('express-session');
const db = require('./db.js');

module.exports = {
    
    /**
    * Place order
    */
  placeOrder: (userId, item, count) => {
    let sql = 'INSERT INTO orders (userId, itemId, count) VALUES (?, ?, ?)';
    let sqlParams = [userId, item.id, item.count];
    return new Promise((resolve, reject) => {
      let conn = db.createConnection();
      conn.connect((err) => {
        if (err) throw err;
        conn.query(sql, sqlParams, (err, rows, fields) => {
          if (err) throw err;
          resolve(rows);
        });
      });
    });
  },
  
  clear: () => {
    let sql = 'TRUNCATE TABLE cart';
    return new Promise((resolve, reject) => {
      let conn = db.createConnection();
      conn.connect((err) => {
        if (err) throw err;
        conn.query(sql, (err, rows, fields) => {
          if (err) throw err;
          resolve(rows);
        });
      });
    });
  },

  /**
   * Get all inventory
   */
  getInventory: (username) => {
    let sql = 'SELECT * FROM inventory';
    return new Promise((resolve, reject) => {
      let conn = db.createConnection();
      conn.connect((err) => {
        if (err) throw err;
        conn.query(sql, [username], (err, rows, fields) => {
          if (err) throw err;
          resolve(rows);
        });
      });
    });
  },

  getMake: (username) => {
    let sql = 'SELECT DISTINCT make FROM inventory ORDER BY make';
    return new Promise((resolve, reject) => {
      let conn = db.createConnection();
      conn.connect((err) => {
        if (err) throw err;
        conn.query(sql, [username], (err, rows, fields) => {
          if (err) throw err;
          resolve(rows);
        }); //query
      }); //connection
    }); //promise
  },

  getYear: (username) => {
    let sql = 'SELECT DISTINCT year FROM inventory ORDER BY year';
    return new Promise((resolve, reject) => {
      let conn = db.createConnection();
      conn.connect((err) => {
        if (err) throw err;
        conn.query(sql, [username], (err, rows, fields) => {
          if (err) throw err;
          resolve(rows);
        }); //query
      }); //connection
    }); //promise
  },
  
    getPrice: (username) => {
    let sql = 'SELECT DISTINCT price FROM inventory ORDER BY price';
    return new Promise((resolve, reject) => {
      let conn = db.createConnection();
      conn.connect((err) => {
        if (err) throw err;
        conn.query(sql, [username], (err, rows, fields) => {
          if (err) throw err;
          resolve(rows);
        }); //query
      }); //connection
    }); //promise
  },
}