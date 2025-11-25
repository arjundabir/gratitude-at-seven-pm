import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Footer from '@/components/footer';
import { Toaster } from '@/components/ui/sonner';
import { GoogleAnalytics } from '@next/third-parties/google';

const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
  title: 'Gratitude at 7 PM',
  description: 'Updates at 7 pm every day.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased relative h-svh flex flex-col`}
      >
        {children}
        <Footer />
        <Toaster />
        <GoogleAnalytics gaId="G-4HVD5540MF" />
      </body>
    </html>
  );
}
