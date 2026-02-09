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

  const projectName = path.basename(root);
  const extraStandaloneRoot = path.join(standaloneRoot, projectName);

  const targets = [
    { src: path.join(root, ".next", "static"), dest: path.join(standaloneRoot, ".next", "static") },
    { src: path.join(root, "public"), dest: path.join(standaloneRoot, "public") },
    { src: path.join(root, "data"), dest: path.join(standaloneRoot, "data") },
    { src: path.join(root, "content"), dest: path.join(standaloneRoot, "content") },
    { src: path.join(root, "data"), dest: path.join(extraStandaloneRoot, "data") },
    { src: path.join(root, "content"), dest: path.join(extraStandaloneRoot, "content") },
  ];

  for (const { src, dest } of targets) {
    if (!fs.existsSync(src)) continue;
    copyDir(src, dest);
    console.log(`Copied ${src} -> ${dest}`);
  }
}

main();
