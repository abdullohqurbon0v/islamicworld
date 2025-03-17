import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Heart } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 mt-16">
      <section className="bg-emerald-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold  tracking-tight">
            Biz Haqimizda
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200">
            Imon Platformasi – Islomiy qadriyatlar va bilimlarni targ‘ib qilish
            uchun xizmat.
          </p>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-emerald-900  text-center mb-8">
            Bizning Maqsadimiz
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-white shadow-md border border-emerald-200">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-emerald-700 flex items-center">
                  <BookOpen className="mr-2 h-6 w-6" /> Bilim Ulashish
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Qur‘on, Hadis va Islomiy fiqh bo‘yicha to‘g‘ri bilimlarni
                  yetkazish.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-md border border-emerald-200">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-emerald-700 flex items-center">
                  <Heart className="mr-2 h-6 w-6" /> Xayrli Ishlar
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Sadaqa, xayriya va jamiyatga yordam berishni rag‘batlantirish.
                </p>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-md border border-emerald-200">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-emerald-700 flex items-center">
                  <Users className="mr-2 h-6 w-6" /> Jamiyat Birligi
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Musulmonlar o‘rtasida hamjihatlik va o‘zaro yordamni
                  mustahkamlash.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-emerald-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-emerald-900  text-center mb-8">
            Bizning Jamoamiz
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <Card className="bg-white shadow-lg border border-emerald-200">
              <CardContent className="pt-6 text-center">
                <div className="w-24 h-24 mx-auto bg-emerald-700 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                  A.Q.
                </div>
                <h3 className="mt-4 text-xl font-semibold text-gray-800">
                  Abdulloh Qurbonov
                </h3>
                <p className="text-gray-600">Asoschi va Yaratuvchi</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-amber-50 py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-amber-900  mb-6">
            Biz bilan Birga Bo‘ling
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            Islomiy bilimlarni o‘rganish va xayrli ishlarga hissa qo‘shish uchun
            hozir ro‘yxatdan o‘ting.
          </p>
          <Button
            size="lg"
            className="bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-500/50"
          >
            Ro‘yxatdan O‘tish
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
