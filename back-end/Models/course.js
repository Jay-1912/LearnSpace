const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    overview:{
        type: String,
        required: false,
    },
    thumbnail: {
        type: String,
        required: false,
    },
    sections: {
        type: Array,
        required: false
    },
    instructor: {
        type: String,
        required: true
    }
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;