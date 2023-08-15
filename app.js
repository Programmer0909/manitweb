const express = require("express");
const connectDB = require("./db/dbConn");
const app = express();
const path = require("path");
const bodyParser = require("body-parser")
const passport = require('passport');
const LocalStrategy = require("passport-local")
const session = require("express-session")
const User = require("./models/user")

const sessionconfig = {
    secret: "Pratham",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(require('cookie-parser')());
app.use(session(sessionconfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser())

function ensureAuthenticatedForPages(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

app.get("/login", function (req, res) { res.sendFile(path.join(__dirname, "./public/Final.html")) })
app.get("/register", function (req, res) { res.sendFile(path.join(__dirname, "./public/Register.html")) })


app.use("/user", require("./routes/auth"))
app.use(ensureAuthenticatedForPages);
app.use("/excel", require("./routes/excel"))
app.use("/images", require("./routes/image"))

app.use("/home", (req, res) => {
        res.render("home");
})

app.listen(3000, function () {
    connectDB();
    console.log(`Server started on Port 3000`)
})
