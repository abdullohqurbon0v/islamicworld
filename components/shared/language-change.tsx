"use client";

import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const LanguageChanger = () => {
  const languages = [
    { code: "uz", name: "O‘zbek" },
    { code: "en", name: "English" },
    { code: "ru", name: "Русский" },
    { code: "ar", name: "العربية" },
  ];

  const handleLanguageChange = (langCode: string) => {
    console.log(`Language changed to: ${langCode}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex items-center space-x-2 cursor-pointer border-amber-300 text-black hover:bg-amber-300 hover:text-emerald-900"
        >
          <Globe className="h-4 w-4" />
          <span>Til</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-emerald-900 text-white border border-emerald-700">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => handleLanguageChange(lang.code)}
            className="hover:bg-emerald-800 hover:text-amber-300 focus:bg-emerald-800 focus:text-amber-300"
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LanguageChanger;
