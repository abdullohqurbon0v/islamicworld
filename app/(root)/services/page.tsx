"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Book, Heart } from "lucide-react";
import { useRouter } from "next/navigation";

const ServicesPage = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 mt-16">
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
            <Card className="bg-white shadow-md border border-emerald-200 relative h-64">
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
                  className="border-emerald-600 text-emerald-600 absolute top-[95%] left-[95%] -translate-2/2 -translate-y-2/2 cursor-pointer hover:bg-emerald-600 hover:text-white"
                  onClick={() => router.push("/services/namaz")}
                >
                  Batafsil
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-md border  border-emerald-200 relative">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-emerald-700 flex items-center">
                  <Book className="mr-2 h-6 w-6" /> Islomiy Ta‘lim
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  Hadislar va kitoblar bolimi
                </p>
                <Button
                  onClick={() => router.push("/services/talim-islam")}
                  variant="outline"
                  className="border-emerald-600 absolute top-[95%] left-[95%] -translate-2/2 -translate-y-2/2 text-emerald-600 cursor-pointer hover:bg-emerald-600 hover:text-white"
                >
                  Batafsil
                </Button>
              </CardContent>
            </Card>
            <Card className="bg-white shadow-md border border-emerald-200 relative">
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
                  className="border-emerald-600 absolute top-[95%] left-[95%] -translate-2/2 -translate-y-2/2 cursor-pointer text-emerald-600 hover:bg-emerald-600 hover:text-white"
                >
                  Batafsil
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicesPage;
