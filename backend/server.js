const express = require('express')
const app = express()
const mongoose = require("mongoose")
const dotenv = require('dotenv')
const routesUrls = require('./Router')
const cors = require('cors')

//////////chat////////
// const server = require('http').createServer(app)
// const io = require('socket.io')(server)
// const socketManage = require('./socketManage')(io)
// const PORT = process.env.PORT || 80
// const path = require('path')


// io.on('connection', socketManage )
// // In dev mode just hide hide app.uss(... ) below
// //app.use( express.static(path.join(__dirname, '../build')))
// server.listen( PORT, () => console.log('App was start at port : ' + PORT ))

//////////chat////////



dotenv.config()

mongoose.connect(process.env.DATABASE_ACCESS, () => console.log("DataBase connected"))
//let db = mongo.createConnection("mongodb+srv://naomies:0808@cluster0.gutqu.mongodb.net/myFirstDataBase?retryWrites=true&w=majority", {useNewUrlParser: true}); //or connect()


const passport = require("passport");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
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



app.use(express.json())
app.use(cors()) //initialize
app.use('/app', routesUrls) //exactly
app.listen(4000, ()=>console.log("server is running"))