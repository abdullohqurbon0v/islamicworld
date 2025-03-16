"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react";
import Link from "next/link";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-emerald-900  z-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://img.goodfon.com/original/7680x4320/d/64/pattern-islamic-pattern-ramadan-mosque.jpg')",
          }}
        ></div>
      </div>
      <div className="relative z-10 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="bg-white shadow-xl border border-emerald-200">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-emerald-900  text-center">
              Ro‘yxatdan O‘tish
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium text-gray-700"
                >
                  To‘liq Ism
                </label>
                <div className="relative">
                  <Input
                    id="fullname"
                    type="text"
                    placeholder="Ism va familiyangiz"
                    className="mt-1 pl-10"
                  />
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Elektron Pochta
                </label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="Email manzilingiz"
                    className="mt-1 pl-10"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Telefon Raqami
                </label>
                <div className="relative">
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+998 90 123 45 67"
                    className="mt-1 pl-10"
                  />
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Parol
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Parolingiz"
                    className="mt-1 pl-10 pr-10"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Parolni Tasdiqlash
                </label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Parolni qayta kiriting"
                    className="mt-1 pl-10 pr-10"
                  />
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(!!checked)}
                />
                <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                  <Link
                    href="/terms"
                    className="text-emerald-600 hover:underline"
                  >
                    Foydalanish shartlari
                  </Link>{" "}
                  va{" "}
                  <Link
                    href="/privacy"
                    className="text-emerald-600 hover:underline"
                  >
                    Maxfiylik siyosati
                  </Link>{" "}
                  bilan roziman
                </label>
              </div>

              <Button
                type="submit"
                disabled={!agreeTerms}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white border border-amber-500/50 disabled:opacity-50"
              >
                <User className="mr-2 h-5 w-5" /> Ro‘yxatdan O‘tish
              </Button>
            </form>

            <p className="text-center text-sm text-gray-600">
              Hisobingiz bormi?{" "}
              <Link
                href="/signin"
                className="text-emerald-600 hover:underline font-semibold"
              >
                Kirish
              </Link>
            </p>
          </CardContent>
        </Card>
        <Card className="bg-emerald-900 text-white shadow-lg border border-emerald-700 hidden md:block">
          <CardHeader>
            <CardTitle className="text-2xl font-bold ">
              Yangi Boshlanish
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed">
              &quot;Har bir yangi qadam – Allohga yaqinlashish uchun
              imkoniyatdir.&quot;
            </p>
            <p className="mt-4 text-sm italic">— Islomiy hikmatlardan biri</p>
            <div className="mt-6">
              <Link href="/" className="text-amber-300 hover:underline">
                Bosh sahifaga qaytish
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignUpPage;
