import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path' // Mantenha este import se usar alias

export default defineConfig({
  plugins: [react()],
  // Remova a linha 'base' se existir
  resolve: { // Mantenha esta seção se usar alias
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    open: true,
    host: true // Mantenha 'host: true'
  }
})