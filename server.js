const express = require("express");
const app = express();
const db = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.listen(3000, function () {
    console.log("Server Listening on Port 3000");
  });