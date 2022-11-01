const express = require("express");
const router = express.Router();
const User = require("../Modules/UserModule");

//~------------------------* Get All Users Router *------------------------~//

router.get("/all", User.AllUsers);

//~------------------------* Get User Router *------------------------~//

router.get("/:userId", User.UserById);

//~------------------------* Update User Router *------------------------~//

router.patch("/:userId", User.UpdateUser);

//~--------------------------* Delete User Router *--------------------------~//

router.delete("/:userId", User.DeleteUser);


module.exports = router;