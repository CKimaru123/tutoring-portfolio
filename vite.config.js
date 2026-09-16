import { defineConfig } from 'vite';

export default defineConfig({
  // Must match the GitHub repository name exactly.
  // Live URL: https://ckimaru123.github.io/tutoring-portfolio/
  base: '/tutoring-portfolio/',

  server: {
    // Open landing.html automatically when `npm run dev` runs
    open: '/tutoring-portfolio/landing.html',
  },

  // Declare both HTML pages so Vite bundles them correctly.
  // landing.html is the entry point; index.html is the portfolio.
  build: {
    rollupOptions: {
      input: {
        main:      'landing.html',   // ← entry point (served at /tutoring-portfolio/)
        portfolio: 'index.html',     // ← portfolio (navigated to from landing)
      },
    },
  },
});
