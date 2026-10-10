import type { NextConfig } from "next";

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy-Report-Only",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'self'",
      "object-src 'none'",
      "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com",
      "font-src 'self'",
      "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  trailingSlash: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/wp-content/uploads/go-x/u/8ffdd555-9d40-470b-953d-1687924d7e76/:path*",
        destination: "/images/projects/home-hero.jpg",
        permanent: true,
      },
      {
        source: "/wp-content/uploads/go-x/u/c1101687-ce4f-40b3-a621-3c77ec817f54/:path*",
        destination: "/images/projects/graded-lots.jpg",
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
