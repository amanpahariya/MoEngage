const express = require("express");
require("dotenv").config();
require("./DB/connection");
// const favicon = require("express-favicon");
// const path = require("path");
const app = express();
const port = process.env.PORT || 5000

app.use([
    express.json(),
    require("./Router/router")
])
// app.use(favicon(__dirname + "/build/favicon.ico"));
// app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname, "build")));
//
// app.get("/*", (res, req) => {
//     res.sendFile(path.join(__dirname, "build", "index.html"))
// })

app.listen(port, () => {
    console.log("server is started", port);
})