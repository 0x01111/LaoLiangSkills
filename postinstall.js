#!/usr/bin/env node

/**
 * Post-install script: registers laoliang skills with Claude Code.
 * Creates symlinks (or copies) from the package's skills/ directory
 * into ~/.claude/skills/laoliang/ so Claude Code can discover them.
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const PACKAGE_NAME = 'laoliang-skills';
const SKILLS_SRC = path.join(__dirname, 'skills');
const SKILLS_DEST = path.join(os.homedir(), '.claude', 'skills', 'laoliang');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyDir(src, dest) {
  ensureDir(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function main() {
  if (!fs.existsSync(SKILLS_SRC)) {
    console.log(`[${PACKAGE_NAME}] No skills directory found, skipping registration.`);
    return;
  }

  console.log(`[${PACKAGE_NAME}] Registering skills to ${SKILLS_DEST} ...`);
  copyDir(SKILLS_SRC, SKILLS_DEST);

  const categories = fs.readdirSync(SKILLS_SRC, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  console.log(`[${PACKAGE_NAME}] Registered ${categories.length} skill modules:`);
  for (const cat of categories) {
    const files = fs.readdirSync(path.join(SKILLS_SRC, cat))
      .filter(f => f.endsWith('.md'));
    console.log(`  - ${cat} (${files.length} skills)`);
  }
  console.log(`[${PACKAGE_NAME}] Done! Skills are now available in Claude Code.`);
}

main();
