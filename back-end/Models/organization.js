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
    image:{
        type: String,
        required: true
    }
});

const Organization = mongoose.model("Organization", OrganizationSchema);

module.exports = Organization;