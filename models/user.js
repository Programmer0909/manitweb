const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');
const Image = require("./image")

const User = new mongoose.Schema({
    firstname : {
        type : String
    },
    lastname : {
        type : String
    },
    email : {
        type : String,
        required : true
    },
    images : [{
        type : mongoose.Schema.Types.ObjectId,
        ref : Image
    }]
});
User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);