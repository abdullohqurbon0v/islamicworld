"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Book,
  Search,
  ChevronLeft,
  ChevronRight,
  Quote,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const IslamicEducationPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dailyHadith, setDailyHadith] = useState({
    text: "Rasululloh (s.a.v.) dedilar: 'Kimki biror ilm o‘rganish uchun yo‘lga chiqsa, Alloh uning uchun jannatga yo‘l ochadi.'",
    source: "Sahih Muslim",
  });
  const router = useRouter();
  const itemsPerPage = 6;
  const books = [
    {
      id: 1,
      title: "Sahih al-Buxoriy",
      author: "Imom Buxoriy",
      category: "Hadis",
    },
    { id: 2, title: "Sahih Muslim", author: "Imom Muslim", category: "Hadis" },
    {
      id: 3,
      title: "Riyozus-Soliheen",
      author: "Imom Navaviy",
      category: "Hadis",
    },
    {
      id: 4,
      title: "Tafsir Ibn Kasir",
      author: "Ibn Kasir",
      category: "Tafsir",
    },
    { id: 5, title: "Fiqh-us-Sunna", author: "Sayyid Sabiq", category: "Fiqh" },
    { id: 6, title: "Al-Muwatta", author: "Imom Molik", category: "Hadis" },
    {
      id: 7,
      title: "Qur‘on Tafsiri",
      author: "Shayx Muhammad Sodiq",
      category: "Tafsir",
    },
    {
      id: 8,
      title: "Hadislar To‘plami",
      author: "Imom Termiziy",
      category: "Hadis",
    },
    {
      id: 9,
      title: "Islom Tarixi",
      author: "Shayx Ali Tantaviy",
      category: "Tarix",
    },
    {
      id: 10,
      title: "Aqoid Nasafiy",
      author: "Imom Nasafiy",
      category: "Aqida",
    },
  ];
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  useEffect(() => {
    setDailyHadith({
      text: "Rasululloh (s.a.v.) dedilar: 'Eng yaxshi odam – boshqalarga foydasi tegadigan odamdir.'",
      source: "Sahih Buxoriy",
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 py-12">
      <section className="bg-emerald-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Islomiy Ta‘lim: Hadislar va Kitoblar
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200">
            Qur‘on va Sunnat asosidagi bilimlarni o‘rganing va hayotingizni
            boyiting.
          </p>
        </div>
      </section>
      <div className="max-w-7xl mx-auto mt-12 space-y-12">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="flex items-center gap-2 cursor-pointer border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white transition-colors duration-300"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="text-lg font-semibold font-[ArabicFont]">
            Orqaga
          </span>
        </Button>
        <Card className="bg-emerald-50 shadow-lg border border-emerald-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-emerald-900 flex items-center">
              <Quote className="mr-2 h-6 w-6" /> Kunlik Hadis
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg text-gray-800 italic">{dailyHadith.text}</p>
            <p className="text-sm text-gray-600">
              Manba: <span className="font-semibold">{dailyHadith.source}</span>
            </p>
            <Button
              variant="outline"
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
            >
              Ko‘proq Hadislar
            </Button>
          </CardContent>
        </Card>
        <div className="space-y-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative w-full sm:w-1/2">
              <Input
                type="text"
                placeholder="Kitob, muallif yoki kategoriya bo‘yicha qidirish..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <Button
              variant="default"
              className="bg-amber-600 hover:bg-amber-700 text-white border border-amber-500/50"
            >
              Filtrlash
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedBooks.map((book) => (
              <Card
                key={book.id}
                className="bg-white shadow-md border border-emerald-200 hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-emerald-700 flex items-center">
                    <Book className="mr-2 h-5 w-5" /> {book.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-gray-700">
                    <span className="font-semibold">Muallif:</span>{" "}
                    {book.author}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold">Kategoriya:</span>{" "}
                    {book.category}
                  </p>
                  <Button
                    variant="outline"
                    className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                    asChild
                  >
                    <Link href={`/books/${book.id}`}>O‘qish</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="flex justify-center items-center gap-4">
            <Button
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <p className="text-gray-700">
              {currentPage} / {totalPages}
            </p>
            <Button
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <Card className="bg-white shadow-lg border border-emerald-200">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-emerald-900">
              Qo‘shimcha Manbalar
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Islomiy ta‘limni chuqurroq o‘rganish uchun quyidagi manbalardan
              foydalaning:
            </p>
            <ul className="list-disc pl-5 text-gray-700">
              <li>
                <a
                  href="https://hadis.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:underline"
                >
                  hadis.uz
                </a>{" "}
                - Hadislar to‘plami
              </li>
              <li>
                <a
                  href="https://quran.uz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-600 hover:underline"
                >
                  Quran.com
                </a>{" "}
                - Qur‘on tafsiri va tarjimasi
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <section className="mt-12 text-center">
        <p className="text-gray-700 mb-4">
          Bilim olishni boshlang va ruhiy o‘sishga erishing!
        </p>
        <Button
          asChild
          className="bg-amber-600 hover:bg-amber-700 text-white border border-amber-500/50"
        >
          <Link href="/signup">Ro‘yxatdan O‘tish</Link>
        </Button>
      </section>
    </div>
  );
};

export default IslamicEducationPage;
