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
        if (!res) { io.emit("login", "User not found.")} 
        else {bcrypt.compare(password, res.password, function (err, result) { 
              if (result===true) {io.emit("login", res._id); console.log("logged in")}
              else if (result===false){ io.emit("login", "Wrong password, idiot.")} 
              else {console.log(err)}
        }
      )};
    });
  });

  socket.on("signup", (username, password, passwordConf, email) => {
    if (email && username && password && passwordConf && (password === passwordConf)) {
      db.User.create({email: email, username: username, password: password, passwordConf: passwordConf}).then(res => {
        console.log(res);
      }).catch(err => console.log(err))
    } else console.log("Passwords don't match.");
  });
  
  socket.on("message", (username, body, channel) => {
    if (username && body && channel){
      db.Post.create({author: username, body: body, location: channel}).then(res => {
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
