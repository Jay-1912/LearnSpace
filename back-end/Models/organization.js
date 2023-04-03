const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
    name:{
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
    image:{
        type: String,
        required: true
    },
    viewed_notification:{
        type: Array,
        required: false
    },
    unseen_notification:{
        type: Array, 
        required: false
    }
});

const Organization = mongoose.model("Organization", OrganizationSchema);

module.exports = Organization;