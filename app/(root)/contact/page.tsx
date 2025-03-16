import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 mt-16">
      <section className="bg-emerald-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Biz bilan Bog‘laning
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-200">
            Savollaringiz, takliflaringiz yoki yordam so‘rash uchun bizga
            murojaat qiling.
          </p>
        </div>
      </section>

      <section className="py-12 px-4 bg-emerald-50">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="bg-white shadow-lg border border-emerald-200">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-emerald-900">
                  Xabar Jo‘natish
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Ism
                      </label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Ismingiz"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email
                      </label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Email manzilingiz"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mavzu
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="Xabar mavzusi"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Xabar
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Xabaringizni shu yerga yozing"
                      className="mt-1"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-white border border-amber-500/50"
                  >
                    <Send className="mr-2 h-5 w-5" /> Jo‘natish
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <Card className="bg-white shadow-lg border border-emerald-200">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-emerald-900">
                  Aloqa Ma‘lumotlari
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-emerald-700 mr-3 mt-1" />
                  <div>
                    <p className="text-gray-700 font-semibold">Email</p>
                    <a
                      href="mailto:support@imonplatform.uz"
                      className="text-emerald-600 hover:underline"
                    >
                      abdullohqurnobov@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-emerald-700 mr-3 mt-1" />
                  <div>
                    <p className="text-gray-700 font-semibold">Telefon</p>
                    <a
                      href="tel:+998901234567"
                      className="text-emerald-600 hover:underline"
                    >
                      +998 91 600 83 00
                    </a>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-emerald-700 mr-3 mt-1" />
                  <div>
                    <p className="text-gray-700 font-semibold">Manzil</p>
                    <p className="text-gray-700">
                      Toshkent viloyati, Yuqorichirchiq tumani, Dostlik,
                      obiravon kochasi 3 uy
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-white shadow-lg border border-emerald-200">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-emerald-900">
                Bizni Xaritada Toping
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500">
                  Google Maps yoki boshqa xarita integratsiyasi shu yerda
                  bo‘ladi
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
