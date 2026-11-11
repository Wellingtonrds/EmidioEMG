import express from "express";
import path from "node:path";
import app from "./backend/app.js";

const portArgIndex = process.argv.indexOf("--port");
const PORT = Number(portArgIndex !== -1 ? process.argv[portArgIndex + 1] : process.env.PORT) || 3000;

// Configure Vite middleware in development, or Static Files serving in Production
async function bootstrap() {
  const isProduction = process.env.NODE_ENV === "production";

  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: false,
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
    console.log("System: Vite Middleware mounted in development mode.");
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
    console.log("System: Serving production static assets from: " + distPath);
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`System: EcoSphere Server running on http://0.0.0.0:${PORT}`);
  });
}


bootstrap().catch((error) => {
  console.error("Falha ao iniciar servidor:", error);
  process.exitCode = 1;
});
