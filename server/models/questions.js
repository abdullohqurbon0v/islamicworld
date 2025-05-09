const { Schema, model } = require('mongoose');

const questionSchema = new Schema({
  question: {
    type: String,
    required: true,
    trim: true,
  },
  answers: {
    type: [String],
    required: true,
    validate: {
      validator: function (arr) {
        return arr.length >= 2;
      },
      message: 'There must be at least two answers.'
    }
  },
  correctAnswer: {
    type: String,
    required: true,
    validate: {
      validator: function (val) {
        return this.answers.includes(val);
      },
      message: 'Correct answer must be one of the provided answers.'
    }
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
}, {
  timestamps: true
});

const Question = model('Question', questionSchema);

module.exports = Question;
