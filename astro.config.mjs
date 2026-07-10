import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://estefaniaderma.mx',
  output: 'static',
  image: {
    domains: [],
    remotePatterns: [],
    service: {
      entrypoint: 'astro/assets/services/sharp',
      config: {
        limitInputPixels: false,
      },
    },
  },
});
