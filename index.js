const { json } = require("body-parser");
const express = require("express");
const fs = require("fs");
let html = fs.readFileSync("c:/users/nakul/dev/node.js/learn/index.html");

const app = express();
const port = 3000;
app.get("/home", (req, res) => {
  res.sendFile("C:/Users/nakul/dev/node.js/hello-express/files/index.html");
  console.log("request got");
});
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(require("body-parser").json());

app.post("/data", (req, res) => {
  console.log(req.body, "post");
  let data = req.body;
  console.log(data, JSON.stringify(data));
  let database = fs.readFileSync(
    "C:/Users/nakul/dev/node.js/hello-express/database.json"
  );
  database = JSON.parse(database);
  database.records.push(data);
  console.log(database.records);
  fs.writeFileSync(
    "C:/Users/nakul/dev/node.js/hello-express/database.json",
    JSON.stringify(database)
  );
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log("running");
});
app.use(express.static("files"));
