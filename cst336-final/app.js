const express = require('express');
const request = require('request');
const session = require('express-session');
const bcrypt = require('bcrypt');
const mysql = require('mysql');

const auth = require('./auth.js');
const user = require('./user.js');
const db = require('./db.js');
const reporting = require('./reporting.js');

const app = express();

// running locally at http://[containerUrl]:8081/
const isLocal = false;
const port = isLocal ? 8081 : process.env.PORT;
const ip = isLocal ? '0.0.0.0' : process.env.IP;

app.set('view engine', 'ejs');
app.use(express.static('public'));
// allows us to parse post params
app.use(express.urlencoded({extended: true}));
// session
app.use(session({
    secret: "top secret!",
    resave: true,
    saveUninitialized: true
}))


// root route
app.get('/', (req, res) => {
     let requestURL="https://api.unsplash.com/photos//random?query=automobile&orientation=landscape&client_id=20f34db7a19919b3214f186ad5c0a72069967789fec93d56b2835dbadc1b7d82";
      request(requestURL, function(error, response, body) {
       
        
        if(!error) {
          let photoData = JSON.parse(body);
          let imageURL = photoData.urls.regular;
        
          res.render("index", {"imageURL": imageURL});
         
        }
      });
});

// user route
app.get('/user', async (req, res) => {
    req.session.buyerId = 1; // Login emulation
    const cars = await user.getMake();
    const year = await user.getYear();
    const price = await user.getPrice();
    res.render('user', {cars: cars, year: year, price: price});
});

app.get('/cart', async (req, res) =>{
  if (!req.session.buyerId) {
    res.redirect('/user');
    return;
  }
  
  let connection = db.createConnection();
  let sql = "SELECT COUNT(c.itemId) as NUM, SUM(i.price) as TOTAL, c.itemId, i.price, i.make, i.model, i.year, i.color, i.type " +
      "FROM cart c LEFT JOIN inventory i ON i.id = c.itemId " + 
      "WHERE c.userId = ? GROUP BY c.itemId";
  let sqlParams = [req.session.buyerId];
  //code for the connection
	connection.connect(function(err){
		if(err) throw err;

		connection.query(sql, sqlParams, function(err, result){
			if(err) {
				connection.end();
				throw err;
			}
			//pass records to the view 'favorites'
			res.render('cart', {"rows": result});
			connection.end();
		}); //query
});//connection
});


app.get("/api/displayCars", function(req, res){
	//to connect to db
	var connection = db.createConnection();
    
	var sql = "SELECT * FROM inventory "; 
  var sqlParams = [];
  var where = false;
  if (req.query.make) {
    if(!where){
      where = true;
      sql += "WHERE ";
    }
    sql += "make = ? AND ";
    sqlParams.push(req.query.make);
  }
  
 if (req.query.yearFrom) {
   if(!where){
      where = true;
      sql += "WHERE ";
    }
    sql += "year >= ? AND ";
    sqlParams.push(parseInt(req.query.yearFrom, 10));
  }
  
  if (req.query.yearTo) {
    if(!where){
      where = true;
      sql += "WHERE ";
    }
    sql += "year <= ? AND ";
    sqlParams.push(parseInt(req.query.yearTo, 10));
  }
  
   if (req.query.priceFrom) {
     if(!where){
      where = true;
      sql += "WHERE ";
    }
    sql += "price >= ? AND ";
    sqlParams.push(parseInt(req.query.priceFrom, 10));
  }
  
  if (req.query.priceTo) {
    if(!where){
      where = true;
      sql += "WHERE ";
    }
    sql += "price <= ? AND ";
    sqlParams.push(parseInt(req.query.priceTo, 10));
  }
  if(where){
     sql += 1;
  }
 
  
	//code for the connection
	connection.connect(function(err){
		if(err) throw err;

		connection.query(sql, sqlParams, function(err, results){
			if(err) {
				connection.end();
				throw err
			}
			//display records that we get from database
			res.send(results);
			connection.end();
		}); //query

	}); //connection
});

