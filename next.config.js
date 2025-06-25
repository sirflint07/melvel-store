const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'res.cloudinary.com',  // This matches the domain
          pathname: '/djpdesqrs/**',       // This matches the path after the domain
        },
      ],
    },
  };
  
  module.exports = nextConfig;