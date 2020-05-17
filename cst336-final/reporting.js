const mysql = require('mysql');
const bcrypt = require('bcrypt');
const session = require('express-session');
const db = require('./db.js');

module.exports = {
    
    /**
    * Place order
    */
  
 

  /**
   * Get all inventory
   */
  getHighest: () => {
    let sql = 'SELECT color, COUNT(*) color_count from inventory GROUP BY color ORDER BY color_count DESC';
    return new Promise((resolve, reject) => {
      let conn = db.createConnection();
      conn.connect((err) => {
        if (err) throw err;
        conn.query(sql, (err, rows, fields) => {
          if (err) throw err;
          
          var x = [];
          var highest = rows[0].color_count;
          x.push(0);
          for (let i = 1; i < rows.length; i++){
            if (rows[i].color_count == highest) {
              x.push(i);
            }
          }
          resolve(x);
        });
      });
    });
  },

  getColors: () => {
    let sql = 'SELECT color, COUNT(*) color_count from inventory GROUP BY color ORDER BY color_count DESC';
    return new Promise((resolve, reject) => {
      let conn = db.createConnection();
      conn.connect((err) => {
        if (err) throw err;
        conn.query(sql, (err, rows, fields) => {
          if (err) throw err;
          resolve(rows);
        }); //query
      }); //connection
    }); //promise
  },
  
  getLowest: () => {
    let sql = 'SELECT color, COUNT(*) color_count from inventory GROUP BY color ORDER BY color_count ASC';
    return new Promise((resolve, reject) => {
      let conn = db.createConnection();
      conn.connect((err) => {
        if (err) throw err;
        conn.query(sql, (err, rows, fields) => {
          if (err) throw err;
          
          var x = [];
          var lowest = rows[0].color_count;
          x.push(0);
          for (let i = 1; i < rows.length; i++){
            if (rows[i].color_count == lowest) {
              x.push(i);
            }
          }
          resolve(x);
        });
      });
    });
  },
  getLowColors: () => {
    let sql = 'SELECT color, COUNT(*) color_count from inventory GROUP BY color ORDER BY color_count ASC';
    return new Promise((resolve, reject) => {
      let conn = db.createConnection();
      conn.connect((err) => {
        if (err) throw err;
        conn.query(sql, (err, rows, fields) => {
          if (err) throw err;
          resolve(rows);
        }); //query
      }); //connection
    }); //promise
  },
  
  
  
  
  
  //MAKES
   highestMake: () => {
    let sql = 'SELECT make, COUNT(*) make_count from inventory GROUP BY make ORDER BY make_count DESC';
    return new Promise((resolve, reject) => {
      let conn = db.createConnection();
      conn.connect((err) => {
        if (err) throw err;
        conn.query(sql, (err, rows, fields) => {
          if (err) throw err;
          
          var x = [];
          var highest = rows[0].make_count;
          x.push(0);
          for (let i = 1; i < rows.length; i++){
            if (rows[i].make_count == highest) {
              x.push(i);
            }
          }
          resolve(x);
        });
      });
    });
  },

  makes: () => {
    let sql = 'SELECT make, COUNT(*) make_count from inventory GROUP BY make ORDER BY make_count DESC';
    return new Promise((resolve, reject) => {
      let conn = db.createConnection();
      conn.connect((err) => {
        if (err) throw err;
        conn.query(sql, (err, rows, fields) => {
          if (err) throw err;
          resolve(rows);
        }); //query
      }); //connection
    }); //promise
  },
  
  lowestMake: () => {
    let sql = 'SELECT make, COUNT(*) make_count from inventory GROUP BY make ORDER BY make_count ASC';
    return new Promise((resolve, reject) => {
      let conn = db.createConnection();
      conn.connect((err) => {
        if (err) throw err;
        conn.query(sql, (err, rows, fields) => {
          if (err) throw err;
          
          var x = [];
          var lowest = rows[0].make_count;
          x.push(0);
          for (let i = 1; i < rows.length; i++){
            if (rows[i].make_count == lowest) {
              x.push(i);
            }
          }
          resolve(x);
        });
      });
    });
  },
  lowMakes: () => {
    let sql = 'SELECT make, COUNT(*) make_count from inventory GROUP BY make ORDER BY make_count ASC';
    return new Promise((resolve, reject) => {
      let conn = db.createConnection();
      conn.connect((err) => {
        if (err) throw err;
        conn.query(sql, (err, rows, fields) => {
          if (err) throw err;
          resolve(rows);
        }); //query
      }); //connection
    }); //promise
  },
  mostExpensive: () => {
    let sql = 'SELECT make, model, price from inventory ORDER BY price DESC LIMIT 1';
    return new Promise((resolve, reject) => {
      let conn = db.createConnection();
      conn.connect((err) => {
        if (err) throw err;
        conn.query(sql, (err, rows, fields) => {
          if (err) throw err;
          resolve(rows);
        }); //query
      }); //connection
    }); //promise
  },
  leastExpensive: () => {
    let sql = 'SELECT make, model, price from inventory ORDER BY price ASC LIMIT 1';
    return new Promise((resolve, reject) => {
      let conn = db.createConnection();
      conn.connect((err) => {
        if (err) throw err;
        conn.query(sql, (err, rows, fields) => {
          if (err) throw err;
          resolve(rows);
        }); //query
      }); //connection
    }); //promise
  },
  
  averagePrice: () => {
    let sql = 'SELECT AVG(price) AS averagePrice from inventory';
    return new Promise((resolve, reject) => {
      let conn = db.createConnection();
      conn.connect((err) => {
        if (err) throw err;
        conn.query(sql, (err, rows, fields) => {
          if (err) throw err;
          resolve(rows);
        }); //query
      }); //connection
    }); //promise
  },
  
  allVehicles: () => {
    let sql = 'SELECT * from inventory ORDER BY price DESC';
    return new Promise((resolve, reject) => {
      let conn = db.createConnection();
      conn.connect((err) => {
        if (err) throw err;
        conn.query(sql, (err, rows, fields) => {
          if (err) throw err;
          resolve(rows);
        }); //query
      }); //connection
    }); //promise
  },
  

}