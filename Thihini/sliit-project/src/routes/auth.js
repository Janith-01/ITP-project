const router = require("express").Router();
const { User } = require("../models/user");
const Joi = require("joi");
const bcrypt = require("bcrypt");

router.post("/auth", async (req, res) => {

    try {
        const { error } = validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

            //methana user awilla DB eken enne  oya ewapu email eka thiyenam

        const user = await User.findOne({ email: req.body.email });
        if (!user) {

            return res.status(401).send({ message: "Invalid Email or Password" });
        }

        const validPassword = await bcrypt.compare(
            req.body.password, user.password
        );
//methanadi balanawa  a inna userge password eka harida kiyala 
        if (!validPassword) {

            return res.status(401).send({ message: "Invalid Email or Password" });
        }

        // a okkama harinam methana valid user kenek innawa
        const token = user.genarateUserAuthToken();

        let userDetails = {
            fname : user.firstName,
            lname:user.lastName,
            type:user.email,
            token:token

        }

        res.status(200).send({ data: userDetails, message: "Logged in successfully" })

    } catch (error) {
        res.status(500).send({ message: `Intrenal server ${error}` })

    }
})

const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("password")

    })

    return schema.validate(data);

}

module.exports = router;