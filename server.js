const express = require("express");
const app = express();
const db = require("./models");
const crypto = require("crypto");
const pbkdf2 = require("pbkdf2");
const session = require("express-session");
const handlebars = require("express-handlebars");
const { Op } = require("sequelize");


app.use(session({
  password: 'Windward',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 60 * 60 * 1000 } 
}))

function encryptPassword(password, pass_salt) {
  var salt = pass_salt ? pass_salt : crypto.randomBytes(20).toString('hex');
  var key = pbkdf2.pbkdf2Sync(
    password, salt, 36000, 256, 'sha256'
  );

  var hash = key.toString('hex');

  return `$${salt}$${hash}`;
}

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

app.get("/", (req, res) => {
  res.render("home", { active: { home: true } });
});

app.get("/login", (req, res) => {
  res.render("login", { active: { login: true } });
});

app.get("/search", (req, res) => {
  res.render("search", { active: { search: true } });
});

app.get("/search/:name", (req, res) => {
  let schoolName = req.params.name;
  // console.log(schoolName);
  db.highschool
    .findAll({
      where: {
        name: {
          [Op.iLike]: `%${schoolName}%`,
        },
      },
    })
    .then((results) => {

    if(results !== undefined && results.length != 0) {
      // console.log(results);
      schools = results.map((school) => school.toJSON());
      console.log(schools);
      res.render("search", {
        schools: schools,
        listExists: true,
        active: { search: true },
      });
    } else {
      res.status(404).send(`No School found matching ${schoolName}`)
    }
    });
});
// -----Routes-----
app.get("/api",isAuthenticated, function (request, response, next) {
  console.log("someone sent a request home");
  response.send();
});

app.get("/api/search",isAuthenticated, function (request, response, next) {
  console.log("someone sent a request home");
  response.send();
});

app.get("/api/login",isAuthenticated, function (request, response, next) {
  console.log("someone sent a request home");
  response.send();
});

function isAuthenticated(req, res, next) {
  if (req.user.authenticated){
  next();  
  }
  res.redirect('/login');
}

// GET All schools
app.get("/api/school",isAuthenticated, function (request, response, next) {
  db.highschool.findAll().then((results) => {
    res.send(results);
  });
  response.send();
});
app.get("/api/school/:id",isAuthenticated, function (request, response, next) {
  console.log("someone sent a request home");
  response.send();
});

app.post("/api/alumni",isAuthenticated, function (request, response, next) {
  console.log("someone sent a request home");
  response.send();
});

app.post("/api/school",isAuthenticated, function (request, response, next) {
  console.log("someone sent a request home");
  response.send();
});

app.listen(3000, function () {
  console.log("listening in port 3000");
});

//sign in and out

 app.get('/logout', (req, res) => {
  req.session.destroy();
  res.send('successful logout');
})

app.post('/login', (req, res) => {
  if(req.body.username && req.body.password) {
    db.user.findOne(
      { 
        where: 
        { 
          username: req.body.username
        } 
      }).then((user) => {
        if(user) {
          var pass_parts = user.password.split('$');

          // encrypt req.body.password using pass_parts[1]
          let encryptedPass = encryptPassword(req.body.password, pass_parts[1]);

          // compared hashed password with user password
          if(encryptedPass == user.password) {
            req.session.user = user;
            res.send('welcome user: ' + user.username);
          }else {
            res.send('wrong password')
          }

        } else {
          res.send('we could not find any users')
        }
      }).catch(() => {
        res.send('There was an error');
      });
  } else {
    res.send('please send a username and password')
  }
});


app.post('/sign-up', (req, res) => {
  if(req.body.username && req.body.password) {
    db.user.create(
      {
        username: req.body.username, 
        password: encryptPassword(req.body.password)
      }
      ).then((user) => {
      res.send(user)
    })
  } else {
    res.send(' please send username and password.');
  }
})


// if(!schools) {
//   console.log ('got results!')
//   res.status(401).send('No Matching Schools Found');
//   alert(`No Schools Found matching ${schoolName}`);
//   return;
// }