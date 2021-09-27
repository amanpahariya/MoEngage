const logout = (req, res) => {
    res
        .status(202)
        .clearCookie("token", {
            sameSite: "none",
            secure: true,
            path: "/",
            httpOnly: true
        })
        .json({
            isLogin: false,
            user: {
                userId: "",
                fName: "",
                expiresIn: ""
            }
        })
}

module.exports = logout;