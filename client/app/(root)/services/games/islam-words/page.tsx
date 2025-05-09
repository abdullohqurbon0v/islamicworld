"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Book, CheckCircle, XCircle } from "lucide-react";

interface Word {
    word: string;
    definition: string;
}

const IslamicWordsGamePage = () => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [userGuess, setUserGuess] = useState("");
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [gameCompleted, setGameCompleted] = useState(false);

    // Sample Islamic words and definitions
    const words: Word[] = [
        {
            word: "Namoz",
            definition: "Islomdagi besh vaqt ibodat qilish.",
        },
        {
            word: "Zakat",
            definition: "Mol-mulkdan ajratiladigan majburiy sadaqa.",
        },
        {
            word: "Ro‘za",
            definition: "Ramazon oyida tongdan shomga qadar ovqat yemaslik.",
        },
        {
            word: "Haj",
            definition: "Makkaga qilinadigan ziyorat.",
        },
        {
            word: "Qur‘on",
            definition: "Allohning Hz. Muhammad (s.a.v.) ga nozil qilgan kitobi.",
        },
    ];

    const handleGuessSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userGuess.trim()) {
            alert("Iltimos, taxminiy javobingizni kiriting!");
            return;
        }

        const isCorrect =
            userGuess.trim().toLowerCase() ===
            words[currentWordIndex].word.toLowerCase();
        if (isCorrect) {
            setScore(score + 1);
        }
        setShowResult(true);
    };

    const handleNextWord = () => {
        setUserGuess("");
        setShowResult(false);
        if (currentWordIndex + 1 < words.length) {
            setCurrentWordIndex(currentWordIndex + 1);
        } else {
            setGameCompleted(true);
        }
    };

    const handleRestart = () => {
        setCurrentWordIndex(0);
        setUserGuess("");
        setScore(0);
        setShowResult(false);
        setGameCompleted(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 py-12 ">
            <section className="bg-emerald-900 text-white py-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold font-[ArabicFont] tracking-tight">
                        Islomiy So‘zlar
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-200">
                        Islomiy atamalarni taxmin qiling va har bir so‘zning ma‘nosini
                        o‘rganing.
                    </p>
                </div>
            </section>
            <section className="max-w-3xl mx-auto mt-12">
                <Card className="bg-white shadow-lg border border-emerald-200">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold text-emerald-900 font-[ArabicFont] flex items-center">
                            <Book className="mr-2 h-6 w-6" /> So‘z {currentWordIndex + 1} /{" "}
                            {words.length}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {!gameCompleted ? (
                            <>
                                <p className="text-lg text-gray-800 font-[ArabicFont]">
                                    Ta‘rif: {words[currentWordIndex].definition}
                                </p>
                                <form onSubmit={handleGuessSubmit} className="space-y-4">
                                    <Input
                                        type="text"
                                        value={userGuess}
                                        onChange={(e) => setUserGuess(e.target.value)}
                                        placeholder="So‘zni kiriting"
                                        className="w-full"
                                        disabled={showResult}
                                    />
                                    {!showResult ? (
                                        <Button
                                            type="submit"
                                            className="w-full bg-amber-600 hover:bg-amber-700 text-white border border-amber-500/50"
                                        >
                                            Javobni Tekshirish
                                        </Button>
                                    ) : (
                                        <div className="space-y-4">
                                            <div className="flex items-center justify-center gap-2">
                                                {userGuess.toLowerCase() ===
                                                    words[currentWordIndex].word.toLowerCase() ? (
                                                    <CheckCircle className="h-6 w-6 text-emerald-600" />
                                                ) : (
                                                    <XCircle className="h-6 w-6 text-red-600" />
                                                )}
                                                <p className="text-lg font-semibold text-gray-800">
                                                    {userGuess.toLowerCase() ===
                                                        words[currentWordIndex].word.toLowerCase()
                                                        ? "To‘g‘ri!"
                                                        : `Noto‘g‘ri. To‘g‘ri javob: ${words[currentWordIndex].word}`}
                                                </p>
                                            </div>
                                            <Button
                                                onClick={handleNextWord}
                                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-500/50"
                                            >
                                                {currentWordIndex + 1 === words.length
                                                    ? "Tugatish"
                                                    : "Keyingi So‘z"}
                                            </Button>
                                        </div>
                                    )}
                                </form>
                            </>
                        ) : (
                            <div className="text-center space-y-6">
                                <h3 className="text-2xl font-bold text-emerald-900 font-[ArabicFont]">
                                    O‘yin Yakunlandi!
                                </h3>
                                <p className="text-lg text-gray-700">
                                    Sizning natijangiz: {score} / {words.length}
                                </p>
                                <p className="text-gray-600">
                                    {score === words.length
                                        ? "Ajoyib! Siz hamma so‘zni to‘g‘ri topdingiz."
                                        : "Yaxshi urinish! Yana o‘ynab, bilimingizni oshiring."}
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

export default IslamicWordsGamePage;
