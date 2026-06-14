# Link Research Catalog
**Generated:** 2026-06-14  
**Purpose:** Comprehensive analysis of 280 links — categorized by type, summarized, and assessed for relevance to the Sandpitt Inspection System (FastAPI + Next.js + React Native + PostgreSQL + MinIO + Keycloak).

---

## Table of Contents

1. [Claude Plugins, Skills & Agents](#1-claude-plugins-skills--agents)
2. [Claude Connectors & Platform Integrations](#2-claude-connectors--platform-integrations)
3. [Claude Code Tools & Resources](#3-claude-code-tools--resources)
4. [AI App Builders & Coding Tools](#4-ai-app-builders--coding-tools)
5. [LLM Platforms, APIs & Self-Hosted AI](#5-llm-platforms-apis--self-hosted-ai)
6. [Self-Hosting & Deployment Platforms](#6-self-hosting--deployment-platforms)
7. [Authentication & Identity Management](#7-authentication--identity-management)
8. [Database, Storage & Immutable Ledger](#8-database-storage--immutable-ledger)
9. [Project Management & Productivity](#9-project-management--productivity)
10. [Automation & Workflow Tools](#10-automation--workflow-tools)
11. [Low-Code / No-Code Platforms & Data Tools](#11-low-code--no-code-platforms--data-tools)
12. [Asset & Inspection Management Systems](#12-asset--inspection-management-systems)
13. [Development Frameworks & Reference Examples](#13-development-frameworks--reference-examples)
14. [Community Discussions (Reddit)](#14-community-discussions-reddit)
15. [YouTube Videos](#15-youtube-videos)
16. [iOS / Apple Ecosystem Tools](#16-ios--apple-ecosystem-tools)
17. [Hosting Providers & VPS](#17-hosting-providers--vps)
18. [Miscellaneous / Not Relevant](#18-miscellaneous--not-relevant)

---

## 1. Claude Plugins, Skills & Agents

These are extensions, skill packs, and agent configurations for Claude — primarily sourced from [claude.com/plugins](https://claude.com/plugins), [claudepluginhub.com](https://www.claudepluginhub.com), and [mcpmarket.com](https://mcpmarket.com).

### Official Anthropic Plugin Pages

| Link | Name | Summary | How to Use | Sandpitt Relevance |
|------|------|---------|------------|-------------------|
| [claude.com/plugins](https://claude.com/plugins) | Claude Plugins Marketplace | Official directory of Claude plugins and skills. Browse, enable, and discover plugins to extend Claude's capabilities. | Visit in Claude.ai → Customize → Skills/Plugins | High — source for all skills usable in Sandpitt dev |
| [claude.com/plugins/playground](https://claude.com/plugins/playground?utm_source=google&utm_medium=pse_knwl&utm_campaign=acq_cowo_us&utm_content=fea_txt_v1&utm_term=nonbrandaiplugins&gclsrc=aw.ds&gad_source=1&gad_campaignid=23517065231&gbraid=0AAAAA99jmqvk5OHCJQpUkYNc72-ZA74Aj&gclid=CjwKCAjw5ZXQBhBdEiwAI5XVWVUSZwDJt9uvGWRyN_jfqLQ6StiCgJueqiEu8DUDxhs2bTVOm-88jxoCwFcQAvD_BwE) | Claude Playground Plugin | Interactive sandbox for experimenting with Claude's capabilities, testing prompts, and exploring plugin behaviors in real time. | Open Claude.ai → Plugins → Playground | Medium — useful for testing inspection prompts |
| [claude.com/plugins/superpowers](https://claude.com/plugins/superpowers?utm_source=google&utm_medium=pse_knwl&utm_campaign=acq_cowo_us&utm_content=fea_txt_v1&utm_term=nonbrandaiplugins&gclsrc=aw.ds&gad_source=1&gad_campaignid=23517065231&gbraid=0AAAAA99jmqvk5OHCJQpUkYNc72-ZA74Aj&gclid=CjwKCAjw5ZXQBhBdEiwAI5XVWVUSZwDJt9uvGWRyN_jfqLQ6StiCgJueqiEu8DUDxhs2bTVOm-88jxoCwFcQAvD_BwE) | Obra Superpowers Plugin | Official Anthropic "Superpowers" skill collection — a curated bundle of productivity and development sub-skills including brainstorming, code review, writing, and analysis modes. | Claude.ai → Customize → Skills → Enable Superpowers | High — brainstorming and code review directly applicable |
| [claude.com/plugins/code-review](https://claude.com/plugins/code-review?utm_source=google&utm_medium=pse_knwl&utm_campaign=acq_cowo_us&utm_content=fea_txt_v1&utm_term=nonbrandaiplugins&gclsrc=aw.ds&gad_source=1&gad_campaignid=23517065231&gbraid=0AAAAA99jmqvk5OHCJQpUkYNc72-ZA74Aj&gclid=CjwKCAjw5ZXQBhBdEiwAI5XVWVUSZwDJt9uvGWRyN_jfqLQ6StiCgJueqiEu8DUDxhs2bTVOm-88jxoCwFcQAvD_BwE) | Code Review Plugin | Anthropic's official Code Review plugin — structured code analysis, security review, style checks, and feedback generation. | Claude.ai → Customize → Skills → Enable Code Review; invoke via `/code-review` | Very High — directly applicable to all FastAPI + Next.js code |
| [claude.com/resources/tutorials](https://claude.com/resources/tutorials) | Claude Tutorials | Official tutorials covering how to use Claude features, plugins, connectors, agents, and Claude Code. | Visit page to browse tutorials | High — learning resource for Claude Code workflows |

### ClaudePluginHub — Plugins (Community Hub for Claude Skills)

**What ClaudePluginHub is:** A third-party community directory (`claudepluginhub.com`) that lists and explains Claude Code plugins, skills, agents, and MCP server configurations. Plugins here are installed into Claude Code via CLAUDE.md or settings.

| Link | Plugin Name | Summary | How to Invoke | Sandpitt Relevance |
|------|------------|---------|--------------|-------------------|
| [Obra Superpowers 2 — Brainstorming](https://www.claudepluginhub.com/skills/obra-superpowers-2/brainstorming) | Superpowers: Brainstorming | Sub-skill from the Superpowers pack. Structured brainstorming mode that helps generate and evaluate ideas systematically. | `/brainstorm [topic]` in Claude Code | High — useful for system design and feature planning |
| [Obra Superpowers 2](https://www.claudepluginhub.com/plugins/obra-superpowers-2) | Obra Superpowers 2 | Comprehensive Claude Code skill pack including brainstorming, code review, writing assistant, research, and analysis. A meta-collection of productivity sub-skills. | Install to CLAUDE.md; invoke specific sub-skills by name | High — all-in-one productivity booster |
| [Anthropic Essentials](https://www.claudepluginhub.com/plugins/anthropics-anthropic-essentials) | Anthropic Essentials | Core utility plugin from Anthropic containing foundational capabilities for coding, reasoning, and writing. Baseline skill set for effective Claude Code usage. | Enabled by default in Claude Code | High — always relevant |
| [Code Review Plugin](https://www.claudepluginhub.com/plugins/anthropics-code-review-plugins-code-review-2) | Anthropic Code Review v2 | Enhanced code review skill — security analysis, code smell detection, PR readiness checks, refactoring suggestions. More comprehensive than the basic version. | `/code-review` or via Claude Code session | Very High — review FastAPI routes, schemas, mobile code |
| [Feature Dev Plugin](https://www.claudepluginhub.com/plugins/anthropics-feature-dev-plugins-feature-dev-2) | Feature Dev v2 | End-to-end feature development workflow skill. Handles spec writing → implementation planning → code generation → testing → documentation in a structured pipeline. | `/feature-dev [feature description]` | Very High — streamlines Sandpitt feature development |
| [CLAUDE.md Management](https://www.claudepluginhub.com/plugins/anthropics-claude-md-management-plugins-claude-md-management) | CLAUDE.md Management | Automates maintenance and updates to CLAUDE.md project context files. Keeps project documentation in sync as code evolves. | `/update-claude-md` or automated via hooks | High — critical for keeping Sandpitt CLAUDE.md current |
| [Playwright Plugin](https://www.claudepluginhub.com/plugins/anthropics-playwright-external-plugins-playwright) | Playwright Automation | Browser automation skill via Playwright — enables Claude to navigate websites, fill forms, take screenshots, and run E2E tests. | `/playwright [action]` or via MCP server | High — E2E testing for admin UI and mobile web views |
| [Fullstack Dev Skills](https://www.claudepluginhub.com/plugins/jeffallan-fullstack-dev-skills) | Full-Stack Dev Skills (jeffallan) | Community-built plugin covering full-stack development patterns, API design, database modeling, and frontend-backend integration. | Install via plugin settings; use contextually | Very High — covers entire Sandpitt stack |
| [Agent Skills (addyosmani)](https://www.claudepluginhub.com/plugins/addyosmani-agent-skills) | Agent Skills by Addy Osmani | Plugin by Addy Osmani (Google Chrome team) featuring agent-oriented development patterns, performance-conscious coding, and web best practices. | Install to project; invoke by asking Claude | High — performance patterns for Next.js admin + React Native |
| [Everything Claude Code (affaan-m)](https://www.claudepluginhub.com/plugins/affaan-m-everything-claude-code) | Everything Claude Code | Comprehensive plugin pack covering all major Claude Code use cases — architecture, testing, deployment, and documentation. A broad skill set for full development workflows. | Install via CLAUDE.md; use contextually during development | Very High — comprehensive Sandpitt development support |
| [Caveman (juliusbrussee)](https://www.claudepluginhub.com/plugins/juliusbrussee-caveman) | Caveman | Simplicity-focused plugin that strips over-engineering and promotes plain, direct coding solutions. Pushes back against unnecessary abstraction. | Add to project context; it influences Claude's default coding style | Medium — good counterbalance to over-engineering |
| [Impeccable (pbakaus)](https://www.claudepluginhub.com/plugins/pbakaus-impeccable) | Impeccable | Code quality enforcement plugin — enforces consistent style, standards, naming conventions, and best practices across the codebase. | Install to project; used during all code generation | High — consistency across FastAPI + Next.js + mobile |
| [UI/UX Pro Max](https://www.claudepluginhub.com/plugins/nextlevelbuilder-ui-ux-pro-max) | UI/UX Pro Max | Design-focused skill for generating polished, accessible, and user-friendly UI components. Follows modern UX patterns and design systems. | `/ui-design [component]` or contextual | High — improves Sandpitt admin dashboard and mobile app UI |

### ClaudePluginHub — Agents

Agents are autonomous Claude Code configurations that take on specialized roles within a codebase.

| Link | Agent Name | Summary | How to Invoke | Sandpitt Relevance |
|------|-----------|---------|--------------|-------------------|
| [claudepluginhub.com/agents](https://www.claudepluginhub.com/agents) | Agents Directory | Browse all available Claude Code agents. Agents are preconfigured role-based AI assistants for specific development tasks. | Browse and copy agent definitions to CLAUDE.md | High — discover purpose-built agents for each role |
| [Refactor Cleaner](https://www.claudepluginhub.com/agents/burgebj-everything-claude-code-2/agents/refactor-cleaner) | Refactor Cleaner | Dedicated agent for cleaning up technical debt — renames variables, removes duplication, simplifies logic, and restructures without changing behavior. | Activate in session or via `/refactor` | High — useful after rapid prototyping of Sandpitt features |
| [Doc Updater](https://www.claudepluginhub.com/agents/burgebj-everything-claude-code-2/agents/doc-updater) | Documentation Updater | Keeps documentation synchronized with code changes. Automatically updates README files, API docs, and inline comments when code is modified. | `/doc-update` or trigger via hooks | High — keeps Sandpitt API docs and CLAUDE.md current |
| [Database Reviewer](https://www.claudepluginhub.com/agents/burgebj-everything-claude-code-2/agents/database-reviewer) | Database Reviewer | Specialized agent for reviewing database schemas, migrations, query performance, and data modeling decisions. | `/db-review` | Very High — critical for Sandpitt PostgreSQL + PostGIS schema |
| [Backend Architect](https://www.claudepluginhub.com/agents/sumeet138-data-engineering-plugins-data-engineering/agents/backend-architect) | Backend Architect (Data Engineering) | Systems design agent for backend architecture — designs API structures, data pipelines, service boundaries, and infrastructure topology. | Invoke when designing new backend features | Very High — FastAPI + PostgreSQL + Keycloak architecture design |
| [Code Architect](https://www.claudepluginhub.com/agents/anthropics-feature-dev-plugins-feature-dev-2/agents/code-architect) | Code Architect (Anthropic) | Official Anthropic agent for software architecture — evaluates design patterns, defines module boundaries, and creates implementation blueprints. | Invoke before starting new features | Very High — architectural guidance for Sandpitt |
| [Frontend Developer](https://www.claudepluginhub.com/agents/wshobson-frontend-mobile-development-plugins-frontend-mobile-development-2/agents/frontend-developer) | Frontend Developer | Specialized agent for frontend/mobile development — React Native, Next.js, TypeScript, component design, and state management. | Activate when working on admin or mobile app | Very High — covers both admin (Next.js) and mobile (React Native) |
| [Performance Optimizer](https://www.claudepluginhub.com/agents/burgebj-everything-claude-code-2/agents/performance-optimizer) | Performance Optimizer | Analyzes and optimizes code performance — database queries, API response times, bundle sizes, render cycles, and memory usage. | `/perf-optimize [area]` | High — SQL query optimization and API performance for Sandpitt |
| [Code Reviewer](https://www.claudepluginhub.com/agents/burgebj-everything-claude-code-2/agents/code-reviewer) | Code Reviewer | Peer-review style code analysis agent — checks for bugs, security issues, anti-patterns, and improvement opportunities before merges. | `/review` or via PR hooks | Very High — pre-merge quality gates for Sandpitt |
| [Planner](https://www.claudepluginhub.com/agents/burgebj-everything-claude-code-2/agents/planner) | Planner Agent | Creates structured implementation plans for features — breaks work into tasks, identifies dependencies, estimates complexity, and sequences development steps. | Invoke before starting any new feature | Very High — sprint planning and feature decomposition |
| [GAN Planner](https://www.claudepluginhub.com/agents/burgebj-everything-claude-code-2/agents/gan-planner) | GAN Planner | Advanced planning agent using iterative refinement (Generate-Analyze-Next) to create multi-stage development plans that improve through feedback loops. | Use for complex multi-component features | High — complex Sandpitt feature planning |

### ClaudePluginHub — Other Sections

| Link | Section | Summary | Use |
|------|---------|---------|-----|
| [MCP Servers](https://www.claudepluginhub.com/mcp-servers) | MCP Servers Directory | Lists available Model Context Protocol (MCP) servers — external tools/services that Claude can connect to for extended capabilities (databases, APIs, file systems). | Browse to find MCP servers for PostgreSQL, MinIO, etc. |
| [Technologies: Docker](https://www.claudepluginhub.com/technologies/docker) | Docker Integration | Docker-specific Claude plugins and agents for containerization, compose file generation, Dockerfile best practices, and Docker-based deployments. | Relevant for Sandpitt's docker-compose setup |
| [Technologies: Obsidian](https://www.claudepluginhub.com/technologies/obsidian) | Obsidian Integration | Plugins connecting Claude to Obsidian knowledge bases — enables Claude to read/write notes, search knowledge graphs, and use vault content as context. | Medium — if team uses Obsidian for docs |
| [Curated Marketplace (jmagar)](https://www.claudepluginhub.com/marketplaces/jmagar-curated-marketplace) | Community Curated Marketplace | Community-curated selection of highest-quality plugins and MCP servers, vetted by jmagar. Saves time browsing. | Browse for quality-filtered plugins |

### MCP Market Skills

| Link | Tool | Summary | How to Use | Sandpitt Relevance |
|------|------|---------|------------|-------------------|
| [Task Management for Claude Code](https://mcpmarket.com/tools/skills/task-management-for-claude-code) | Task Management Skill | MCP skill that adds structured task tracking inside Claude Code — create, assign, track, and complete tasks during development sessions. | Install via MCP config; use task commands in Claude Code | High — track Sandpitt development tasks in-context |
| [App Builder Templates](https://mcpmarket.com/tools/skills/app-builder-templates) | App Builder Templates | Pre-built application scaffolding templates for rapid development starts — API services, full-stack apps, mobile apps, and admin panels. | Install and use template commands to scaffold new modules | High — scaffold new Sandpitt modules quickly |

---

## 2. Claude Connectors & Platform Integrations

Connectors integrate external services directly into Claude's context window.

| Link | Tool | Summary | How to Invoke | Sandpitt Relevance |
|------|------|---------|--------------|-------------------|
| [claude.com/connectors](https://claude.com/connectors) | Claude Connectors Directory | Official directory of Claude data connectors — integrates Google Drive, Slack, GitHub, Jira, Confluence, and more directly into Claude chats. | Claude.ai → Customize → Connectors → Enable | High — GitHub connector for code context |
| [claude.ai/customize/connectors](https://claude.ai/customize/connectors) | Connector Settings UI | Personal settings page for enabling/disabling and authenticating Claude connectors. | Open in Claude.ai browser | High — manage which services Claude can access |
| [claude.ai/customize/skills](https://claude.ai/customize/skills) | Skills Settings UI | Personal settings page for enabling/disabling Claude skills and custom skill packs. | Open in Claude.ai browser | High — manage active skills for development work |
| [Railway Claude Agent](https://railway.com/agents/claude) | Railway × Claude Integration | Railway's native Claude Code integration — Claude can deploy apps, manage services, configure environments, and interact with Railway infrastructure via natural language. | `railway setup agent -y` in terminal | Medium — deploy Sandpitt to Railway |
| [Railway Claude Code Plugin Docs](https://docs.railway.com/ai/claude-code-plugin) | Railway Claude Code Plugin | Official documentation for the Railway Claude Code plugin — explains authentication, commands, and what Claude can do with Railway (deploy, logs, domains, variables). | Read docs; configure MCP in Claude Code settings | Medium — alternative deployment target for Sandpitt |
| [Railway Skills (GitHub)](https://github.com/railwayapp/railway-skills) | Railway Skills (Open Source) | Open-source agent skill definitions for Railway + Claude integration. The `use-railway` skill enables route-first intent routing for Railway actions. Works with Claude Code, Cursor, Grok Build, and OpenAI Codex. | Install via `railway setup agent -y`; MCP config for local dev | Medium — infrastructure automation |
| [OpenRouter — Claude Code Apps](https://openrouter.ai/apps/claude-code) | OpenRouter × Claude Code | OpenRouter's integration page for Claude Code — provides alternative model routing so Claude Code can use non-Anthropic models (DeepSeek, Llama, etc.) as backend. | Configure in Claude Code settings as alternative provider | Medium — cost optimization using free models |
| [OpenRouter — Hermes Agent](https://openrouter.ai/apps/hermes-agent) | OpenRouter × Hermes Agent | Integration page for running Nous Research's Hermes agent framework via OpenRouter's unified API. | Configure OpenRouter API key in Hermes setup | Low — alternative agent framework |

---

## 3. Claude Code Tools & Resources

Tools, guides, and open-source projects for improving Claude Code workflows.

| Link | Tool | Summary | Type | Sandpitt Relevance |
|------|------|---------|------|-------------------|
| [Claude Code Best Practices](https://code.claude.com/docs/en/best-practices) | Official Best Practices | Comprehensive Claude Code guide covering context window management, verification strategies, plan mode, permission modes, hooks, skills, and MCP servers. | Official docs | Very High — foundational guide for Sandpitt development |
| [GitHub Integration Guide](https://support.claude.com/en/articles/10167454-use-the-github-integration) | Claude × GitHub Integration | Step-by-step guide for connecting Claude to GitHub repositories — enables PR review, code context, and repository-aware conversations. | Official support article | Very High — Sandpitt GitHub integration |
| [Claude Code Tips (ykdojo)](https://github.com/ykdojo/claude-code-tips) | 43 Claude Code Tips | Community-maintained repository with 43 practical tips for Claude Code mastery — workflows, git integration, terminal tabs, debugging, and verification methods. | Open source guide | High — developer productivity for Sandpitt |
| [Claude Task Master](https://github.com/eyaltoledano/claude-task-master) | Claude Task Master | AI-powered task management system that integrates with Claude via MCP — converts PRDs (Product Requirements Documents) into structured, dependency-aware task lists. Works with Claude Code, Cursor, Windsurf. License: MIT + Commons Clause. | Install MCP server; point at PRD file → generates task breakdown | Very High — convert Sandpitt specs into trackable tasks |
| [CoTask (wbopan)](https://github.com/wbopan/cotask) | CoTask | Claude Code plugin for parallel task coordination with web dashboard — markdown-based task system with drag-and-drop UI, real-time monitoring, and human-in-the-loop agent coordination. Task lifecycle: backlog → todo → ongoing → done. | Install plugin; open web dashboard to manage tasks | High — manage parallel development streams in Sandpitt |
| [Claude Task Manager (npm)](https://www.npmjs.com/package/@gonzui/claude-task-manager) | Claude Task Manager (npm) | npm package for task management integrated with Claude Code sessions — create and track tasks programmatically within development workflows. | `npm install @gonzui/claude-task-manager` | Medium — lighter alternative to Task Master |
| [Automato: Build Task Manager](https://automato.substack.com/p/build-task-manager-claude-live-artifacts) | Tutorial: Task Manager with Live Artifacts | Substack guide showing how to build a task manager using Claude with live Artifacts — demonstrates building web apps directly in Claude's interface. | Read and follow tutorial | Medium — inspiration for Sandpitt task features |
| [Claudefa.st Project Templates](https://claudefa.st/blog/guide/development/project-templates) | Claude Fast — Project Templates | Guide for creating reusable Claude Code project templates and scaffolding — speeds up new project and module setup. | Read guide; create template files for Sandpitt | High — standardize new module creation |
| [Notion — Claude Dashboard Template](https://www.notion.com/templates/claude-dashboard-vibe-coding) | Notion Claude Dashboard Template | Notion template for tracking Claude Code development sessions — status boards, context documents, and vibe coding workflow management. | Import to Notion workspace | Low — tracking alternative |
| [Notion — Claude Dashboard App](https://app.notion.com/p/Claude-Dashboard-c6b5d79c42f38306b7b2816d2705813e) | Claude Dashboard (Notion App) | Interactive Notion-based dashboard for managing multiple Claude projects, tracking context, and organizing development workflows. | Access via Notion account | Low — optional tracking tool |
| [SingleFile MCP Server](https://github.com/kwinsch/singlefile-mcp) | SingleFile MCP Server | MCP server that extracts complete rendered content from JavaScript-heavy websites using SingleFile + Trafilatura — handles SPAs and paginated content. | Add to MCP config in Claude Code settings | Low-Medium — scraping external data for Sandpitt |
| [Task Dispatch Dashboard (Reddit)](https://www.reddit.com/r/ClaudeAI/comments/1qmrohh/offering_a_task_dispatch_dashboard_i_wrote_with/) | Task Dispatch Dashboard | Community-built task dispatch dashboard for managing Claude Code agents across multiple tasks — web UI for orchestrating parallel Claude sessions. | Read Reddit post for implementation details | Medium — multi-agent coordination pattern |

---

## 4. AI App Builders & Coding Tools

| Link | Tool | What It Is | Key Features | Sandpitt Relevance |
|------|------|-----------|-------------|-------------------|
| [Bolt.new](https://bolt.new) | Bolt.new | AI-powered full-stack web app builder by StackBlitz. Generate, run, and deploy web apps from natural language prompts in the browser. | Claude/GPT integration, Figma import, one-click deploy to bolt.host, Netlify/Supabase/Stripe integrations, AI image generation. Free tier + Pro $25/month. | Medium — rapid prototyping of Sandpitt UI screens |
| [Bolt.new Blog — Design System Agents](https://bolt.new/blog/introducing-design-system-agents) | Bolt Design System Agents | Blog post about Bolt's new design system agent feature — AI agents that understand and apply design systems consistently across generated components. | Design token awareness, component consistency, brand guidelines enforcement | High — if building Sandpitt component library |
| [Bolt.diy (GitHub)](https://github.com/stackblitz-labs/bolt.diy) | Bolt.diy | Open-source, self-hostable version of Bolt.new. Full control over deployment, models, and environment. Free to self-host. | Local execution, no cloud dependency, customizable models, Node.js | Medium — self-hosted alternative if privacy is priority |
| [Bolt.diy Showcase (Ottomator)](https://thinktank.ottomator.ai/c/bolt-diy/bolt-diy-project-showcases/23) | Bolt.diy Community Showcases | Community showcase thread on the Ottomator forum featuring projects built with Bolt.diy — provides inspiration and real-world examples. | Real project examples, tips, community support | Low — inspiration resource |
| [LlamaCoder (Together AI)](https://llamacoder.together.ai/) | LlamaCoder | Free, open-source AI web app code generator powered by Llama 3.1 405B. Generates full web applications from prompts — Claude Artifacts-style interface in browser. | 100% free, no login required, 200K+ apps generated, generates React/Next.js apps | Medium — free alternative to Bolt for quick Sandpitt UI prototypes |
| [Open Artifacts (Vercel)](https://openartifacts.vercel.app/) | Open Artifacts | Open-source version of Anthropic's Claude Artifacts — live coding canvas where AI-generated code can be executed and previewed inline with chat. Supports Python and Next.js. | Live preview, difference comparison, E2B Code Interpreter integration | Medium — useful for developing and testing Sandpitt component code |
| [Open Artifacts (GitHub)](https://github.com/13point5/open-artifacts) | Open Artifacts Source Code | GitHub repository for Open Artifacts — self-hostable version of the Claude Artifacts execution environment. MIT licensed. | Open source, self-hostable, Next.js + FastAPI compatible | Medium — self-host code execution environment |
| [Reflex](https://reflex.dev/docs/) | Reflex | Full-stack web framework where you write only Python — no JavaScript, HTML, or CSS required. Compiles to React automatically. Reactive state management built in. | Pure Python, React output, components, multi-page, integrates with any Python library | High — build Sandpitt admin UI entirely in Python (alternative to Next.js) |
| [Dyad (Product Hunt)](https://www.producthunt.com/products/dyad-free-local-vibe-coding-tool) | Dyad | Free, local vibe coding tool — AI-powered app builder that runs entirely locally without cloud dependencies. | Local execution, free, privacy-focused | Medium — private alternative to Bolt.new |
| [Dyad Privacy Policy](https://www.dyad.sh/docs/policies/privacy-policy) | Dyad Privacy Policy | Privacy policy for the Dyad vibe coding tool — explains data handling for the local app builder. | Privacy documentation | Low — reference only |

---

## 5. LLM Platforms, APIs & Self-Hosted AI

### Unified LLM APIs

| Link | Tool | Summary | Pricing | Sandpitt Relevance |
|------|------|---------|---------|-------------------|
| [OpenRouter (Models)](https://openrouter.ai/models?order=pricing-low-to-high) | OpenRouter | Unified API gateway for 300+ LLMs — single API key for Claude, GPT-4, Llama, DeepSeek, Gemini, and more. No credit card required for free tier. | Free models + pay-per-token ($0.05+/M tokens), 5.5% platform fee | High — flexible LLM backend, cost optimization for Sandpitt AI features |
| [OpenRouter Free Models](https://openrouter.ai/openrouter/free) | OpenRouter Free Tier | Lists all currently free models on OpenRouter — 25+ models with rate limits (20 req/min, 200 req/day). | Free (rate-limited) | High — free AI for development/testing |
| [DeepSeek Chat v3 Free](https://openrouter.ai/deepseek/deepseek-chat-v3-0324:free) | DeepSeek Chat v3 (Free) | DeepSeek's Chat v3 model available for free via OpenRouter — strong coding and reasoning model competitive with GPT-4. | Free (rate-limited) | High — free coding model for Sandpitt AI features |
| [NVIDIA Nemotron Free](https://openrouter.ai/nvidia/nemotron-3-ultra-550b-a55b:free#api) | NVIDIA Nemotron 550B (Free) | NVIDIA's Nemotron 550B parameter model — massive open-source model available free via OpenRouter. | Free (rate-limited) | Medium — large model for complex analysis tasks |
| [Together AI](https://www.together.ai/) | Together AI | LLM API provider with 200+ open-source models — serverless inference and dedicated GPU endpoints. $25 free credits for new accounts. | Pay-per-token ($0.05-$9/M tokens); dedicated endpoints from $6.49/hr | Medium — alternative LLM backend with free trial |

### Self-Hosted LLM Infrastructure

| Link | Tool | Summary | Key Features | Sandpitt Relevance |
|------|------|---------|-------------|-------------------|
| [LocalAI](https://localai.io/docs/overview/index.html) | LocalAI | Free, open-source, self-hosted OpenAI-compatible LLM server. Runs on CPU or GPU without cloud dependency. Drop-in OpenAI API replacement. | Multi-modal (vision, voice, image, video), MCP agent support, built-in web UI, cluster mode, no GPU required | High — on-premises AI for offline Sandpitt deployments |
| [Open WebUI](https://openwebui.com/) | Open WebUI | Feature-rich self-hosted web interface for local/remote LLMs. ChatGPT-style UI compatible with Ollama and OpenAI-compatible APIs. | Analytics dashboard, skill system, Python code execution, in-browser terminal, RAG support, offline operation | High — deploy as AI assistant UI alongside Sandpitt |
| [Open WebUI Home](https://openwebui.com/home?sort=hot) | Open WebUI Community | Community-contributed models, tools, prompts, and functions for Open WebUI. | Community marketplace | Medium — discover tools for Sandpitt integration |
| [Open WebUI — Tools](https://openwebui.com/search?sort=top&t=all&page=1&type=tool) | Open WebUI Tools | Browse community-built tools for Open WebUI — extend the platform's capabilities with custom functions. | Community tools directory | Medium — find inspection-relevant tools |
| [Open WebUI — Prompts](https://openwebui.com/search?sort=top&t=all&page=1&type=prompt) | Open WebUI Prompts | Browse community-contributed prompt templates for Open WebUI — reusable prompts for common tasks. | Prompt library | Medium — inspection report templates |
| [Open WebUI — Functions](https://openwebui.com/search?sort=top&t=all&page=1&type=function) | Open WebUI Functions | Browse community-built Python functions extending Open WebUI — API integrations, data processing, external service connections. | Function library | Medium — custom Sandpitt data integrations |
| [Open WebUI — Models](https://openwebui.com/search?sort=top&t=all&page=1&type=model) | Open WebUI Models | Browse community-shared model configurations for Open WebUI. | Model directory | Low — model discovery |
| [Open WebUI Getting Started](https://docs.openwebui.com/getting-started/essentials) | Open WebUI Docs | Official getting-started guide for Open WebUI — installation, configuration, and first run. | Setup guide | High — deploy alongside Sandpitt |
| [Open WebUI Alternatives](https://docs.openwebui.com/alternatives/) | Open WebUI Alternatives | Documentation page listing alternatives to Open WebUI for self-hosted LLM interfaces. | Comparison resource | Low — reference |

### Model Hubs & Research

| Link | Tool | Summary | Key Features | Sandpitt Relevance |
|------|------|---------|-------------|-------------------|
| [Hugging Face](https://huggingface.co/) | Hugging Face | World's largest AI model hub — 2M+ models, datasets, and deployment infrastructure. | Free tier (rate-limited), Pro $9/month, Enterprise $50+/user/month | High — source for open-source models for Sandpitt |
| [Hugging Face Pricing](https://huggingface.co/pricing) | Hugging Face Pricing | Detailed pricing for Hugging Face services — inference endpoints, storage, compute. | CPU $0.06/hr, T4 GPU $0.60/hr, ZeroGPU for enterprises | Medium — cost reference for model hosting |
| [Hugging Face Inference Models](https://huggingface.co/inference/models) | HF Inference API | Hosted inference API for models on Hugging Face Hub — run models without managing infrastructure. | Direct API access, free tier, no GPU required | High — inference API for inspection image analysis |
| [Nous Research](https://nousresearch.com/) | Nous Research | AI research company building specialized models — creators of Hermes series (Nous Hermes 2, Hermes 2 Pro with 32K context and function calling). | Function calling, JSON mode, enhanced reasoning, available free on HuggingFace | Medium — specialized models for structured data extraction |
| [Modelence Blog](https://modelence.com/blog) | Modelence | AI platform with real-time capabilities — focuses on WebSocket-based AI interactions and live data integrations. | WebSocket AI, real-time features | Medium — real-time AI for Sandpitt inspection updates |
| [Modelence WebSockets](https://docs.modelence.com/websockets) | Modelence WebSocket Docs | Documentation for Modelence's WebSocket API — enables real-time bidirectional AI interactions. | Real-time AI, WebSocket protocol | Medium — real-time inspection status updates |
| [HPC-AI Tech](https://company.hpc-ai.com/) | HPC-AI Tech | Deep learning acceleration platform — AutoML, GPU resource management, distributed training. Backed by $50M Series A. | Auto-deployment, auto-parallelism, auto-offloading | Low — enterprise ML infrastructure, likely overkill |

### Hermes Agent Ecosystem

| Link | Tool | Summary | Sandpitt Relevance |
|------|------|---------|-------------------|
| [Hermes Agent Free Models (dev.to)](https://dev.to/dalenguyen/free-model-providers-to-use-with-hermes-agent-13l9) | Guide: Free Models for Hermes | Article covering which free model providers work best with the Hermes agent framework — covers Groq, Together AI, and others. | Low — alternative agent framework |
| [Best Free Models for Hermes](https://www.remoteopenclaw.com/blog/best-free-models-for-hermes) | Best Free Models Guide | Blog post reviewing the best free LLM models compatible with Hermes agent. | Low — reference for Hermes users |
| [BazaarLink × Hermes](https://bazaarlink.ai/blog/hermes-agent-free-llm-api-bazaarlink) | BazaarLink Hermes Integration | BazaarLink's guide for using Hermes Agent with their free LLM API service. | Low — alternative free API |
| [HF Open Source LLMs Blog](https://huggingface.co/blog/daya-shankar/open-source-llms) | Open Source LLMs Overview | Hugging Face blog post surveying the open-source LLM landscape — model sizes, capabilities, licensing. | Low — reference overview |
| [Pinggy — Self-Hosted LLMs for Coding](https://pinggy.io/amp/blog/best_open_source_self_hosted_llms_for_coding/) | Best Self-Hosted Coding LLMs | Blog comparing top open-source models specifically for code generation — DeepSeek, CodeLlama, StarCoder, etc. | Medium — model selection for Sandpitt code features |

---

## 6. Self-Hosting & Deployment Platforms

All platforms assessed for fit with FastAPI + Next.js + PostgreSQL + Docker Compose deployment.

### PaaS / Container Deployment

| Link | Tool | Summary | Open Source | Self-Hosted | Rating | Sandpitt Fit |
|------|------|---------|------------|------------|--------|-------------|
| [CapRover](https://caprover.com/) | CapRover | Mature, easy-to-use container PaaS with Docker support, automatic HTTPS (Let's Encrypt), web UI, and one-click app deployments. Most popular self-hosted PaaS alternative. | Yes | Yes | ⭐⭐⭐⭐⭐ | **9/10** — Best fit for Sandpitt deployment |
| [CapRover Docs](https://caprover.com/docs/get-started.html) | CapRover Getting Started | Official setup guide — 5-minute installation on any VPS. | Yes | Yes | — | Reference |
| [Dokploy](https://dokploy.com/) | Dokploy | Modern CapRover alternative — Git integration, Docker support, zero-downtime deployments, database hosting, clean UI. More actively developed. | Yes | Yes | ⭐⭐⭐⭐⭐ | **9/10** — Strong alternative to CapRover |
| [Dokploy Self-Hosted PaaS](https://dokploy.com/self-hosted-paas) | Dokploy Features | Feature overview for Dokploy's self-hosted PaaS capabilities. | Yes | Yes | — | Reference |
| [Northflank](https://northflank.com/) | Northflank | Managed container deployment platform — multi-region, API-first, monitoring included. Not self-hostable but managed service. | No | No | ⭐⭐⭐ | **6/10** — Higher cost, no self-host |
| [Kubero](https://github.com/kubero-dev/kubero) | Kubero | Kubernetes-native PaaS — git integration, database hosting, full Kubernetes access, web UI. More powerful but steeper learning curve. | Yes | Yes | ⭐⭐⭐⭐ | **8/10** — Good for Kubernetes-native Sandpitt |
| [Komodo (GitHub)](https://github.com/moghtech/komodo) | Komodo | Multi-container orchestration tool with web-based UI and monitoring. Lightweight alternative to full Kubernetes. | Yes | Yes | ⭐⭐⭐ | **7/10** — Container management layer |
| [ZaneOps](https://zaneops.dev/) | ZaneOps | Developer-focused DevOps operations platform — CI/CD automation and deployment pipelines. | Unknown | Yes | ⭐⭐⭐ | **6/10** — Deployment automation |
| [Vito Deploy Blog](https://vitodeploy.com/blog) | Vito Deploy | Server provisioning and deployment automation tool — manages server setup, deployments, and infrastructure as code. | Unknown | Partial | ⭐⭐⭐ | **7/10** — Server automation |
| [SemaphoreUI](https://semaphoreui.com/) | Semaphore UI | Web-based UI for Ansible automation — visual interface for running Ansible playbooks and managing infrastructure. | Yes | Yes | ⭐⭐⭐ | **6/10** — Good for infrastructure automation |

### Personal Server / Home Lab Platforms

| Link | Tool | Summary | Best For | Sandpitt Fit |
|------|------|---------|---------|-------------|
| [Runtipi](https://runtipi.io/) | Runtipi | One-click app installer for personal servers — home automation and media server focus, Docker-based. | Home servers, personal use | **4/10** — Not suited for production apps |
| [Umbrel OS](https://umbrel.com/umbrelos) | Umbrel | Personal server OS with app marketplace — Bitcoin/Lightning Network focus but supports general apps. | Personal/home use | **4/10** — Not production-ready |
| [YunoHost](https://yunohost.org/) | YunoHost | Server OS for home/small business — multi-domain, user management, app catalog, Let's Encrypt, backups. | Small teams, self-hosted web apps | **5/10** — Too limited for multi-service stack |
| [Syncloud](https://syncloud.org/) | Syncloud | Personal cloud OS — file sync, web hosting, app management, no account required. | Personal cloud | **4/10** — Not for production |
| [Sandstorm](https://sandstorm.org/) | Sandstorm | Sandboxed self-hosting platform — grain-based app isolation. No user management complexity. | Privacy-focused personal use | **4/10** — Not flexible enough |
| [Cosmos Cloud](https://cosmos-cloud.io/) | Cosmos Cloud | Infrastructure management and orchestration platform with multi-cloud support and monitoring. | Small-medium teams | **6/10** — Monitoring layer |
| [Komo](https://komo.do/) | Komo | Privacy-focused meta-search engine. (Note: may be different from Komodo) | Search alternative | **1/10** — Not a deployment tool |
| [Uncloud](https://uncloud.run/) | Uncloud | Simple cloud hosting provider — instances, storage, networking. | VPS hosting | **7/10** — VPS option |

### Reference Articles & Directories

| Link | Resource | Summary |
|------|---------|---------|
| [Awesome Selfhosted (GitLab)](https://gitlab.com/awesome-selfhosted/awesome-selfhosted) | Awesome Selfhosted | Community-maintained list of 900+ self-hosted applications organized by category. The definitive reference. |
| [KDnuggets — Vercel/Heroku Alternatives](https://www.kdnuggets.com/top-5-self-hosting-platform-alternative-to-vercel-heroku-netlify) | Top 5 Self-Hosting Alternatives | Article comparing CapRover, Coolify, Dokku, Porter, and Render as Vercel/Heroku alternatives. |
| [ServerCompass — Self-Hosted VPS Apps](https://servercompass.app/blog/best-self-hosted-apps-vps) | Best Self-Hosted Apps on VPS | Guide to the best self-hosted applications for VPS deployment. |
| [GeekFlare — Self-Hosting Guide](https://geekflare.com/hosting/self-hosting-web-apps/) | Self-Hosting Web Apps Guide | Comprehensive tutorial on self-hosting web applications — server setup, domains, SSL, reverse proxy. |
| [LocalToNet — Coolify Guide](https://localtonet.com/blog/how-to-self-host-coolify) | Coolify Self-Hosting Guide | Step-by-step guide for setting up Coolify as a self-hosted PaaS. |
| [DeployWise — Open Source Tools](https://deploywise.dev/open-source-deployment-tools) | Open Source Deployment Tools | Overview of open-source deployment tools for self-hosted applications. |
| [URLDora — Selfhosted Apps](https://urldora.com/selfhosted/) | Selfhosted Apps Directory | Directory of self-hosted application alternatives to popular SaaS tools. |
| [DevOpsSchool — Self-Hosting List](https://www.devopsschool.com/blog/list-of-top-free-open-source-self-hosted-application-for-self-hosting-solutions/) | DevOpsSchool Self-Hosting List | Comprehensive list of free open-source self-hosted applications for common use cases. |
| [Google Antigravity Use Cases](https://antigravity.google/use-cases) | Google Antigravity | Google's specialized compute use cases — high-performance cloud computing for AI/ML workloads. |
| [Caddy Server](https://caddyserver.com/) | Caddy | Modern, automatic HTTPS web server and reverse proxy. Simpler than Nginx with automatic Let's Encrypt. Perfect companion to CapRover/Dokploy. |

---

## 7. Authentication & Identity Management

Keycloak alternatives and complementary identity tools.

| Link | Tool | Summary | Open Source | Key Features | Sandpitt Relevance |
|------|------|---------|------------|-------------|-------------------|
| [Logto Account Center](https://logto.io/products/account-center) | Logto Account Center | Embeddable account management UI — users can manage their own profile, password, MFA, and connected accounts. White-label ready. | Yes (OSS version) | Self-service account management, customizable UI | High — embed in Sandpitt admin for user self-service |
| [Logto OSS Docs](https://docs.logto.io/logto-oss) | Logto Open Source | Modern, developer-friendly identity platform — OAuth 2.0, OIDC, passwordless auth, social sign-in, SDKs. Keycloak alternative with better DX. | Yes | Self-hosted, multi-tenant, customizable | High — Keycloak alternative with easier setup |
| [Logto Branding](https://docs.logto.io/customization/match-your-brand#hide-logto-branding) | Logto Branding Customization | Guide for white-labeling Logto — custom CSS, hide Logto branding, full brand control for enterprise deployments. | Yes | White-label, custom CSS | High — brand Sandpitt auth UI |
| [Logto YouTube Channel](https://m.youtube.com/@logto-io) | Logto YouTube | Official Logto video tutorials and feature demos. | N/A | Video documentation | Medium — learning resource |
| [Zitadel MFA](https://zitadel.com/features#multifactor) | Zitadel MFA | Enterprise-grade MFA — TOTP, SMS, U2F/WebAuthn, security keys, passwordless. More comprehensive than basic Keycloak MFA setup. | Yes | Hardware keys, biometrics, TOTP | High — enhanced security for Sandpitt inspectors |
| [Zitadel B2B](https://zitadel.com/docs/guides/solution-scenarios/b2b) | Zitadel B2B | Multi-organization authentication — manage multiple client organizations, delegate admin, role-based access per org. | Yes | Org management, delegation | High — if Sandpitt serves multiple client organizations |
| [Zitadel API Docs](https://zitadel.com/docs/apis/introduction) | Zitadel API Reference | Comprehensive APIs for identity management, user admin, audit logging, and credential management. | Yes | Full programmatic control | High — integrate deeply with Sandpitt FastAPI |
| [Open Source Auth Tools](https://www.opensourcealternatives.to/blog/best-open-source-authentication-tools) | Auth Tool Comparison | Overview of open-source authentication solutions — Keycloak, Logto, Zitadel, Authentik, Ory comparison. | N/A | Comparison resource | Medium — evaluate Keycloak alternatives |

---

## 8. Database, Storage & Immutable Ledger

### Immutable / Audit Databases

| Link | Tool | Summary | Open Source | Sandpitt Relevance |
|------|------|---------|------------|-------------------|
| [ImmuDB Replication](https://docs.immudb.io/master/production/replication) | ImmuDB — Replication | Immutable database with replication support — tamper-proof audit trails with Byzantine fault tolerance. Stores records that cannot be altered or deleted. | Yes | High — immutable inspection audit logs, compliance |
| [ImmuDB Index Maintenance](https://docs.immudb.io/master/production/index-maintenance) | ImmuDB — Index Management | Production index optimization guide for ImmuDB deployments. | Yes | Medium — performance tuning reference |
| [ImmuDB Release Notes](https://docs.immudb.io/master/releasenotes) | ImmuDB Releases | ImmuDB version history and changelog. | Yes | Low — version tracking |
| [ImmuDB Cloud Wars Article](https://cloudwars.com/metaverse/how-open-source-ledger-database-immudb-plans-to-handle-all-that-metaverse-data/) | ImmuDB Overview Article | Article explaining how ImmuDB works as an open-source ledger database — use cases for immutable data storage. | N/A | Medium — conceptual overview |
| [BigchainDB](https://www.opensourcealternatives.to/item/bigchaindb) | BigchainDB | Blockchain database combining MongoDB features with immutability — decentralized asset management, immutable records. | Yes (AGPLv3) | Medium — alternative immutable store, more complex |
| [RunaCap ROSS Index Q4 2021](https://runacap.com/ross-index/q4-2021/) | ROSS Index | Ranking of fastest-growing open-source startups — context for evaluating ImmuDB, BigchainDB, etc. | N/A | Low — market reference |

### Blockchain & Distributed Ledger

| Link | Tool | Summary | Open Source | Sandpitt Relevance |
|------|------|---------|------------|-------------------|
| [Hyperledger Fabric](https://hyperledger-fabric.readthedocs.io/en/release-2.5/) | Hyperledger Fabric v2.5 | Enterprise-grade permissioned blockchain — smart contracts (chaincode), private channels, modular consensus. Linux Foundation project. | Yes (Apache 2.0) | Low — overkill for Sandpitt unless regulatory blockchain required |
| [Hyperledger CA — Deploy Guide](https://hyperledger-fabric-ca.readthedocs.io/en/latest/deployguide/use_CA.html) | HLF Certificate Authority | PKI management for Hyperledger Fabric networks — certificate enrollment, identity management. | Yes | Low — only relevant with HLF |
| [Hyperledger CA — Topology](https://hyperledger-fabric-ca.readthedocs.io/en/latest/deployguide/ca-deploy-topology.html) | HLF CA Architecture | CA deployment topology guide — root CA, intermediate CA, cluster configuration. | Yes | Low — only relevant with HLF |
| [Hyperledger SDK & Chaincode](https://hyperledger-fabric.readthedocs.io/en/release-2.5/sdk_chaincode.html) | HLF SDK & Smart Contracts | SDK documentation for building Hyperledger Fabric applications and writing chaincode (smart contracts in Go/Java/Node). | Yes | Low — only with HLF adoption |
| [Corda (GitHub)](https://github.com/corda/corda) | Corda Blockchain | Business-focused blockchain platform — smart contracts in Kotlin/Java, private transactions, notary infrastructure. R3 project. | Yes (Apache 2.0) | Low — designed for financial networks |
| [CordSpec](https://cordspec.org/) | Corda Specification | Technical specification for the Corda protocol — architecture documentation for the Corda platform. | Yes | Low — reference only |
| [Opensource.com Blockchain](https://opensource.com/tags/blockchain) | Open Source Blockchain Articles | Collection of opensource.com articles on blockchain technology — educational resources on open-source ledger projects. | N/A | Low — background reading |
| [Ethereum Dev Open Source Repos](https://www.reddit.com/r/ethdev/comments/q2jm3f/what_are_some_good_opensource_repositories_that_i/) | Open Source Ethereum Projects | Reddit thread listing notable open-source Ethereum repositories for developers to learn from. | N/A | Low — Ethereum not relevant to Sandpitt |

### Alternative Backends

| Link | Tool | Summary | Open Source | Sandpitt Relevance |
|------|------|---------|------------|-------------------|
| [PocketBase](https://www.opensourcealternatives.to/item/pocketbase) | PocketBase | SQLite-based real-time backend with built-in auth, REST API, file uploads, and admin UI. Single binary deployment. | Yes | Medium — lightweight alternative for smaller Sandpitt deployments |
| [Appsmith Docs](https://docs.appsmith.com/getting-started/setup) | Appsmith | Open-source low-code platform for building internal admin tools — drag-and-drop UI builder, connects to PostgreSQL, REST APIs. | Yes | Very High — rapidly build Sandpitt admin dashboards |
| [Grist (XDA Article)](https://www.xda-developers.com/grist-free-open-source-excel-alternative/) | Grist | Open-source spreadsheet-database hybrid — self-hostable, real-time collaboration, API access. Alternative to Airtable/Excel. | Yes | High — inspection data entry, template management |
| [CachetHQ](https://cachethq.io/) | Cachet | Open-source status page system — displays service status and incidents for your infrastructure. | Yes | Medium — Sandpitt service status page |
| [OpenLogs](https://openlogs.org/) | OpenLogs | Open-source log aggregation and analysis platform — collects and searchable logs from multiple services. | Yes (likely) | Medium — centralize Sandpitt service logs |

---

## 9. Project Management & Productivity

### Task & Project Management

| Link | Tool | Summary | Open Source | Sandpitt Relevance |
|------|------|---------|------------|-------------------|
| [Super Productivity](https://super-productivity.com/) | Super Productivity | Open-source task and time management app — GTD-inspired, integrates with Jira/GitHub, offline-first, focus mode, time tracking. Highly rated for developers. | Yes | High — team task management for Sandpitt development |
| [Super Productivity — Getting Started](https://super-productivity.com/blog/getting-started-with-super-productivity/) | SP Getting Started | Onboarding guide for Super Productivity. | Yes | Medium — setup reference |
| [SP — GTD Guide](https://super-productivity.com/guides/getting-things-done/) | Super Productivity GTD | How to implement the Getting Things Done methodology in Super Productivity. | Yes | Medium — workflow methodology |
| [SP — ADHD Focus](https://super-productivity.com/use-cases/adhd-focus/) | SP ADHD Focus Mode | Guide for using Super Productivity's focus features for ADHD — time blocking, minimalist mode, distraction reduction. | Yes | Medium — developer productivity |
| [SP — Prioritizing Scheme](https://super-productivity.com/blog/prioritising-scheme/) | SP Prioritizing | Article on SP's priority system for task management. | Yes | Medium — task prioritization approach |
| [SP — 4000 Weeks](https://super-productivity.com/blog/4000-weeks-with-super-productivity/) | SP Philosophy | Reflective article on using SP for meaningful time/task management aligned with finite life goals. | Yes | Low — philosophical reading |
| [SP — Local vs Cloud](https://super-productivity.com/blog/local-vs-cloud-productivity/) | SP — Local vs Cloud | Compares local-first vs cloud-based productivity tools — privacy, control, offline access considerations. | Yes | Low — decision framework |
| [SP — Side Projects Guide](https://super-productivity.com/blog/finish-side-projects-developer-guide/) | SP — Finishing Side Projects | Guide specifically for developers on how to complete side projects using SP. | Yes | Medium — Sandpitt is a side project |
| [SP Guides](https://super-productivity.com/guides/) | Super Productivity Guides | All available guides and tutorials for Super Productivity. | Yes | Low — reference |
| [OpenProject Integrations](https://www.openproject.org/integrations/) | OpenProject | Open-source project management platform — integrates with GitHub, Slack, GitLab, and enterprise tools. More powerful than basic task managers. | Yes | High — full project management for Sandpitt roadmap |
| [OpenProject Excel Sync](https://www.openproject.org/docs/system-admin-guide/integrations/excel-synchronization/) | OpenProject × Excel | Guide for syncing OpenProject tasks with Excel spreadsheets — useful for stakeholders who prefer Excel. | Yes | Medium — reporting integration |
| [AppFlowy Templates](https://appflowy.com/templates) | AppFlowy | Open-source Notion alternative — project management, wikis, databases, offline-first, self-hostable. | Yes | High — team knowledge base and project planning |
| [Rundeck](https://www.rundeck.com/) | Rundeck | Operations automation platform — schedule and orchestrate jobs, runbooks, and infrastructure tasks. | Yes (community) | Medium — schedule automated Sandpitt tasks (backups, maintenance) |
| [Shelf.nu Features](https://www.shelf.nu/features) | Shelf.nu | Open-source asset management platform with QR code scanning, location tracking, custody management, and maintenance logs. 2.6k+ GitHub stars. | Yes | Very High — direct Sandpitt competitor/reference; study architecture |

### Note-Taking & Knowledge Management

| Link | Tool | Summary | Sandpitt Relevance |
|------|------|---------|-------------------|
| [Obsidian + Claude](https://www.claudepluginhub.com/technologies/obsidian) | Obsidian × Claude | Integration between Claude and Obsidian knowledge base — Claude reads/writes notes, searches vault, uses note content as context. | Medium — team knowledge management |

---

## 10. Automation & Workflow Tools

| Link | Tool | Summary | Open Source | Key Features | Sandpitt Relevance |
|------|------|---------|------------|-------------|-------------------|
| [Activepieces](https://cloud.activepieces.com/sign-up) | Activepieces | Open-source no-code/low-code workflow automation — 200+ integrations, trigger-based automation, conditional logic. Self-hosted option. | Yes | 200+ integrations, scheduling, API triggers | Very High — automate Sandpitt inspection notifications and workflows |
| [Activepieces Alt](https://www.opensourcealternatives.to/item/activepieces) | Activepieces Review | OpenSourceAlternatives.to page for Activepieces — summary, alternatives comparison, user reviews. | Yes | Overview + alternatives | Medium — evaluation reference |
| [Automatisch](https://automatisch.io/) | Automatisch | Self-hosted Zapier alternative — 500+ integrations, no-code automation builder, privacy-focused. | Yes | 500+ integrations, no-code, self-hosted | Very High — trigger inspection workflows from external events |
| [Airbyte Connectors](https://airbyte.com/connectors) | Airbyte | Open-source data integration platform — 300+ pre-built connectors, ELT pipelines, data sync. | Yes (ELT) | 300+ connectors, scheduling, monitoring | High — sync Sandpitt inspection data to data warehouse |
| [Windmill — Internal Apps](https://www.windmill.dev/use-cases/internal-apps) | Windmill | Open-source workflow engine and internal tool builder — scripts, flows, REST APIs, self-hosted. | Yes | Low-code workflow, REST API, scheduling, user management | High — build Sandpitt automation workflows visually |

---

## 11. Low-Code / No-Code Platforms & Data Tools

| Link | Tool | Summary | Open Source | Key Features | Sandpitt Relevance |
|------|------|---------|------------|-------------|-------------------|
| [AITable.ai](https://aitable.ai/) | AITable | Low-code AI database and automation platform — Airtable alternative with AI agents, no-code workflow builder, and embedded views. | No (SaaS) | AI agents, templates, embedded views, API | High — visual data management for inspection records |
| [AITable Templates](https://aitable.ai/template) | AITable Templates | Pre-built AITable templates for common use cases — project management, CRM, inventory, inspections. | No | Template library | High — inspection management template starting point |
| [AITable Smart Contract Blog](https://aitable.ai/blog/smart-contract-management-system/) | AITable Blog — Smart Contracts | Blog post about building a smart contract management system with AITable — shows complex use cases. | N/A | Implementation guide | Low — reference article |
| [AITable Help](https://help.aitable.ai/) | AITable Help Center | Official documentation and support for AITable. | N/A | Documentation | Low — reference |
| [AITable Video Demo](https://aitable.ai/#videodemo) | AITable Demo | Embedded video demonstration of AITable capabilities. | N/A | Demo | Low — evaluation |
| [AITable Embedded AI](https://aitable.ai/embed/ai/shruruLqrCwHwRlNtwEqb/ai_ZkmsmAX0kbok895) | AITable Embedded AI Widget | Live embedded AI chat widget powered by AITable — demonstrates the embedded AI assistant feature. | No | Embedded AI chat | Medium — embed inspection assistant |
| [AITable Product Hunt](https://www.producthunt.com/products/altable-ai-no-code-al-agents-builder) | AITable on Product Hunt | AITable's Product Hunt listing — reviews, launch details, and community feedback. | N/A | Reviews | Low — evaluation reference |
| [Woobox](https://woobox.com/) | Woobox | Marketing platform for contests, giveaways, surveys, and social engagement campaigns. | No | Contests, forms, campaigns | Very Low — not relevant to Sandpitt |
| [Billing SDK](https://billingsdk.com/) | Billing SDK | Payment and subscription billing SDK — subscription management, invoicing, payment integration. | Unknown | Billing, subscriptions | Low — if Sandpitt needs subscription billing |
| [Handle.ai](https://gethandle.ai/) | Handle.ai | AI-powered customer support platform — conversational AI for helpdesks. | No | AI chatbot, support tickets | Low — if adding Sandpitt support chatbot |
| [Capgo](https://capgo.app/) | Capgo | Over-the-air (OTA) update platform for Capacitor/mobile apps — push live updates to mobile apps without app store review. | Partial | OTA updates, analytics | High — if Sandpitt mobile app uses Capacitor (currently uses Expo) |
| [Windmill Internal Tools](https://www.windmill.dev/use-cases/internal-apps) | Windmill | See row in Automation section above. | Yes | Workflow automation | High |
| [LogicPaper](https://logicpaper.github.io/LogicPaper/help.html) | LogicPaper | Visual logic and workflow design tool — diagram-based workflow builder. | Unknown | Visual logic design | Low — workflow design reference |

---

## 12. Asset & Inspection Management Systems

Direct competitors and references for the Sandpitt Inspection System.

| Link | Tool | Summary | Open Source | Key Features | Sandpitt Relevance |
|------|------|---------|------------|-------------|-------------------|
| [GitHub — Asset Management Systems](https://github.com/topics/asset-management-system) | GitHub Topic: Asset Management | GitHub topic page aggregating open-source asset management projects — Shelf.nu (2.6k stars), Asseto, SAMS, Ramses, and more. | Various | Directory of projects | Very High — study implementations, borrow patterns |
| [Asseto (VyrazuLabs)](https://github.com/VyrazuLabs/asseto-asset-management) | Asseto | Enterprise asset management platform — asset tracking, assignments, maintenance logs, inventory, 2FA, audit logging, Slack integration, mobile apps, CSV import. MIT licensed. | Yes (MIT) | Lifecycle management, role-based access, audit trail, API, mobile | Very High — closest open-source analog to Sandpitt; study architecture |
| [Shelf.nu](https://www.shelf.nu/features) | Shelf.nu | Open-source asset management — QR code scanning, location tracking, custody chain, maintenance logs, team collaboration. 2.6k GitHub stars. | Yes | QR scanning, custody tracking, maintenance, teams | Very High — reference implementation for Sandpitt features |
| [Mobiess — Asset Inspections](https://www.mobiess.com/modules/audits-and-inspections/asset-based-inspections) | Mobiess Inspection Module | Commercial field inspection and audit management platform — mobile-first, asset-based inspections, configurable forms, offline support. | No | Mobile forms, offline, asset linking, reporting | Very High — commercial competitor; defines market expectations |
| [Mobiess Demo](https://www.mobiess.com/book-a-demo) | Mobiess Demo Request | Book a demo of the Mobiess commercial inspection management platform. | No | Demo booking | Medium — competitive research |
| [ZYGHT Functionality](https://docs.dataminesoftware.com/ZYGHT/Latest/B-Introduction-Topics/ZYGHT-Functionality.htm) | ZYGHT (DataMine) | Enterprise safety and inspection management system — comprehensive HSSE platform with audit trails, corrective actions, risk management, and regulatory compliance. | No (enterprise) | HSSE, risk management, corrective actions, compliance | High — enterprise feature benchmark for Sandpitt |
| [LowCode Agency — Bubble Inspection App](https://www.lowcode.agency/blog/build-asset-inspection-app-bubble) | Build Inspection App with Bubble | Tutorial on building an asset inspection app using Bubble.io — no-code approach with checklists, photo capture, and reporting. | No | No-code tutorial | Medium — alternative implementation approach |
| [Reddit — No-Code Inspection Platform](https://www.reddit.com/r/nocode/comments/ucazvn/nocode_asset_inspection_platform/) | r/nocode — Inspection Platform | Reddit discussion about building an asset inspection platform with no-code tools — Glide, Bubble, Airtable options discussed. | N/A | Community discussion | Medium — alternative approaches and requirements |
| [OutSystems — SmartAIS Case Study](https://www.outsystems.com/case-studies/smart-ais-mobile-asset-inspections-app/) | OutSystems — Mobile Asset Inspections | Case study of a mobile asset inspection app built with OutSystems — covers offline support, photo capture, inspection workflows, backend integration. | No | Case study | High — enterprise feature reference |
| [Odin Project — Inventory App](https://www.reddit.com/r/theodinproject/comments/1qe6pwe/done_with_project_inventory_application_from/) | Odin Project Inventory App | Reddit post showcasing an inventory management application built following The Odin Project curriculum. | N/A | Learning project showcase | Low — basic reference |

---

## 13. Development Frameworks & Reference Examples

### Web Framework References

| Link | Tool | Summary | Open Source | Sandpitt Relevance |
|------|------|---------|------------|-------------------|
| [tRPC + Prisma Starter](https://github.com/trpc/trpc/tree/main/examples/next-prisma-starter) | tRPC Next.js + Prisma Template | Official tRPC starter with Next.js and Prisma ORM — demonstrates type-safe API calls between frontend and backend without REST. | Yes | Medium — type-safety patterns for Sandpitt admin API |
| [Sass Scaffolding (germanpericon)](https://github.com/germanpericon/sasscaffolding) | Sass Scaffolding | SCSS/Sass project scaffolding template — organized file structure for large stylesheets. | Yes | Low — CSS architecture reference |
| [PWA Examples (MDN)](https://github.com/mdn/pwa-examples) | MDN PWA Examples | Mozilla Developer Network's Progressive Web App example implementations — CycleTracker and others. Service workers, offline, installability. | Yes (CC0) | Medium — if adding PWA support to Sandpitt mobile web |
| [PWA-Liveview (dwyl)](https://github.com/dwyl/PWA-Liveview) | PWA LiveView | Real-time, offline-first collaborative PWA using Phoenix LiveView — demonstrates offline sync, real-time collaboration, server reconciliation with PostgreSQL. | Yes (GPL-3) | High — offline-first patterns for Sandpitt mobile inspections |
| [Template Scaffolding (DevOpsSchool NL)](https://www.devopsschool.nl/template-scaffolding/) | Template Scaffolding | Overview of application scaffolding approaches — templates, generators, and project structure patterns. | N/A | Low — reference article |
| [Blue Harvest — Reusable Templates](https://medium.com/blue-harvest-tech-blog/refining-efficient-approaches-to-build-reusable-templates-and-a-scaffold-for-the-application-f1459edc3f74) | Reusable Application Templates | Medium article on building reusable application scaffolds and templates — development patterns for structured codebases. | N/A | Low — architecture reference |
| [Docker Windows Install](https://docs.docker.com/desktop/setup/install/windows-install/) | Docker Desktop for Windows | Official Docker Desktop installation guide for Windows. | N/A | Low — setup reference |

### Open Source Alternatives Directory

| Link | Item | Summary | Sandpitt Relevance |
|------|-----|---------|-------------------|
| [OSA — Dyrectorio](https://www.opensourcealternatives.to/item/dyrectorio) | Dyrector.io | Container deployment and release management platform — multi-cloud, infrastructure as code. | Medium — deployment alternative |
| [OSA — RustDesk](https://www.opensourcealternatives.to/item/rustdesk) | RustDesk | Open-source remote desktop application — self-hosted TeamViewer alternative. | Low — not Sandpitt relevant |
| [OSA — Insforge](https://www.opensourcealternatives.to/item/insforge) | Insforge | Open-source insurance management software — claims, policies, underwriting. | Low — insurance domain, not inspection |
| [OSA — Modelence](https://www.opensourcealternatives.to/item/modelence) | Modelence | Real-time AI/data modeling platform with WebSocket support. | Medium — AI features reference |

---

## 14. Community Discussions (Reddit)

Most Reddit URLs returned 403 errors during fetching. Summaries are based on post titles and known content.

### Claude & AI Coding

| Link | Post | Key Takeaways | Sandpitt Relevance |
|------|-----|-------------|-------------------|
| [r/ClaudeAI — Business Brainstorming](https://www.reddit.com/r/ClaudeAI/comments/1gpm07k/claude_is_my_favourite_way_to_brainstorm_business/) | "Claude is my favourite way to brainstorm business ideas" | Users praise Claude for business idea generation and structured thinking. Discusses workflow for using Claude in early-stage product development. | Medium — brainstorming approach for Sandpitt features |
| [r/ClaudeAI — Biggest Platform Built](https://www.reddit.com/r/ClaudeAI/comments/1tjmy6b/what_is_the_biggest_known_appplatform_thats_been/) | "Biggest known app/platform built with Claude?" | Community shares the largest production applications built using Claude — scale validation. | High — benchmark for Claude-built production apps |
| [r/claude — Certification](https://www.reddit.com/r/claude/comments/1tgnth4/just_finished_the_claude_code_certification_and/) | "Just finished the Claude Code Certification" | Discussion of the Claude Code certification program — what it covers, difficulty, and value for developers. | Medium — Claude Code skill development |
| [r/SaaS — Complete SaaS with Claude](https://www.reddit.com/r/SaaS/comments/1s25xx4/has_anyone_built_a_complete_saas_product_using/) | "Has anyone built a complete SaaS using Claude?" | Community discussion on real-world SaaS products built with Claude Code — success stories, pitfalls, and workflows. | Very High — direct Sandpitt precedent |
| [r/vibecoding — Excel to Finance App](https://www.reddit.com/r/vibecoding/comments/1sft1qj/from_an_excel_spreadsheet_to_a_full_finance_app_9/) | "Excel spreadsheet to full finance app in 9 days" | Developer documents converting a complex Excel spreadsheet into a full-stack web application using vibe coding (AI-driven development). | High — rapid prototyping methodology for Sandpitt |
| [r/vibecoding — Claude Fable 5 Review](https://www.reddit.com/r/vibecoding/comments/1u249n3/claude_fable_5_not_that_good_for_vibe_coding_huh/) | "Claude Fable 5 not that good for vibe coding?" | Community assessment of Claude Fable 5 for vibe coding — discusses strengths, weaknesses, and better alternatives for specific use cases. | Medium — model selection guidance |
| [r/LocalLLaMA — Local AI Development](https://www.reddit.com/r/LocalLLaMA/comments/1t2icy1/if_youve_been_waiting_to_try_local_ai_development/) | "If you've been waiting to try local AI development" | Introduction guide to local LLM development — setup, tools, and models to start with. | Medium — local AI for Sandpitt development |
| [r/ClaudeAI — Dashboard for Multiple Claudeas](https://www.reddit.com/r/ClaudeAI/comments/1q6sg8g/built_a_web_dashboard_for_managing_multiple/) | "Built a web dashboard for managing multiple Claudes" | Developer shares a web dashboard for orchestrating multiple parallel Claude Code sessions — multi-agent coordination. | High — patterns for Sandpitt multi-agent workflows |
| [r/ClaudeAI — Project Tracker](https://www.reddit.com/r/ClaudeAI/comments/1svkyby/i_open_sourced_a_project_tracker_for_claude_code/) | "I open-sourced a project tracker for Claude Code" | Developer open-sources a project tracking tool specifically designed for Claude Code development sessions. | Very High — track Sandpitt development progress |
| [r/hermesagent — Best Free Model](https://www.reddit.com/r/hermesagent/comments/1t8oito/this_is_the_best_free_model_for_hermes_atm/) | "Best free model for Hermes ATM" | Community identifies current best free models compatible with Hermes Agent framework. | Low — Hermes-specific |
| [r/RooCode — OpenRouter vs Subscription](https://www.reddit.com/r/RooCode/comments/1ms9r5j/paying_for_openrouter_credits_vs_subscribing_to/) | "OpenRouter credits vs subscribing" | Cost comparison between pay-per-use OpenRouter and model subscriptions — practical guidance for budget-conscious developers. | Medium — cost optimization for Sandpitt AI features |
| [r/vibecoding — Grill Me Skill](https://www.reddit.com/r/vibecoding/comments/1swyadr/viral_grill_me_claude_skill_proves_specstocode_is/) | "Viral 'Grill Me' Claude skill proves specs-to-code works" | Discussion of a viral Claude skill that critically reviews specs and code — demonstrates spec-driven development effectiveness. | High — spec-to-code workflow validation |
| [r/ClaudeAI — Productivity App with Claude Code](https://www.reddit.com/r/ClaudeAI/comments/1mnw4p5/built_a_productivity_app_entirely_with_claude_code/) | "Built a productivity app entirely with Claude Code" | Developer shares experience building a complete productivity app using only Claude Code — architecture, challenges, and results. | Very High — full-app development case study |
| [r/ClaudeAI — Analytics Dashboard](https://www.reddit.com/r/ClaudeAI/comments/1lxacw4/built_a_realtime_analytics_dashboard_for_claude/) | "Built a real-time analytics dashboard for Claude" | Developer shares a real-time analytics dashboard for monitoring Claude Code usage and performance. | High — analytics dashboard patterns for Sandpitt |
| [r/ClaudeCode — Frame Project Manager](https://www.reddit.com/r/ClaudeCode/comments/1qotbnv/frame_managing_projects_tasks_and_context_for/) | "Frame — managing projects, tasks, and context for Claude" | Community shares "Frame", a project and task management tool specifically designed for Claude Code development workflows. | Very High — context and task management for Sandpitt |
| [r/ClaudeAI — Day Planner Claude](https://www.reddit.com/r/ClaudeAI/comments/1s2tdz5/i_built_a_claude_project_that_plans_my_day_tracks/) | "Claude project that plans my day and tracks tasks" | Developer builds a personal planning system on Claude — templates, habits, task tracking, daily planning prompts. | Medium — personal productivity with Claude |
| [r/GithubCopilot — Open-Source Workflow Engine](https://www.reddit.com/r/GithubCopilot/comments/1rkkp1r/an_opensource_workflow_engine_to_automate_the/) | "Open-source workflow engine to automate the dev process" | Developer shares an open-source workflow engine for automating software development processes — CI/CD-style automation. | High — Sandpitt development automation |
| [r/ClaudeAI — Claude Code Best Setup](https://www.reddit.com/r/ClaudeAI/comments/1lcbt4q/the_best_way_to_setup_a_claude_code_project/) | "Best way to setup a Claude Code project" | Community best practices for Claude Code project configuration — CLAUDE.md, memory, MCP servers, permissions. | Very High — Sandpitt project configuration |
| [r/hermesagent — Free Hermes Rate Limits](https://www.reddit.com/r/hermesagent/comments/1tqzwl9/how_to_run_hermes_agent_for_free_and_not_hit_rate/) | "Run Hermes Agent free without hitting rate limits" | Tips for using Hermes Agent with free model tiers while managing rate limits. | Low — Hermes-specific |
| [r/hermesagent — Comment](https://www.reddit.com/r/hermesagent/comments/1sp3qia/comment/ogxw74b/) | Hermes Agent Comment | Specific comment in a Hermes Agent discussion thread. | Low — Hermes-specific |
| [r/selfhosted — Self-Hosted Tagging Storage](https://www.reddit.com/r/selfhosted/comments/1p30puo/a_self_hosted_organization_tagging_and_storage/) | "Self-hosted organization tagging and storage system" | Community shares a self-hosted system for organizing, tagging, and storing documents/files. | Medium — document management for Sandpitt |
| [r/AMA — Solo SoloLLM Developer](https://www.reddit.com/r/AMA/comments/1sn43jk/im_the_solo_developer_behind_solollm_ama_about/) | "AMA: Solo developer behind SoloLLM" | AMA session with the solo developer of SoloLLM — shares insights on building, maintaining, and growing a solo LLM product. | Medium — solo developer inspiration |
| [r/nocode — Asset Inspection Platform](https://www.reddit.com/r/nocode/comments/ucazvn/nocode_asset_inspection_platform/) | "No-code asset inspection platform" | Reddit discussion about building an asset inspection platform using no-code tools — feature requirements, tool comparisons. | Very High — direct Sandpitt domain discussion |
| [r/ethdev — Open Source Ethereum Repos](https://www.reddit.com/r/ethdev/comments/q2jm3f/what_are_some_good_opensource_repositories_that_i/) | "Good open-source Ethereum repos to learn from" | Ethereum developer community recommendations for learning from open-source blockchain repositories. | Low — blockchain background only |
| [r/theodinproject — Inventory App](https://www.reddit.com/r/theodinproject/comments/1qe6pwe/done_with_project_inventory_application_from/) | "Done with inventory application project" | Developer shares completion of an inventory management project from The Odin Project curriculum. | Low — basic inventory management |
| [r/dyadbuilders](https://www.reddit.com/r/dyadbuilders/) | r/dyadbuilders Community | Subreddit for Dyad (local vibe coding tool) users — project showcases, tips, and community support. | Medium — local AI coding community |
| [r/perth — Up in Smoke](https://www.reddit.com/r/perth/comments/1j6a8la/whats_the_deal_with_up_in_smoke_other_smoke/) | Perth Smoke Shops Reddit | Local Perth (Australia) Reddit post about smoke shops — completely unrelated to tech or Sandpitt. | None |
| [r/shortcuts — Email Attachments](https://www.reddit.com/r/shortcuts/comments/1ifibwj/download_attachments_from_emails/) | Download Email Attachments (iOS Shortcuts) | Reddit discussion on using iOS Shortcuts to download email attachments automatically. | Low — iOS automation |
| [r/shortcuts — iCloud File from Email](https://www.reddit.com/r/shortcuts/comments/kg67dk/getting_attachment_from_email_and_file_to_icloud/) | Email Attachment to iCloud (iOS) | Reddit discussion about automating email attachments to iCloud Drive via iOS Shortcuts. | Low — iOS automation |

---

## 15. YouTube Videos

These YouTube links were found in the browsing history near related topics. Many cannot be identified without viewing.

| Link | Context / Likely Topic | Relevance |
|------|----------------------|-----------|
| [youtube.com/watch?v=44uWIkGZ4W8](https://m.youtube.com/watch?v=44uWIkGZ4W8) | Context: near vibe coding/Claude links — likely a Claude Code or AI development tutorial. | Medium |
| [youtube.com/watch?v=cQGUJSbpzDg](https://m.youtube.com/watch?v=cQGUJSbpzDg) | Context: near Claude Code / developer tools — likely tutorial content. | Medium |
| [youtube.com/watch?v=-P2Zy6z9IjQ](https://m.youtube.com/watch?v=-P2Zy6z9IjQ) | Context: near vibe coding subreddit content. | Low-Medium |
| [youtube.com/watch?v=b2gaH-_6CXE](https://m.youtube.com/watch?v=b2gaH-_6CXE) | Context: near AITable / productivity tools. | Low-Medium |
| [youtube.com/watch?v=CZXZyMyo_lo](https://m.youtube.com/watch?v=CZXZyMyo_lo) | Context: near AITable / no-code tools. | Low-Medium |
| [youtube.com/watch?v=BRkpbffJBd4](https://m.youtube.com/watch?v=BRkpbffJBd4) | Context: near Modelence / real-time AI tools. | Low-Medium |
| [youtube.com/watch?v=MQk8xyZEKYg](https://m.youtube.com/watch?v=MQk8xyZEKYg) | Context: near Claude plugins / Logto content. | Medium |
| [youtube.com/watch?v=CCJJl66t4Ak](https://m.youtube.com/watch?v=CCJJl66t4Ak) | Context: near Claude connectors / authentication. | Medium |
| [youtube.com/watch?v=KUqRFSMIXck](https://m.youtube.com/watch?v=KUqRFSMIXck) | Context: near Claude resources / tutorials. | Medium |
| [youtube.com/watch?v=mXkAm7zVLbM](https://m.youtube.com/watch?v=mXkAm7zVLbM) | Context: near Claude Code tips — likely Claude Code workflow tutorial. | High |
| [youtube.com/watch?v=JHi7MpbXvHw](https://m.youtube.com/watch?v=JHi7MpbXvHw) | Context: between ClaudePluginHub agent links — likely a Claude agent tutorial. | High |
| [@logto-io YouTube Channel](https://m.youtube.com/@logto-io) | Logto official channel — tutorials for Logto identity platform setup and features. | Medium |
| [YouTube Channel UCmT3Hj0S7QUplIPHMYWuHPw](https://m.youtube.com/channel/UCmT3Hj0S7QUplIPHMYWuHPw) | Context: near Mobiess / ZYGHT inspection tools — likely an inspection management software demo channel. | High |

---

## 16. iOS / Apple Ecosystem Tools

| Link | Tool | Summary | Sandpitt Relevance |
|------|------|---------|-------------------|
| [Apple Passwords — Verification Codes](https://support.apple.com/en-us/120758) | Apple Passwords App | Apple support article for the built-in Passwords app on iOS — setting up verification codes (TOTP) in the app. | Low — personal setup reference |
| [MacRumors — Verification Codes in Passwords](https://www.macrumors.com/how-to/generate-verification-codes-passwords-app-ios/) | iOS Verification Codes Guide | How-to article on generating 2FA verification codes using the native iOS Passwords app. | Low — personal 2FA setup |
| [Infobip — Verify Without Phone](https://www.infobip.com/blog/how-to-get-verified-without-your-phone) | Alternative Verification Methods | Blog post about verification methods that don't require a phone — backup codes, email verification, authenticator apps. | Low — reference for Sandpitt 2FA design |
| [Apple Discussions — Verification](https://discussions.apple.com/thread/256165174) | Apple Community Thread | Apple community forum thread about verification code issues on iOS. | Low — troubleshooting reference |
| [Interac Verified for Business](https://www.interac.ca/en/verification/business/learn-about-interac-verified-for-business/) | Interac Identity Verification | Interac's business identity verification service for Canadian users — digital identity verification at scale. | Low — Australian-focused Sandpitt doesn't need this |
| [BoxBlink — Apple Shortcuts Email Cleanup](https://www.boxblinkracer.com/blog/apple-shortcuts-email-cleanup) | Apple Shortcuts Email Automation | Blog post about automating email management with Apple Shortcuts — filtering, archiving, and organizing email. | Low — personal productivity |
| [MacMost — AI File Renaming](https://macmost.com/using-apple-intelligence-and-shortcuts-to-rename-files.html) | Apple Intelligence File Renaming | Guide for using Apple Intelligence and Shortcuts to rename files automatically using AI. | Low — personal workflow |
| [Airtable iOS Shortcut](https://community.airtable.com/show-and-tell-15/we-build-an-ios-shortcut-for-saving-email-attachments-to-airtable-2407) | Airtable + iOS Shortcut | Guide for building an iOS Shortcut that saves email attachments directly to Airtable. | Low — data ingestion workflow reference |
| [Beard.fm — AI File Renaming](https://wiki.beard.fm/whats-new-ai-social-search-personal-knowledge-base-smart-fil/deep-dive-into-renaming-files-with-ai) | AI-Powered File Renaming | Deep-dive article on using AI to intelligently rename files — NLP-powered file organization. | Low — file management automation |
| [Pocket-lint — Apple Wallet Order Tracking](https://www.pocket-lint.com/apple-wallet-order-tracking-just-got-so-much-better/) | Apple Wallet Order Tracking | Article about improvements to order tracking in Apple Wallet — retail integration feature. | None |

---

## 17. Hosting Providers & VPS

| Link | Provider | Summary | Pricing | Sandpitt Fit |
|------|---------|---------|---------|-------------|
| [Contabo](https://contabo.com/en/) | Contabo | Budget VPS and dedicated server provider — European, unlimited bandwidth, generous resources at low prices. | €3-6/month VPS, €10-50+ dedicated | **8/10** — Best price/resource ratio for Sandpitt |
| [IONOS](https://www.ionos.com/) | IONOS (1&1) | Web hosting and cloud provider — shared hosting, VPS, cloud servers, multiple data centers globally. | €1-10/month VPS | **7/10** — Good alternative, slightly more expensive |
| [Northflank](https://northflank.com/) | Northflank | Managed container deployment platform — multi-region, API-first. See §6. | Pay-as-you-go | **6/10** — More expensive managed option |
| [Hostinger (Checkout)](https://cart.hostinger.com/pay/42f6a7e0-c48d-4c16-801b-ee3d9b791e95) | Hostinger | Web hosting provider — this is a personal checkout link, likely for a specific Hostinger plan. | Varies | Personal purchase link — not evaluable |

---

## 18. Miscellaneous / Not Relevant

These links are personal browsing, shopping, entertainment, or government services with no relevance to the Sandpitt project.

| Link | What It Is | Why Not Relevant |
|------|-----------|----------------|
| [Netflix — Success](https://www.netflix.com/tv/out/success) | Netflix TV redirect/confirmation page | Entertainment, no tech relevance |
| [Chemist Warehouse — Chlorsig Eye Ointment](https://www.chemistwarehouse.com.au/buy/2223/chlorsig-eye-ointment-4g-chloramphenicol-s3) | Australian pharmacy product page | Personal health purchase |
| [Transport WA — Vehicle Registration](https://online.transport.wa.gov.au/webExternal/registration/wicket/page?1) | Western Australia vehicle registration portal | Government service, personal use |
| [AliExpress — Product](https://www.aliexpress.com/item/1005007171594211.html) | AliExpress shopping product listing | Personal shopping, no tech relevance |
| [Paramount+ — Lioness](https://www.paramountplus.com/au/shows/lioness/) | TV show page on Paramount+ Australia | Entertainment, no tech relevance |
| [Lifeblood — Rockingham Donor Centre](https://www.lifeblood.com.au/donor-centre/wa/rockingham-donor-centre) | Australian Red Cross blood donation centre | Personal health, not tech-related |
| [RenewEconomy — Coal Plant Demolition](https://reneweconomy.com.au/another-boiler-at-shuttered-coal-power-plant-demolished-in-spectacular-explosion/amp/) | News article about coal plant demolition | Unrelated news |
| [GitHub Login](https://github.com/login?return_to=https%3A%2F%2Fgithub.com%2Fsettings%2Finstallations%2F105797831) | GitHub login redirect | Authentication page, not content |
| [Google Search — Logto Alternative](https://www.google.com/search?q=opensource+logto+alternative) | Google search results page | Search query, not a destination |
| [Google Search — Docker Ubuntu Windows](https://www.google.com/search?q=instal+docker+and+ubuntu+on+windows+surface) | Google search results page | Search query |
| [Google Search — Remotion Setup](https://www.google.com/search?q=how+to+set+up+remotion) | Google search results page | Search query |
| [Google Search — Password Verification](https://www.google.com/search?q=passwords+set+up+verification+code) | Google search results page | Search query |
| [Google Search — Asset Inspection GitHub](https://www.google.com/search?q=Asset+inspection+management+github) | Google search results page | Search query |
| [Google Search — Best Free LLM Coding](https://www.google.com/search?q=best+free+llm+for+coding) | Google search results page | Search query |
| [Google Search — Run Open Source LLMs Cloud](https://www.google.com/search?q=where+can+i+run+opensource+llms+in+the+cloud) | Google search results page | Search query |
| [Google Search — ImmuDB Alternatives](https://www.google.com/search?q=immudb+alternatives) | Google search results page | Search query |
| [Google Search — Asset Movement Immutable Ledger](https://www.google.com/search?q=open+source+projects+for+asset+movement+with+imutable+ledger) | Google search results page | Search query |
| [Google Search — Claude Obsidian Integration](https://www.google.com/search?q=claude+obsidian+integration) | Google search results page | Search query |
| [Google Search — Install Claude Plugins](https://www.google.com/search?q=how+to+install+claude+plugins+and+skills+from+web) | Google search results page | Search query |
| [Google Labs Flow (personal session)](https://labs.google/fx/tools/flow/project/9ecf23f1-842d-4613-87fc-0d82d64b26f3#) | Personal Google Labs Flow session/project | Personal creative session, link not accessible to others |
| [Google Labs CC](https://labs.google.com/cc/u/0/) | Google Labs Code Companion | Google's AI coding assistant (experimental). |

---

## Summary: Top Picks for Sandpitt

### Claude Plugins/Skills to Enable Now
1. **Code Review v2** — review all PRs; invoke via `/code-review`
2. **Feature Dev v2** — structured feature workflow; invoke via `/feature-dev`
3. **CLAUDE.md Management** — keep project docs in sync
4. **Fullstack Dev Skills (jeffallan)** — covers the whole Sandpitt stack
5. **Playwright Plugin** — E2E testing for admin UI

### Claude Agents to Configure
1. **Code Architect** — architecture decisions before building
2. **Frontend Developer** — dedicated agent for Next.js/React Native work
3. **Database Reviewer** — PostgreSQL + PostGIS schema reviews
4. **Code Reviewer** — pre-merge quality gate

### Tools to Evaluate for Sandpitt
| Priority | Tool | Use Case |
|---------|------|---------|
| 🔴 Immediate | **Claude Task Master** | Convert Sandpitt PRD into tracked tasks |
| 🔴 Immediate | **Shelf.nu** | Study open-source asset management patterns |
| 🔴 Immediate | **Asseto** | Study inspection lifecycle implementation |
| 🟡 Soon | **Activepieces / Automatisch** | Automate inspection notifications |
| 🟡 Soon | **AppFlowy** | Team knowledge base and project docs |
| 🟡 Soon | **Appsmith** | Rapid admin dashboard for internal use |
| 🟢 Later | **CapRover or Dokploy** | Production deployment on Contabo VPS |
| 🟢 Later | **Logto or Zitadel** | Evaluate as Keycloak replacement/complement |
| 🟢 Later | **Open WebUI + LocalAI** | Self-hosted AI assistant for field teams |
| 🟢 Later | **ImmuDB** | Immutable audit trail for inspection records |
