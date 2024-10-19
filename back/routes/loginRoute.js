const express = require("express");
const cors = require("cors");
const {login, refreshToken} = require("../controllers/loginController");

const router = express.Router();

router.use(cors());

router.post("/",login);
router.post("/refreshToken",refreshToken);

module.exports = router;