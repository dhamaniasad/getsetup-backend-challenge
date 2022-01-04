"use strict";
exports.__esModule = true;
var express_1 = require("express");
var body_parser_1 = require("body-parser");
var config_1 = require("../config");
var database_1 = require("../config/database");
var availability_1 = require("./routes/availability");
var app = (0, express_1["default"])();
(0, database_1["default"])();
app.use(body_parser_1["default"].json());
app.get('/', function (req, res) {
    res.send('Hello, World!');
});
app.use('/api/availability', availability_1["default"]);
app.listen(config_1.PORT, function () {
    console.log("The application is running on port ".concat(config_1.PORT));
});
