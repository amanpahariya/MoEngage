const routes = require("express").Router();

routes.post("/register", require("../Views/User/signup"));

module.exports = routes;