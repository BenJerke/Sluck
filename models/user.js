const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Schema = mongoose.Schema;

//defining user
const UserSchema = new Schema ({
    username: {
        type: String, 
        unique: true,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true,
        validate: ""
    },

    password: {
        type: String,
        required: true
    },

    ownedChannels: {
        type: Array,
    },

    channels: {
        type: Array
    },

    directMessages: {
        type: Array
    },

    posts: {
        type: Array 
    },
});

//hashing a password before saving it to the database
UserSchema.pre('save', function (next) {
    var user = this;
    bcrypt.hash(user.password, 10, function (err, hash){
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    })
  });

//authenticate input against database
UserSchema.statics.authenticate = function (username, password, callback) {
    User.findOne({ username: username })
      .exec(function (err, user) {
        if (err) {
          return callback(err)
        } else if (!user) {
          var err = new Error('User not found.');
          err.status = 401;
          return callback(err);
        }
        bcrypt.compare(password, user.password, function (err, result) {
          if (result === true) {
            return callback(null, user);
          } else {
            return callback();
          }
        })
      });
  }
  
const User = mongoose.model("User", UserSchema);

module.exports = User;



