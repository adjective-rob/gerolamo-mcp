/**
 * Gerolamo MCP — competitive intelligence for agents.
 *
 * Provides connection configuration and helpers for integrating
 * Gerolamo's 22 MCP tools into any agent framework.
 */

export const GEROLAMO_MCP_URL = "https://gerolamo.onrender.com/mcp/sse";
export const GEROLAMO_SITE_URL = "https://gerolamo.org";

export interface GerolamoMcpConfig {
  mcpServers: {
    gerolamo: {
      url: string;
      headers: {
        "X-API-Key": string;
      };
    };
  };
}

/**
 * Generate MCP client configuration for Gerolamo.
 *
 * Use this to programmatically configure any MCP-compatible client.
 *
 * @param apiKey - Your Gerolamo API key (starts with "ger_"). Get one at https://gerolamo.org/settings
 * @param url - Optional custom MCP endpoint URL (defaults to production)
 * @returns MCP client configuration object
 *
 * @example
 * ```typescript
 * import { getConfig } from "gerolamo-mcp";
 * const config = getConfig("ger_your_key_here");
 * // Pass to your MCP client
 * ```
 */
export function getConfig(apiKey: string, url?: string): GerolamoMcpConfig {
  if (!apiKey) {
    throw new Error(
      "Gerolamo API key is required. Get one at https://gerolamo.org/settings"
    );
  }
  return {
    mcpServers: {
      gerolamo: {
        url: url ?? GEROLAMO_MCP_URL,
        headers: {
          "X-API-Key": apiKey,
        },
      },
    },
  };
}

/**
 * Available Gerolamo MCP tools and their descriptions.
 * Useful for documentation or dynamic tool selection.
 */
export const TOOLS = {
  // Intelligence search
  query_intelligence:
    "Semantic search across all corpora — repos, papers, models",
  search_intelligence: "RAG-synthesized answer to a research question",
  find_sleepers:
    "High-defensibility, low-traction molecules — hidden gems",
  find_alternatives:
    "Find projects that could replace a given entity",

  // Analysis
  score_stack:
    "Weakest-link defensibility analysis for a dependency set",
  explain_score:
    "Full reasoning behind an entity's defensibility score",
  analyze_competitive_landscape:
    "Velocity-ranked topic analysis",
  explore_connections:
    "5 rings of intelligence context around an entity",

  // Composition
  compose_molecules:
    "Fuse entities into specs, comparisons, or research briefs",
  suggest_tools:
    "Recommend which Gerolamo tools to use for a task",

  // Intelligence briefs
  get_intelligence_brief:
    "Combined situation report: sleepers, trending, breakouts",
  get_my_latest_intelligence: "Latest subscription alert results",

  // Creators
  get_creator_profile: "Creator portfolio with authority stats",
  get_creator_network: "Creator collaboration graph",
  get_creator_authority: "Creator authority score lookup",
  find_defensible_clusters: "Cluster detection across the corpus",

  // Foundation models (Via Mentis)
  check_model_pricing: "Foundation model pricing lookup",
  compare_foundation_models: "Side-by-side model comparison",
  get_domination_risk: "AI capability domination risk analysis",

  // Workspace management
  create_workspace: "Create a named workspace with entities",
  add_to_workspace: "Add entities to an existing workspace",
  submit_molecule: "Submit a URL for ingestion into the corpus",
} as const;

export type GerolamoTool = keyof typeof TOOLS;
