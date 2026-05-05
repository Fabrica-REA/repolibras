import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(() => {
  dotenv.config();

  return {
    plugins: [react(), tailwindcss()],
    base: process.env.BASE_URL,
    server: {
      port: Number(process.env.VITE_SERVER_PORT),
    },
  };
});
