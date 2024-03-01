const { getUser } = require("../utils/auth");

const auth = async (req, res , next) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).redirect("/signin");
    }

    const user = getUser(token);
    if (!user) {
        alert("Unauthorized Acess , Login First!");
        return res.status(401).redirect("/signin");
    }

    req.user = user;
    next();
};

const tempAuth = async(req , res , next)=>{
    const token = req.cookies?.token;
    const user = getUser(token);
    req.user = user;
    next();
}

module.exports = {auth , tempAuth};
