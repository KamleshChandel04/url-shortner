const express = require("express");
const URL = require("../models/url");

const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890abcdef", 5);

//Generate Url Controller
const handleGenerateUrl = async (req, res) => {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: "Url is required" });
    try {
        const shortId = nanoid();
        await URL.create({
            shortId: shortId,
            redirectURL: body.url,
            visitHistory: [],
            createdBy: req.user._id,
        });
        console.log("Created");
        const allUrls = await URL.find({ createdBy: req.user._id });
        return res.status(201).render("home", {
            id: shortId,
            urls: allUrls,
        });
    } catch (error) {
        return res.status(403).send(`Failed to Create ShortUrl : ${error}`);
    }
};

//Get Url Using ShortId

const handleGetUrl = async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { $push: { visitHistory: { timestamp: Date.now() } } }
        );

        res.status(300).redirect(entry.redirectURL);
    } catch (error) {
        return res.status(404).send(`Cannot Redirect to URL : ${error}`);
    }
};

//Handle Analytics Route
const handleGetAnalytics = async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const result = await URL.findOne({ shortId });
        return res
            .status(200)
            .json({ totalClick: result.visitHistory.length, analytics: result.visitHistory });
    } catch (error) {
        return res.status(404).send(`Cannot Get Analytics of URL : ${error}`);
    }
};

module.exports = { handleGenerateUrl, handleGetUrl, handleGetAnalytics };
