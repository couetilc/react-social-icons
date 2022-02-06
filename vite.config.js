import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { rollupPluginSocialIcons as socialIcons } from './src/generate.js'

export default defineConfig({
  root: './examples',
  plugins: [
    socialIcons(),
    react(),
  ],
});
