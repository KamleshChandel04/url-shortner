const express = require("express");
const router = express.Router();
const {handleGenerateUrl} = require("../controller/url");

router.post('/' , handleGenerateUrl);

module.exports = router;