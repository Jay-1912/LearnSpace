const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema({
    type:{
        type: String,
        required: true,
    },
    organization:{
        type: String,
        required: false,
    },
    dataId:{
        type:String,
        required: true
    },
    date:{
        type: Date,
        default: Date.now,
        required: true,
    }
});

const Notification = mongoose.model("Notification", NotificationSchema);

module.exports = Notification;