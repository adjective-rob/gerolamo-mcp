# Gerolamo MCP

Connect your agent to [Gerolamo](https://gerolamo.org) — competitive intelligence across 36,000+ open-source projects, research papers, and ML models.

Every entity is scored for utility, momentum, and corroboration, with frontier-lab risk, threat profile, and composability. Your agent can search the corpus, distill reusable patterns, compose enhancements and specs, profile creators, and trace lineage.

## Quick Setup

```bash
npx gerolamo-mcp setup
```

This adds Gerolamo to your Claude Code MCP configuration. You'll need an API key:

1. Go to [gerolamo.org](https://gerolamo.org) and request an account
2. Once approved, sign in
3. Go to **Connect** and generate an API key

## Manual Setup

Add to `~/.claude/mcp.json`:

```json
{
  "mcpServers": {
    "gerolamo": {
      "url": "https://gerolamo.onrender.com/mcp/sse",
      "headers": {
        "X-API-Key": "glm_your_key_here"
      }
    }
  }
}
```

## Programmatic Usage

```typescript
import { getConfig, TOOLS } from "gerolamo-mcp";

// Generate MCP config
const config = getConfig("glm_your_key_here");

// List available tools
console.log(Object.keys(TOOLS)); // 31 tools
```

## Vocabulary

Gerolamo's corpus is organized into four altitudes. The tool names are stable wire identifiers, but the concepts they work on are:

- **Source** — a real corpus entity (a repo, paper, or model).
- **Pattern** — a reusable mechanism distilled out of a source (takes-X-produces-Y).
- **Concept** — a speculative project idea with parent lineage (formerly "meta molecule").
- **Enhancement** — a spec you compose from patterns and apply to a project.

## Available Tools (31)

### Intelligence Search
- **`query_intelligence`** — Semantic search across all corpora (set `include_meta=true` to include concepts)
- **`search_intelligence`** — RAG-synthesized answer to a research question
- **`find_sleepers`** — High-scoring, low-traction sources — the hidden gems
- **`find_alternatives`** — Find projects that could replace a given entity

### Analysis
- **`score_stack`** — Weakest-link defensibility analysis for a dependency set
- **`explain_score`** — Full reasoning behind an entity's score
- **`analyze_competitive_landscape`** — Velocity-ranked topic analysis
- **`explore_connections`** — 5 rings of intelligence context around an entity

### Composition
- **`ideate_from_brief`** — Grounded, cited ideation from a solicitation/brief (RFI, Sources Sought, OTA, SBIR)
- **`compose_molecules`** — Fuse a kit of entities, concepts, and/or patterns into specs, comparisons, or research briefs
- **`save_composition`** — Persist a generated enhancement with lineage tracking and a shareable URL
- **`suggest_tools`** — Recommend which Gerolamo tools to use for a task

### Patterns & Enhancements
- **`distill`** — Distill a source into its reusable patterns, each with an interface, effect, and provenance
- **`search_patterns`** — Search the pattern library — hybrid keyword + semantic, sortable and filterable
- **`compose_enhancement`** — Compose patterns into an enhancement, attributed to their sources

### Intelligence Briefs
- **`get_intelligence_brief`** — Combined situation report: sleepers, trending, breakouts
- **`get_my_latest_intelligence`** — Latest subscription alert results

### Creator Analysis
- **`get_creator_profile`** — Creator portfolio with authority stats
- **`get_creator_network`** — Creator collaboration graph
- **`get_creator_authority`** — Creator authority score lookup
- **`find_defensible_clusters`** — Cluster detection across the corpus

### Topic Intelligence
- **`get_tracked_topics`** — List all tracked topics with entity counts and risk stats

### Concepts & Lineage
- **`submit_meta_molecule`** — Create a speculative concept with required parent lineage
- **`realize_meta_molecule`** — Connect a concept to a real URL and queue for ingestion
- **`trace_lineage`** — Trace ancestors or descendants of any entity or concept
- **`find_family`** — Full lineage family — ancestors, descendants, and direct edges

### Workspace
- **`create_workspace`** — Create a named workspace with entities
- **`add_to_workspace`** — Add entities to an existing workspace
- **`submit_source`** — Submit a URL to add a source to the corpus

### Workflows
- **`list_workflows`** — List all available agent workflow templates
- **`get_workflow`** — Get a workflow's full prompt template by slug

## Agent Workflows

Workflows are multi-step prompt templates that chain MCP tools into complete intelligence operations. Instead of figuring out which tools to call and in what order, your agent loads a workflow and follows the steps.

```
"Run the Domain Discovery workflow for autonomous agents"
→ agent calls get_workflow("domain-discovery")
→ agent reads the 6-step prompt
→ agent executes each step using MCP tools, thinking between steps
→ you end up with: concepts, enhancements, submitted research
```

Browse and contribute workflows at [gerolamo-workflows](https://github.com/adjective-rob/gerolamo-workflows).

## Example Tool Chains

**Scout before you build:**
```
suggest_tools("I need to build an autonomous drone system")
→ get_intelligence_brief(topic="autonomous drone middleware")
→ find_sleepers(query="flight controller SLAM", min_score=6)
→ compose_molecules(entity_ids=[...], mode="compose")
→ save_composition(workspace_name="Drone Stack", mode="compose", result=<output>, entity_ids=[...])
```

**Distill patterns and compose an enhancement:**
```
query_intelligence(question="retrieval-augmented generation")
→ distill(source_id="<source-uuid>")
→ search_patterns(query="chunking strategy", effect="retrieval")
→ compose_enhancement(pattern_ids=[...])
```

**Threat-check your dependencies:**
```
score_stack(entity_ids=["uuid1", "uuid2", "uuid3"])
→ explain_score(entity_id="weakest-link-uuid")
→ find_alternatives(entity_id="weakest-link-uuid")
```

**Compare before you choose:**
```
query_intelligence(question="vector database")
→ compose_molecules(entity_ids=[...], mode="compare")
```

## CLI Commands

```bash
npx gerolamo-mcp setup           # Configure Claude Code
npx gerolamo-mcp setup --key K   # Configure with specific key
npx gerolamo-mcp info            # List all tools
```

## Links

- [Gerolamo](https://gerolamo.org) — Web interface
- [gerolamo-workflows](https://github.com/adjective-rob/gerolamo-workflows) — Agent workflow templates (open source)
- [API Docs](https://gerolamo.onrender.com/docs) — OpenAPI documentation
- [llms.txt](https://gerolamo.onrender.com/llms.txt) — Agent discovery file
