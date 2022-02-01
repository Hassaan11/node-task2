const sequelize = require("../database.js");

const express = require("express");

const LocationController = express.Router();

LocationController.post("/", async(req, res) => {
    console.log(req.body);
    let sql =
        "INSERT INTO locations (`1`,`2`) VALUES(" +
        JSON.stringify(req.body.name) +
        "," +
        JSON.stringify(req.body.status) +
        ")";

    sequelize
        .query(sql, {
            type: sequelize.QueryTypes.INSERT,
        })
        .then((result) => {
            console.log("Added to Database!");
            res.send("Added to Database");
        })
        .catch((e) => console.log(e));
});

module.exports = LocationController;