const express = require("express");
const router = express.Router();
const usersController = require("../controller/users");


router.post("/add-user", usersController.postAddUser);


module.exports = router;
