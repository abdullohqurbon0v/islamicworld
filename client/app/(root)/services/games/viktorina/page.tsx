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
    const [startGame, setStartGame] = useState(false);
    const [timeLeft, setTimeLeft] = useState(15);
    const [timedOut, setTimedOut] = useState(false);

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
                setTimeLeft(15);
                setTimedOut(false);
            } catch (error) {
                console.log(error);
            }
        };

        if (!gameOver) {
            getQuestion();
        }
    }, [questionIdx, gameOver]);

    useEffect(() => {
        if (!question || gameOver || disabled || !startGame) return;
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setGameOver(true);
                    setTimedOut(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [question, gameOver, disabled, startGame]);

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

    if (!startGame) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-900">
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400 via-green-500 to-emerald-700 rounded-t-2xl"></div>
                    <h1 className="text-4xl md:text-5xl font-bold text-emerald-900 mb-4">
                        Qur‘on Vikto‘rinasiga Xush Kelibsiz!
                    </h1>
                    <p className="text-lg md:text-xl text-gray-700 mb-6">
                        Bu viktorinada Qur‘on oyatlari, ularning ma‘nolari va tegishli bilimlar bo‘yicha savollarga javob berib, o‘z bilimingizni sinab ko‘rishingiz mumkin. 15 ta savoldan iborat ushbu o‘yin sizning bilimlaringizni sinovdan o‘tkazadi!
                    </p>
                    <div className="text-left mb-6">
                        <h2 className="text-2xl font-semibold text-emerald-700 mb-2">O‘yin qoidalari:</h2>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>Har bir savol uchun to‘rtta javob varianti beriladi.</li>
                            <li>To‘g‘ri javobni tanlasangiz, keyingi savolga o‘tasiz.</li>
                            <li>Noto‘g‘ri javob bergan bo‘lsangiz, o‘yin tugaydi va qayta boshlashingiz mumkin.</li>
                            <li>Savollar qiyinligi oshib boradi: dastlab oson, keyin o‘rta, so‘ngra qiyin savollar.</li>
                            <li>Har bir savolga javob berish uchun 15 soniya vaqtingiz bor!</li>
                        </ul>
                    </div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold text-emerald-700 mb-2">Qiyinchilik darajalari:</h2>
                        <p className="text-gray-700">
                            <span className="font-semibold text-yellow-600">1-4 savollar:</span> Oson – yangi boshlovchilar uchun mos.<br />
                            <span className="font-semibold text-yellow-600">5-8 savollar:</span> O‘rta – bilimni chuqurlashtirish.<br />
                            <span className="font-semibold text-yellow-600">9-15 savollar:</span> Qiyin – haqiqiy mutaxassislar uchun!
                        </p>
                    </div>
                    <button
                        onClick={() => setStartGame(true)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl text-lg font-semibold transition duration-200"
                    >
                        O‘yinni boshlash
                    </button>
                </div>
            </div>
        );
    }

    if (gameOver) {
        const correctAnswers = questionIdx - 1;
        const difficultyReached =
            correctAnswers <= 4 ? "Oson" : correctAnswers <= 8 ? "O‘rta" : "Qiyin";

        return (
            <div className="min-h-screen flex items-center justify-center bg-blue-400 text-gray-900">
                <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg text-center relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-500 via-green-500 to-emerald-700 rounded-t-2xl"></div>
                    <h2 className="text-4xl md:text-5xl font-bold text-red-600 mb-4">
                        O‘yin Tugadi!
                    </h2>
                    <p className="text-lg md:text-xl text-gray-700 mb-6">
                        {timedOut
                            ? "Afsuski, vaqt tugadi! Tezroq javob berishga harakat qiling."
                            : "Afsuski, siz noto‘g‘ri javob berdingiz."}
                        {" Ammo tushkunlikka tushmang, har bir urinish sizni bilimlarga yaqinlashtiradi!"}
                    </p>
                    <div className="mb-6">
                        <h3 className="text-2xl font-semibold text-emerald-700 mb-2">Sizning natijangiz:</h3>
                        <p className="text-gray-700">
                            <span className="font-semibold text-yellow-600">To‘g‘ri javoblar:</span> {correctAnswers} / 15<br />
                            <span className="font-semibold text-yellow-600">Erishilgan qiyinchilik:</span> {difficultyReached}<br />
                            <span className="font-semibold text-yellow-600">Savol raqami:</span> {correctAnswers + 1} da xato qildingiz
                        </p>
                    </div>
                    <div className="text-left mb-6">
                        <h3 className="text-2xl font-semibold text-emerald-700 mb-2">Maslahatlar:</h3>
                        <ul className="list-disc list-inside text-gray-700 space-y-2">
                            <li>Qur‘on oyatlari va ularning ma‘nolarini qayta ko‘rib chiqing.</li>
                            <li>Har bir savolni diqqat bilan o‘qib, variantlarni sinchkovlik bilan tanlang.</li>
                            {timedOut && <li>15 soniya ichida javob berish uchun tezkorlikni oshiring.</li>}
                            <li>Har bir urinishda ko‘proq savolga yetib boring!</li>
                        </ul>
                    </div>
                    <div className="flex justify-center gap-4">
                        <button
                            onClick={() => {
                                setQuestionIdx(1);
                                setGameOver(false);
                            }}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl text-lg font-semibold transition duration-200"
                        >
                            Qayta boshlash
                        </button>
                        <button
                            onClick={() => {
                                setQuestionIdx(1);
                                setGameOver(false);
                                setStartGame(false);
                            }}
                            className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-xl text-lg font-semibold transition duration-200"
                        >
                            Bosh menyuga qaytish
                        </button>
                    </div>
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
                    <span>
                        Vaqt:{" "}
                        <span className={`font-semibold ${timeLeft <= 5 ? 'text-red-600' : 'text-yellow-600'}`}>
                            {timeLeft} soniya
                        </span>
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
