const mongoose = require("mongoose")
const Schema = mongoose.Schema;

var PostSchema = new Schema ({
    author: { //user that wrote the post. storing user object in array.
        type: String,
        required: true
    },

    body: { //the post
        type: String,
    },

    location: { //where the post was made. storing channel object in array. 
        type: String
    }

});

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;