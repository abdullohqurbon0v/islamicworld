import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title:
        "Joylashuvni Aniqlash | Imon Platformasi - Namoz Vaqtlari va Islomiy Ta‘lim",
    description:
        "Hozirgi joylashuvingizni aniqlang, xaritada ko‘ring va namoz vaqtlarini moslashtiring. Imon Platformasi - Islomiy ta‘lim va ibodat uchun eng yaxshi yordamchi.",
    keywords:
        "joylashuv aniqlash, namoz vaqtlari, islomiy ta‘lim, imon platformasi, xarita, geolokatsiya, musulmonlar uchun ilova",
    openGraph: {
        title: "Joylashuvni Aniqlash - Imon Platformasi",
        description:
            "Joylashuvingizni bilib oling va namoz vaqtlarini aniq ko‘ring. Imon Platformasi bilan ibodat va ta‘lim osonlashadi.",
        url: "https://imonplatforma.uz/location",
        type: "website",
        images: [
            {
                url: "https://imonplatforma.uz/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Imon Platformasi - Joylashuvni Aniqlash",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Joylashuvni Aniqlash - Imon Platformasi",
        description: "Joylashuvingizni aniqlang va namoz vaqtlarini moslashtiring.",
        images: ["https://imonplatforma.uz/og-image.jpg"],
    },
    alternates: {
        canonical: "https://imonplatforma.uz/location",
    },
};
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={` antialiased`}>{children}
                <Toaster />
            </body>
        </html>
    );
}
