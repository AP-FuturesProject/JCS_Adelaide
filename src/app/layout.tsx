import type { Metadata, Viewport } from "next";
import { Anton, Cinzel_Decorative, Questrial } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel_Decorative({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: ["400"],
});

const questrial = Questrial({
  variable: "--font-questrial",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Jesus Christ Superstar Adelaide",
  description: "Coming Soon",
  icons: {
    icon: "/jcs-icon.webp",
    shortcut: "/jcs-icon.webp",
    apple: "/jcs-icon.webp",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${cinzel.variable} ${questrial.variable} ${anton.variable}`}>
        {children}
      </body>
    </html>
  );
}
