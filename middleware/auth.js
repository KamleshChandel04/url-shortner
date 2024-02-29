const { getUser } = require("../utils/auth");

const auth = async (req, res , next) => {
    const userUid = req.cookies?.uid;

    if (!userUid) {
        return res.status(401).redirect("/signin");
    }

    const user = getUser(userUid);
    if (!user) {
        alert("Unauthorized Acess , Login First!");
        return res.status(401).redirect("/signin");
    }

    req.user = user;
    next();
};

const tempAuth = async(req , res , next)=>{
    const userUid = req.cookies?.uid;
    const user = getUser(userUid);
    req.user = user;
    next();
}

module.exports = {auth , tempAuth};
