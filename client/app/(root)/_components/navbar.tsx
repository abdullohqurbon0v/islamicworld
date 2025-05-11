"use client";

import LanguageChanger from "@/components/shared/language-change";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useUserStore } from "@/store/user-store";
import { BarChart, Bell, LogOut, Menu, Settings, Star, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const fakeNotifications = [
    {
        id: 1,
        title: "Dasturga kirish",
        create_time: new Date(),
        description: "Siz bugun dasturga kirdingiz",
        status: "unread",
        type: "info",
        icon: "/icons/login.png",
        action_url: "/dashboard",
        category: "system",
        is_active: true,
    },
    {
        id: 2,
        title: "Yangi xabar",
        create_time: new Date(),
        description: "Sizga Ali tomonidan yangi xabar keldi",
        status: "unread",
        type: "success",
        icon: "/icons/message.png",
        action_url: "/messages",
        category: "user",
        is_active: true,
    },
];

const Navbar = () => {
    const { user, setUser, setToken } = useUserStore();
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const navLinks = [
        { name: "Bosh sahifa", href: "/" },
        { name: "Biz haqimizda", href: "/about" },
        { name: "Xizmatlar", href: "/services" },
        { name: "Bog‘lanish", href: "/contact" },
    ];

    function onLogout() {
        localStorage.clear();
        setToken(null);
        setUser(null);
        setIsPopoverOpen(false);
        router.push("/signin");
    }

    return (
        <nav className="fixed top-0 inset-x-0 h-16 z-50 bg-emerald-900 text-white shadow-lg border-b border-emerald-700/50 font-mono">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0 flex items-center">
                        <Link
                            href="/"
                            className="text-2xl font-bold tracking-wide text-amber-300"
                        >
                            Kitob
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-gray-100 hover:text-amber-300 hover:bg-emerald-800 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>
                    <div className="flex items-center space-x-10">
                        <Popover>
                            <PopoverTrigger>
                                <Bell className="cursor-pointer hover:scale-105 transition-all" />
                            </PopoverTrigger>
                            <PopoverContent className="w-80 p-4 mt-4 bg-white rounded-xl shadow-lg border-none">
                                <div className="space-y-3">
                                    <h3 className="text-lg font-semibold text-gray-800">
                                        Bildirishnomalar
                                    </h3>
                                    {fakeNotifications.length === 0 ? (
                                        <p className="text-sm text-gray-500">
                                            Yangi bildirishnomalar yo‘q
                                        </p>
                                    ) : (
                                        fakeNotifications.map((notification) => (
                                            <Link
                                                key={notification.id}
                                                href={notification.action_url}
                                                className="flex items-start p-3 rounded-lg hover:bg-gray-100 transition-all"
                                            >
                                                {notification.icon && (
                                                    <Image
                                                        src={notification.icon}
                                                        alt={notification.title}
                                                        width={24}
                                                        height={24}
                                                        className="mr-3"
                                                    />
                                                )}
                                                <div className="flex-1">
                                                    <p className="text-sm font-medium text-gray-800">
                                                        {notification.title}
                                                    </p>
                                                    <p className="text-xs text-gray-500">
                                                        {notification.description}
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-1">
                                                        {notification.create_time.toLocaleString()}
                                                    </p>
                                                </div>
                                                {notification.status === "unread" && (
                                                    <span className="h-2 w-2 bg-blue-500 rounded-full mt-1" />
                                                )}
                                            </Link>
                                        ))
                                    )}
                                </div>
                            </PopoverContent>
                        </Popover>

                        {user ? (
                            <Popover
                                open={isPopoverOpen}
                                onOpenChange={setIsPopoverOpen}
                            >
                                <PopoverTrigger>
                                    <Avatar className="cursor-pointer h-10 w-10 transition-transform hover:scale-105">
                                        <AvatarImage src={user.avatar} alt={user.fullName} />
                                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-sky-400 text-white font-semibold">
                                            {user.fullName.slice(0, 1)}
                                        </AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-72 p-4 mt-2 bg-white rounded-xl shadow-lg border-none">
                                    <div className="grid grid-cols-3 gap-4 mb-4">
                                        <Link
                                            href={"/start"}
                                            className="flex flex-col items-center text-center group cursor-pointer"
                                        >
                                            <Star className="h-6 w-6 text-yellow-500 mb-2 group-hover:text-yellow-600 transition-colors" />
                                            <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                                                Yulduzlarim
                                            </p>
                                        </Link>
                                        <Link
                                            href={"/rating"}
                                            className="flex flex-col items-center text-center group cursor-pointer"
                                        >
                                            <BarChart className="h-6 w-6 text-green-500 mb-2 group-hover:text-green-600 transition-colors" />
                                            <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                                                Reyting
                                            </p>
                                        </Link>
                                        <Link
                                            href={"/profile"}
                                            className="flex flex-col items-center text-center group cursor-pointer"
                                        >
                                            <User className="h-6 w-6 text-blue-500 mb-2 group-hover:text-blue-600 transition-colors" />
                                            <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                                                Profilim
                                            </p>
                                        </Link>
                                        <Link
                                            href={"/settings"}
                                            className="flex flex-col items-center text-center group cursor-pointer"
                                        >
                                            <Settings className="h-6 w-6 text-blue-500 mb-2 group-hover:text-blue-600 transition-colors" />
                                            <p className="text-sm font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                                                Sozlamalar
                                            </p>
                                        </Link>
                                    </div>
                                    <div
                                        onClick={onLogout}
                                        className="flex items-center justify-center pt-2 border-t border-gray-200 group"
                                    >
                                        <LogOut className="h-5 w-5 text-red-500 mr-2 group-hover:text-red-600 transition-colors" />
                                        <p className="text-sm font-medium text-gray-700 group-hover:text-red-600 transition-colors cursor-pointer">
                                            Chiqish
                                        </p>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        ) : (
                            <div className="hidden md:flex items-center space-x-4">
                                <Button
                                    variant="outline"
                                    className="border-amber-300 text-black hover:bg-amber-300 hover:text-emerald-900"
                                    asChild
                                >
                                    <Link href="/signin">Kirish</Link>
                                </Button>
                                <Button
                                    variant="default"
                                    className="bg-amber-600 hover:bg-amber-700 text-white border border-amber-500/50 cursor-pointer"
                                    asChild
                                >
                                    <Link href="/signup">Ro‘yxatdan o‘tish</Link>
                                </Button>
                            </div>
                        )}
                    </div>

                    <div className="md:hidden flex items-center">
                        <Sheet open={isOpen} onOpenChange={setIsOpen}>
                            <SheetTrigger asChild>
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                    className="inline-flex items-center justify-center p-2 rounded-md text-amber-300 hover:text-white hover:bg-emerald-800 focus:outline-none"
                                >
                                    <Menu size={24} />
                                </button>
                            </SheetTrigger>
                            <SheetContent side="top" className="bg-emerald-900 text-white">
                                <SheetHeader>
                                    <SheetTitle className="text-amber-300">Kitob</SheetTitle>
                                    <SheetDescription className="text-gray-300">
                                        Sayt navigatsiyasi
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="mt-6 flex flex-col space-y-4 px-5 py-2">
                                    {navLinks.map((link) => (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className="text-gray-100 hover:text-amber-300 hover:bg-emerald-800 px-3 py-2 rounded-md text-base font-medium transition-all duration-300"
                                        >
                                            {link.name}
                                        </Link>
                                    ))}
                                    <div className="pt-4 space-y-4">
                                        <LanguageChanger />
                                        <Button
                                            variant="outline"
                                            className="w-full border-amber-300 text-black hover:bg-amber-300 hover:text-emerald-900"
                                            asChild
                                        >
                                            <Link
                                                href="/signin"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                Kirish
                                            </Link>
                                        </Button>
                                        <Button
                                            variant="default"
                                            className="w-full bg-amber-600 hover:bg-amber-700 text-white border border-amber-500/50"
                                            asChild
                                        >
                                            <Link
                                                href="/signup"
                                                onClick={() => setIsOpen(false)}
                                            >
                                                Ro‘yxatdan o‘tish
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
