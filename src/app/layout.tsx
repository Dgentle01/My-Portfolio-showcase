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
