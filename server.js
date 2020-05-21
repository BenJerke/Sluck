const express = require("express");
const session = require("express-session")
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const http = require("http").Server(app);
const bcrypt = require("bcryptjs");
const io = require('socket.io')(http);
const routes = require("./routes");
const PORT = process.env.PORT || 3001;
const db = require("./models");
let id = "";

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: 'sluck rocks',
  resave: true,
  saveUninitialized: false
}));

// Static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
};

// Add routes
app.use(routes);

// Connect to DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/slcukdb");


app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/public/index.html"));
});

io.on("connection", socket => {
  console.log("A user connected.");
  socket.on("disconnect", () => console.log("A user disconnected."));
  socket.on("login", (username, password) => {
    db.User.findOne({ username: username }).then(function (res) {
      if (!res) { io.emit("login", "User not found.") }
      else {
        bcrypt.compare(password, res.password, function (err, result) {
          if (result === true) { id = res._id; io.emit("login", id); console.log("logged in") }
          else if (result === false) { io.emit("login", "Wrong password, idiot.") }
          else { io.emit("login", "There's been an error: " + err) }
        });
      };
    });
  });

  socket.on("signup", (username, password, passwordConf, email) => {
    if (email && username && password && passwordConf && (password === passwordConf)) {
      db.User.create({ email: email, username: username, password: password, passwordConf: passwordConf }).then(res => {
        id = res._id; io.emit("signup", id);
      }).catch(err => io.emit("signup", "There's been an error: " + err));
    } else io.emit("signup", "Passwords don't match.");
  });

  socket.on("user", () => {
    console.log(id);
    io.emit("user", id);
    //io.emit("messages", )
  });

  socket.on("message", body => {
    console.log("here");
    if (body) {
      db.Post.create({ author: id, body: body, location: ' ' }).then(res => {
        console.log(res);
      }).catch(err => console.log(err))
    } else console.log("Wait, what? You're not supposed to do that. Get outta here!");
  });
});



io.listen(3002);

// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
