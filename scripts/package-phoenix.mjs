import { copyFileSync, cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");
const outDir = path.join(projectRoot, "deploy");
const stageDir = path.join(outDir, "phoenix-site");
const zipPath = path.join(outDir, "phoenix-site.zip");

if (!existsSync(distDir)) {
  console.error("dist folder not found. Run build first.");
  process.exit(1);
}

rmSync(stageDir, { recursive: true, force: true });
rmSync(zipPath, { force: true });
mkdirSync(stageDir, { recursive: true });

cpSync(path.join(distDir, "assets"), path.join(stageDir, "assets"), { recursive: true });
copyFileSync(path.join(distDir, "index.html"), path.join(stageDir, "index.html"));

if (existsSync(path.join(distDir, "404.html"))) {
  copyFileSync(path.join(distDir, "404.html"), path.join(stageDir, "404.html"));
}

if (existsSync(path.join(distDir, ".htaccess"))) {
  copyFileSync(path.join(distDir, ".htaccess"), path.join(stageDir, ".htaccess"));
}

mkdirSync(outDir, { recursive: true });

const escapedStage = stageDir.replace(/'/g, "''");
const escapedZip = zipPath.replace(/'/g, "''");
const ps = `Compress-Archive -Path '${escapedStage}\\*' -DestinationPath '${escapedZip}' -Force`;
execSync(`powershell -NoProfile -Command "${ps}"`, { stdio: "inherit" });

console.log("Phoenix package ready:", zipPath);
console.log("Upload and extract this zip in cPanel public_html.");
