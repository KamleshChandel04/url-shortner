const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const urlRoute = require("./routes/url");
const staticRoutes = require("./routes/staticRoutes");
const { handleGetUrl } = require("./controller/url");

//config env file
dotenv.config();
const PORT = process.env.PORT || 5000;

//changing view engine to ejs to Ease the SSR
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//Global Parsing Middleware
app.use(express.json());
app.use(express.urlencoded({extended : false}));

//Global Middleware
app.use("/url", urlRoute);
app.use("/" , staticRoutes);

//Redirect to actual Url
app.get("/:shortId", handleGetUrl);

//Connect to MongoDb
mongoose
    .connect(process.env.CONNECTION_URL)
    .then(app.listen(PORT, console.log(`Server Running at PORT : ${PORT}`)))
    .catch((err) => `Failed to Connect to Database : ${err}`);
