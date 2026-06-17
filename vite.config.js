import { svelte } from '@sveltejs/vite-plugin-svelte';
import { defineConfig } from 'vite';

const isLanding = process.env.LANDING === 'true';

export default defineConfig({
  plugins: [svelte()],
  build: {
    rollupOptions: {
      input: isLanding
        ? { main: 'welcome.html' }
        : { main: 'index.html', ja: 'ja/index.html' }
    }
  }
});
