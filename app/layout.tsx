import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Providers } from '@/components/providers';
import { ToasterProvider } from '@/components/toaster-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'AIJobHub - Connecting AI Talent with the World\'s Best Companies',
  description: 'Find the best AI and machine learning jobs at top companies. AIJobHub connects talented engineers with innovative AI companies.',
  keywords: 'AI jobs, machine learning jobs, data science jobs, artificial intelligence careers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <ToasterProvider />
        </Providers>
      </body>
    </html>
  );
}