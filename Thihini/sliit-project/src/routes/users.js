const router = require("express").Router();
const { response } = require("express");
let User = require("../models/users");
// const User = require("../models/users");
// const userRouter = require("./routes/users");



// http://Localhost:3002/user/add

router.route("/add").post((req, res) => {

    try {
        const name = req.body.name;
        const email = req.body.email;
        const address = req.body.address;
        const phoneNumber = req.body.mobile;
        // const gender = req.body.gender;
        const userType = req.body.userType;

        const newUser = new User({
            name,
            email,
            address,
            phoneNumber,
            gender: "",
            userType
        });

        newUser.save().then(() => {

            return res.status(200).send({ message: "User Added" })
        }).catch((err) => {
            return res.status(500).send({ err })
        });


    } catch (error) {
        return res.status(500).send({ error })
    }
});


// http://Localhost:3002/user
router.route("/").get((req, res) => {
    // const keyword = "test1";
    const keyword = req.query.keyword;

    if (keyword == "" || keyword == null) {
        User.find().then((user) => {
            res.json(user);

        }).catch((err) => {
            console.log(err);

        });
    } else {
       
        
        console.log(keyword);
        User.find({ name: keyword }).then((user) => {
            console.log(user);
            res.json(user);

        }).catch((err) => {
            console.log(err);

        });
    }
});



// http//Localhost:8070/user/update/
router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;
    const { name, email, address, phoneNumber, gender, userType } = req.body;   //destructure

    const updateUser = {
        name,
        email,
        address,
        phoneNumber,
        gender,
        userType
    };
    const update = await User.findByIdAndUpdate(userId, updateUser)
        .then(() => {
            res.status(200).send({ status: "user updated" })
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating data", error: err.message });
        });

});

router.route("/delete/:id").delete(async (req, res) => {
    let userId = req.params.id;

    await User.findByIdAndDelete(userId)
        .then(() => {
            res.status(200).send({ status: "user deleted" });
        }).catch((err) => {
            console.log(err.message);
            res.status(500).send({ status: "Error with delete user", error: err.message });

        });

});

router.route("/get/:id").get(async (req, res) => {
    let userId = req.params.id;
    await User.findById(userId)
        .then(() => {
            res.status(200).send({ status: "User fetched", user: user });
        }).catch(() => {
            console.log(err.message);
            res.status(500).send({ status: "Error with get user", error: err.message });

        });

});

module.exports = router;