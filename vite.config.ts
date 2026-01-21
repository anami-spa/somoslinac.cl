import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/somoslinac.cl/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // React y ReactDOM en un chunk separado
          'react-vendor': ['react', 'react-dom'],
          // Componentes UI de Radix en un chunk
          'ui-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-accordion',
            '@radix-ui/react-select',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-radio-group',
            '@radix-ui/react-label',
            '@radix-ui/react-toast',
          ],
          // Framer Motion en un chunk separado
          'animation-vendor': ['framer-motion'],
          // Lucide icons
          'icons-vendor': ['lucide-react'],
          // React Hook Form y Zod
          'forms-vendor': ['react-hook-form', 'zod', '@hookform/resolvers'],
        },
      },
    },
  },
})
