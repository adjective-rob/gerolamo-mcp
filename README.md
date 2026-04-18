# Gerolamo MCP

Connect your agent to [Gerolamo](https://gerolamo.org) — competitive intelligence across 30,000+ open-source projects, research papers, and ML models.

Every entity is scored for defensibility (1-10), frontier-lab risk, threat profile, and composability. Your agent can search, analyze, compare, and compose technology stacks.

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
        "X-API-Key": "ger_your_key_here"
      }
    }
  }
}
```

## Programmatic Usage

```typescript
import { getConfig, TOOLS } from "gerolamo-mcp";

// Generate MCP config
const config = getConfig("ger_your_key_here");

// List available tools
console.log(Object.keys(TOOLS)); // 22 tools
```

## Available Tools (22)

### Intelligence Search
- **`query_intelligence`** — Semantic search across all corpora
- **`search_intelligence`** — RAG-synthesized answer to a research question
- **`find_sleepers`** — High-defensibility, low-traction hidden gems
- **`find_alternatives`** — Find projects that could replace a given entity

### Analysis
- **`score_stack`** — Weakest-link defensibility analysis for a dependency set
- **`explain_score`** — Full reasoning behind an entity's defensibility score
- **`analyze_competitive_landscape`** — Velocity-ranked topic analysis
- **`explore_connections`** — 5 rings of intelligence context around an entity

### Composition
- **`compose_molecules`** — Fuse entities into specs, comparisons, or research briefs
- **`suggest_tools`** — Recommend which Gerolamo tools to use for a task

### Intelligence Briefs
- **`get_intelligence_brief`** — Combined situation report: sleepers, trending, breakouts
- **`get_my_latest_intelligence`** — Latest subscription alert results

### Creator Analysis
- **`get_creator_profile`** — Creator portfolio with authority stats
- **`get_creator_network`** — Creator collaboration graph
- **`get_creator_authority`** — Creator authority score lookup
- **`find_defensible_clusters`** — Cluster detection across the corpus

### Foundation Models (Via Mentis)
- **`check_model_pricing`** — Foundation model pricing lookup
- **`compare_foundation_models`** — Side-by-side model comparison
- **`get_domination_risk`** — AI capability domination risk analysis

### Workspace
- **`create_workspace`** — Create a named workspace with entities
- **`add_to_workspace`** — Add entities to an existing workspace
- **`submit_molecule`** — Submit a URL for ingestion into the corpus

## Example Workflows

**Scout before you build:**
```
suggest_tools("I need to build an autonomous drone system")
→ get_intelligence_brief(topic="autonomous drone middleware")
→ find_sleepers(query="flight controller SLAM", min_score=6)
→ compose_molecules(entity_ids=[...], mode="compose")
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
npx gerolamo-mcp setup          # Configure Claude Code
npx gerolamo-mcp setup --key K   # Configure with specific key
npx gerolamo-mcp info             # List all tools
```

## Links

- [Gerolamo](https://gerolamo.org) — Web interface
- [API Docs](https://gerolamo.onrender.com/docs) — OpenAPI documentation
- [llms.txt](https://gerolamo.onrender.com/llms.txt) — Agent discovery file
