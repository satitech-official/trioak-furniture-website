import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { BasePathGuard } from "@/components/base-path-guard";
import "./globals.css";

const serif = Cormorant_Garamond({ variable: "--font-serif", subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });
const sans = Manrope({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });
const siteUrl = "https://satitech-official.github.io/trioak-furniture-website";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Trioak Furniture Co. | Custom Furniture in Indore", template: "%s | Trioak Furniture Co." },
  description: "Explore premium residential, commercial, office, modular and custom furniture by Trioak Furniture Co. in Indore.",
  icons: { icon: "/icon.svg" },
  openGraph: { title: "Trioak Furniture Co.", description: "Premium furniture, crafted around your space.", type: "website", url: siteUrl, images: [{ url: "/og.png", width: 1744, height: 916, alt: "Trioak Furniture Co. — furniture crafted to define your space" }] },
  twitter: { card: "summary_large_image", title: "Trioak Furniture Co.", description: "Premium furniture, crafted around your space.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${serif.variable} ${sans.variable}`}><BasePathGuard /><a className="skipLink" href="#main">Skip to content</a>{children}</body></html>;
}
