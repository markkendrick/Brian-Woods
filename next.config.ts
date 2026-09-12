import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  async redirects() {
    return [
      {
        source: "/wp-content/uploads/go-x/u/8ffdd555-9d40-470b-953d-1687924d7e76/:path*",
        destination: "/images/projects/home-hero.jpg",
        permanent: true,
      },
      {
        source: "/wp-content/uploads/go-x/u/c1101687-ce4f-40b3-a621-3c77ec817f54/:path*",
        destination: "/images/projects/about-1.jpg",
        permanent: true,
      },
      {
        source: "/wp-content/uploads/go-x/u/ac9d3455-4f64-4d62-9f08-63a20242d62c/:path*",
        destination: "/images/projects/about-2.jpg",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
