const express = require('express')
const router = express.Router()
const User =require('./models/SignUpModels')
const Pack =require('./models/PackagesModels')

const bcrypt = require("bcryptjs")

const passport = require("passport");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const session = require("express-session");


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000", // <-- location of the react app were connecting to
    credentials: true,
  })
);
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser("secretcode"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);
//end of middleware

router.post('/signup', (request, response) => {

	User.findOne({ username: request.body.username }, async (err, doc) => {
		if (err) throw err;
		if (doc) response.send("User Already Exists");
		if (!doc) {
		  const hashedPassword = await bcrypt.hash(request.body.password, 10);
	

		const signedUpUser = new User({
			fullName:request.body.fullName,
			username:request.body.username,
			email:request.body.email,
			password:hashedPassword,
      isManager:request.body.isManager,
      city:request.body.city
		});
    
		signedUpUser.save()
		.then(data =>{
			response.json(data)
		})
		.catch(error =>{
			response.json(error)
		})
	}

	});
});


router.post("/login", (request, response) => {
  User.findOne({ username: request.body.username }, async (err, doc) => {
		if (err) throw err;
		if (doc) {
     // console.log((doc));
      response.json({
                    authentication: {
                      "username": doc.username,
                      "fullName": doc.fullName,
                      "isManager": doc.isManager
                    },
                    message: "User Authentication success"
      })
    }
		if (!doc) {
		  const hashedPassword = await bcrypt.hash(request.body.password, 10);
      response.send("User  doesn't exist");
    }

  })

});


router.post("/showPacks",  (request, response) => {


  User.findOne({ username: request.body.user_ }, async (err, doc) => {
		if (err) throw err;
		if (doc) {

      Pack.find({AssignedTo: request.body.user_}, async (err, result) =>  {
        if (err) throw err;
        console.log(result);

       response.send(result)


      })

  }

  });

})


router.post("/createPack", (req, res) => {
  const CreatePackage = new Pack({
    receiver_name:req.body.receiver_name,
    latitude:req.body.latitude,
    longitude:req.body.longitude,
          address:req.body.address
  });

  CreatePackage.save()
  .then(data =>{
    res.json(data)
  })
  .catch(error =>{
    res.json(error)
  })
});


//k-means
var clusters = require('./clustering.js');

router.post('/grouporders', clusters.groupOrders);


module.exports = router

// const bcrypt = require('bcrypt');
// class Router {

// 	constructor(app,db) {
// 		this.login(app, db);
// 		this.logout(app, db);
// 		this.isLoggedIn(app, db);
// 	}

// 	login(app,db) {

// 		app.post('/login', (req, res) => {

// 			let username = req.body.username;
// 			let password = req.body.password;

// 			username = username.toLoweCase();

// 			if (username.length > 12 || password.length > 12) {
// 				res.json({
// 					success: false,
// 					msg: 'An error occured, please try again'
// 				})
// 				return;
// 			}

// 			let cols = [username];
// 			db.query('SELECT * FROM user WHERE username = ? LIMIT 1', cols, (err, data, fields) => {

// 					if(err) {
// 						res.json({
// 							success: false,
// 							msg: 'An error occurede, please try again'
// 						})
// 						return;
// 					}
// 		});			//Found 1 user with this username
// 			if (data && data.length === 1) {

// 				bcrypt.compare(password, data[0].password, (bcryptErr, verified) => {

// 					if(verified) {

// 						req.session.userID = data[0].id;
					
// 						res.json({
// 							success: true,
// 							username: data[0].username
// 						})
// 						return;
// 					}

// 					else {
// 						res.json({
// 							success: false,
// 							msg: 'Invalid password'
// 						})
// 					}

// 				});
// 			} else {
// 				res.json({
// 					success: false,
// 					msg: 'User not found, please try again'
// 					})
// 			}

// 		});

	

// 	}

// 	logout(app,db) {

// 		app.post('/logout', (req, res) => {

// 			if(req.session.userID) {

// 				req.session.destroy();
// 				res.json({
// 					success: true
// 				})
// 				return true;
// 			} else {
// 				res.json({
// 					success: false
// 				})

// 				return false;
// 			}
// 		});

// 	}

// 	isLoggedIn(app,db) {
// 		app.post('/isLoggedIn', (req, res) => {
// 			if(req.session.userID) {
// 				let cols = [req.session.userID];
// 				db.query('SELECT * FROM user WHERE id = ? LIMIT 1',  cols, (err, data, fields) => {

// 					if(data && data.length === 1) {

// 						res.json ({
// 							success: true,
// 							username: data[0].username
// 						})

// 						return true;
// 					} else {
// 						res.json({
// 							success: false
// 						})
// 					}
// 				});
// 			}

// 			else {
// 				res.json({
// 					success: false
// 				})
// 			}
// 		});

// 	}
// }

// module.exports = Router;