"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LanguageChanger from "@/components/shared/language-change";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Bosh sahifa", href: "/" },
    { name: "Biz haqimizda", href: "/about" },
    { name: "Xizmatlar", href: "/services" },
    { name: "Bog‘lanish", href: "/contact" },
  ];

  return (
    <nav className="fixed top- inset-0 h-16  z-50 bg-emerald-900 text-white shadow-lg border-b border-emerald-700/50 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
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

          <div className="hidden md:flex items-center space-x-4">
            <LanguageChanger />
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

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-amber-300 hover:text-white hover:bg-emerald-800 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-emerald-900/95 border-t border-emerald-700/50">
          <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-100 hover:text-amber-300 hover:bg-emerald-800 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
            <div className="space-y-2">
              <LanguageChanger />
              <Button
                variant="outline"
                className="w-full border-amber-300 text-amber-300 hover:bg-amber-300 hover:text-emerald-900"
                asChild
              >
                <Link href="/signin">Kirish</Link>
              </Button>
              <Button
                variant="default"
                className="w-full bg-amber-600 hover:bg-amber-700 text-white border border-amber-500/50"
                asChild
              >
                <Link href="/signup">Ro‘yxatdan o‘tish</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
