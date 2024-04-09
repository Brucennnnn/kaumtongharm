import '@ktm/styles/globals.css';
import { config } from '@fortawesome/fontawesome-svg-core';
import { Inter } from 'next/font/google';
import { TRPCReactProvider } from '@ktm/trpc/react';
import { Toaster } from '@ktm/components/ui/toaster';

config.autoAddCss = false;
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

export const metadata = {
  title: 'KaumTongHarm',
  description: 'GG',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`font-sans ${inter.variable}`}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Toaster />
      </body>
    </html>
  );
}
