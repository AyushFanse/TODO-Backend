const User = require("../Models/UserSchema");

//*---------------------------* Get All Users *---------------------------*//

exports.AllUsers = async (req, res) => {
    try {
        let data = await User.find();
        res.status(200).json(data);
    } catch (err) {
        res.status(400).json(err);
    }
};

//*---------------------------* Get User By ID *---------------------------*//

exports.UserById = async (req, res) => {
    try {
        const post = await User.findById(req.params.userId);
        res.status(200).json(post);
    } catch (err) {
        res.status(400).json(err);
    }
};

//*---------------------------* Update User By Id *---------------------------*//
exports.UpdateUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        console.log(user)
        res.status(200).send(user);
    } catch (error) {
        res.status(400).send(error);
    }
};

//*---------------------------* Delete User By Id *---------------------------*//

exports.DeleteUser = async (req, res) => {
    try {
        await User.findByIdAndRemove(req.params.userId);
        res.status(200).json({
            msg: "You have successfully deleted your account..!",
            status: "success",
        });
    } catch (err) {
        res.status(400).send(err);
    }
};
