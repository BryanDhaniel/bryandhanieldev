import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/app/components/ui/theme-provider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bryan Dhaniel — Creative Developer",
  description: "A portfolio of expressive digital experiences, product thinking, and visual craft by Bryan Dhaniel.",
  keywords: ["Bryan Dhaniel", "creative developer", "portfolio", "product design", "frontend developer"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange enableSystem={false} forcedTheme="dark" themes={["dark"]}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
