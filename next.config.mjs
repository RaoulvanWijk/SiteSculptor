/** @type {import('next').NextConfig} */
const nextConfig = (nextConfig) => {
    return {
        // ...nextConfig,
        images: {
            remotePatterns: [
                {
                    protocol: "https",
                    hostname: "avatars.githubusercontent.com",
                    port: "",
                    pathname: "/**",
                },
                {
                    protocol: "https",
                    hostname: "placehold.co",
                    port: "",
                    pathname: "/**",
                }
            ],
        },
        // webpack(webpackConfig) {
        //     return {
        //         ...webpackConfig,
        //         optimization: {
        //             minimize: false,
        //         },
        //     };
        // },
    };
};

export default nextConfig;
