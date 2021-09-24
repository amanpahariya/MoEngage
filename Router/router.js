const routes = require("express").Router();

routes.post("/register", require("../Controllers/userExist"), require("../Views/User/signup"));
routes.post('/login', require("../Views/User/login"));
routes.get("/verifyuser", require("../Controllers/verifyuser"));

module.exports = routes;