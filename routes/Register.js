const express = require("express");
const router = express.Router();
const Register = require("../Modules/AuthModule");
const {
    Authentication,
    Mid_Resister,
} = require('../Middleware/Middleware')

//~------------------------* Resister Router *------------------------~//

router.post('/register', Mid_Resister, Register.register);

//~------------------------* Login Router *------------------------~//

router.post('/login', Authentication, Register.login);

module.exports = router;
