const mongoose = require("mongoose")
const Schema = mongoose.Schema;

var PostSchema = new Schema ({
    author: { //user that wrote the post. storing user object in array.
        type: Array,
        required: true
    },

    body: { //the post
        type: String,
    },

    // timestamp: { //when the post was made
    //     type: Time,
    //     default: Date.now,
    // },

    location: { //where the post was made. storing channel object in array. 
        type: Array
    }

});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;