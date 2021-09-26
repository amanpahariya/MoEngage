const routes = require("express").Router();

routes.post("/register", require("../Controllers/userExist"), require("../Views/User/signup"));
routes.post('/login', require("../Views/User/login"));
routes.get("/verifyuser", require("../Controllers/verifyuser"));
routes.post("/add-ratings", require("../Controllers/animeExist"));
routes.get("/get-ratings", require("../Views/Review/getratings"));

module.exports = routes;