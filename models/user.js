const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    username: {
        type: String, 
        required: true
    },

    email: {
        type: String,
        required: true
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

const User = mongoose.model("User", UserSchema);

module.exports = User;



