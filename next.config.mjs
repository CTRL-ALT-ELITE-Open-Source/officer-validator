/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
        {
            protocol: 'https',
            hostname: 'static.ctrl-alt-elite.club',
            port: '',
            pathname: '/officers/images/**',
        },
        ],
    }
};

export default nextConfig;
