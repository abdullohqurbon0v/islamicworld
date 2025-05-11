"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { Book, Clock, Heart } from "lucide-react";
import { useEffect, useState } from "react";
import Loading from "./_components/ui/loading";

interface NamazTimes {
    date: string;
    hijri_date: {
        day: number;
        month: string;
    };
    region: string;
    times: {
        asr: string;
        hufton: string;
        peshin: string;
        quyosh: string;
        shom_iftor: string;
        tong_saharlik: string;
    };
    weekday: string;
}

const MainPage = () => {
    const [data, setData] = useState<NamazTimes | null>(null);
    const [countdown, setCountdown] = useState<string>("");
    const [nextPrayer, setNextPrayer] = useState<string>("");
    const [address, setAddress] = useState<string>("Toshkent");
    const [loading, setLoading] = useState(true);
    const prayerTimes = data
        ? [
            { name: "Bomdod", time: data.times.tong_saharlik },
            { name: "Quyosh", time: data.times.quyosh },
            { name: "Peshin", time: data.times.peshin },
            { name: "Asr", time: data.times.asr },
            { name: "Shom", time: data.times.shom_iftor },
            { name: "Hufton", time: data.times.hufton },
        ]
        : [];

    const getNamazTimes = async (city: string) => {
        try {
            const res = await axios.get(
                `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Uzbekistan&method=2`
            );
            const timings = res.data.data.timings;
            const adaptedData: NamazTimes = {
                date: res.data.data.date.readable,
                hijri_date: {
                    day: parseInt(res.data.data.date.hijri.day),
                    month: res.data.data.date.hijri.month.en,
                },
                region: city,
                times: {
                    tong_saharlik: timings.Fajr,
                    quyosh: timings.Sunrise,
                    peshin: timings.Dhuhr,
                    asr: timings.Asr,
                    shom_iftor: timings.Maghrib,
                    hufton: timings.Isha,
                },
                weekday: res.data.data.date.gregorian.weekday.en,
            };
            setData(adaptedData);
        } catch (error) {
            console.error("Error fetching namaz times:", error);
        }
    };
    const getLocation = async () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (pos) => {
                    const { latitude, longitude } = pos.coords;
                    try {
                        const res = await axios.get(
                            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                        );
                        const city = res.data.address.city || "Toshkent";
                        setAddress(city.charAt(0).toUpperCase() + city.slice(1));
                        await getNamazTimes(city);
                    } catch (err) {
                        console.error("Error fetching address:", err);
                        setAddress("Toshkent");
                        await getNamazTimes("Toshkent");
                    } finally {
                        setLoading(false);
                    }
                },
                (err) => {
                    console.log("Geolocation error:", err);
                    setAddress("Toshkent");
                    getNamazTimes("Toshkent");
                    setLoading(false);
                }
            );
        } else {
            console.error("Geolocation not supported");
            setAddress("Toshkent");
            getNamazTimes("Toshkent");
            setLoading(false);
        }
    };

    useEffect(() => {
        getLocation();
    }, []);
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

    if (loading || !data) {
        return <Loading />;
    }

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 mt-16">
            <section className="bg-emerald-900 text-white py-20 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-bold  tracking-tight">
                        Xush kelibsiz Imon Platformasiga
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-gray-200">
                        Islomiy bilimlar, namoz vaqtlari va xayrli ishlar uchun joy. (
                        {address})
                    </p>
                    <Button
                        size="lg"
                        className="mt-6 bg-amber-600 hover:bg-amber-700 text-white border border-amber-500/50 cursor-pointer"
                    >
                        Boshlash
                    </Button>
                </div>
            </section>

            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl font-bold text-emerald-900  text-center mb-8">
                        Namoz Vaqtlari
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
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
                    <div className="mt-8 text-center">
                        <Card className="max-w-md mx-auto bg-emerald-50 shadow-md border border-emerald-200">
                            <CardContent className="py-4">
                                <p className="text-lg font-semibold text-emerald-900 ">
                                    Keyingi Namoz: {nextPrayer}
                                </p>
                                <p className="text-3xl font-bold text-gray-800 mt-2">
                                    {countdown}
                                </p>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <section className="bg-emerald-50 py-12 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-emerald-900  mb-6">
                        Qur‘ondan Bir Oyat
                    </h2>
                    <Card className="max-w-2xl mx-auto bg-white shadow-lg border border-emerald-200">
                        <CardContent className="py-6">
                            <p className="text-xl text-gray-800  leading-relaxed">
                                &quot;Аллоҳ сабр қилувчилар билан биргадир.&quot; (Бақара, 153)
                            </p>
                            <p className="mt-4 text-gray-600">
                                &quot;Alloh sabr qiluvchilar bilan birgadir.&quot; (Baqara, 153)
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <section className="py-12 px-4 bg-amber-50">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-amber-900  mb-6">
                        Xayrli Ishlarga Yordam Boring
                    </h2>
                    <p className="text-lg text-gray-700 mb-6">
                        Masjidlar, yetimlar va talabalarga yordam qiling. Sadaqa – bu abadiy
                        savob.
                    </p>
                    <Button
                        size="lg"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-500/50"
                    >
                        <Heart className="mr-2 h-5 w-5" /> Xayriya Qilish
                    </Button>
                </div>
            </section>

            <section className="bg-emerald-900 text-white py-16 px-4">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="text-3xl font-bold  mb-4">Islomiy Bilimlar</h2>
                    <p className="text-lg text-gray-200 mb-6">
                        Qur‘on, Hadis va fiqh bo‘yicha ma‘lumotlarni o‘rganing.
                    </p>
                    <Button
                        variant="outline"
                        className="border-amber-300 text-amber-300 hover:bg-amber-300 hover:text-emerald-900"
                    >
                        <Book className="mr-2 h-5 w-5" /> Ko‘proq Bilish
                    </Button>
                </div>
            </section>
        </div>
    );
};

export default MainPage;
