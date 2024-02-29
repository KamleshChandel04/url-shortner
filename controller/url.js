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
        });
        console.log("Created");
        return res.status(201).json({ id: shortId });
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

module.exports = { handleGenerateUrl, handleGetUrl };
