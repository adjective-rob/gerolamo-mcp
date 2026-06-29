/**
 * Gerolamo MCP — competitive intelligence for agents.
 *
 * Provides connection configuration and helpers for integrating
 * Gerolamo's 32 MCP tools into any agent framework.
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
 * @param apiKey - Your Gerolamo API key (starts with "glm_"). Get one at https://gerolamo.org → Connect
 * @param url - Optional custom MCP endpoint URL (defaults to production)
 * @returns MCP client configuration object
 *
 * @example
 * ```typescript
 * import { getConfig } from "gerolamo-mcp";
 * const config = getConfig("glm_your_key_here");
 * // Pass to your MCP client
 * ```
 */
export function getConfig(apiKey: string, url?: string): GerolamoMcpConfig {
  if (!apiKey) {
    throw new Error(
      "Gerolamo API key is required. Get one at https://gerolamo.org → Connect"
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
    "Semantic search across all corpora — repos, papers, models. Set include_meta=true to include concepts",
  search_intelligence:
    "RAG-synthesized answer to a research question. Set include_meta=true to include concepts",
  find_sleepers:
    "High-scoring, low-traction sources, the hidden gems",
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
  ideate_from_brief:
    "Ideate grounded technical approaches from a solicitation/brief (RFI, Sources Sought, OTA, SBIR) — decomposes requirements, grounds each in the corpus, synthesizes cited approaches, flags coverage gaps",
  compose_molecules:
    "Fuse a working kit of entities, concepts, and/or patterns (atom_ids) into specs, comparisons, or research briefs — the engine uses the pieces that serve the target and reports what it used. model=self for credit-free client-side composition",
  save_composition:
    "Persist a generated enhancement (spec, research brief, etc.) with lineage tracking and a shareable URL",
  suggest_tools:
    "Recommend which Gerolamo tools to use for a task",

  // Patterns & enhancements
  distill:
    "Distill a source into its reusable patterns (the building-block mechanisms inside it), each with a takes-X-produces-Y interface, effect, and provenance",
  search_patterns:
    "Search the pattern library of reusable mechanisms — hybrid keyword + semantic with a relevance floor, sortable (relevance/newest/corroborated) and filterable by effect mode and corroboration",
  compose_enhancement:
    "Compose patterns into an enhancement (a spec you apply to a project), grounded in real mechanisms and attributed to their sources. model=self for credit-free client-side composition",

  // Intelligence briefs
  get_intelligence_brief:
    "Combined situation report: sleepers, trending, breakouts",
  get_my_latest_intelligence: "Latest subscription alert results",

  // Creators
  get_creator_profile: "Creator portfolio with authority stats",
  get_creator_network: "Creator collaboration graph",
  get_creator_authority: "Creator authority score lookup",
  find_defensible_clusters: "Cluster detection across the corpus",

  // Workspace management
  create_workspace: "Create a named workspace with entities",
  add_to_workspace: "Add entities to an existing workspace",
  submit_source: "Submit a URL to add a source to the corpus",

  // Topic intelligence
  get_tracked_topics:
    "List all tracked topics with entity counts, defensibility, and risk stats — use for research direction",

  // Concepts & lineage
  submit_meta_molecule:
    "Create a speculative concept with required parent lineage",
  realize_meta_molecule:
    "Connect a concept to a real URL and queue for ingestion",
  trace_lineage:
    "Trace ancestors or descendants of any entity or concept",
  find_family:
    "Full lineage family — ancestors, descendants, and direct edges",

  // Workflows
  list_workflows:
    "List all available agent workflow templates — multi-step prompt chains for common tasks",
  get_workflow:
    "Get a workflow's full prompt template by slug — agent reads and executes the steps",
} as const;

export type GerolamoTool = keyof typeof TOOLS;
