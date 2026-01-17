const express = require("express");
const app = express();
const connectDB = require("./config/db");

connectDB(); // mongodb connection
const port = process.env.PORT || 3000;
app.use(express.json());   // must be here

(async () => {
    const route = await import("./routes/create-post.js");
    app.use(route.default);
})();

app.listen(port, () => {
    console.log(`server running on http://localhost:${port}`);
});
