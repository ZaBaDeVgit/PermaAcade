const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const htmlFiles = fs.readdirSync(root).filter((file) => file.endsWith(".html"));
let hasError = false;

function exists(relativePath) {
    return fs.existsSync(path.resolve(root, relativePath));
}

for (const file of htmlFiles) {
    const fullPath = path.join(root, file);
    const content = fs.readFileSync(fullPath, "utf8");

    const srcMatches = [...content.matchAll(/(?:src|href)="([^"]+)"/g)];
    for (const [, rawTarget] of srcMatches) {
        if (/^(https?:|mailto:|#)/.test(rawTarget)) continue;
        const target = rawTarget.split("?")[0];
        if (!target || target === "/") continue;
        if (!exists(target)) {
            hasError = true;
            console.error(`[missing] ${file} -> ${target}`);
        }
    }
}

if (hasError) {
    process.exit(1);
}

console.log(`Static check OK: ${htmlFiles.length} HTML files revisados.`);
