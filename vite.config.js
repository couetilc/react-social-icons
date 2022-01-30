import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        presets: ["@babel/preset-env", "@babel/preset-react"],
        babelrc: true,
      }
    }),
  ],
});
