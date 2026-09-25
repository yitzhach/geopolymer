import http from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
const root = resolve(process.argv.includes("--dist") ? "dist" : ".");
const types = {
  ".jpg": "image/jpeg",
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
};
http
  .createServer(async (req, res) => {
    try {
      const path = resolve(
        root,
        "." + decodeURIComponent(new URL(req.url, "http://localhost").pathname),
      );
      if (path !== root && !path.startsWith(root + sep)) {
        res.writeHead(403).end();
        return;
      }
      const file = path === root ? resolve(root, "index.html") : path;
      const data = await readFile(file);
      res
        .writeHead(200, {
          "Content-Type": types[extname(file)] || "text/plain",
          "Cache-Control": "no-store",
        })
        .end(data);
    } catch {
      res.writeHead(404).end("Not found");
    }
  })
  .listen(Number(process.env.PORT) || 4173, "0.0.0.0", () =>
    console.log("Prototype: http://localhost:4173"),
  );
