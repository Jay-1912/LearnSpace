const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  quizName: String,
  quizOrganization: String,
  quizOrganizationCourse: String,
  questions: [
    {
      questionText: String,
      options: [],
      correctOptions: [],
    },
  ],
});

const Quiz = mongoose.model("Quiz", QuizSchema, "Quiz");

module.exports = Quiz;
