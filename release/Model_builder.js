const fs = require("fs");
const database = require("../database.js");

const { DataTypes } = require("sequelize");
let modelType, newModel;
module.exports = build = () => {
    let obj;
    fs.readFile("./configuration.json", "utf8", function(err, data) {
        if (err) throw err;
        obj = JSON.parse(data);

        // for (let i = 0; i < obj.model.length; i++) {
        //     let newModel = obj.model[i].name;
        //     newModel = database.define(
        //         obj.model[i].name,

        //         obj.model[i].field.map((data) => {
        //             return (data[0] = {
        //                 primaryKey: data[0] == "id" ? true : false,
        //                 autoIncrement: data[0] == "id" ? true : false,
        //                 type: data[1] == "integer" ? DataTypes.INTEGER : DataTypes.STRING,
        //                 allowNull: data[3] == "required" ? false : true,
        //             });
        //         }), {
        //             timestamps: false,

        //             createdAt: false,

        //             updatedAt: false,
        //         }
        //     );
        //     newModel.sync();
        //     module.exports = newModel;
        // }
        let modelObject = [];
        let modelObject2 = [];

        for (let i = 0; i < obj.model.length; i++) {
            newModel = obj.model[i].name;

            modelType = obj.model[i].field.map((data) => {
                return {
                    primaryKey: data[0] == "id" ? true : false,
                    autoIncrement: data[0] == "id" ? true : false,
                    label: data[0],
                    type: data[1] == "integer" ? DataTypes.INTEGER : DataTypes.STRING,
                    allowNull: data[3] == "required" ? false : true,
                };
            });

            for (let k = 0; k < obj.model[i].field.length; k++) {
                for (let j = 0; j < modelType.length; j++) {
                    if (modelType[j].label == obj.model[i].field[k][0]) {
                        modelObject.push({
                            label: [modelType[j].label],
                            type: modelType[j],
                        });
                    }
                }
            }
            modelObject2.push({ name: newModel, schema: modelObject });
            // modelObject2.push({
            //     schema: modelObject,
            // });

            modelObject = [];
        }
        let db1;

        for (let a = 0; a < modelObject2.length; a++) {
            var object = modelObject2[a].schema.reduce(
                (obj, item) =>
                Object.assign(obj, {
                    [item.label]: item.type,
                }), {}
            );

            for (let i = 0; i < modelObject2.length; i++) {
                if (a == i) {
                    // db1 = database.define(modelObject2[i].name, modelObject2[i].schema);
                    db1 = database.define(modelObject2[i].name, object, {
                        timestamps: false,

                        createdAt: false,

                        updatedAt: false,
                    });

                    db1.sync({ force: true });
                    fs.writeFile(
                        `${modelObject2[i].name}.js`,
                        `const database = require("./database.js");

                        const { DataTypes } = require("sequelize");
                      const ${
                        modelObject2[i].name[0].toUpperCase() +
                        modelObject2[i].name.substring(1)
                      } =  database.define(${[
              JSON.stringify(modelObject2[i].name),
              JSON.stringify(object),
              JSON.stringify({
                timestamps: false,

                createdAt: false,

                updatedAt: false,
              }),
            ]})
            ;
            
            
            module.exports = ${
              modelObject2[i].name[0].toUpperCase() +
              modelObject2[i].name.substring(1)
            };
`,
                        function(err) {
                            if (err) throw err;
                            else {
                                console.log("File is created successfully.");
                            }
                        }
                    );
                    break;
                }
            }
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