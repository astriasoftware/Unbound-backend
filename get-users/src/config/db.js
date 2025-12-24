const mongoose = require("mongoose");
require("dotenv").config();

const db = mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log(`
        get users db connected
        `);

}).catch((err) => {
    console.log(`
        get users db connection error
        ${err}
        `);
})

module.exports = db;
