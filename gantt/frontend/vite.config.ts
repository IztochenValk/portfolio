import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// ⚠️ vite.config.ts doit retourner une fonction si tu utilises loadEnv
export default defineConfig(({ mode }) => {
  // charge les variables d'environnement selon le mode (dev/prod)
  const env = loadEnv(mode, process.cwd(), "");
  const portFrontend = Number(`${env.VITE_FRONTEND_PORT}`)
  return {
    plugins: [react()],
    resolve: {
      alias: {
        "@api": path.resolve(__dirname, "src/api.ts"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@components": path.resolve(__dirname, "src/components"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@repos": path.resolve(__dirname, "src/repos"),
        "@styles": path.resolve(__dirname, "src/styles"),
        "@store": path.resolve(__dirname, "src/store"),
        "@types": path.resolve(__dirname, "src/types"),
        "@gantt": path.resolve(__dirname, "src/gantt"),
        "@assets": path.resolve(__dirname, "src/assets"),
        "@data": path.resolve(__dirname, "src/data"),
        "@features": path.resolve(__dirname, "src/features"),
        "@sync": path.resolve(__dirname, "src/sync"),
      },
    },
    server: {
      port: portFrontend,
      proxy: {
        "/api": {
          // 🔥 maintenant fonctionnel côté Node
          target: `${env.VITE_API_URL}:${env.VITE_API_PORT}`,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
