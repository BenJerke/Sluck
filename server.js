const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const app = express();
const PORT = process.env.PORT || 3001;
const db = require("./models")



// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes
//app.use(routes);

// Connect to DB

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reactreadinglist");

//database operations

//create new user
//db.User.create({});

//create new channel
//db.Channel.create({});

//create new post
//db.Post.create({});

//create new DM
//db.Message.create({});


// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`);
});
