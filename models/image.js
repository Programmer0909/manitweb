const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const ImageSchema = new mongoose.Schema({
    ImageUrl : {
        type : String ,
        required : true
    },
    Filename : {
        type : String ,
        required : true
    }
})

module.exports = mongoose.model("Image" , ImageSchema);
