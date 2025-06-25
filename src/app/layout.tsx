import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"

export const metadata: Metadata = {
  title: "Seyi's Showcase",
  description: "A professional portfolio for Seyi, showcasing projects and skills.",
  keywords: "Seyi, portfolio, developer, frontend, backend, fullstack, react, node.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='hsl(0,100%,50%)' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><path d='m12 3-1.9 5.8-5.6 2.2 5.6 2.2L12 19l1.9-5.8 5.6-2.2-5.6-2.2z'/><path d='M5 3v4'/><path d='M19 17v4'/><path d='m5 17 2.8-2.8'/><path d='m19 3-2.8 2.8'/></svg>" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&family=Oswald:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-primary/40">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
