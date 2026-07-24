import type { MetadataRoute } from "next";
import { collections } from "@/data/brand";
export default function sitemap():MetadataRoute.Sitemap{const base=process.env.NEXT_PUBLIC_SITE_URL||"https://trioak-furniture-co-indore.nikhilbaraskar551.chatgpt.site";const routes=["","about","collections","projects","services","gallery","inspiration","blog","search","contact","quote","compare","catalogue","privacy-policy","terms"];return [...routes.map(r=>({url:`${base}/${r}`,lastModified:new Date()})),...collections.map(x=>({url:`${base}/collections/${x.slug}`,lastModified:new Date()}))]}
