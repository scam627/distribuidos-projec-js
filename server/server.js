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

app.get("/exec-cpp", (req, res) => {
  const name = req.query.name;
  const holis = shell.exec(
    `g++ -std=c++11 -o ./cache/out ./cache/${name} && ./cache/out`
  );
  // console.log(holis);
  res.send({ status: true, out: holis.stdout });
});

app.get("/comp-cpp", (req, res) => {
  const name = req.query.name;
  shell.exec(`g++ -std=c++11 -o ./cache/out ./cache/${name}`);
  res.send({ status: true });
});

app.get("/status", (req, res) => {
  res.send({ status: true });
});

app.post("/upload", (req, res) => {
  //console.log(req.files.file.mv);
  if (req.files !== null) {
    let EDFile = req.files.file;
    EDFile.mv(`./cache/${EDFile.name}`, err => {
      if (err) return res.status(500).send({ msg: err });
      return res.status(200).send({ success: true, msg: "File upload" });
    });
  } else res.send({ success: false, msg: "No exite archivo" });
});

app.listen("3030", () => {
  console.log("Server is running...");
});
