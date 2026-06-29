# Gerolamo MCP

Connect your agent to [Gerolamo](https://gerolamo.org) — competitive intelligence across 36,000+ open-source projects, research papers, and ML models, plus foundation model economics via Via Mentis.

Every entity is scored for defensibility (1-10), frontier-lab risk, threat profile, and composability. Your agent can search, analyze, compare, compose technology stacks, and get model recommendations.

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
console.log(Object.keys(TOOLS)); // 32 tools
```

## Available Tools (32)

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
- **`ideate_from_brief`** — Grounded, cited ideation from a solicitation/brief (RFI, Sources Sought, OTA, SBIR)
- **`compose_molecules`** — Fuse a kit of entities, concepts, and/or patterns (atom_ids) into specs, comparisons, or research briefs
- **`save_composition`** — Persist a generated composition with lineage tracking and shareable URL
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
- **`recommend_model`** — Recommend the best model for a task based on capabilities, quality, and cost
- **`check_model_pricing`** — Foundation model pricing lookup
- **`compare_foundation_models`** — Side-by-side model comparison
- **`get_domination_risk`** — AI capability domination risk analysis

### Topic Intelligence
- **`get_tracked_topics`** — List all tracked topics with entity counts, defensibility, and risk stats

### Meta Molecules & Lineage
- **`submit_meta_molecule`** — Create a speculative meta molecule with required parent lineage
- **`realize_meta_molecule`** — Connect a meta molecule to a real URL and queue for ingestion
- **`trace_lineage`** — Trace ancestors or descendants of any entity or meta molecule
- **`find_family`** — Full lineage family — ancestors, descendants, and direct edges

### Workspace
- **`create_workspace`** — Create a named workspace with entities
- **`add_to_workspace`** — Add entities to an existing workspace
- **`submit_molecule`** — Submit a URL for ingestion into the corpus

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
→ you end up with: meta molecules, compositions, submitted research
```

**8 workflows available:**

| Workflow | What it does | Difficulty |
|----------|-------------|------------|
| `domain-discovery` | Deep-dive a domain, find gaps, synthesize new ideas, build spec | Intermediate |
| `cross-domain-intersection` | Find novel overlaps between tracked domains | Advanced |
| `sleeper-hunt` | Find hidden gems and build something from them | Intermediate |
| `stack-audit` | Audit dependencies, find weak links, discover alternatives | Beginner |
| `creator-deep-dive` | Profile a creator, map network, predict next move | Intermediate |
| `investment-thesis` | Market dynamics, defensible players, buy/watch/pass | Advanced |
| `model-selection` | Compare foundation models for a use case | Beginner |
| `trend-spotter` | Spot emerging trends, 90-day predictions | Intermediate |

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

**Pick the right model for your project:**
```
recommend_model(task="vision-based document extraction", require="vision,structured_output", prefer="value")
→ check_model_pricing(provider="google")
→ compare_foundation_models(model_names="Gemini Flash, GPT-4o Mini, Claude Haiku")
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
- [gerolamo-workflows](https://github.com/adjective-rob/gerolamo-workflows) — Agent workflow templates (open source)
- [API Docs](https://gerolamo.onrender.com/docs) — OpenAPI documentation
- [llms.txt](https://gerolamo.onrender.com/llms.txt) — Agent discovery file
