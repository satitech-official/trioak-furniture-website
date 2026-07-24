import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const serif = Cormorant_Garamond({ variable: "--font-serif", subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });
const sans = Manrope({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://trioak-furniture-co-indore.nikhilbaraskar551.chatgpt.site"),
  title: { default: "Trioak Furniture Co. | Custom Furniture in Indore", template: "%s | Trioak Furniture Co." },
  description: "Explore premium residential, commercial, office, modular and custom furniture by Trioak Furniture Co. in Indore.",
  openGraph: { title: "Trioak Furniture Co.", description: "Premium furniture, crafted around your space.", type: "website", images: [{ url: "/og.png", width: 1744, height: 916, alt: "Trioak Furniture Co. — furniture crafted to define your space" }] },
  twitter: { card: "summary_large_image", title: "Trioak Furniture Co.", description: "Premium furniture, crafted around your space.", images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${serif.variable} ${sans.variable}`}><a className="skipLink" href="#main">Skip to content</a>{children}</body></html>;
}
