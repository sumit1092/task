import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://testffc.nimapinfotech.com", 
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '/api'), 
        configure: (proxy, options) => {
      proxy.on("proxyReq", (proxyReq, req, res) => {
        if (req.headers.authorization) {
          proxyReq.setHeader("Authorization", req.headers.authorization);
        }
      });
    }
      },
    },
  },
});
