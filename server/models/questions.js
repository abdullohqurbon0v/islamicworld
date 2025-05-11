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
      message: `Javoblar kamida 2 ta bo'lish shart`
    }
  },
  correctAnswer: {
    type: String,
    required: true,
    validate: {
      validator: function (val) {
        return this.answers.includes(val);
      },
      message: "Tog'ri javob faqat bitta bo'lishi mumkun"
    }
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'easy'
  },
}, {
  timestamps: true
});

const Question = model('Question', questionSchema);

module.exports = Question;
