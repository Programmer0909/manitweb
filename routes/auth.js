const express = require("express");
const router = require("express").Router();
const User = require("../models/user");
const passport = require("passport");

router.post("/register" , async (req,res,next) => {
    try {
        const { firstname , lastname, email, username, password } = req.body;
        const user = new User({ firstname , lastname, email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => {
            if (err) return next(err);
            res.redirect("/home")
        })
    } catch (e) {
        console.log(e);
        res.redirect('/register');
    }
})

router.post("/login" , passport.authenticate('local' , { failureRedirect : "/home"} ) , (req,res) => {
    console.log("Logged in")
    res.redirect("/home")
})

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/login');
  });
});



module.exports = router;