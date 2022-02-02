const database = require("./database.js");

                        const { DataTypes } = require("sequelize");
                      const Location =  database.define("location",{"id":{"primaryKey":true,"autoIncrement":true,"label":"id","type":{"options":{}},"allowNull":false,"fieldName":"id","_modelAttribute":true,"field":"id"},"name":{"primaryKey":false,"autoIncrement":false,"label":"name","type":{"options":{},"_length":255},"allowNull":false,"fieldName":"name","_modelAttribute":true,"field":"name"},"status":{"primaryKey":false,"autoIncrement":false,"label":"status","type":{"options":{}},"allowNull":false,"fieldName":"status","_modelAttribute":true,"field":"status"}},{"timestamps":false,"createdAt":false,"updatedAt":false})
            ;
            
            
            module.exports = Location;
