import type { MetadataRoute } from "next";
import { collections } from "@/data/brand";

export const dynamic = "force-static";

export default function sitemap():MetadataRoute.Sitemap{
  const base="https://satitech-official.github.io/trioak-furniture-website";
  const routes=["","about","collections","projects","services","gallery","inspiration","blog","search","contact","quote","compare","catalogue","privacy-policy","terms"];
  return [
    ...routes.map((route)=>({url:`${base}/${route}`,lastModified:new Date()})),
    ...collections.map((item)=>({url:`${base}/collections/${item.slug}`,lastModified:new Date()}))
  ];
}
