import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  commonjsOptions: {
    transformMixedEsModules: true,
  },
  plugins: [
    react({
      babel: {
        presets: ["@babel/preset-env", "@babel/preset-react"],
      }
    }),
  ],
});
