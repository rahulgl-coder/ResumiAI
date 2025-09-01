// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react(),tailwindcss()],
// })

// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react(),tailwindcss()],
//   resolve: {
//     dedupe: ['react', 'react-dom'],
//   },
// });

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react(),tailwindcss()],
  server: {
    host: '0.0.0.0',
    port: process.env.PORT || 5173,
    strictPort: true,
  },
  preview: {
    host: '0.0.0.0',
    port: process.env.PORT || 5173,
    strictPort: true,
  }
})

