const routes = require("express").Router();

routes.post("/register", require("../Controllers/userExist"), require("../Views/User/signup"));
routes.post('/login', require("../Views/User/login"));
routes.get("/verifyuser", require("../Controllers/verifyuser"));
routes.post("/add-ratings", require("../Controllers/verifyuser"), require("../Controllers/animeExist"));
routes.get("/get-ratings", require("../Controllers/verifyuser"), require("../Views/Review/getratings"));
routes.get('/logout', require("../Views/User/logout"));

module.exports = routes;