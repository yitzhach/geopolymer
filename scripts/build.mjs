import { cp, mkdir, rm } from "node:fs/promises";
await rm("dist", { recursive: true, force: true });
await mkdir("dist");
await cp("index.html", "dist/index.html");
await cp("favicon.svg", "dist/favicon.svg");
await cp("favicon-32.png", "dist/favicon-32.png");
await cp("apple-touch-icon.png", "dist/apple-touch-icon.png");
await cp("src", "dist/src", { recursive: true });
console.log("Built portable static prototype in dist/");
