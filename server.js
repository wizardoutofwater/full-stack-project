const express = require("express");
const app = express();
const db = require("./models");
const crypto = require('crypto');
const pbkdf2 = require('pbkdf2');
const session = require('express-session')
const handlebars = require('express-handlebars') // hbs

app.use(session({
  secret: 'tacocat',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } 
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'hbs');
app.engine('hbs', handlebars({
  layoutsDir:__dirname + '/views/layouts',
  extname: 'hbs',
  defaultLayout: 'default',
  partialsDir: '/views/partials/'
}));

app.use(express.static('public'))


// -- TEST ROUTES -- 
app.get('/', (req, res) => {
  res.render('main', {layout : 'index'});
  });


app.listen(3000, function () {
  console.log("Server Listening on Port 3000");
});
