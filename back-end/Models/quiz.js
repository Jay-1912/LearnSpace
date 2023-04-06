const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  title:{
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true
  },
  course: {
      type: String,
      required: true
  },
  instructor: {
    type: String,
    required: true
  },
  section: {
      type: Number,
      required: true
  },
  questions:{
    type:Array,
    required: false
  },
  students:{
    type: Object,
    required: false
  },
  type:{
    type: String,
    required: false
  },
  marks: {
    type: Object,
    required: false
  },
  feedback: {
    type: Object,
    required: false
  }
});

const Quiz = mongoose.model("Quiz", QuizSchema, "Quiz");

module.exports = Quiz;
