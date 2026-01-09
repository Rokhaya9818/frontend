import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";

const plugins = [react(), tailwindcss(), jsxLocPlugin()];

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");

                              return {
                                    plugins,
                                    resolve: {
                                            alias: {
                                                      "@": path.resolve(import.meta.dirname, "client", "src"),
                                                      "@shared": path.resolve(import.meta.dirname, "shared"),
                                                      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
                                            },
                                    },
                                    envDir: path.resolve(import.meta.dirname),
                                    root: path.resolve(import.meta.dirname, "client"),
                                    publicDir: path.resolve(import.meta.dirname, "client", "public"),
                                    build: {
                                            outDir: path.resolve(import.meta.dirname, "dist/public"),
                                            emptyOutDir: true,
                                    },
                                    // Injection des variables d'environnement dans index.html
                                    define: {
                                            "process.env": env,
                                    },
                                    server: {
                                            port: 3000,
                                            host: "0.0.0.0",
                                            middlewareMode: false,
                                            proxy: {
                                                      "/api": {
                                                                  target: "http://localhost:8000",
                                                                  changeOrigin: true,
                                                                  secure: false,
                                                                  rewrite: (path) => path,
                                                      },
                                            },
                                    },
                              };
});

