import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Playfair_Display } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TMATH EDU | Trung tâm lập trình thi đấu",
  description:
    "TMATH đào tạo lập trình thi đấu theo lộ trình Tiểu học, THCS, THPT: Scratch/Python, C++ chuyên Tin, HSG và ôn thi lớp 12.",
  applicationName: 'TMATH EDU',
  openGraph: {
    siteName: 'TMATH EDU',
    title: 'TMATH EDU | Trung tâm lập trình thi đấu',
  },
  icons: {
    icon: [
      { url: "/icons/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon.ico", type: "image/x-icon" },
    ],
    apple: [{ url: "/icons/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      {
        rel: "mask-icon",
        url: "/icons/safari-pinned-tab.svg",
        color: "#0d3f63",
      },
    ],
  },
  manifest: "/icons/manifest.json",
  other: {
    "msapplication-config": "/icons/browserconfig.xml",
    "msapplication-TileColor": "#0d3f63",
    "theme-color": "#ffffff",
  },
  alternates: {
    canonical: 'https://tmathcoding.vn',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
