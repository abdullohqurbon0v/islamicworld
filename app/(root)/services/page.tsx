import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Book, Heart, Calendar } from "lucide-react";

const ServicesPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <section className="bg-emerald-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold  tracking-tight">
            Xizmatlar
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200">
            Imon Platformasi sizga Islomiy hayotni osonlashtirish uchun
            xizmatlar taqdim etadi.
          </p>
        </div>
      </section>
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-emerald-900  text-center mb-8">
            Bizning Xizmatlarimiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white shadow-md border border-emerald-200">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-emerald-700 flex items-center">
                  <Clock className="mr-2 h-6 w-6" /> Namoz Vaqtlari
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Har kungi namoz vaqtlari haqida aniq ma‘lumot va eslatmalar.
                </p>
                <Button
                  variant="outline"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                >
                  Batafsil
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-md border border-emerald-200">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-emerald-700 flex items-center">
                  <Book className="mr-2 h-6 w-6" /> Islomiy Ta‘lim
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Qur‘on, Hadis va fiqh bo‘yicha onlayn darslar va materiallar.
                </p>
                <Button
                  variant="outline"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                >
                  Batafsil
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-md border border-emerald-200">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-emerald-700 flex items-center">
                  <Heart className="mr-2 h-6 w-6" /> Xayriya Yordami
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Masjidlar va ehtiyojmandlarga xayriya qilish imkoniyati.
                </p>
                <Button
                  variant="outline"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                >
                  Batafsil
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-md border border-emerald-200">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-emerald-700 flex items-center">
                  <Calendar className="mr-2 h-6 w-6" /> Jamiyat Tadbirlari
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Islomiy bayramlar va mahalla tadbirlari haqida xabarlar.
                </p>
                <Button
                  variant="outline"
                  className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white"
                >
                  Batafsil
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="bg-amber-50 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-amber-900  mb-6">
            Xizmatlarimizdan Foydalaning
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Islomiy hayotingizni yaxshilash uchun hozir bizning xizmatlarimizdan
            foydalanishni boshlang.
          </p>
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-500/50"
          >
            Boshlash
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
