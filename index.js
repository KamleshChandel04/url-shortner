const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const urlroute = require("./routes/url");

//config env file
dotenv.config();
const PORT = process.env.PORT || 5000;

//Global Middleware
app.use(express.urlencoded({ extended: false }));
app.use("/url", urlroute);

//Connect to MongoDb

mongoose
    .connect(process.env.CONNECTION_URL)
    .then(app.listen(PORT, console.log(`Server Running at PORT : ${PORT}`)))
    .catch((err) => `Failed to Connect to Database : ${err}`);
 