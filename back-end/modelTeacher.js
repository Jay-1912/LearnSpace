const mongoose = require("mongoose");
const TeacherSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
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
  password: {
    type: String,
    required: true,
    default: "org123",
  },
});

const Teacher = mongoose.model("Teacher", TeacherSchema, "teachers");
module.exports = Teacher;
