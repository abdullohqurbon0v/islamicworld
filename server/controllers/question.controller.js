const Question = require("../models/questions");

const { isArray } = Array;

class QuestionController {
    async create(req, res) {
        try {
            const { question, answers, correctAnswer, difficulty } = req.body;

            if (!question || !answers || !correctAnswer || !difficulty) {
                return res.status(400).json({
                    message: "Barcha maydonlar to'ldirilishi shart: question, answers, correctAnswer, difficulty",
                });
            }

            if (!isArray(answers) || answers.length < 2) {
                return res.status(400).json({
                    message: "Kamida ikki ta javob variantlari bo'lishi kerak",
                });
            }

            const uniqueAnswers = new Set(answers);
            if (uniqueAnswers.size !== answers.length) {
                return res.status(400).json({
                    message: "Ikta bir xil javob bo'lishi mumkin emas",
                });
            }
            if (!answers.includes(correctAnswer)) {
                return res.status(400).json({
                    message: "correctAnswer, answers ro'yxatida bo'lishi kerak",
                });
            }

            const newQuestion = await Question.create({question,answers, correctAnswer, difficulty})

            return res.status(201).json({
                message: "Savol muvaffaqiyatli yaratildi",
                data: newQuestion,
            });

        } catch (error) {
            return res.status(500).json({
                message: "Serverda xatolik yuz berdi, iltimos keyinroq urinib ko'ring",
                error: error.message || true,
            });
        }
    }

    async get(req, res) {
        try {
            const { difficult: difficulty } = req.query;
            console.log(difficulty);

            const questions = await Question.find({ difficulty });

            if (!questions.length) {
              return res.status(404).json({
                message: "Savollar topilmadi"
              });
            }

            const randomIndex = Math.floor(Math.random() * questions.length);
            const randomQuestion = questions[randomIndex];

            return res.status(200).json({
              message: "Savol topildi",
              question: randomQuestion
            });

        } catch (error) {
            return res.status(500).json({
                message: "Serverda xatolik yuz berdi, iltimos keyinroq urinib ko'ring",
                error: error.message || true,
            })
        }
    }
    async check(req, res) {
        try {
            const { id } = req.params;
            const { answer } = req.body;
            if (!answer) {
                return res.status(400).json({
                    message: "Javobni kiriting"
                });
            }
            const question = await Question.findById(id);
            if (!question) {
                return res.status(404).json({
                    message: "Savol topilmadi"
                });
            }
            const isCorrect = question.correctAnswer === answer;
            if (isCorrect) {
                return res.status(200).json({
                    message: "Javob to'g'ri!",
                    correct: true
                });
            } else {
                return res.status(200).json({
                    message: "Javob noto'g'ri!",
                    correct: false
                });
            }
        } catch (error) {
            return res.status(500).json({
                message: "Serverda xatolik yuz berdi, iltimos keyinroq urinib ko'ring",
                error: error.message || true,
            });
        }
    }

    async gameOver() {
        try {

        } catch (error) {

        }
    }
}

module.exports = new QuestionController();