app.get('/api/getCartInfo', (req, res) => {
  //check if a user can access the cart
  if (!req.session.buyerId) {
    res.status(401).send('Undefined buyer Id');
    return;
  }
  let connection = db.createConnection();
	let sql = "SELECT COUNT(DISTINCT c.itemId) as NUM, SUM(i.price) as TOTAL "  +
     "FROM cart c LEFT JOIN inventory i ON i.id = c.itemId WHERE c.userId = ?";
	let sqlParams = [req.session.buyerId];

  //code for the connection
	connection.connect(function(err){
		if(err) throw err;
		connection.query(sql, sqlParams, function(err, results){
        if(err) {
            connection.end();
            throw err
        }
        //display records that we get from database
        res.send(results);
        connection.end();
		}); //query
	}); //connection
  
});//function



app.post('/api/updateCart', (req, res) => {
  if (!req.session.buyerId) {
    res.status(401).send('Undefined buyer Id');
    return;
  }
  if (!req.query.itemId) {
    res.status(400).send('Bad request: please provide itemId.');
    return;
  }
  let toInsert = parseInt(req.query.quantity || 0, 10);
  let connection = db.createConnection();
	let sql;
  let itemId = parseInt(req.query.itemId || '0', 10);
  let userId = parseInt(req.session.buyerId || '0', 10);
	let sqlParams = [userId, itemId];
	if(req.query.action == "add") {
		sql = "INSERT INTO cart (userId, itemId) VALUES (?,?)";
	} else {
		sql = "DELETE FROM cart WHERE userId = ? AND itemId = ?";
	}
	connection.connect( function(err){
		if(err) throw err;
		connection.query(sql, sqlParams, function(err, result) {
      
      var longInsert = 'INSERT INTO cart (userId, itemId) VALUES ';
      if(req.query.action == "set" && toInsert > 0) {
        for (var ii = 1; ii <= toInsert; ii++) {
          longInsert += '(' + userId + ', ' + itemId + ')';
          if (ii < toInsert) {
            longInsert += ', ';
          }
        }
        connection.query(longInsert, function(err2, result2) {
          connection.end();
          res.send("updated");
        });
      } else {
        connection.end();
        res.send("updated");
      }
      
     if(err) {connection.end(); throw err;}
		});//query
	}); //connection
});//function

//clear cart after place order
app.get('/api/deleteCart', async function(req, res){
    await user.clear();
   
    req.session.destroy();
    res.send("clear");
});
// place order
app.post('/api/placeOrder', async (req, res) => {
    req.body.items.forEach(async (item) => {
        await user.placeOrder(req.session.buyerId, item);
    })
    res.send("orderPlaced");
});

// admin route
app.get('/admin', auth.isAuthenticated, async (req, res) => {
    res.render('admin'); 
});

// reports route
app.get('/reports', auth.isAuthenticated, async (req, res) => {
 
      
//       const highestColor = await(reporting.getHighest());
//       const lowestColor = await(reporting.getLowest());
//       const allColor = await(reporting.getColors());
//       const lowColor = await(reporting.getLowColors());
  
      const highestColor = [];
      const lowestColor = [];
      const allColor = [];
      const lowColor = [];
    
      const highestMake = await(reporting.highestMake());
      const lowestMake = await(reporting.lowestMake());
      const makes = await(reporting.makes());
      const lowMakes = await(reporting.lowMakes());
      const mostExpensive = await(reporting.mostExpensive());
      const leastExpensive = await(reporting.leastExpensive());
      const averagePrice = await(reporting.averagePrice());
      const allVehicles = await(reporting.allVehicles());
			res.render('reports', {"highestColor": highestColor, "colors":allColor, "lowestColor" : lowestColor, 
                             "lowColors": lowColor, "highestMake": highestMake, "lowestMake": lowestMake, 
                             "makes": makes, "lowMakes": lowMakes, "mostExpensive": mostExpensive, "leastExpensive": leastExpensive, "averagePrice": averagePrice, 
                            "allVehicles" : allVehicles});
	}); //connection 

// inventory route
app.get('/inventory', auth.isAuthenticated, async (req, res) => {
    res.render('inventory'); 
});


//Get Sales Data
app.get("/api/salesData", function(req, res){
	//to connect to db
	var connection = db.createConnection();
    
	var sql = "SELECT * FROM orders"; 
  var sqlParams = [];
  
	//code for the connection
	connection.connect(function(err){
		if(err) throw err;

		connection.query(sql, sqlParams, function(err, results){
			if(err) {
				connection.end();
				throw err
			}
			//display records that we get from database
			res.send(results);
			connection.end();
		}); //query

	}); //connection
});

