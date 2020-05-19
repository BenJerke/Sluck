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

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/");

//database operations


//create new channel
//db.Channel.create({});

//create new post
//db.Post.create({});

//create new DM
//db.Message.create({});


app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/public/index.html"));
});

io.on("connection", socket => {
  console.log("A user connected.");
  socket.on("disconnect", () => console.log("A user disconnected."));
  socket.on("kark", msg => console.log("The frontend says " + msg + "."));
  io.emit("kark", "hi");
});
io.listen(3002);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
