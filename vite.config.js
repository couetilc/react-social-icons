import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  build: {
    target: 'es2015',
    lib: {
      entry: './src/react-social-icons.js',
      name: "SocialIcon",
      fileName: format => `react-social-icons.${format}.js`,
    },
    rollupOptions: {
      // Check if this actually does something?
      external: ['react', 'react-dom'],
      // Do I need this?
      output: {
        globals: {
          react: 'React',
        }
      },
    },
  },
  plugins: [
    react(),
  ],
});
