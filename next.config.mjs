/** @type {import('next').NextConfig} */
const nextConfig = (nextConfig) => {
    return {
      ...nextConfig,
      webpack(webpackConfig) {
        return {
          ...webpackConfig,
          optimization: {
            minimize: false
          },
          images: {
          remotePatterns: [
            {
                protocol: 'https',
                hostname: 'avatars.githubusercontent.com',
                port: '',
                pathname: '/**',
            },
          ],
        },
        };
      }
    };
  };
export default nextConfig;
