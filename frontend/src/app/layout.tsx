import type { Metadata } from 'next';
import './globals.css';
import { ApiProvider } from '@/context/ApiContext';

export const metadata: Metadata = {
  title: 'GoPratle - Post Requirement',
  description: 'Professional Requirement Posting Flow',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ApiProvider>
          {children}
        </ApiProvider>
      </body>
    </html>
  );
}
