#!/usr/bin/env node
"use strict";

const fs = require("fs");
const path = require("path");

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else if (entry.isFile()) {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function main() {
  const root = path.resolve(__dirname, "..");
  const standaloneRoot = path.join(root, ".next", "standalone");
  if (!fs.existsSync(standaloneRoot)) {
    console.log("Standalone output not found. Skipping postbuild copy.");
    return;
  }

  const targets = [
    { src: path.join(root, "data"), dest: path.join(standaloneRoot, "data") },
    { src: path.join(root, "content"), dest: path.join(standaloneRoot, "content") },
  ];

  for (const { src, dest } of targets) {
    if (!fs.existsSync(src)) continue;
    copyDir(src, dest);
    console.log(`Copied ${src} -> ${dest}`);
  }
}

main();
