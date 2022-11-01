const User = require("../Models/UserSchema");
const jwt = require("jsonwebtoken");

//*---------------------------* Registration Part *---------------------------*//

exports.register = async (req, res, next) => {
    try {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({
            msg: "You Have Successfully Registered Your Account.",
        });
    } catch (err) {
        res.status(400).json({ msg: err, status: "error" });
    }
};

//*------------------------------* Login Part *------------------------------*//

exports.login = async (req, res, next) => {
    try {
        const existUser = await User.findOne({ email: req.body.email }).exec();

        let user = {
            _id: existUser._id,
            first_name: existUser.first_name,
            last_name: existUser.last_name,
            createdAt: existUser.createdAt,
            updatedAt: existUser.updatedAt,
        };

        const token = jwt.sign({ user }, "secret", { expiresIn: "2h" });
        res.send({ userToken: token, status: "success" });
    } catch (err) {
        res.status(400).send({ msg: err });
    }
};
