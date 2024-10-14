import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Image from "next/image"
import { Toaster } from '@/components/ui/toaster'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Officer Validator | CTRL+ALT ELITE Club",
  description: "This application scans the barcodes included in every CTRL+ALT Club ID for officers, and matches it on a database to prove it&apos;s validity and to provide officer information",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <nav></nav>
        {children}
        <Toaster />
        <footer className={`${geistSans.variable} grid md:grid-cols-4 grid-cols-1 w-full bg-gray-900 text-slate-500  gap-4 px-12 py-8 overflow-hidden`}>
          <div>
            <Image src="/logo.webp" width={180} height={530} alt="CTRL+ALT ELITE Logo" />
            <p className="text-sm text-gray-400 mt-2">&copy; 2024, CTRL+ALT ELITE Club</p>
            <p className="text-sm text-gray-400">CTRL+ALT ELITE is a officially recognized 
              Senior High School club by <a
              href="http://olivarezcollegetagaytay.edu.ph/home" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="max-w-fit font-medium underline underline-offset-4">
                Olivarez College Tagaytay
                </a>.</p>
          </div>
          <div className="w-screen flex flex-col">
            <span className="text-gray-700 font-bold uppercase">Links</span>
            <a href="https://ctrl-alt-elite.club/" className="max-w-fit font-medium underline underline-offset-4">Homepage</a>
            <a href="https://ctrl-alt-elite.club/about" className="max-w-fit font-medium underline underline-offset-4">About</a>
            <a href="https://ctrl-alt-elite.club/calendar" className="max-w-fit font-medium underline underline-offset-4">Calendar</a>
            <a href="https://members.ctrl-alt-elite.club/" className="max-w-fit font-medium underline underline-offset-4">Members Only</a>
          </div>
          <div className="w-screen flex flex-col">
            <span className="text-gray-700 font-bold uppercase">Social Media</span>
            <a href="https://ctrl-alt-elite.club/" target="_blank" className="max-w-fit font-medium underline underline-offset-4">Facebook</a>
            <a href="https://ctrl-alt-elite.club/about" target="_blank" className="max-w-fit font-medium underline underline-offset-4">Twitch</a>
            <a href="https://ctrl-alt-elite.club/calendar" target="_blank" className="max-w-fit font-medium underline underline-offset-4">Youtube</a>
            <a href="https://members.ctrl-alt-elite.club/" target="_blank" className="max-w-fit font-medium underline underline-offset-4">X</a>
          </div>
            <div className="w-screen flex flex-col">
            <span className="text-gray-700 font-bold uppercase">Services/Utilities</span>
            <a href="https://officer-validator.ctrl-alt-elite.club/" target="_blank" className="max-w-fit font-medium underline underline-offset-4">Officer Validator</a>
            <a href="https://tickets.ctrl-alt-elite.club/" target="_blank" className="max-w-fit font-medium underline underline-offset-4">Tickets</a>
            <a href="https://player-registry.ctrl-alt-elite.club/" target="_blank" className="max-w-fit underline underline-offset-4">E-Sport Player Registry</a>
          </div>
        </footer>
      </body>
    </html>
  );
}
