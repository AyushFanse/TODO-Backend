const User = require("../Models/UserSchema");
const bcrypt = require("bcrypt");
const Joi = require("joi");

//&---------------------------* Registration Middleware *---------------------------&//

exports.Mid_Resister = async (req, res, next) => {
    //@---------------------------* Registration Schema *---------------------------@//

    const schema = Joi.object({
        first_name: Joi.string().min(3).max(50).trim(true).required(),
        last_name: Joi.string().min(3).max(50).trim(true).required(),
        email: Joi.string()
            .lowercase()
            .min(6)
            .max(50)
            .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
            .required(),
        password: Joi.string().trim(true).required(),
    });

    const { error } = await schema.validate(req.body);
    if (error) return res.status(400).send({ msg: error.details[0].message });

    //@---------------------* User Existence *---------------------@//

    const existUser = await User.findOne({ email: req.body.email }).exec();
    if (existUser)
        return res
            .status(400)
            .send({ msg: "Email already exists.", status: "error" });

    //@---------------------* Creating Bcrypt Password *---------------------@//

    const salt = await bcrypt.genSalt(10);
    req.body.password = await bcrypt.hash(req.body.password, salt);

    next();
};

//&---------------------------* Login Middleware *---------------------------&//

exports.Authentication = async (req, res, next) => {
    //@---------------------* Login Schema *---------------------@//

    const schema = Joi.object({
        email: Joi.string().min(6).max(50).email().required(),
        password: Joi.string().min(4).max(15).required(),
    });

    const { error } = await schema.validate(req.body);
    if (error) return res.status(400).send({ msg: error.details[0].message });

    //@---------------------* User Existence *---------------------@//

    const existUser = await User.findOne({ email: req.body.email }).exec();
    if (!existUser)
        return res
            .status(400)
            .send({ msg: "Email not registered", status: "error" });

    //@---------------------* Verification of the Password *---------------------@//

    const isValid = await bcrypt.compare(req.body.password, existUser.password);
    if (!isValid)
        return res
            .status(400)
            .send({ msg: "Password doesn't match.", status: "error" });

    next();
};
