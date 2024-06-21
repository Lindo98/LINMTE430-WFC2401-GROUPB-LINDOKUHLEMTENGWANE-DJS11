import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  build: {
    rollupOptions: {
      external: [
        "react-router-dom",
        "slick-carousel/slick/slick.css",
        "slick-carousel/slick/slick-theme.css",
        "react-icons/fa",
      ],
    },
  },
});
