import withPWA from "next-pwa";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {}, // ✅ Adicione ESTA linha

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ivflshwbkgezpnejhhje.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

const isProd = process.env.NODE_ENV === "development" ? false : true;

const withPWAConfig = withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: !isProd,
})(nextConfig);

export default withPWAConfig;
