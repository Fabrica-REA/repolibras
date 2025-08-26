import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

export default defineConfig(() => {
  dotenv.config();

  return {
    plugins: [react()],
    base: process.env.BASE_URL,
    server: {
      port: Number(process.env.VITE_SERVER_PORT) || 3000,
    },
  };
});
