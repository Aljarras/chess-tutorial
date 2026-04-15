import { copyFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");

if (!existsSync(distDir)) {
  console.error("dist/ not found. Run `vite build` first.");
  process.exit(1);
}

const htaccess = `RewriteEngine On

# Serve existing files/directories directly
RewriteCond %{REQUEST_FILENAME} -f [OR]
RewriteCond %{REQUEST_FILENAME} -d
RewriteRule ^ - [L]

# SPA fallback
RewriteRule ^ index.html [L]
`;

writeFileSync(path.join(distDir, ".htaccess"), htaccess, "utf8");

const indexPath = path.join(distDir, "index.html");
const notFoundPath = path.join(distDir, "404.html");
if (existsSync(indexPath)) {
  copyFileSync(indexPath, notFoundPath);
}

// Ensure assets directory exists after build (extra safety for zipped uploads)
const assetsDir = path.join(distDir, "assets");
if (!existsSync(assetsDir)) {
  mkdirSync(assetsDir, { recursive: true });
}

console.log("Phoenix/cPanel deploy files generated: dist/.htaccess and dist/404.html");
