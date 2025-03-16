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

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 py-12">
      <section className="bg-emerald-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold font-[ArabicFont] tracking-tight">
            Maxfiylik Siyosati
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200">
            Imon Platformasida shaxsiy ma‘lumotlaringiz qanday himoyalanishini
            bilib oling.
          </p>
          <Button
            variant="outline"
            className="mt-6 border-amber-300 text-amber-300 hover:bg-amber-300 hover:text-emerald-900"
            onClick={() => window.open("/privacy.pdf", "_blank")}
          >
            <Download className="mr-2 h-5 w-5" /> Siyosatni Yuklab Olish
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
              { id: "data-collection", label: "Ma‘lumot Yig‘ish" },
              { id: "data-usage", label: "Ma‘lumotlardan Foydalanish" },
              { id: "data-sharing", label: "Ma‘lumotlarni Ulashish" },
              { id: "security", label: "Xavfsizlik" },
              { id: "user-rights", label: "Foydalanuvchi Huquqlari" },
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
                    Imon Platformasi sifatida biz sizning maxfiyligingizga katta
                    e‘tibor beramiz. Ushbu Maxfiylik Siyosati platformamizda
                    shaxsiy ma‘lumotlaringiz qanday yig‘ilishi, ishlatilishi va
                    himoyalanishini tushuntiradi.
                  </p>
                  <p className="text-gray-700">
                    Biz Islomiy qadriyatlar asosida ishlaymiz va
                    foydalanuvchilarimizning ishonchini saqlashni birinchi
                    o‘ringa qo‘yamiz.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="data-collection" id="data-collection">
              <AccordionTrigger className="text-2xl font-bold text-emerald-900 font-[ArabicFont] px-6 py-4 bg-white border border-emerald-200 rounded-md hover:bg-emerald-50">
                2. Ma‘lumot Yig‘ish
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 bg-white border border-t-0 border-emerald-200 rounded-b-md">
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Biz quyidagi turdagi ma‘lumotlarni yig‘amiz:
                  </p>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>
                      Ro‘yxatdan o‘tishda taqdim etilgan ism, email va telefon
                      raqami
                    </li>
                    <li>
                      Xizmatlardan foydalanish paytidagi harakatlaringiz
                      (masalan, ko‘rilgan sahifalar)
                    </li>
                    <li>Kuki fayllari va IP manzil kabi texnik ma‘lumotlar</li>
                  </ul>
                  <p className="text-gray-700">
                    Bu ma‘lumotlar faqat xizmatni yaxshilash va sizga
                    moslashtirish uchun ishlatiladi.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="data-usage" id="data-usage">
              <AccordionTrigger className="text-2xl font-bold text-emerald-900 font-[ArabicFont] px-6 py-4 bg-white border border-emerald-200 rounded-md hover:bg-emerald-50">
                3. Ma‘lumotlardan Foydalanish
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 bg-white border border-t-0 border-emerald-200 rounded-b-md">
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Yig‘ilgan ma‘lumotlar quyidagi maqsadlarda ishlatiladi:
                  </p>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Xizmatlarni taqdim etish va qo‘llab-quvvatlash</li>
                    <li>Foydalanuvchi tajribasini yaxshilash</li>
                    <li>
                      Namoz vaqtlari va boshqa xizmatlar uchun eslatmalar
                      yuborish
                    </li>
                  </ul>
                  <p className="text-gray-700">
                    Biz sizning ruxsatingizsiz marketing maqsadlarida
                    ma‘lumotlaringizdan foydalanmaymiz.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="data-sharing" id="data-sharing">
              <AccordionTrigger className="text-2xl font-bold text-emerald-900 font-[ArabicFont] px-6 py-4 bg-white border border-emerald-200 rounded-md hover:bg-emerald-50">
                4. Ma‘lumotlarni Ulashish
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 bg-white border border-t-0 border-emerald-200 rounded-b-md">
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Sizning ma‘lumotlaringiz quyidagi holatlarda uchinchi
                    shaxslarga ulashilishi mumkin:
                  </p>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Qonun talab qilgan hollarda</li>
                    <li>
                      Xizmatni ta‘minlash uchun zarur bo‘lgan texnik hamkorlar
                      bilan (masalan, server provayderlari)
                    </li>
                  </ul>
                  <p className="text-gray-700">
                    Biz hech qachon ma‘lumotlaringizni sotmaymiz yoki noqonuniy
                    maqsadlarda ulashmaymiz.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="security" id="security">
              <AccordionTrigger className="text-2xl font-bold text-emerald-900 font-[ArabicFont] px-6 py-4 bg-white border border-emerald-200 rounded-md hover:bg-emerald-50">
                5. Xavfsizlik
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 bg-white border border-t-0 border-emerald-200 rounded-b-md">
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Ma‘lumotlaringizni himoya qilish uchun quyidagi choralarni
                    ko‘ramiz:
                  </p>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Ma‘lumotlarni shifrlash (SSL/TLS)</li>
                    <li>Xavfsiz serverlardan foydalanish</li>
                    <li>Doimiy xavfsizlik tekshiruvlari</li>
                  </ul>
                  <p className="text-gray-700">
                    Agar xavfsizlik buzilishi ro‘y bersa, sizni darhol xabardor
                    qilamiz.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="user-rights" id="user-rights">
              <AccordionTrigger className="text-2xl font-bold text-emerald-900 font-[ArabicFont] px-6 py-4 bg-white border border-emerald-200 rounded-md hover:bg-emerald-50">
                6. Foydalanuvchi Huquqlari
              </AccordionTrigger>
              <AccordionContent className="px-6 py-4 bg-white border border-t-0 border-emerald-200 rounded-b-md">
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Siz quyidagi huquqlarga egasiz:
                  </p>
                  <ul className="list-disc pl-5 text-gray-700">
                    <li>Ma‘lumotlaringizga kirish va ularni tahrirlash</li>
                    <li>Ma‘lumotlaringizni o‘chirishni so‘rash</li>
                    <li>
                      Ma‘lumotlaringizdan foydalanishga rozilikni qaytarib olish
                    </li>
                  </ul>
                  <p className="text-gray-700">
                    Ushbu huquqlardan foydalanish uchun{" "}
                    <Link
                      href="/contact"
                      className="text-emerald-600 hover:underline"
                    >
                      biz bilan bog‘laning
                    </Link>
                    .
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>

      <section className="mt-12 text-center">
        <p className="text-gray-700 mb-4">
          Maxfiylik siyosati bilan tanishdingizmi? Bizga qo‘shiling!
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

export default PrivacyPage;
