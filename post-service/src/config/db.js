const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/createpost");
        console.log("db connected");
    } catch (error) {
        console.log(`db connection error: `, error);
    }
};

module.exports = connectDB;