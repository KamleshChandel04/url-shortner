const express = require("express");
const URL = require("../models/url");
const router = express.Router();

router.get("/", async (req, res) => {
    if(!req.user)
        return res.redirect("/signin");
    try {
        const allUrls = await URL.find({createdBy : req.user._id});
        return res.status(200).render("home", {
            urls: allUrls,
        });
    } catch (error) {
        return res.status(500).send(`Unable to Fetch URLs from Server : ${error}`);
    }
});

router.get("/signup" , (req , res)=>{
    return res.render("signup");
})

router.get("/signin" , (req , res)=>{
    return res.render("signin");
})

module.exports = router;
