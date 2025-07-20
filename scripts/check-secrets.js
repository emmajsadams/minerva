#!/usr/bin/env node

/**
 * Simple secret scanning script for pre-commit hooks
 * Checks for common secret patterns in staged files
 */

import { execSync } from "child_process";
import { readFileSync } from "fs";

const SECRET_PATTERNS = [
  // API Keys
  /api[_-]?key[_-]?=[\s]*["\']?[a-zA-Z0-9]{20,}["\']?/gi,
  /secret[_-]?key[_-]?=[\s]*["\']?[a-zA-Z0-9]{20,}["\']?/gi,

  // JWT tokens
  /eyJ[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*\.[a-zA-Z0-9_-]*/g,

  // AWS keys
  /AKIA[0-9A-Z]{16}/g,
  /aws[_-]?access[_-]?key[_-]?id[\s]*=[\s]*["\']?[A-Z0-9]{20}["\']?/gi,
  /aws[_-]?secret[_-]?access[_-]?key[\s]*=[\s]*["\']?[A-Za-z0-9/+=]{40}["\']?/gi,

  // GitHub tokens
  /ghp_[a-zA-Z0-9]{36}/g,
  /github[_-]?token[\s]*=[\s]*["\']?[a-zA-Z0-9]{40}["\']?/gi,

  // Private keys
  /-----BEGIN [A-Z ]+PRIVATE KEY-----/g,

  // Database URLs with credentials
  /postgresql:\/\/[a-zA-Z0-9_.-]+:[a-zA-Z0-9_.-]+@[a-zA-Z0-9_.-]+/gi,
  /mongodb:\/\/[a-zA-Z0-9_.-]+:[a-zA-Z0-9_.-]+@[a-zA-Z0-9_.-]+/gi,

  // Generic patterns
  /password[\s]*=[\s]*["\'][^"'\s]{8,}["\']?/gi,
  /token[\s]*=[\s]*["\'][a-zA-Z0-9]{20,}["\']?/gi,
];

const IGNORED_FILES = [
  "package-lock.json",
  "bun.lock",
  "node_modules/",
  ".git/",
  "scripts/check-secrets.js", // Don't scan this file itself
];

function getStagedFiles() {
  try {
    const output = execSync("git diff --cached --name-only", {
      encoding: "utf8",
    });
    return output
      .trim()
      .split("\n")
      .filter((file) => file.length > 0);
  } catch (error) {
    console.error("Error getting staged files:", error.message);
    return [];
  }
}

function shouldIgnoreFile(filePath) {
  return IGNORED_FILES.some((ignored) => filePath.includes(ignored));
}

function scanFileForSecrets(filePath) {
  try {
    const content = readFileSync(filePath, "utf8");
    const violations = [];

    SECRET_PATTERNS.forEach((pattern) => {
      const matches = content.match(pattern);
      if (matches) {
        matches.forEach((match) => {
          violations.push({
            file: filePath,
            pattern: pattern.toString(),
            match: match.substring(0, 50) + (match.length > 50 ? "..." : ""),
            line: content.substring(0, content.indexOf(match)).split("\n")
              .length,
          });
        });
      }
    });

    return violations;
  } catch {
    // File might be binary or deleted, skip
    return [];
  }
}

function main() {
  console.log("🔍 Scanning for secrets...");

  const stagedFiles = getStagedFiles();
  if (stagedFiles.length === 0) {
    console.log("✅ No staged files to scan");
    return;
  }

  let allViolations = [];

  stagedFiles.forEach((filePath) => {
    if (shouldIgnoreFile(filePath)) {
      return;
    }

    const violations = scanFileForSecrets(filePath);
    allViolations = allViolations.concat(violations);
  });

  if (allViolations.length > 0) {
    console.error("❌ Potential secrets found:");
    allViolations.forEach((violation) => {
      console.error(
        `  ${violation.file}:${violation.line} - ${violation.match}`
      );
    });
    console.error(
      "\n🚨 Commit blocked! Please remove secrets before committing."
    );
    process.exit(1);
  }

  console.log("✅ No secrets detected");
}

main();
