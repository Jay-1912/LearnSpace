const mongoose = require("mongoose");
const TeacherSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  about: {
    type:String,
    required: false
  },
  password: {
    type: String,
    required: true,
    default: "org123",
  },
  profile: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
    default: "org",
  },
});

const Teacher = mongoose.model("Teacher", TeacherSchema, "teachers");
module.exports = Teacher;
