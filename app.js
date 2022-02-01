const express = require("express");

const path = require("path");
const app = express();
const bodyParser = require("body-parser");
const database = require("./database.js");

const fs = require("fs");

const { DataTypes } = require("sequelize");

const build = require("./release/Model_builder");

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
build();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.set("release", path.join(__dirname, "/release"));

let obj;
let obj1;
app.get("/", function(req, res) {
    fs.readFile("./configuration.json", "utf8", function(err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        console.log("obj", obj);
        for (let i = 0; i < obj.model.length; i++) {
            console.log(obj.model);
            obj1 = obj.model;
            res.render("addForm", { obj: obj.model });
        }
    });
});

const LocationController = require("./Controllers/Location");
const UserController = require("./Controllers/User");

app.use("/api/location", LocationController);
app.use("/api/user", UserController);

app.listen(3000, () => {
    console.log("Listning at port 3000");
});