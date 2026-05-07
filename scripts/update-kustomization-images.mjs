#!/usr/bin/env node
import fs from "node:fs";

function replaceImageBlock(content, imageName, newRepo, newTag) {
  const escapedImageName = imageName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const pattern = new RegExp(
    `- name: ${escapedImageName}\\n\\s+newName: .*\\n\\s+newTag: .*`,
    "g",
  );

  return content.replace(
    pattern,
    `- name: ${imageName}\n    newName: ${newRepo}\n    newTag: ${newTag}`,
  );
}

function readArgument(flag) {
  const index = process.argv.indexOf(flag);
  if (index === -1 || !process.argv[index + 1]) {
    throw new Error(`Missing required argument: ${flag}`);
  }
  return process.argv[index + 1];
}

try {
  const file = readArgument("--file");
  const frontendRepo = readArgument("--frontend-repo");
  const frontendTag = readArgument("--frontend-tag");
  const backendRepo = readArgument("--backend-repo");
  const backendTag = readArgument("--backend-tag");

  let content = fs.readFileSync(file, "utf8");
  content = replaceImageBlock(
    content,
    "docker.io/library/eks-3tier-frontend",
    frontendRepo,
    frontendTag,
  );
  content = replaceImageBlock(
    content,
    "docker.io/library/eks-3tier-backend",
    backendRepo,
    backendTag,
  );

  fs.writeFileSync(file, content, "utf8");
} catch (error) {
  console.error(error.message);
  process.exit(1);
}
