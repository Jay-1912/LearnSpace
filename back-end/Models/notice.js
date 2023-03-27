const mongoose = require("mongoose");

const NoticeSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    organization:{
        type: String,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
        required: true,
    }
});

const Notice = mongoose.model("Notice", NoticeSchema);

module.exports = Notice;