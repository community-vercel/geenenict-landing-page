/** @type {import('next').NextConfig} */
import TerserPlugin from 'terser-webpack-plugin';

const nextConfig = {
    webpack(config, { isServer }) {
        if (!isServer) {
          config.optimization.minimizer.push(
            new TerserPlugin({
              terserOptions: {
                compress: {
                  drop_console: true, // Optional: Remove console logs
                },
              },
            })
          );
        }
        return config;
      },

    images:{
domains:['geenenict-server.vercel.app',
    'geenenict-server.vercel.app '
]
    }

};

export default nextConfig;
