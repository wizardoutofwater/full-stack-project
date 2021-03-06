const express = require("express");
const app = express();
const db = require("./models");
const crypto = require("crypto");
const pbkdf2 = require("pbkdf2");
const session = require("express-session");
const handlebars = require("express-handlebars");
const { Op } = require("sequelize");
const { read } = require("fs");


app.use(
  session({
    secret: "Windward",
    resave: true,
    saveUninitialized: true,
    cookie: { maxAge: 60 * 60 * 1000 },
  })
);


function encryptPassword(password, pass_salt) {
  var salt = pass_salt ? pass_salt : crypto.randomBytes(20).toString("hex");
  var key = pbkdf2.pbkdf2Sync(password, salt, 36000, 256, "sha256");

  var hash = key.toString("hex");

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

// Encryption
function encryptPassword(password, pass_salt) {
  var salt = pass_salt ? pass_salt : crypto.randomBytes(20).toString("hex");
  var key = pbkdf2.pbkdf2Sync(password, salt, 36000, 256, "sha256");

  var hash = key.toString("hex");

  return `$${salt}$${hash}`;
}

function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next();
  } else res.redirect("/login");
}



//tristyns routes open
app.get("/school/:id", (req, res) => {
  db.highschool.findOne({where: {id: req.params.id}}).then((results) => {
    let school = results.dataValues;
    let schoolID = school.id
    console.log(schoolID)
    db.thread.findAll({where: {highschool_id: schoolID}}).then((results) => {
      let threads = results.map((thread) => thread.toJSON());
      console.log(threads)
      console.log(req.session.user);
      res.render("schoolpage", {
        user: req.session.user,
        highschool: school,
        thread: threads
      })
    });
  })
})


// app.get("/school/:id/thread/:id", (req, res) => {
//   db.thread.findOne({where: {id: req.params.id}}).then((results) => {
//   // console.log(results)
//   thread = results.dataValues
//   res.render = ("schoolpage", {
//     user: req.session.user,
//     thread: thread
//     })
//   })
// })

app.get("/school/:id/thread", (req, res) => {
  db.thread.findAll({where: {highschool_id: req.params.id}}).then((results) => {
    // console.log(results)
    results.map((threads) => {
      console.log(threads)
      res.json(threads)
    })
  // return threads
  // }).then((threads) => {
  //     res.render = ("schoolpage", {
  //       thread: threads
  //     })
    }) 
    // res.redirect(`/school/${highschool.id}`)
  })
// })



app.post("/school/:id/thread", (req, res) => {
  db.thread.create({highschool_id: req.params.id, title: req.body.title, 
    content: req.body.content, user_id: req.body.user_id})
  .then(() => {
    res.redirect(`/school/${req.params.id}`)
  })
})

// app.get("/school/:id/thread/:thread", (req, res) => {
//   console.log(req.params)
//   db.thread.findOne(
//     {where: {highschool_id: req.params.id, id: req.params.thread}})
//     .then((results) => {
//       console.log(results)
//       res.send(results)
//     })
// })

app.get("/school/:id/thread/:thread", (req, res) => {
  console.log(req.params)
  db.thread.findOne(
    {where: {highschool_id: req.params.id, id: req.params.thread}})
    .then((results) => {
      results.destroy();
      // res.send(results)
      res.redirect(`/school/${req.params.id}`)
    })
})
//tristyns route closed



// ------TEST ROUTES (NEED TO BE INCORPORATED INTO FINAL ROUTES)------
// Main Page Routes
app.get("/", (req, res) => {
  res.render("home", {
    user: req.session.user,
    active: { home: true },
  });
});

app.get("/login", (req, res) => {
  res.render("login", {
    user: req.session.user,
    active: { login: true },
  });
});

app.get("/search", isAuthenticated, (req, res) => {
  res.render("search", {
    user: req.session.user,
    active: { search: true },
  });
});

// Sign-Up Routes

app.get("/sign-up", (req, res) => {
  if (req.session.user) {
    res.redirect("/");
  } else res.render("sign-up");
});

app.post("/sign-up", (req, res) => {
  // console.log(req.body);
  if (req.body.username && req.body.password) {
    db.user
      .create({
        username: req.body.username,
        password: encryptPassword(req.body.password),
      })
      .then((user) => {
        res.redirect("/login");
      });
  } else {
    res.send(" please send username and password.");
  }
});

// Search Route

app.get("/api/search/:name", isAuthenticated, (req, res) => {
  let schoolName = req.params.name;
  db.highschool
    .findAll({
      where: {
        name: {
          [Op.iLike]: `%${schoolName}%`,
        },
      },
    })
    .then((results) => {
      if (results !== undefined && results.length != 0) {
        // console.log(results);
        schools = results.map((school) => school.toJSON());
        console.log(schools);
        res.json(schools);
        // res.render("search", {
        //   schools: schools,
        //   listExists: true,
        //   active: { search: true },
        // });
      } else {
        res.status(404).json(`No School found matching ${schoolName}`);
      }
    });
});

// -----Routes-----


// GET All schools
app.get("/api/school", isAuthenticated, function (request, response, next) {
  db.highschool.findAll().then((results) => {
    res.send(results);
  });
  response.send();
});
// app.get("/api/school/:id", isAuthenticated, function (request, response, next) {
//   console.log("someone sent a request home");
//   response.send();
// });

// app.post("/api/alumni", isAuthenticated, function (request, response, next) {
//   console.log("someone sent a request home");
//   response.send();
// });

// app.post("/api/alumni/:id", isAuthenticated, function (request, response, next) {
//   console.log("someone sent a request home");
//   response.send();
// });


// Login Routes
app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.post("/login", (req, res) => {
  console.log(req.body.username, req.body.password);

  if (req.body.username && req.body.password) {
    db.user
      .findOne({
        where: {
          username: req.body.username,
        },
      })
      .then((user) => {
        if (user) {
          var pass_parts = user.password.split("$");

          // encrypt req.body.password using pass_parts[1]
          let encryptedPass = encryptPassword(req.body.password, pass_parts[1]);

          // compared hashed password with user password
          if (encryptedPass == user.password) {
            req.session.user = user;
            res.redirect("/search");
          } else {
            res.send("wrong password");
          }
        } else {
          res.send("we could not find any users");
        }
      })
      .catch(() => {
        res.status(401).send("There was an error");
      });
  } else {
    res.send("please send a username and password");
  }
});

app.listen(3000, function () {
  console.log("listening in port 3000");
});
