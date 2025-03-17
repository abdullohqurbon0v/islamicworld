"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Clock } from "lucide-react";
import axios from "axios";
import Loading from "../../_components/loading";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface NamazTimes {
  date: string;
  hijri_date: {
    day: number;
    month: string;
    year: number;
  };
  region: string;
  times: {
    tong_saharlik: string;
    quyosh: string;
    peshin: string;
    asr: string;
    shom_iftor: string;
    hufton: string;
  };
  weekday: string;
}

const NamazTimesPage = () => {
  const [data, setData] = useState<NamazTimes | null>(null);
  const [region, setRegion] = useState("Toshkent");
  const [countdown, setCountdown] = useState<string>("");
  const [nextPrayer, setNextPrayer] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const getNamazTimes = async () => {
      try {
        const res = await axios.get(
          `https://islomapi.uz/api/present/day?region=${region}`
        );
        setData(res.data);
      } catch (error) {
        console.error("Error fetching namaz times:", error);
      }
    };
    getNamazTimes();
  }, [region]);

  const prayerTimes = data
    ? [
        { name: "Bomdod", time: data.times.tong_saharlik },
        { name: "Peshin", time: data.times.peshin },
        { name: "Asr", time: data.times.asr },
        { name: "Shom", time: data.times.shom_iftor },
        { name: "Hufton", time: data.times.hufton },
      ]
    : [];

  useEffect(() => {
    if (!data) return;

    const updateCountdown = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();

      const prayerTimesInMinutes = prayerTimes.map((prayer) => {
        const [hours, minutes] = prayer.time.split(":").map(Number);
        return { name: prayer.name, minutes: hours * 60 + minutes };
      });

      const next =
        prayerTimesInMinutes.find((prayer) => prayer.minutes > currentTime) ||
        prayerTimesInMinutes[0];

      setNextPrayer(next.name);

      const timeDiffMinutes =
        next.minutes > currentTime
          ? next.minutes - currentTime
          : 1440 - currentTime + next.minutes;

      const hoursLeft = Math.floor(timeDiffMinutes / 60);
      const minutesLeft = timeDiffMinutes % 60;
      const secondsLeft = 60 - now.getSeconds();

      setCountdown(
        `${hoursLeft.toString().padStart(2, "0")}:${minutesLeft
          .toString()
          .padStart(2, "0")}:${secondsLeft.toString().padStart(2, "0")}`
      );
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [data]);

  if (!data) {
    return <Loading />;
  }
  const regions = [
    "Toshkent",
    "Buxoro",
    "Andijon",
    "Jizzax",
    "Termiz",
    "Urganch",
    "Xiva",
    "Namangan",
    "Navoiy",
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 py-12 ">
      <section className="bg-emerald-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold  tracking-tight">
            Namoz Vaqtlari
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200">
            Har kungi namoz vaqtlarini aniq bilib oling va ibodatingizni o‘z
            vaqtida ado eting.
          </p>
        </div>
      </section>
      <div className="max-w-7xl mx-auto mt-12 space-y-8">
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
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <label
              htmlFor="region"
              className="text-lg font-semibold text-emerald-900 "
            >
              Hudud:
            </label>
            <select
              id="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className="border border-emerald-200 rounded-md p-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              {regions.map((reg) => (
                <option key={reg} value={reg}>
                  {reg}
                </option>
              ))}
            </select>
          </div>
          <p className="text-lg text-gray-700">
            <span className="font-semibold">Sana:</span> {data.date} |{" "}
            {data.hijri_date.day} {data.hijri_date.month},{" "}
            {data.hijri_date.year} (Hijriy)
          </p>
        </div>

        {/* Prayer Times */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {prayerTimes.map((prayer) => (
            <Card
              key={prayer.name}
              className="bg-white shadow-md border border-emerald-200"
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-emerald-700 flex items-center">
                  <Clock className="mr-2 h-5 w-5" /> {prayer.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-gray-800">
                  {prayer.time}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Countdown Timer */}
        <Card className="max-w-md mx-auto bg-emerald-50 shadow-md border border-emerald-200">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-emerald-900  text-center">
              Keyingi Namoz: {nextPrayer}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-3xl font-bold text-gray-800">{countdown}</p>
            <p className="text-sm text-gray-600 mt-1">(Soat:Daftqa:Sekund)</p>
          </CardContent>
        </Card>

        {/* Additional Info */}
        <Card className="bg-white shadow-lg border border-emerald-200">
          <CardHeader>
            <CardTitle className="text-xl font-bold text-emerald-900 ">
              Qo‘shimcha Ma‘lumot
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700">
              Namoz vaqtlari{" "}
              <a
                href="https://islomapi.uz"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-600 hover:underline"
              >
                islomapi.uz
              </a>{" "}
              xizmatidan olinadi va har kuni yangilanadi.
            </p>
            <p className="text-gray-700">
              Agar siz boshqa hudud uchun vaqtlarni ko‘rishni xohlasangiz,
              yuqoridagi ro‘yxatdan hududni tanlang.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Footer Action */}
      <section className="mt-12 text-center">
        <p className="text-gray-700 mb-4">
          Namoz vaqtlarini bilib, ibodatingizni osonlashtiring!
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

export default NamazTimesPage;
