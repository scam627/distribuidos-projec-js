// Usa Ecmascript6
"use strict";

// Loading dependencies
const shell = require("shelljs");
const express = require("express");
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");
// App instand
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(bodyParser.json());

app.get("/status", (req, res) => {
  shell.exec("g++ -std=c++11 ./cache/I.cpp");
  res.send({ status: true });
});

app.post("/upload", (req, res) => {
  console.log(req.files.file.mv);
  if (req.files !== null) {
    let EDFile = req.files.file;
    EDFile.mv(`./cache/${EDFile.name}`, err => {
      if (err) return res.status(500).send({ msg: err });
      return res.status(200).send({ success: false, msg: "File upload" });
    });
  } else res.send({ success: false, msg: "No exite archivo" });
});

app.listen("3030", () => {
  console.log("Server is running...");
});
