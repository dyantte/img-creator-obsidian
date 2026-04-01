#!/usr/bin/env node
/**
 * VAULT OBSERVER — Auto-generates daily notes from project activity
 * Watches: git commits, file changes, Claude Code sessions
 * Runs every 30 min via Task Scheduler
 */

import { execSync } from 'child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync, appendFileSync, readdirSync } from 'fs';
import { join } from 'path';

const VAULT = 'C:\\Users\\DIANA\\Documents\\img-creator-obsidian';
const DAILY_DIR = join(VAULT, 'Daily');
const PROJECTS = [
  { name: 'IMG Creator', path: 'C:\\Users\\DIANA\\Downloads\\IMG CREATOR MAX' },
  { name: 'Ad Scraper', path: 'C:\\Users\\DIANA\\Downloads\\SCRAPER' },
];
const CLAUDE_SESSIONS = 'C:\\Users\\DIANA\\.claude\\sessions';

// --- Helpers ---

function today() {
  const d = new Date();
  return d.toISOString().slice(0, 10);
}

function now() {
  const d = new Date();
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
}

function git(cmd, cwd) {
  try {
    return execSync(`git ${cmd}`, { cwd, encoding: 'utf-8', timeout: 10000 }).trim();
  } catch { return ''; }
}

function ensureNote(date) {
  if (!existsSync(DAILY_DIR)) mkdirSync(DAILY_DIR, { recursive: true });
  const notePath = join(DAILY_DIR, `${date}.md`);
  if (!existsSync(notePath)) {
    writeFileSync(notePath, `# ${date}\n\n## Observations\n\n## Git Activity\n\n## Claude Code Sessions\n\n## Notes\n\n## Tasks\n- [ ]\n`);
  }
  return notePath;
}

function noteContains(notePath, text) {
  const content = readFileSync(notePath, 'utf-8');
  return content.includes(text);
}

function appendToNote(notePath, line) {
  if (!noteContains(notePath, line)) {
    // Find the right section and append
    appendFileSync(notePath, line + '\n');
  }
}

// --- Git Activity ---

function observeGit(notePath) {
  const timestamp = now();
  const lines = [];

  for (const project of PROJECTS) {
    if (!existsSync(join(project.path, '.git'))) continue;

    // Recent commits (last 30 min)
    const commits = git('log --since="30 minutes ago" --oneline --no-merges', project.path);
    if (commits) {
      for (const line of commits.split('\n').filter(Boolean)) {
        const entry = `- [${timestamp}] **${project.name}** commit: ${line}`;
        if (!noteContains(notePath, line.slice(0, 20))) {
          lines.push(entry);
        }
      }
    }

    // Files currently being worked on (uncommitted changes)
    const changed = git('diff --name-only', project.path);
    const staged = git('diff --cached --name-only', project.path);
    const allChanged = [...new Set([...changed.split('\n'), ...staged.split('\n')].filter(Boolean))];

    if (allChanged.length > 0 && allChanged.length <= 10) {
      const fileList = allChanged.slice(0, 5).join(', ');
      const entry = `- [${timestamp}] **${project.name}** active files: ${fileList}`;
      // Only log if we haven't logged these exact files recently
      if (!noteContains(notePath, `**${project.name}** active files: ${fileList}`)) {
        lines.push(entry);
      }
    }

    // Today's commit summary (only once per day, early in the note)
    const todayCommits = git(`log --since="midnight" --oneline --no-merges`, project.path);
    if (todayCommits) {
      const count = todayCommits.split('\n').filter(Boolean).length;
      const summary = `- **${project.name}**: ${count} commit(s) today`;
      // Update this if count changed
      if (!noteContains(notePath, summary)) {
        lines.push(summary);
      }
    }
  }

  return lines;
}

// --- Claude Code Sessions ---

function observeClaude(notePath) {
  const lines = [];
  const timestamp = now();

  if (!existsSync(CLAUDE_SESSIONS)) return lines;

  const sessionFiles = readdirSync(CLAUDE_SESSIONS).filter(f => f.endsWith('.json'));

  for (const file of sessionFiles) {
    try {
      const sessionPath = join(CLAUDE_SESSIONS, file);
      const content = readFileSync(sessionPath, 'utf-8');

      // Check if session was active today
      const session = JSON.parse(content);
      if (!session || !session.lastActiveAt) continue;

      const sessionDate = new Date(session.lastActiveAt).toISOString().slice(0, 10);
      if (sessionDate !== today()) continue;

      // Extract project context if available
      const projectDir = session.cwd || session.workingDirectory || '';
      let projectName = 'unknown';
      if (projectDir.toLowerCase().includes('img creator')) projectName = 'IMG Creator';
      else if (projectDir.toLowerCase().includes('scraper')) projectName = 'Ad Scraper';
      else if (projectDir.toLowerCase().includes('setup')) projectName = 'Setup';
      else if (projectDir.toLowerCase().includes('obsidian')) projectName = 'Vault';

      const entry = `- [${timestamp}] Claude Code session in **${projectName}** (${file})`;
      if (!noteContains(notePath, file)) {
        lines.push(entry);
      }
    } catch { /* skip unparseable sessions */ }
  }

  return lines;
}

// --- Main ---

function main() {
  const date = today();
  const notePath = ensureNote(date);

  const gitLines = observeGit(notePath);
  const claudeLines = observeClaude(notePath);

  const allLines = [...gitLines, ...claudeLines];

  if (allLines.length > 0) {
    appendFileSync(notePath, allLines.join('\n') + '\n');
    console.log(`[${now()}] Added ${allLines.length} observations to ${date}.md`);
  } else {
    console.log(`[${now()}] No new observations for ${date}.md`);
  }
}

main();
