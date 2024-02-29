const express = require("express");
const URL = require("../models/url");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const allUrls = await URL.find({});
        return res.status(200).render("home", {
            urls: allUrls,
        });
    } catch (error) {
        return res.status(500).send(`Unable to Fetch URLs from Server : ${error}`);
    }
});

module.exports = router;
