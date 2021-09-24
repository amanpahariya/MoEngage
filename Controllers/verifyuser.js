const jwt = require('jsonwebtoken');
const user = (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({"error": "Unauthorized"})
    } else {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(401).json({"error": "token is not verified"});
            } else {
                return res.status(202).json({"isLogin": true, user});
            }
        });
    }
}

module.exports = user;