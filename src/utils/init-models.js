const db = require("./database");
var initModels = require("../models/init-models");
var models = initModels(db);
module.exports = models;
