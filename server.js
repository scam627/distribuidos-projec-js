// Usa Ecmascript6
"use strict";

// Loading dependencies
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
// App instand
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "/client/"));

var listServers = [];
// listServers.push({ host: "192.168.0.1", port: "3030" });

app.get("/all-servers", (req, res) => {
  res.send(listServers);
});

app.get("/servers", (req, res) => {
  if (req.query.memory !== undefined && req.query.cpu !== undefined) {
    const memory = req.query.memory;
    const cpu = req.query.cpu;
    let ans = [];
    listServers.forEach(server => {
      if (server.memory >= memory && server.cpu >= cpu) ans.push(server);
    });
    res.send(ans);
  } else res.send({ success: false });
});

app.get("/add", (req, res) => {
  if (req.query.host !== undefined && req.query.port !== undefined) {
    const data = {
      host: req.query.host,
      port: req.query.port,
      name: req.query.name,
      memory: req.query.memory,
      cpu: req.query.cpu
    };
    let state = false;
    listServers.forEach(server => {
      state = state
        ? state
        : data.host == server.host && data.port == server.port;
    });
    if (!state) {
      let options = {
        url: "http://" + data.host + ":" + data.port + "/status",
        method: "GET",
        jar: true
      };
      request(options, (err, resp, body) => {
        if (!err && resp.statusCode == 200) {
          listServers.push(data);
          res.send({ success: true, err: null, msg: "Added" });
        } else {
          res.send({ success: true, err: null, msg: "Server not found" });
        }
      });
    } else res.send({ success: true, err: null, msg: "Server already added" });
  } else res.send({ success: false, err: true, msg: ":(" });
});

app.listen("8080", () => {
  console.log("Server is running...");
});
