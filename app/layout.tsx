import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Libranex',
  icons: {
    icon: [
      { url: '/libranex-logo.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml', sizes: 'any' },
    ],
    shortcut: '/libranex-logo.svg',
    apple: '/libranex-logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}