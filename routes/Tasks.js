const {
    AddTask,
    AllTasks,
    TasksByUserId,
    UpdateTask,
    DeleteTask,
} = require("../Modules/TaskModule");
const express = require("express");
const router = express.Router();

//~------------------------* Add New Task Router *------------------------~//

router.post("/", AddTask);

//~------------------------* Get All Tasks Router *------------------------~//

router.get("/all", AllTasks);

//~------------------------* Get Task By Id Router *------------------------~//

router.get("/:userId", TasksByUserId);

//~------------------------* Update Task By Id Router *------------------------~//

router.put("/:id", UpdateTask);

//~------------------------* Delete Task By Id Router *------------------------~//

router.delete("/:id", DeleteTask);

module.exports = router;
