import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/cliente/", "/api/", "/auth/"],
    },
    sitemap: "https://stratomai.com/sitemap.xml",
  };
}
