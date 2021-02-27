const express = require("express");
const app = express();
const db = require("./models");

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


  app.get("/api", function(request, response, next){
    console.log("someone sent a request home");
    response.send();
});

app.get("/api/search", function(request, response, next){
  console.log("someone sent a request home");
  response.send();
});

app.get("/api/login", function(request, response, next){
  console.log("someone sent a request home");
  response.send();
});

app.get("/api/school", function(request, response, next){
  console.log("someone sent a request home");
  response.send();
});
  app.get("/api/school/:id", function(request, response, next){
    console.log("someone sent a request home");
    response.send();
});
app.post("/api/login", function(request, response, next){
  console.log("someone sent a request home");
  response.send();
});

app.post("/api/alumni", function(request, response, next){
  console.log("someone sent a request home");
  response.send();
});

app.post("/api/school", function(request, response, next){
  console.log("someone sent a request home");
  response.send();
});

app.listen(3000,function(){
    console.log("listening in port 3000");
  });
