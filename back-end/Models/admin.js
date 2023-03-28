const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
    },
    lastname:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    profile:{
        type: String,
        required: true
    }
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;