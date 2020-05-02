const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const http = require("http").Server(app);
const io = require('socket.io')(http);
//const routes = require("./routes");
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
};

// Add routes
//app.use(routes);

// Connect to DB
//mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist");

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/public/index.html"));
});

io.on("connection", socket => console.log("A user connected."));
io.listen(3002);

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
