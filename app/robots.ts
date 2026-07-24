import type { MetadataRoute } from "next";
export default function robots():MetadataRoute.Robots{const base=process.env.NEXT_PUBLIC_SITE_URL||"https://trioak-furniture-co-indore.nikhilbaraskar551.chatgpt.site";return {rules:{userAgent:"*",allow:"/"},sitemap:`${base}/sitemap.xml`}}
