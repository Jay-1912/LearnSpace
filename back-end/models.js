const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: 0,
  },
});

const StudentSchema = new mongoose.Schema({
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
  phone: {
    type: String,
    required: true,
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
  enrolled_courses:{
    type:Object,
    required: false
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

const User = mongoose.model("User", UserSchema);
const Student = mongoose.model("Student", StudentSchema, "students");

module.exports = Student;
