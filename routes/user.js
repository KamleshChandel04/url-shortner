const express = require("express");
const router = express.Router();
const { handleSignUp, handleSingIn } = require("../controller/user");

router.post("/", handleSignUp);
router.post("/signin", handleSingIn);

module.exports = router;
