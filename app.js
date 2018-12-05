// Usa Ecmascript6
"use strict";

// Loading dependencies
const express = require("express");
const bodyParser = require("body-parser");

// App instand
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

module.exports = app;
