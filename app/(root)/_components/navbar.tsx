"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Bosh sahifa", href: "/" },
    { name: "Biz haqimizda", href: "/about" },
    { name: "Xizmatlar", href: "/services" },
    { name: "Bog'lanish", href: "/contact" },
  ];

  return (
    <nav className="bg-emerald-900 text-white shadow-lg border-b border-emerald-700/50 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold tracking-wide text-amber-300 "
            >
              Kitob
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-100 hover:text-amber-300 hover:bg-emerald-800 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 "
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div className="hidden md:flex items-center">
            <Button
              variant="default"
              className="bg-amber-600 hover:bg-amber-700 text-white border border-amber-500/50 cursor-pointer"
            >
              Boshlash
            </Button>
          </div>
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

      {isOpen && (
        <div className="md:hidden bg-emerald-900/95 border-t border-emerald-700/50">
          <div className="px-2 pt-2 pb-3 space-y-2 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-gray-100 hover:text-amber-300 hover:bg-emerald-800 block px-3 py-2 rounded-md text-base font-medium  transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}
            <Button
              variant="default"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white border border-amber-500/50"
            >
              Boshlash
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
