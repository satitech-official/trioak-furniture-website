import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots():MetadataRoute.Robots{
  const base="https://satitech-official.github.io/trioak-furniture-website";
  return {rules:{userAgent:"*",allow:"/"},sitemap:`${base}/sitemap.xml`};
}
