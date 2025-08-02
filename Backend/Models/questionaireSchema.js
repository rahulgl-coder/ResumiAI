const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  id: Number,
  question: String,
  options: [String],
  correctAnswer: Number,
});

const skillQuestionaireSchema = new mongoose.Schema({
  skill: {
    type: String,
    required: true,
    unique: true
  },
  questions: [questionSchema]
});

module.exports = mongoose.model("SkillQuestionaire", skillQuestionaireSchema, "skillQuestionaire");
