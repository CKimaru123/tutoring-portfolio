import { defineConfig } from 'vite';

export default defineConfig({
  // Must match the GitHub repository name exactly.
  // Live URL: https://ckimaru123.github.io/tutoring-portfolio/
  base: '/tutoring-portfolio/',

  server: {
    // Open the landing (now index.html) automatically when `npm run dev` runs.
    // /tutoring-portfolio/ resolves to index.html — no explicit filename needed.
    open: '/tutoring-portfolio/',
  },

  build: {
    rollupOptions: {
      input: {
        main:      'index.html',      // ← landing / entry point (was landing.html)
        portfolio: 'portfolio.html',  // ← 3D portfolio (was index.html)
      },
    },
  },
});
