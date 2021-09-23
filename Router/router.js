const routes = require("express").Router();

routes.post("/register", require("../Controllers/userExist"), require("../Views/User/signup"));
routes.post('/login', require("../Views/User/login"));

module.exports = routes;