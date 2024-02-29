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
            default: Date.now() + 5 * 60 * 60 * 1000, // 5 hours in milliseconds
            index: { expires: "5h" }, // TTL index for automatic deletion
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
    },
    { timestamps: true }
);

const URL = mongoose.model("Url", urlSchema);

module.exports = URL;
