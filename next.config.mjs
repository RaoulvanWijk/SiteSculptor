/** @type {import('next').NextConfig} */
const nextConfig = {
    dir: './src',  
    output: "standalone",
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
              hostname: "lh3.googleusercontent.com",
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

  };
  
  export default nextConfig;
  