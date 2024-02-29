const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const urlroute = require("./routes/url");
const {handleGetUrl} = require("./controller/url");

//config env file
dotenv.config();
const PORT = process.env.PORT || 5000;

//Global Middleware
app.use(express.json());
app.use("/url", urlroute);

app.get('/:shortId' , handleGetUrl);
//Connect to MongoDb

mongoose
    .connect(process.env.CONNECTION_URL)
    .then(app.listen(PORT, console.log(`Server Running at PORT : ${PORT}`)))
    .catch((err) => `Failed to Connect to Database : ${err}`);
 