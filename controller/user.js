const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../utils/auth");

const handleSignUp = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        await User.create({
            name,
            email,
            password,
        });
        console.log("User SignUp Successful");
        return res.status(201).redirect("/signin");
    } catch (error) {
        return res.status(400).send(`Failed to SignUp User : ${error}`);
    }
};

const handleSingIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email, password });
        if (!user)
            return res.status(401).render("signin", {
                error: "Invalid Email or Password",
            });

        const token = setUser(user);
        res.cookie("token", token, {
            expires: new Date(Date.now() + 5 * 60 * 60 * 1000),
            httpOnly: true,
        });
        return res.status(200).redirect("/");
    } catch (err) {
        return res.status(500).send(`Failed to Login User : ${err}`);
    }
};

module.exports = { handleSignUp, handleSingIn };
