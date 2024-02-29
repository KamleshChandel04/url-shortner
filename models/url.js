const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
    {
        shortId: {
            type: String,
            required: true,
            unique: true,
        },
        redirectURL: {
            type: String,
            required: true,
        },
        visitHistory: [{ timestamp: { type: Number } }],
        expiresAt: {
            type: Date,
            default: Date.now(),
            index: { expires: "300m" },
        },
    },
    { timestamps: true }
);

const URL = mongoose.model("Url", urlSchema);

module.exports = URL;
