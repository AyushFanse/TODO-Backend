const Task = require("../Models/TaskSchema");


//*---------------------------* Add New Task *---------------------------*//

exports.AddTask = async (req, res) => {
    try {
        const task = await new Task(req.body).save();
        res.status(200).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
}

//*---------------------------* Get All Tasks *---------------------------*//

exports.AllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).send(tasks);
    } catch (error) {
        res.status(400).send(error);
    }
}

//*---------------------------* Get Tasks By UserId *---------------------------*//

exports.TasksByUserId = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.params.userId });
        res.status(200).send(tasks);
    } catch (error) {
        res.status(400).send(error);
    }
}

//*---------------------------* Update Task By Id *---------------------------*//

exports.UpdateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id },
            req.body
        );
        res.status(200).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
}

//*---------------------------* Delete Task By Id *---------------------------*//

exports.DeleteTask =  async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        res.status(200).send(task);
    } catch (error) {
        res.status(400).send(error);
    }
}

