"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Heart, DollarSign, Users, Moon } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const CharityPage = () => {
  const [donationAmount, setDonationAmount] = useState("");
  const [donorName, setDonorName] = useState("");
  const [selectedCause, setSelectedCause] = useState("");

  const causes = [
    {
      id: 1,
      title: "Masjid Qurilishi",
      description: "Yangi masjid qurish uchun yordam bering.",
      goal: 50000000,
      raised: 32000000,
    },
    {
      id: 2,
      title: "Ehtiyojmand Oilalar",
      description: "Yetimlar va kam ta‘minlangan oilalarga yordam.",
      goal: 30000000,
      raised: 18000000,
    },
    {
      id: 3,
      title: "Ta‘lim uchun Kitoblar",
      description: "Talabalarga islomiy kitoblar sotib olish.",
      goal: 20000000,
      raised: 15000000,
    },
  ];

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!donationAmount || !selectedCause) {
      alert("Iltimos, xayriya miqdorini va maqsadni tanlang!");
      return;
    }
    console.log({
      donorName,
      amount: donationAmount,
      cause: selectedCause,
    });
    alert(
      `Rahmat! Siz ${selectedCause} uchun ${donationAmount} UZS xayriya qildingiz.`
    );
    setDonationAmount("");
    setDonorName("");
    setSelectedCause("");
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 py-12 ">
      <section className="bg-emerald-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold  tracking-tight">
            Xayriya Yordami
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200">
            Masjidlar va ehtiyojmandlarga yordam qiling - Sadaqa joriyasi
            bo‘ling!
          </p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto mt-12">
        <Card className="bg-emerald-50 shadow-lg border border-emerald-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-emerald-900  flex items-center">
              <Heart className="mr-2 h-6 w-6" /> Xayriya Qilish
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleDonate} className="space-y-6">
              <div>
                <label
                  htmlFor="donorName"
                  className="block text-sm font-medium text-gray-700 "
                >
                  Ismingiz (ixtiyoriy)
                </label>
                <Input
                  id="donorName"
                  type="text"
                  value={donorName}
                  onChange={(e) => setDonorName(e.target.value)}
                  placeholder="Ismingizni kiriting"
                  className="mt-1"
                />
              </div>
              <div>
                <label
                  htmlFor="amount"
                  className="block text-sm font-medium text-gray-700 "
                >
                  Xayriya Miqdori (UZS)
                </label>
                <div className="mt-1 relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="amount"
                    type="number"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                    placeholder="Miqdorni kiriting"
                    className="pl-10"
                    min="1000"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="cause"
                  className="block text-sm font-medium text-gray-700 "
                >
                  Xayriya Maqsadi
                </label>
                <select
                  id="cause"
                  value={selectedCause}
                  onChange={(e) => setSelectedCause(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  <option value="">Maqsadni tanlang</option>
                  {causes.map((cause) => (
                    <option key={cause.id} value={cause.title}>
                      {cause.title}
                    </option>
                  ))}
                </select>
              </div>
              <Button
                type="submit"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white border border-amber-500/50"
              >
                <Heart className="mr-2 h-5 w-5" /> Xayriya Qilish
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
      <section className="max-w-7xl mx-auto mt-12">
        <h2 className="text-3xl font-bold text-emerald-900  text-center mb-8">
          Yordam Maqsadlari
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {causes.map((cause) => {
            const progress = (cause.raised / cause.goal) * 100;
            return (
              <Card
                key={cause.id}
                className="bg-white shadow-md border border-emerald-200"
              >
                <CardHeader>
                  <CardTitle className="text-lg font-semibold text-emerald-700  flex items-center">
                    {cause.title === "Masjid Qurilishi" ? (
                      <Moon className="mr-2 h-5 w-5" />
                    ) : (
                      <Users className="mr-2 h-5 w-5" />
                    )}
                    {cause.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-700">{cause.description}</p>
                  <div>
                    <p className="text-sm text-gray-600">
                      Maqsad: {cause.goal.toLocaleString()} UZS
                    </p>
                    <p className="text-sm text-gray-600">
                      Yig‘ildi: {cause.raised.toLocaleString()} UZS
                    </p>
                    <Progress value={progress} className="mt-2" />
                  </div>
                  <Button
                    variant="outline"
                    className="w-full border-emerald-600 cursor-pointer text-emerald-600 hover:bg-emerald-600 hover:text-white"
                    onClick={() => setSelectedCause(cause.title)}
                  >
                    Tanlash
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
      <section className="bg-emerald-900 text-white py-16 px-4 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold  mb-4">
            Har Bir Yordamingiz Muhim
          </h2>
          <p className="text-lg text-gray-200 mb-6">
            &quot;Kim biror yaxshilik qilsa, unga o‘n barobar savob
            beriladi.&quot; (An‘om, 160)
          </p>
          <Button
            size="lg"
            className="bg-amber-600 hover:bg-amber-700 text-white border border-amber-500/50"
          >
            <Heart className="mr-2 h-5 w-5" /> Hozir Yordam Boring
          </Button>
        </div>
      </section>
    </div>
  );
};

export default CharityPage;
