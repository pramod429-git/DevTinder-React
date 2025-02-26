import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  //Since I am getting CORS error for PACTH method so proxy changes added to bypass preflight check
  // eventhough I have added proper header and patch method in server
  //The Vite proxy made the frontend and backend appear as the same origin
  //below code only run for local
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://localhost:7777", // Your Express backend URL
  //       changeOrigin: true,
  //       secure: false,
  //       rewrite: (path) => path.replace(/^\/api/, ""), // Removes '/api' prefix
  //     },
  //   },
  // },
});
