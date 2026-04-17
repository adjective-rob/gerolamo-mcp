#!/usr/bin/env node

/**
 * Gerolamo MCP CLI — one-command setup for connecting your agent to Gerolamo.
 *
 * Usage:
 *   npx @adjective-rob/gerolamo-mcp setup
 *   npx @adjective-rob/gerolamo-mcp setup --key ger_xxx
 *   npx @adjective-rob/gerolamo-mcp info
 */

import * as fs from "node:fs";
import * as path from "node:path";
import * as readline from "node:readline";
import { getConfig, GEROLAMO_MCP_URL, TOOLS } from "./index.js";

const CLAUDE_MCP_PATH = path.join(
  process.env.HOME ?? process.env.USERPROFILE ?? "~",
  ".claude",
  "mcp.json"
);

function readMcpConfig(): Record<string, unknown> {
  try {
    const content = fs.readFileSync(CLAUDE_MCP_PATH, "utf-8");
    return JSON.parse(content);
  } catch {
    return {};
  }
}

function writeMcpConfig(config: Record<string, unknown>): void {
  const dir = path.dirname(CLAUDE_MCP_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(CLAUDE_MCP_PATH, JSON.stringify(config, null, 2) + "\n");
}

async function promptForKey(): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(
      "Enter your Gerolamo API key (get one at https://gerolamo.org/settings): ",
      (answer) => {
        rl.close();
        resolve(answer.trim());
      }
    );
  });
}

async function setup(apiKey?: string): Promise<void> {
  console.log("\n  Gerolamo MCP Setup\n");

  if (!apiKey) {
    apiKey = await promptForKey();
  }

  if (!apiKey) {
    console.error("  Error: API key is required.");
    console.error("  Sign up at https://gerolamo.org and generate a key in Settings.\n");
    process.exit(1);
  }

  if (!apiKey.startsWith("ger_")) {
    console.error("  Error: Invalid key format. Gerolamo API keys start with 'ger_'.\n");
    process.exit(1);
  }

  // Read existing config
  const existing = readMcpConfig();
  const mcpServers = (existing.mcpServers ?? {}) as Record<string, unknown>;

  // Add Gerolamo
  const gerolamoConfig = getConfig(apiKey);
  mcpServers.gerolamo = gerolamoConfig.mcpServers.gerolamo;

  // Write back
  existing.mcpServers = mcpServers;
  writeMcpConfig(existing);

  console.log(`  Added Gerolamo to ${CLAUDE_MCP_PATH}`);
  console.log(`  Endpoint: ${GEROLAMO_MCP_URL}`);
  console.log(`  Tools available: ${Object.keys(TOOLS).length}`);
  console.log("\n  Restart Claude Code to connect.\n");
}

function info(): void {
  console.log("\n  Gerolamo MCP Server");
  console.log("  Competitive intelligence across 30k+ open-source projects\n");
  console.log(`  Endpoint: ${GEROLAMO_MCP_URL}`);
  console.log(`  Site: https://gerolamo.org`);
  console.log(`  Tools: ${Object.keys(TOOLS).length}\n`);

  for (const [name, desc] of Object.entries(TOOLS)) {
    console.log(`    ${name}`);
    console.log(`      ${desc}\n`);
  }
}

// --- Main ---

const command = process.argv[2];
const keyFlag = process.argv.indexOf("--key");
const keyArg = keyFlag !== -1 ? process.argv[keyFlag + 1] : undefined;

switch (command) {
  case "setup":
    setup(keyArg);
    break;
  case "info":
    info();
    break;
  default:
    console.log("\n  Gerolamo MCP\n");
    console.log("  Usage:");
    console.log("    npx @adjective-rob/gerolamo-mcp setup          Set up Gerolamo in Claude Code");
    console.log("    npx @adjective-rob/gerolamo-mcp setup --key K  Set up with a specific API key");
    console.log("    npx @adjective-rob/gerolamo-mcp info           List all available tools\n");
    break;
}
