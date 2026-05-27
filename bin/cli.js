#!/usr/bin/env node

/**
 * laoliang-skills CLI — manage the 老梁 skills package.
 *
 * Usage:
 *   laoliang-skills install     Register skills with Claude Code
 *   laoliang-skills uninstall   Remove skills from Claude Code
 *   laoliang-skills list        List all available skill modules
 *   laoliang-skills path        Print the package's skills directory path
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const PACKAGE_NAME = 'laoliang-skills';
const SKILLS_SRC = path.join(__dirname, '..', 'skills');
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

function removeDir(dir) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
  }
}

function install() {
  console.log(`Installing ${PACKAGE_NAME} skills...`);
  if (!fs.existsSync(SKILLS_SRC)) {
    console.error(`Error: skills directory not found at ${SKILLS_SRC}`);
    process.exit(1);
  }
  removeDir(SKILLS_DEST);
  copyDir(SKILLS_SRC, SKILLS_DEST);

  const categories = fs.readdirSync(SKILLS_SRC, { withFileTypes: true })
    .filter(d => d.isDirectory());

  console.log(`\nInstalled ${categories.length} skill modules:`);
  for (const cat of categories) {
    const files = fs.readdirSync(path.join(SKILLS_SRC, cat.name))
      .filter(f => f.endsWith('.md'));
    console.log(`  ${cat.name}/`);
    for (const f of files) {
      console.log(`    - ${f}`);
    }
  }
  console.log(`\nSkills registered at: ${SKILLS_DEST}`);
}

function uninstall() {
  console.log(`Uninstalling ${PACKAGE_NAME} skills...`);
  removeDir(SKILLS_DEST);
  console.log(`Removed: ${SKILLS_DEST}`);
}

function list() {
  if (!fs.existsSync(SKILLS_SRC)) {
    console.error(`Error: skills directory not found at ${SKILLS_SRC}`);
    process.exit(1);
  }

  console.log('老梁技能包 — 模块列表:\n');
  const categories = fs.readdirSync(SKILLS_SRC, { withFileTypes: true })
    .filter(d => d.isDirectory());

  for (const cat of categories) {
    console.log(`  ${cat.name}/`);
    const files = fs.readdirSync(path.join(SKILLS_SRC, cat.name))
      .filter(f => f.endsWith('.md'));
    for (const f of files) {
      // print first heading from the file as description
      try {
        const content = fs.readFileSync(path.join(SKILLS_SRC, cat.name, f), 'utf-8');
        const match = content.match(/^#\s+(.+)$/m);
        const desc = match ? match[1] : '';
        console.log(`    - ${f}${desc ? ' — ' + desc : ''}`);
      } catch {
        console.log(`    - ${f}`);
      }
    }
    console.log();
  }

  console.log(`Total: ${categories.length} modules`);
  console.log(`\nPackage skills path: ${SKILLS_SRC}`);
  console.log(`Claude Code skills path: ${SKILLS_DEST}`);
}

function showPath() {
  console.log(SKILLS_SRC);
}

const command = process.argv[2] || 'list';

switch (command) {
  case 'install':
    install();
    break;
  case 'uninstall':
    uninstall();
    break;
  case 'list':
    list();
    break;
  case 'path':
    showPath();
    break;
  case '--help':
  case '-h':
    console.log([
      `Usage: laoliang-skills <command>`,
      ``,
      `Commands:`,
      `  install     Register skills with Claude Code (~/.claude/skills/laoliang/)`,
      `  uninstall   Remove skills from Claude Code`,
      `  list        List all available skill modules (default)`,
      `  path        Print the package's skills directory path`,
    ].join('\n'));
    break;
  default:
    console.error(`Unknown command: ${command}`);
    console.error(`Run 'laoliang-skills --help' for usage.`);
    process.exit(1);
}
