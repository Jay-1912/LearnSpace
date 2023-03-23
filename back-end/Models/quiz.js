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
  section: {
      type: Number,
      required: true
  },
  lesson: {
    type: Number,
    required: true
  },
  questions:{
    type:Array,
    required: false
  }
});

const Quiz = mongoose.model("Quiz", QuizSchema, "Quiz");

module.exports = Quiz;
