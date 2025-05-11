"use client";

import { $axios } from "@/api/axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useUserStore } from "@/store/user-store";
import { UserType } from "@/types";
import { Eye, EyeOff, Loader2, Lock, Mail, Phone, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

interface FormData {
    fullname: string;
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
}

interface FormErrors {
    fullname?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
}

interface SignUpErrorResponse {
    response?: {
        data: {
            error: boolean;
            message: string;
        };
    };
}

interface SignUpSuccessResponse {
    token: string;
    user: UserType;
}

const SignUpPage = () => {
    const { setUser, setToken } = useUserStore();
    const [formData, setFormData] = useState<FormData>({
        fullname: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const formatPhoneNumber = (value: string): string => {
        const digits = value.replace(/\D/g, "");
        let formatted = digits.startsWith("998") ? digits : "998" + digits.replace(/^(\+998|998)/, "");
        formatted = formatted.slice(0, 12);
        if (formatted.length <= 3) return `+${formatted}`;
        if (formatted.length <= 5) return `+${formatted.slice(0, 3)}-${formatted.slice(3)}`;
        if (formatted.length <= 8) return `+${formatted.slice(0, 3)}-${formatted.slice(3, 5)}-${formatted.slice(5)}`;
        if (formatted.length <= 10)
            return `+${formatted.slice(0, 3)}-${formatted.slice(3, 5)}-${formatted.slice(5, 8)}-${formatted.slice(8)}`;
        return `+${formatted.slice(0, 3)}-${formatted.slice(3, 5)}-${formatted.slice(5, 8)}-${formatted.slice(8, 10)}-${formatted.slice(10, 12)}`;
    };

    const validateForm = (): FormErrors => {
        const newErrors: FormErrors = {};

        if (formData.fullname.trim().length < 2) {
            newErrors.fullname = "Ism kamida 2 harfdan iborat bo'lishi kerak";
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Yaroqli email manzilini kiriting";
        }
        if (!/^\+998-\d{2}-\d{3}-\d{2}-\d{2}$/.test(formData.phone)) {
            newErrors.phone = "Yaroqli telefon raqamini kiriting (+998-91-600-83-00)";
        }
        if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/.test(formData.password)) {
            newErrors.password = "Parol kamida 6 belgi, 1 harf va 1 raqamdan iborat bo'lishi kerak";
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Parollar mos kelmaydi";
        }

        return newErrors;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "phone") {
            const formattedPhone = formatPhoneNumber(value);
            setFormData((prev) => ({ ...prev, phone: formattedPhone }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
        setErrors((prev) => ({ ...prev, [name]: undefined }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm();
        setErrors(validationErrors);

        if (Object.keys(validationErrors).length > 0) {
            return;
        }

        if (!agreeToTerms) {
            toast.error("Xatolik", {
                description: "Foydalanish shartlariga rozilik bildiring",
            });
            return;
        }

        setIsLoading(true);
        try {
            const response = await $axios.post<SignUpSuccessResponse>("/user/create", {
                fullName: formData.fullname.trim(),
                email: formData.email.trim(),
                phone: formData.phone,
                password: formData.password,
            });
            localStorage.setItem("token", response.data.token);
            toast.success("Muvaffaqiyat", {
                description: "Ro'yxatdan muvaffaqiyatli o'tdingiz! Emailingizni tasdiqlang.",
            });
            setUser(response.data.user);
            setToken(response.data.token);
            setTimeout(() => {
                router.push("/");
            }, 1000);
        } catch (error) {
            const errorMessage =
                (error as SignUpErrorResponse).response?.data?.message ||
                (error instanceof Error ? error.message : "Nimadir xato ketdi");
            toast.error("Xatolik", {
                description: errorMessage,
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute inset-0 z-0 animate-gradient-bg bg-[length:200%_200%] bg-gradient-to-r from-green-800 via-green-500 to-blue-900 opacity-50"></div>
            <div className="relative z-10 max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                <Card className="bg-white shadow-xl border border-emerald-200">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-emerald-900 text-center">
                            Ro‘yxatdan O‘tish
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">
                                <div>
                                    <label htmlFor="fullname" className="block text-sm font-medium text-gray-700">
                                        To‘liq Ism
                                    </label>
                                    <div className="relative">
                                        <Input
                                            id="fullname"
                                            name="fullname"
                                            type="text"
                                            placeholder="Ism va familiyangiz"
                                            className="mt-1 pl-10"
                                            value={formData.fullname}
                                            onChange={handleInputChange}
                                            disabled={isLoading}
                                            aria-describedby={errors.fullname ? "fullname-error" : undefined}
                                        />
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    </div>
                                    {errors.fullname && (
                                        <p id="fullname-error" className="text-red-500 text-sm mt-1">
                                            {errors.fullname}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Elektron Pochta
                                    </label>
                                    <div className="relative">
                                        <Input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Email manzilingiz"
                                            className="mt-1 pl-10"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            disabled={isLoading}
                                            aria-describedby={errors.email ? "email-error" : undefined}
                                        />
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    </div>
                                    {errors.email && (
                                        <p id="email-error" className="text-red-500 text-sm mt-1">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                                        Telefon Raqami
                                    </label>
                                    <div className="relative">
                                        <Input
                                            id="phone"
                                            name="phone"
                                            type="tel"
                                            placeholder="+998-91-600-83-00"
                                            className="mt-1 pl-10"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            disabled={isLoading}
                                            aria-describedby={errors.phone ? "phone-error" : undefined}
                                        />
                                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    </div>
                                    {errors.phone && (
                                        <p id="phone-error" className="text-red-500 text-sm mt-1">{errors.phone}</p>
                                    )}
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
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
                                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p id="password-error" className="text-red-500 text-sm mt-1">
                                            {errors.password}
                                        </p>
                                    )}
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
                                            name="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Parolni qayta kiriting"
                                            className="mt-1 pl-10 pr-10"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            disabled={isLoading}
                                            aria-describedby={errors.confirmPassword ? "confirm-password-error" : undefined}
                                        />
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                            aria-label={showConfirmPassword ? "Parolni yashirish" : "Parolni ko'rsatish"}
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-5 w-5" />
                                            ) : (
                                                <Eye className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.confirmPassword && (
                                        <p id="confirm-password-error" className="text-red-500 text-sm mt-1">
                                            {errors.confirmPassword}
                                        </p>
                                    )}
                                </div>

                                <div className="flex items-center">
                                    <Checkbox
                                        id="terms"
                                        checked={agreeToTerms}
                                        onCheckedChange={(checked) => setAgreeToTerms(!!checked)}
                                        aria-label="Foydalanish shartlari va maxfiylik siyosatiga rozilik"
                                    />
                                    <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
                                        <Link href="/terms" className="text-emerald-600 hover:underline">
                                            Foydalanish shartlari
                                        </Link>{" "}
                                        va{" "}
                                        <Link href="/privacy" className="text-emerald-600 hover:underline">
                                            Maxfiylik siyosati
                                        </Link>{" "}
                                        bilan roziman
                                    </label>
                                </div>

                                <Button
                                    type="submit"
                                    disabled={isLoading || !agreeToTerms}
                                    className="w-full bg-amber-600 hover:bg-amber-700 text-white border border-amber-500/50 disabled:opacity-50"
                                >
                                    {isLoading ? (
                                        <Loader2 className="animate-spin w-5 h-5" />
                                    ) : (
                                        <>
                                            <User className="mr-2 h-5 w-5" /> Ro‘yxatdan O‘tish
                                        </>
                                    )}
                                </Button>
                            </div>
                        </form>

                        <p className="text-center text-sm text-gray-600 mt-4">
                            Hisobingiz bormi?{" "}
                            <Link href="/signin" className="text-emerald-600 hover:underline font-semibold">
                                Kirish
                            </Link>
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-emerald-900 text-white shadow-lg border border-emerald-700 hidden md:block">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">Yangi Boshlanish</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg leading-relaxed">
                            "Har bir yangi qadam – Allohga yaqinlashish uchun imkoniyatdir."
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
