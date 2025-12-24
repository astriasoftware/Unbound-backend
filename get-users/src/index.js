const express = require("express");
require("dotenv").config();
const db = require("./config/db");
const getUsersRouter = require("./routes/get-users");

db;
const app = express();
const port = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use(getUsersRouter);

app.get("/", (req, res) => {
    res.send("hello world");
});

app.listen(port, () => {
    console.log(`
        get user server running
        http://localhost:${port}
    `);
});