// login route
app.get('/login', async (req, res) => {
    res.render('login'); 
});

// logout route
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

// post route
app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const result = await auth.checkUsername(username);
    let hashedPwd = '';

    if (result.length > 0) {
        hashedPwd = result[0].password;
    }

    const passwordMatch = await auth.checkPassword(password, hashedPwd);

    if (passwordMatch) {
        req.session.authenticated = true;
        res.redirect('/admin');
//         res.render('admin');
    } else {
        res.render('login', {'loginError': true});
    }
});

app.get("/api/addVehicle", function(req, res){
	//to connect to db
	var connection = db.createConnection();
    
	var sql2 = "SELECT * FROM inventory "; 
  var sqlParams2 = [];
  
  var sql = "INSERT INTO inventory (make, model, year, price, color, type, imageUrl) VALUES (?,?,?,?,?,?,?)"
    var sqlParams = [];
  
    sqlParams.push(req.query.make);
   sqlParams.push(req.query.model);
   sqlParams.push(req.query.year);
   sqlParams.push(req.query.price);
   sqlParams.push(req.query.color);
   sqlParams.push(req.query.bodyType);
   sqlParams.push(req.query.imageUrl);
  
 
  
	//code for the connection
	connection.connect(function(err){
		if(err) throw err;

		connection.query(sql, sqlParams, function(err, result){
			if(err) {
				connection.end();
				throw err
			}
			//display records that we get from database
      connection.query(sql2, sqlParams2, function(err, results){
			if(err) {
				connection.end();
				throw err
			}
			//display records that we get from database
			res.send(results);
			connection.end();
		});
		}); //query

	}); //connection
});

app.get("/api/updateVehicle", function(req, res){
	//to connect to db
	var connection = db.createConnection();
    
	var sql2 = "SELECT * FROM inventory "; 
  var sqlParams2 = [];
  
  var sql = "Update inventory SET price=?, color=?, type=?, imageUrl=? WHERE id=? LIMIT 1"
    var sqlParams = [];
  
   sqlParams.push(req.query.price);
   sqlParams.push(req.query.color);
   sqlParams.push(req.query.bodyType);
   sqlParams.push(req.query.imageUrl);
  sqlParams.push(req.query.vehicleID);
  
 
  
	//code for the connection
	connection.connect(function(err){
		if(err) throw err;

		connection.query(sql, sqlParams, function(err, result){
			if(err) {
				connection.end();
				throw err
			}
			//display records that we get from database
      connection.query(sql2, sqlParams2, function(err, results){
			if(err) {
				connection.end();
				throw err
			}
			//display records that we get from database
			res.send(results);
			connection.end();
		});
		}); //query

	}); //connection
});

app.get("/api/deleteVehicle", function(req, res){
	//to connect to db
	var connection = db.createConnection();
    
	var sql2 = "SELECT * FROM inventory "; 
  var sqlParams2 = [];
  
  var sql = "DELETE FROM inventory WHERE id=? LIMIT 1"
    var sqlParams = [];
  
    sqlParams.push(req.query.vehicleID);
 
  
	//code for the connection
	connection.connect(function(err){
		if(err) throw err;

		connection.query(sql, sqlParams, function(err, result){
			if(err) {
				connection.end();
				throw err
			}
			//display records that we get from database
      connection.query(sql2, sqlParams2, function(err, results){
			if(err) {
				connection.end();
				throw err
			}
			//display records that we get from database
			res.send(results);
			connection.end();
		});
		}); //query

	}); //connection
});

app.get("/api/editVehicle", function(req, res){
	//to connect to db
	var connection = db.createConnection();
    
	var sql = "SELECT * FROM inventory WHERE id=? LIMIT 1"; 
  var sqlParams = [];
  
  
    sqlParams.push(req.query.vehicleID);
 
  
	//code for the connection
	connection.connect(function(err){
		if(err) throw err;
			//display records that we get from database
      connection.query(sql, sqlParams, function(err, results){
			if(err) {
				connection.end();
				throw err
			}
			//display records that we get from database
			res.send(results);
			connection.end();
		});
		

	}); //connection
});

// server listener
app.listen(port, ip, () => {
    console.log('Express Surver is Running...');
});