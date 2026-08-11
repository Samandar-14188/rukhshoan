import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, VT323 } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
});

const vt323 = VT323({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-vt323',
});

export const metadata: Metadata = {
  title: "Ruxshona's 19th Birthday Party 🌸",
  description: "Ruxshona uchun maxsus 19 yosh bayramona Y2K interaktiv sayti!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uz" className={`${jakarta.variable} ${vt323.variable}`}>
      <body className="antialiased min-h-screen bg-[#ffd6e8] selection:bg-pink-300 selection:text-pink-900">
        {children}
      </body>
    </html>
  );
}
