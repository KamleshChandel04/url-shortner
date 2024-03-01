const { getUser } = require("../utils/auth");

const Authentication = async (req, res, next) => {
    const token = req.cookies?.token;
    req.user = null;
    if (!token) return next();
    const user = getUser(token);
    req.user = user;
    next();
};

function Authorization(roles = []) {
    return function (req, res, next) {
        if (!req.user) return res.status(401).redirect("/signin");
        if (!roles.includes(req.user.role)) return res.status(401).json("UnAuthorized Access!");
        next();
    };
}

module.exports = { Authentication, Authorization };
