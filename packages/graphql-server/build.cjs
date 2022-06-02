#!/usr/bin/env node

const esbuild = require("esbuild");
const { nodeExternalsPlugin } = require("esbuild-node-externals");

esbuild.build({
  entryPoints: ["src/index.ts"],
  platform: "node",
  target: "node18",
  outfile: "dist/index.js",
  plugins: [nodeExternalsPlugin()],
});
