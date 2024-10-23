const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const authController = {};

authController.authenticate = (req, res, next) => {
    try {
        const tokenString = req.headers.authorization;
        if (!tokenString) {
            throw new Error("invalid token");
        }

        const token = tokenString.replace("Bearer ", "").trim();
        jwt.verify(token, JWT_SECRET_KEY, (error, payload) => {
            if (error) {
                throw new Error("invalid token");
            }
            req.userId = payload._id;

            next();
        });
    } catch (error) {
        res.status(400).json({ status: "fail", message: error.message });
    }
};

module.exports = authController;

// 미들웨어 next -> 나는 미들웨어! 나 끝나면 다음거 불러!!
