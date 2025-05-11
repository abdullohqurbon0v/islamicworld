"use client";

import { $axios } from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/user-store";
import { UserType } from "@/types";
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

interface FormData {
    email: string;
    password: string;
}

interface FormErrors {
    email?: string;
    password?: string;
}

interface SignInErrorResponse {
    response?: {
        data: {
            error: boolean;
            message: string;
        };
    };
}

interface SignInSuccessResponse {
    token: string;
    user: UserType;
}

const SignInPage = () => {
    const { setUser, setToken } = useUserStore();
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const validateForm = (): FormErrors => {
        const newErrors: FormErrors = {};

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Yaroqli email manzilini kiriting";
        }
        if (formData.password.length < 6) {
            newErrors.password = "Parol kamida 6 belgidan iborat bo'lishi kerak";
        }

        return newErrors;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        setIsLoading(true);
        try {
            const response = await $axios.post<SignInSuccessResponse>("/user/login", {
                email: formData.email.trim(),
                password: formData.password,
            });
            localStorage.setItem('token', response.data.token)
            setUser(response.data.user);
            setToken(response.data.token);
            toast.success("Muvaffaqiyat", {
                description: "Muvaffaqiyatli kirdingiz!",
            });
            router.push("/");
        } catch (error) {
            const errorMessage =
                (error as SignInErrorResponse).response?.data?.message ||
                (error instanceof Error ? error.message : "Email yoki parol xato");
            toast.error("Xatolik", {
                description: errorMessage,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 z-0 animate-gradient-bg bg-gradient-to-r from-emerald-900 via-teal-800 to-amber-900 opacity-50"></div>
            <div className="relative z-10 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-emerald-900 text-white shadow-lg border border-emerald-700 hidden md:block">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">
                            Imon – Yurakning Nuridir
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg leading-relaxed">
                            "Allohga yaqinlashish uchun birinchi qadam – O‘ziga ishonch bilan kirishdir."
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
                        <CardTitle className="text-3xl font-bold text-emerald-900 text-center">
                            Kirish
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Foydalanuvchi Email manzili
                                </label>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Email manzil"
                                        className="mt-1 pl-10"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        aria-describedby={errors.email ? "email-error" : undefined}
                                    />
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                </div>
                                {errors.email && (
                                    <p id="email-error" className="text-red-500 text-sm mt-1">
                                        {errors.email}
                                    </p>
                                )}
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
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Parolingiz"
                                        className="mt-1 pl-10 pr-10"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        disabled={isLoading}
                                        aria-describedby={errors.password ? "password-error" : undefined}
                                    />
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                        aria-label={showPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5 cursor-pointer" />
                                        ) : (
                                            <Eye className="h-5 w-5 cursor-pointer" />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <p id="password-error" className="text-red-500 text-sm mt-1">
                                        {errors.password}
                                    </p>
                                )}
                            </div>

                            <div className="flex items-center justify-between">
                                <Link
                                    href="/forgot-password"
                                    className="text-sm text-emerald-600 hover:underline"
                                >
                                    Parolni unutdingizmi?
                                </Link>
                            </div>
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="w-full cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white border border-emerald-500/50 disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <Loader2 className="animate-spin w-5 h-5" />
                                ) : (
                                    <>
                                        <User className="mr-2 h-5 w-5" /> Kirish
                                    </>
                                )}
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
