/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['antd', '@ant-design/icons'],
  experimental: {
    appDir: true
  }
}

export default nextConfig 