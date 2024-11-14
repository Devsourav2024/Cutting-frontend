/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '143.110.242.57', // External domain (IP address)
        port: '8116', // Specify the port here
        pathname: '/**', // Match all paths
      },
    ],
  },
};

export default nextConfig;
