"use client";

import { $axios } from "@/api/axios";
import Loading from "@/app/(root)/_components/ui/loading";
import { useEffect, useState } from "react";

interface QuestionType {
    answers: string[];
    correctAnswer: string;
    createdAt: Date;
    difficulty: string;
    question: string;
    updatedAt: Date;
    _id: string;
}

interface QuestionResponse {
    message: string;
    question: QuestionType;
}

interface AnswerResponse {
    message: string;
    correct: boolean;
}

function shuffleArray<T>(array: T[]): T[] {
    return [...array].sort(() => Math.random() - 0.5);
}

const QuranViktorinaPage = () => {
    const [question, setQuestion] = useState<QuestionType | null>(null);
    const [shuffledAnswers, setShuffledAnswers] = useState<string[]>([]);
    const [questionIdx, setQuestionIdx] = useState(1);
    const [disabled, setDisabled] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string>('');
    const [correctAnswerShown, setCorrectAnswerShown] = useState(false);
    const [gameOver, setGameOver] = useState(false);

    useEffect(() => {
        const getQuestion = async () => {
            try {
                const difficulty =
                    questionIdx <= 4
                        ? "easy"
                        : questionIdx <= 8
                            ? "medium"
                            : "hard";

                const res = await $axios.get<QuestionResponse>(
                    `/question/get?difficult=${difficulty}`
                );

                setQuestion(res.data.question);
                setShuffledAnswers(shuffleArray(res.data.question.answers));
                setSelectedAnswer('');
                setDisabled(false);
                setCorrectAnswerShown(false);
            } catch (error) {
                console.log(error);
            }
        };

        if (!gameOver) {
            getQuestion();
        }
    }, [questionIdx, gameOver]);

    async function onSelectAnswer(answer: string) {
        setDisabled(true);
        setSelectedAnswer(answer);

        try {
            const res = await $axios.post<AnswerResponse>(`/question/check-answer/${question?._id}`, {
                answer
            });

            setTimeout(() => {
                setCorrectAnswerShown(true);

                if (res.data.correct) {
                    setTimeout(() => {
                        setQuestionIdx(prev => prev + 1);
                    }, 1500);
                } else {
                    setTimeout(() => {
                        setGameOver(true);
                    }, 2000);
                }
            }, 1000);
        } catch (error) {
            console.log(error);
        }
    }

    if (gameOver) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-red-100 text-center">
                <div className="bg-white p-8 rounded-2xl shadow-lg">
                    <h2 className="text-3xl font-bold text-red-600">O‘yin tugadi</h2>
                    <p className="mt-4 text-gray-700">Afsuski, siz noto‘g‘ri javob berdingiz.</p>
                    <button
                        onClick={() => {
                            setQuestionIdx(1);
                            setGameOver(false);
                        }}
                        className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl transition"
                    >
                        Qayta boshlash
                    </button>
                </div>
            </div>
        );
    }

    if (!question) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 py-12">
            <section className="bg-emerald-900 text-white py-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        Qur‘on Vikto‘rinasi
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-200">
                        Qur‘on oyatlari va ma‘nolari bo‘yicha savollarga javob bering va bilimingizni sinab ko‘ring.
                    </p>
                </div>
            </section>

            <section className="max-w-3xl mx-auto mt-10 bg-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-yellow-400 via-green-500 to-emerald-700 rounded-t-2xl"></div>

                <div className="flex justify-between items-center mb-4 text-sm text-gray-600">
                    <span>
                        Qiyinchilik:{" "}
                        <span className="font-semibold text-emerald-700 capitalize">{question.difficulty}</span>
                    </span>
                    <span>
                        Savol:{" "}
                        <span className="font-semibold text-yellow-600">{questionIdx}/15</span>
                    </span>
                </div>

                <div className="mb-6">
                    <h2 className="text-xl md:text-2xl font-semibold text-emerald-900">{questionIdx}-savol:</h2>
                    <p className="mt-2 text-lg text-gray-800">{question.question}</p>
                </div>

                <div className="grid gap-4">
                    {shuffledAnswers.map((answer, idx) => {
                        const isSelected = selectedAnswer === answer;
                        const isCorrect = correctAnswerShown && answer === question.correctAnswer;

                        let baseClasses = "w-full text-left px-4 py-3 rounded-xl transition-all duration-200 ";
                        let classes = "";

                        if (disabled) {
                            if (isCorrect) {
                                classes = "bg-green-100 border border-green-400 text-green-800";
                            } else if (isSelected && !isCorrect) {
                                classes = "bg-red-100 border border-red-400 text-red-800";
                            } else {
                                classes = "bg-gray-100 border border-gray-200 text-gray-500";
                            }
                        } else {
                            classes = "bg-gray-50 border border-emerald-200 hover:bg-emerald-100 hover:border-emerald-400";
                        }

                        return (
                            <button
                                key={idx}
                                onClick={() => onSelectAnswer(answer)}
                                disabled={disabled}
                                className={`${baseClasses} ${classes}`}
                            >
                                {answer}
                            </button>
                        );
                    })}
                </div>

                <div className="mt-6">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-emerald-500 transition-all"
                            style={{ width: `${(questionIdx / 15) * 100}%` }}
                        ></div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default QuranViktorinaPage;
