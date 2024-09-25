import { build } from "esbuild";
import { join } from "path";

build({
  absWorkingDir: process.cwd(),
  bundle: true,
  logLevel: "info",
  entryPoints: ['src/index.ts'],
  outdir: join(process.cwd(), "./dist"),
  minify: true,
  sourcemap: true,
  target: "node20",
  platform: "node",
  format: "esm",
  banner: {
    js: "import { createRequire } from 'module';const require = createRequire(import.meta.url);",
  },
  outExtension: {
    ".js": ".mjs",
  },
  external: ['https']
});