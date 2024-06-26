/** @type {import('next').NextConfig} */
const nextConfig = {  
    // Configuração do ESLint para ignorar linting durante o build
    eslint: {
      ignoreDuringBuilds: true,
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },
}
    

export default nextConfig
