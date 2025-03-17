"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { BookOpen, CheckCircle, XCircle } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
}

const QuranViktorinaPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  // Sample questions
  const questions: Question[] = [
    {
      question: "Qur‘onda nechta sura mavjud?",
      options: ["110", "114", "120", "99"],
      correctAnswer: "114",
    },
    {
      question: "‘Fotiha’ surasi Qur‘onning nechanchi surasi?",
      options: ["1", "2", "5", "10"],
      correctAnswer: "1",
    },
    {
      question: "‘Baqara’ so‘zi nimani anglatadi?",
      options: ["Sigir", "Ot", "Tuyoq", "Qush"],
      correctAnswer: "Sigir",
    },
    {
      question: "Qur‘on necha yilda nozil bo‘lgan?",
      options: ["10", "15", "23", "30"],
      correctAnswer: "23",
    },
    {
      question: "‘Al-Falaq’ surasi qanday boshlanadi?",
      options: [
        "Qul a‘uzu birabbil-falaq",
        "Qul hu wallohu ahad",
        "Qul a‘uzu birabbin-nas",
        "Alhamdu lillahi rabbil ‘alamin",
      ],
      correctAnswer: "Qul a‘uzu birabbil-falaq",
    },
  ];

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) {
      alert("Iltimos, javobni tanlang!");
      return;
    }

    const isCorrect =
      selectedAnswer === questions[currentQuestion].correctAnswer;
    if (isCorrect) {
      setScore(score + 1);
    }
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowResult(false);
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
    setQuizCompleted(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 py-12 ">
      <section className="bg-emerald-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold  tracking-tight">
            Qur‘on Vikto‘rinasi
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200">
            Qur‘on oyatlari va ma‘nolari bo‘yicha savollarga javob bering va
            bilimingizni sinab ko‘ring.
          </p>
        </div>
      </section>

      {/* Quiz Section */}
      <section className="max-w-3xl mx-auto mt-12">
        <Card className="bg-white shadow-lg border border-emerald-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-emerald-900  flex items-center">
              <BookOpen className="mr-2 h-6 w-6" /> Savol {currentQuestion + 1}{" "}
              / {questions.length}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {!quizCompleted ? (
              <>
                <p className="text-lg text-gray-800 ">
                  {questions[currentQuestion].question}
                </p>
                <RadioGroup
                  value={selectedAnswer || ""}
                  onValueChange={setSelectedAnswer}
                  className="space-y-4"
                  disabled={showResult}
                >
                  {questions[currentQuestion].options.map((option, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`option-${index}`} />
                      <Label
                        htmlFor={`option-${index}`}
                        className="text-gray-700 cursor-pointer"
                      >
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                {!showResult ? (
                  <Button
                    onClick={handleAnswerSubmit}
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white border border-amber-500/50"
                  >
                    Javobni Tekshirish
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2">
                      {selectedAnswer ===
                      questions[currentQuestion].correctAnswer ? (
                        <CheckCircle className="h-6 w-6 text-emerald-600" />
                      ) : (
                        <XCircle className="h-6 w-6 text-red-600" />
                      )}
                      <p className="text-lg font-semibold text-gray-800">
                        {selectedAnswer ===
                        questions[currentQuestion].correctAnswer
                          ? "To‘g‘ri!"
                          : `Noto‘g‘ri. To‘g‘ri javob: ${questions[currentQuestion].correctAnswer}`}
                      </p>
                    </div>
                    <Button
                      onClick={handleNextQuestion}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-500/50"
                    >
                      {currentQuestion + 1 === questions.length
                        ? "Tugatish"
                        : "Keyingi Savol"}
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center space-y-6">
                <h3 className="text-2xl font-bold text-emerald-900 ">
                  Viktorina Yakunlandi!
                </h3>
                <p className="text-lg text-gray-700">
                  Sizning natijangiz: {score} / {questions.length}
                </p>
                <p className="text-gray-600">
                  {score === questions.length
                    ? "Ajoyib! Siz hamma savolga to‘g‘ri javob berdingiz."
                    : "Yaxshi harakat! Yana sinab ko‘ring va bilimingizni oshiring."}
                </p>
                <Button
                  onClick={handleRestart}
                  className="bg-amber-600 hover:bg-amber-700 text-white border border-amber-500/50"
                >
                  Qaytadan Boshlash
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
};

export default QuranViktorinaPage;
