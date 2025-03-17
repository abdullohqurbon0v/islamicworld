"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import Link from "next/link";

const SignInPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  return (
    <div className="min-h-[100vh] bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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
        <Card className="bg-emerald-900 text-white shadow-lg border border-emerald-700 hidden md:block">
          <CardHeader>
            <CardTitle className="text-2xl font-bold  ">
              Imon – Yurakning Nuridir
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg leading-relaxed">
              &quot;Allohga yaqinlashish uchun birinchi qadam – O‘ziga ishonch
              bilan kirishdir.&quot;
            </p>
            <p className="mt-4 text-sm italic">— Islomiy hikmatlardan biri</p>
            <div className="mt-6">
              <Link href="/" className="text-amber-300 hover:underline">
                Bosh sahifaga qaytish
              </Link>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-xl border border-emerald-200">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-emerald-900    text-center">
              Kirish
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Foydalanuvchi Email manzili
                </label>
                <div className="relative">
                  <Input
                    id="username"
                    type="text"
                    placeholder="Email manzil"
                    className="mt-1 pl-10"
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
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
                  <Lock className="absolute left-3  top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 cursor-pointer" />
                    ) : (
                      <Eye className="h-5 w-5 cursor-pointer" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(!!checked)}
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Meni eslab qol
                  </label>
                </div>
                <Link
                  href="/forgot-password"
                  className="text-sm text-emerald-600 hover:underline"
                >
                  Parolni unutdingizmi?
                </Link>
              </div>
              <Button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-500/50"
              >
                <User className="mr-2 h-5 w-5" /> Kirish
              </Button>
            </form>
            <p className="text-center text-sm text-gray-600">
              Hisobingiz yo‘qmi?{" "}
              <Link
                href="/signup"
                className="text-emerald-600 hover:underline font-semibold"
              >
                Ro‘yxatdan o‘ting
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
