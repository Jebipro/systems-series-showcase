import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// base './' keeps the built site working from any static path (GitHub Pages project path, Netlify, Vercel, a sub-folder)
export default defineConfig({
  base: './',
  plugins: [react()],
});
