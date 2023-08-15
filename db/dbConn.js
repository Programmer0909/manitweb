const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://pratham:pratham@cluster0.zgh4fjm.mongodb.net/?retryWrites=true&w=majority", {
            useUnifiedTopology: true,
            useNewUrlParser: true
        });
        console.log("Connected")
    } catch (err) {
        console.error(err);
    }
}

module.exports = connectDB