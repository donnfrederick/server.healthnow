const express =require("express");
const app = express();
const cors = require('cors');

const session = require('express-session');
const cookieParser = require('cookie-parser');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const oneDay = 1000 * 60 * 60 * 24;

app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
}));

const adminAPI = require("./api/admin.js");
app.use("/admin", adminAPI);

const authAPI = require("./api/auth.js");
app.use("/auth", authAPI);

const userAPI = require("./api/user.js");
app.use("/user", userAPI);

app.listen(3001,(req, res) =>{
    console.log("Server is running");
});

app.get("/", (req,res) =>{
    res.send({status:201});
});

