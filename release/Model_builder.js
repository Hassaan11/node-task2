const fs = require("fs");
const database = require("../database.js");

const { DataTypes } = require("sequelize");
const { timeStamp } = require("console");

module.exports = build = () => {
    let obj;
    fs.readFile("./configuration.json", "utf8", function(err, data) {
        if (err) throw err;
        obj = JSON.parse(data);
        console.log("obj", obj);
        for (let i = 0; i < obj.model.length; i++) {
            let newModel = obj.model[i].name;
            newModel = database.define(
                obj.model[i].name,

                obj.model[i].field.map((data) => {
                    return (data[0] = {
                        primaryKey: data[0] == "id" ? true : false,
                        autoIncrement: data[0] == "id" ? true : false,
                        type: data[1] == "integer" ? DataTypes.INTEGER : DataTypes.STRING,
                        allowNull: data[3] == "required" ? false : true,
                    });
                }), {
                    timestamps: false,

                    createdAt: false,

                    updatedAt: false,
                }
            );
            newModel.sync();
            module.exports = newModel;
        }

        // for (let i = 0; i < obj.model.length; i++) {
        //     obj.model[i].field.map((data, j) => {
        //         console.log(j);
        //         console.log(data);

        //         let newModel = obj.model[i].name;
        //         newModel = database.define(obj.model[i].name, {
        //             [data[0]]: {
        //                 primaryKey: data[0] == "id" ? true : false,
        //                 type: data[1] == "integer" ? DataTypes.INTEGER : DataTypes.STRING,
        //                 allowNull: data[3] == "required" ? false : true,
        //             },
        //         });
        //         newModel.sync({ force: true });
        //         module.exports = newModel;
        //     });
        // }
    });
};