const express = require("express");
require("dotenv").config();
require("./DB/connection");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const favicon = require("express-favicon");
const path = require("path");
const route = express.Router();
const app = express();
const port = process.env.PORT || 5000;
app.use([
    express.json(),
    cookieParser(),
    cors({
        credentials: true,
        origin: process.env.ORIGIN
    }),
    route.use("/api", require("./Router/router"))
])
app.use(favicon(__dirname + "/build/favicon.ico"));
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, "build")));

app.get("/*", (req,res) => {
    res.send(path.join(__dirname, "build", "index.html"))
})

app.listen(port, () => {
    console.log("server is started", port);
})