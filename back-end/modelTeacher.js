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
  phone:{
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
  viewed_notification:{
    type: Array,
    required: false
  },
  unseen_notification:{
      type: Array, 
      required: false
  }
});

const Teacher = mongoose.model("Teacher", TeacherSchema, "teachers");
module.exports = Teacher;
