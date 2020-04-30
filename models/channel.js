const mongoose = require("mongoose")
const Schema = mongoose.Schema;

var ChannelSchema = new Schema ({
    channelName: {
        type: String,
        required: true
    },

    channelDescription:{
        type: String,
        
    },

    owningUser: {
        type: Array,
        required: true,
    },
    
    users: {
        type: Array,
    },

    posts: {
        type: Array,
    }
});

const Channel = mongoose.model("Channel", ChannelSchema);
module.exports = Channel;