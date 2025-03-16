"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Download, Book } from "lucide-react";
import Link from "next/link";

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 py-12 ">
      <section className="bg-emerald-900  text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-[ArabicFont] tracking-tight">
            Foydalanish Shartlari
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200">
            Imon Platformasidan foydalanish qoidalari va shartlari bilan
            tanishing.
          </p>
          <Button
            variant="outline"
            className="mt-6 border-amber-300 text-amber-300 hover:bg-amber-300 hover:text-emerald-900"
            onClick={() => window.open("/terms.pdf", "_blank")}
          >
            <Download className="mr-2 h-5 w-5" /> Shartlarni Yuklab Olish
          </Button>
        </div>
      </section>
      <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        <Card className="bg-white shadow-lg border border-emerald-200 lg:sticky lg:top-24">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-emerald-900 font-[ArabicFont]">
              Mundarija
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {[
              { id: "introduction", label: "Kirish" },
              { id: "eligibility", label: "Foydalanish Huquqi" },
              { id: "usage", label: "Foydalanish Qoidalari" },
              { id: "content", label: "Kontent Siyosati" },
              { id: "privacy", label: "Maxfiylik" },
              { id: "termination", label: "Xizmatni Bekor Qilish" },
            ].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="block text-sm text-emerald-700 hover:text-amber-600"
              >
                {item.label}
              </a>
            ))}
          </CardContent>
        </Card>
        <div className="lg:col-span-3">
          <Accordion
            type="single"
            collapsible
            defaultValue="introduction"
            className="space-y-4"
          >
            <AccordionItem value="introduction" id="introduction">
              <AccordionTrigger className="text-2xl font-bold text-emerald-900 font-[ArabicFont] px-6 py-4 bg-white border border-emerald-200 rounded-md hover:bg-emerald-50">
                1. Kirish
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 bg-white border border-t-0 border-emerald-200 rounded-b-md">
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Imon Platformasiga xush kelibsiz! Ushbu foydalanish
                    shartlari (&quot;Shartlar&quot;) platformamizdan foydalanish
                    qoidalarini belgilaydi. Ushbu shartlarni diqqat bilan o‘qib
                    chiqing, chunki ular sizning huquq va majburiyatlaringizni
                    aniqlaydi.
                  </p>
                  <p className="text-gray-700">
                    Platformamiz Islomiy qadriyatlar va bilimlarni targ‘ib
                    qilishga qaratilgan bo‘lib, foydalanuvchilar uchun xavfsiz
                    va foydali muhit yaratishni maqsad qiladi.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="eligibility" id="eligibility">
              <AccordionTrigger className="text-2xl font-bold text-emerald-900 font-[ArabicFont] px-6 py-4 bg-white border border-emerald-200 rounded-md hover:bg-emerald-50">
                2. Foydalanish Huquqi
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 bg-white border border-t-0 border-emerald-200 rounded-b-md">
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Platformadan foydalanish uchun siz kamida 13 yoshda
                    bo‘lishingiz kerak. Agar siz 18 yoshdan kichik bo‘lsangiz,
                    ota-onangiz yoki vasiyingiz ruxsati talab qilinadi.
                  </p>
                  <p className="text-gray-700">
                    Ro‘yxatdan o‘tishda to‘g‘ri ma‘lumot taqdim etishingiz
                    lozim. Yolg‘on ma‘lumotlar bilan ro‘yxatdan o‘tish
                    shartlarni buzish hisoblanadi.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="usage" id="usage">
              <AccordionTrigger className="text-2xl font-bold text-emerald-900 font-[ArabicFont] px-6 py-4 bg-white border border-emerald-200 rounded-md hover:bg-emerald-50">
                3. Foydalanish Qoidalari
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 bg-white border border-t-0 border-emerald-200 rounded-b-md">
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Foydalanuvchilar platformada hurmatli va axloqli munosabatda
                    bo‘lishlari shart. Quyidagilar taqiqlanadi:
                  </p>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Haqoratli yoki noo‘rin kontent joylash</li>
                    <li>Boshqa foydalanuvchilarni bezovta qilish</li>
                    <li>Spam yoki reklama tarqatish</li>
                  </ul>
                  <p className="text-gray-700">
                    Ushbu qoidalarni buzish hisobingizning bloklanishiga olib
                    kelishi mumkin.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Content Policy */}
            <AccordionItem value="content" id="content">
              <AccordionTrigger className="text-2xl font-bold text-emerald-900 font-[ArabicFont] px-6 py-4 bg-white border border-emerald-200 rounded-md hover:bg-emerald-50">
                4. Kontent Siyosati
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 bg-white border border-t-0 border-emerald-200 rounded-b-md">
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Siz joylashtirgan barcha kontent Islomiy qadriyatlar va
                    umumiy axloq qoidalariga mos bo‘lishi kerak. Quyidagi
                    turdagi kontent taqiqlanadi:
                  </p>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Noqonuniy materiallar</li>
                    <li>Zoravonlikni targ‘ib qiluvchi kontent</li>
                    <li>Mualliflik huquqini buzuvchi fayllar</li>
                  </ul>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Privacy */}
            <AccordionItem value="privacy" id="privacy">
              <AccordionTrigger className="text-2xl font-bold text-emerald-900 font-[ArabicFont] px-6 py-4 bg-white border border-emerald-200 rounded-md hover:bg-emerald-50">
                5. Maxfiylik
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 bg-white border border-t-0 border-emerald-200 rounded-b-md">
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Sizning shaxsiy ma‘lumotlaringiz maxfiylik siyosatimizga
                    muvofiq himoyalanadi. Batafsil ma‘lumot uchun{" "}
                    <Link
                      href="/privacy"
                      className="text-emerald-600 hover:underline"
                    >
                      Maxfiylik Siyosati
                    </Link>{" "}
                    sahifamizni ko‘ring.
                  </p>
                  <p className="text-gray-700">
                    Biz faqat xizmatni ta‘minlash uchun zarur bo‘lgan
                    ma‘lumotlarni yig‘amiz va uchinchi shaxslarga oshkor
                    qilmaymiz.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Termination */}
            <AccordionItem value="termination" id="termination">
              <AccordionTrigger className="text-2xl font-bold text-emerald-900 font-[ArabicFont] px-6 py-4 bg-white border border-emerald-200 rounded-md hover:bg-emerald-50">
                6. Xizmatni Bekor Qilish
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 bg-white border border-t-0 border-emerald-200 rounded-b-md">
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Agar siz ushbu shartlarni buzsangiz, biz sizning
                    hisobingizni ogohlantirishsiz bloklash yoki o‘chirish
                    huquqini saqlab qolamiz.
                  </p>
                  <p className="text-gray-700">
                    Shuningdek, siz istalgan vaqtda hisobingizni o‘chirib,
                    platformadan chiqib ketishingiz mumkin.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      {/* Footer Action */}
      <section className="mt-12 text-center">
        <p className="text-gray-700 mb-4">
          Shartlar bilan tanishdingizmi? Endi platformamizga qo‘shiling!
        </p>
        <Button
          asChild
          className="bg-amber-600 hover:bg-amber-700 text-white border border-amber-500/50"
        >
          <Link href="/signup">
            <Book className="mr-2 h-5 w-5" /> Ro‘yxatdan O‘tish
          </Link>
        </Button>
      </section>
    </div>
  );
};

export default TermsPage;
