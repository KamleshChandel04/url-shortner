const express = require("express");
const URL = require("../models/url");
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("1234567890abcdef", 5);

const handleGenerateUrl = async (req, res) => {
    const body = req.body;
    if (!body.url) 
        return res.status(400).json({ error: "Url is required" });

    try {
        const shortId = nanoid();
        await URL.create({
            shortId: shortId,
            redirectURL: body.url,
            visitHistory: [],
        });
        return res.status(201).json({ id: shortId });
    } catch (error) {
        return res.status(403).send(`Failed to Create ShortUrl : ${error}`);
    }
};

module.exports = { handleGenerateUrl };
