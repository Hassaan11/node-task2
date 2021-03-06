const sequelize = require("../database.js");

const express = require("express");

const UserController = express.Router();

const User = require("../user");

UserController.post("/", async(req, res) => {
    console.log(req.body);

    const location = await User.create(req.body);

    res.send({
        message: "Successfully Created",
    });
});

// UserController.post("/", async(req, res) => {
//     await sequelize
//         .query(
//             "INSERT INTO users (`1`,`2`,`3`) VALUES (" +
//             JSON.stringify(req.body.name) +
//             "," +
//             JSON.stringify(req.body.email) +
//             "," +
//             JSON.stringify(req.body.status) +
//             ")"
//         )
//         .then((result) => {
//             console.log("Added to Database");
//             res.send("Added to Database");
//         })
//         .catch((e) => {
//             console.log(e);
//         });
// });

module.exports = UserController;