//const express = require('express');
//const app = express();
//const path = require('path');

//const debug = require("debug")("mongo:mongo");
//const mongo = require("mongoose");
//mongoose.set("useFindAndModify", false);
//let db = mongo.createConnection("mongodb+srv://naomies:0808@cluster0.gutqu.mongodb.net/myFirstDataBase?retryWrites=true&w=majority", {useNewUrlParser: true}, ()=>consolee.log("DataBase connected")); //or connect()

//////////////////////////////////SERVER.JS//////////////////////////////////////////////////////////
const express = require('express')
const app = express()
const mongoose = require("mongoose");
const dotenv = require('dotenv')
const routesUrls = require('./Router')
const cors = require('cors')

dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS, 
    {
        useNewUrlParser: true,
    useUnifiedTopology: true,
    },
    () =>console.log("DataBase connected"))
//let db = mongo.createConnection("mongodb+srv://naomies:0808@cluster0.gutqu.mongodb.net/myFirstDataBase?retryWrites=true&w=majority", {useNewUrlParser: true}); //or connect()

app.use(express.json())
//app.use(cors()) //initialize
app.use('/app', routesUrls) //exactly
app.listen(4000, ()=>console.log("server is running"))




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


// // Middleware
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(
//   cors({
//     origin: "http://localhost:3000", // <-- location of the react app were connecting to
//     credentials: true,
//   })
// );
// app.use(
//   session({
//     secret: "secretcode",
//     resave: true,
//     saveUninitialized: true,
//   })
// );


//////////////////////////////////SERVER.JS//////////////////////////////////////////////////////////

// const mysql = require ('mysql');
// const session = require ('express-session');
// const MySQLStore = require('express-mysql-session')(session);
// const Router = require('./Router');

// app.use(express.static(path.join(__dirname, 'build')));
// app.use(express.json());

// //Database
// const db = mysql.createConnection({
// 	host: 'localhost',
// 	user: 'root',
// 	password: 'root',
// 	database: 'myapp' //??
// });

// db.connect(function(err) {
// 	if (err) {
// 		console.log('DB error');
// 		throw err;
// 		return false;
// 	}
// });

// const sessionStore = new MySQLStore ({
// 	expiration: (1825 * 86400 * 1000),
// 	endConnectionOnClose: false
// }, db);

// app.use(session({
// 	key: '4651sdxbgfbcvsd631v',
// 	secret: 'vfmsddasdvfdtfvs5',
// 	store: sessionStore,
// 	resave: false,
// 	saveUninitialized: false,
// 	cookie: {
// 		maxAge: (1825 * 86400 * 1000),
// 		httpOnly: false
// 	}
// }));

// new Router(app, db);

// app.get('/', function(req,res) {
// 	res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

//app.listen(3000);