const express = require("express");
const app = express();
const db = require("./models");
const crypto = require("crypto");
const pbkdf2 = require("pbkdf2");
const session = require("express-session");
const handlebars = require("express-handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set Handlebars as view engine
app.set("view engine", "hbs");
app.engine(
  "hbs",
  handlebars({
    layoutsDir: __dirname + "/views/layouts",
    extname: "hbs",
    defaultLayout: "index",
    partialsDir: __dirname + "/views/partials",
  })
);
// Serve Static css/image files
app.use(express.static("public"));

// test route for HBS

app.get('/', (req, res) => {
  res.render("home", {active: {home: true}});
})

app.get('/login', (req, res) => {
  res.render("login", {active: {login: true }});
})

app.get('/search', (req, res) => {
  res.render("search", {active: {search: true }});
})
// -----Routes-----
app.get("/api", function (request, response, next) {
  console.log("someone sent a request home");
  response.send();
});

app.get("/api/search", function (request, response, next) {
  console.log("someone sent a request home");
  response.send();
});

app.get("/api/login", function (request, response, next) {
  console.log("someone sent a request home");
  response.send();
});

// GET All schools
app.get("/api/school", function (request, response, next) {
  db.highschool.findAll().then((results) => {
    res.send(results);
  })
  response.send();
});
app.get("/api/school/:id", function (request, response, next) {
  console.log("someone sent a request home");
  response.send();
});
app.post("/api/login", function (request, response, next) {
  console.log("someone sent a request home");
  response.send();
});

app.post("/api/alumni", function (request, response, next) {
  console.log("someone sent a request home");
  response.send();
});

app.post("/api/school", function (request, response, next) {
  console.log("someone sent a request home");
  response.send();
});

app.listen(3000, function () {
  console.log("listening in port 3000");
});
