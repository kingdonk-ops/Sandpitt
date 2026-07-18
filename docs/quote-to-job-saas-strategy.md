# Quote-to-Job SaaS for Construction & Trade Contractors
**Generated:** 2026-07-18
**Purpose:** Research and strategy document for a proposed multi-tenant SaaS that owns a
construction/trade contractor's commercial pipeline end-to-end — from first customer
contact through quoting, job creation, scheduling, and daily job tracking — informed by a
review of [openconstructionerp.com](https://openconstructionerp.com) and its GitHub
repository ([datadrivenconstruction/OpenConstructionERP](https://github.com/datadrivenconstruction/OpenConstructionERP)).

This is a standalone product/strategy proposal. It does not modify the Sandpitt
Inspection System codebase and is not currently scoped to be built on top of it.

---

## Table of Contents

1. [Executive Summary & Positioning](#1-executive-summary--positioning)
2. [What OpenConstructionERP Does Well (and What It Doesn't)](#2-what-openconstructionerp-does-well-and-what-it-doesnt)
3. [End-to-End Workflow](#3-end-to-end-workflow)
4. [Data Model Sketch](#4-data-model-sketch)
5. [AI Touch Points](#5-ai-touch-points)
6. [Differentiation vs. OpenConstructionERP](#6-differentiation-vs-openconstructionerp)
7. [Phased Roadmap](#7-phased-roadmap)
8. [Open Questions & Risks](#8-open-questions--risks)

---

## 1. Executive Summary & Positioning

The proposal: a **multi-tenant SaaS** where each subscribing construction/trade company
gets its own isolated workspace, and the product's job is to own the full lifecycle from
"an inquiry landed in the inbox" to "the job is scheduled, tracked, and closed out." AI
does the labor-intensive parts — turning a messy email into a structured scope, drafting
a priced quote — but never sends anything without a human reviewing it first.

**Positioning against OpenConstructionERP:** OpenConstructionERP is a free,
open-source (AGPL-3.0), **self-hosted, single-company** construction ERP — deep on
BOQ/estimating, CAD/BIM takeoff, and AI cost matching, with 70+ modules covering
everything from clash detection to property development. It is estimate-and-BIM-centric:
you start from a Bill of Quantities or a model, not from a customer inquiry, and there is
no CRM-style "first contact" workflow or quote→job conversion step baked into the core
loop. It's also explicitly single-tenant — there is no SaaS mode; you install and run it
yourself.

This product is deliberately the opposite shape: **narrow and opinionated on the
commercial workflow** (inquiry → quote → job → schedule → daily tracking), **multi-tenant
SaaS from day one**, and aimed at small-to-medium multi-trade contractors who don't need
BIM/5D/clash-detection depth but do need to stop losing inquiries in an inbox and stop
re-typing the same quote line items every week.

## 2. What OpenConstructionERP Does Well (and What It Doesn't)

Findings from the product site, docs, and GitHub README:

| Area | What OpenConstructionERP does | Relevance to this idea |
|---|---|---|
| CRM / tendering | Leads/deals pipeline; bid packages sent to subcontractors; side-by-side bid comparison with anomaly flagging | Direct precedent for a lead pipeline, but theirs is outbound (soliciting subcontractor bids), not inbound (customer RFQ intake) — the gap this product fills |
| AI estimation | Drop a photo or PDF → scoped, priced first-pass estimate; AI suggests classifications/rates **with confidence scores**; nothing is applied without user decision | Exactly the human-in-the-loop pattern to copy for AI scope breakdown and AI quote drafting |
| Cost database | 120,000+ priced items across 9 regional cost bases (global CWICR + 8 national), semantic search matching; a "cost matching" step that replaces AI-guessed rates with catalogue prices | Direct analogue of the proposed **Schedule of Rates (SOR) verification** step — quotes get checked against a rate catalogue before they can be sent |
| Assemblies | Reusable labor + material + equipment bundles linked into BOQ lines | Direct analogue of "fixed items/costs to speed up quotes" |
| Equipment | Separate equipment/resources module from cost items | Matches the proposed equipment register |
| Daily Diary | Weather-aware entries, crew/equipment/deliveries/delays tracking, photo capture with EXIF/GPS, HSE incident taxonomy | Direct analogue of "daily updates" during job execution |
| Scheduling | Gantt chart; **auto-generates activities from the BOQ** with cost-proportional durations; critical path, EVM, S-curves | Precedent for auto-adding a job to the planner the moment a quote is accepted |
| AI chat | A floating assistant with ~17 typed tools over the ERP's own data (projects, schedule, risk register, BIM elements), provider-agnostic (Anthropic/OpenAI/Gemini/Mistral/Groq/DeepSeek) | Useful pattern for a "quote assistant" that can answer questions using the tenant's own cost/job data |
| **Gaps** | No SaaS/multi-tenant mode (self-hosted only); no email-intake/first-contact CRM step; no explicit quote→job conversion event; heavy BIM/CAD/clash-detection surface area that a small trade contractor doesn't need | These gaps are exactly this product's opportunity |

## 3. End-to-End Workflow

The spine of the product. Each stage below is the "what happens," what's AI-assisted vs.
manual, and (where relevant) the OpenConstructionERP feature it draws from.

1. **Inquiry capture.** Email forwarding/ingestion into the tenant's inbox, plus manual
   entry and an optional public web form. Creates or matches a **Contact** and opens an
   **Inquiry**, keeping the original email thread attached.
2. **AI scope breakdown.** The inquiry text/attachments are parsed into structured
   **Scope Items** (services requested, rough quantities, site details, urgency). Each
   extracted item carries a confidence score and nothing is committed until a human
   reviews it — the same "suggest, don't auto-apply" pattern OpenConstructionERP uses for
   its AI estimation.
3. **Measurement input.** Measurements (manual entry first; photo/PDF takeoff as a later
   phase, following OpenConstructionERP's PDF/CAD measurement tools) attach to scope
   items and feed quote quantities.
4. **Quote builder.** Services required are selected against the tenant's own catalogue
   of cost items (labor/material/equipment rates) and **fixed items/assemblies** —
   pre-built packages of common line-item bundles, so a recurring job type doesn't get
   re-quoted from scratch every time.
5. **Schedule of Rates (SOR) verification.** Before a quote can be sent, its line items
   are checked against the tenant's rate catalogue — flagging items priced off-rate or
   missing from the catalogue entirely. This mirrors OpenConstructionERP's "cost
   matching" step that replaces AI-guessed rates with catalogue/market prices.
6. **AI-drafted quote.** A full quote is assembled from the scope, catalogue, and
   assemblies, and presented for review/edit — never auto-sent.
7. **Quote acceptance → Job creation.** Accepting a quote (customer sign-off, or an
   internal "approved") converts it into a **Job** automatically — no re-entry.
8. **Auto-add to planner/scheduler.** The new job is placed on the schedule
   automatically (simple calendar initially; Gantt-style with crew/equipment assignment
   later, following OpenConstructionERP's "auto-generate schedule from BOQ" pattern).
9. **Daily updates.** During execution, the crew logs daily progress, delays, crew/
   equipment used, and photos — a lighter-weight version of OpenConstructionERP's Daily
   Diary.
10. **Job completion / close-out.**

## 4. Data Model Sketch

Every table below is tenant-scoped (see [Section 6](#6-differentiation-vs-openconstructionerp)
on multi-tenancy):

- **Company** — the tenant itself; subscription/plan info
- **User / Role** — staff accounts (owner, estimator, crew, etc.)
- **Contact / Lead** — the customer or prospect
- **Inquiry** — first-contact record, linked to the originating email thread
- **ScopeItem** — a structured piece of scope extracted from (or manually entered
  against) an inquiry
- **Job** — the unit of work; created from an accepted Quote
- **Quote** / **QuoteLineItem**
- **CostItem / RateCatalogue** — the tenant's Schedule of Rates (labor, material,
  equipment unit rates)
- **Equipment** — the tenant's equipment register (distinct from generic cost items,
  matching OpenConstructionERP's separation)
- **FixedItem / AssemblyTemplate** — reusable bundles of cost items for common
  quote packages
- **ScheduleEntry** — a job's placement on the planner/calendar
- **DailyUpdate** — a day's log against an in-progress job

## 5. AI Touch Points

| Step | AI approach | Human gate |
|---|---|---|
| Scope parsing from email/attachments | Structured extraction (LLM with a typed output schema) | Reviewer confirms/edits extracted scope items before they're used |
| SOR verification | Retrieval/matching against the tenant's own rate catalogue (semantic search, similar to OpenConstructionERP's cost-matching) | Flags surfaced to the estimator; nothing auto-corrected silently |
| Quote drafting | Generation, assembled from confirmed scope + catalogue + assemblies | Full quote is editable and requires explicit send |
| Quote assistant (later phase) | Chat-style assistant with typed tools over the tenant's own data (jobs, catalogue, schedule) — following OpenConstructionERP's provider-agnostic AI chat pattern | Read/suggest only, no destructive actions without confirmation |

The consistent rule, borrowed directly from OpenConstructionERP's AI estimation feature:
**AI suggests with a confidence signal; a human approves before anything becomes
official** (a sent quote, a scheduled job, a corrected rate).

## 6. Differentiation vs. OpenConstructionERP

- **SaaS multi-tenant vs. self-hosted single-install.** Every table carries a
  `company_id`/tenant scope; tenant-isolated auth (as opposed to OpenConstructionERP,
  which has no multi-tenant mode at all — it's one install per company).
- **Inquiry-to-job lifecycle ownership vs. estimate/BIM-centric.** OpenConstructionERP
  starts from a BOQ or a model; this product starts from "a customer emailed us" and
  treats quote→job conversion as a first-class event, which OpenConstructionERP doesn't
  model explicitly.
- **SME trade-contractor simplicity vs. enterprise BIM/5D depth.** No CAD/IFC/Revit
  takeoff, no clash detection, no property-development/accommodation modules — those are
  OpenConstructionERP's enterprise surface area and are out of scope here. The cost
  database, assemblies, and SOR-verification *concepts* are worth emulating even though
  the products target different buyers.

## 7. Phased Roadmap

**MVP**
- CRM inquiry intake (manual + email forwarding)
- Manual scope entry
- Quote builder with cost catalogue and fixed items/assemblies
- Basic scheduler (calendar view, manual placement)
- Quote → Job conversion

**Phase 2**
- AI scope parsing from inquiry emails/attachments
- AI-drafted quotes
- Automated SOR verification pass before send

**Phase 3**
- Measurement/takeoff tools (photo/PDF)
- Daily diary/updates during job execution
- Reporting and analytics

## 8. Open Questions & Risks

- **Email ingestion approach** — inbound-parsing service (e.g., a dedicated inbound
  email webhook) vs. IMAP polling of a tenant's existing inbox; affects onboarding
  friction significantly.
- **SOR catalogue seeding** — build a starter rate catalogue per trade/region from
  scratch vs. license/reference an existing cost database (OpenConstructionERP's own
  CWICR dataset is AGPL-3.0, which has license implications for reuse).
- **Multi-trade vs. single-trade configuration** — whether the catalogue/services model
  needs per-trade templates out of the box or starts fully custom per tenant.
- **Relationship to Sandpitt** — this is currently a separate product idea; if the same
  business wants both inspections and quote-to-job management under one roof later, the
  auth (Keycloak), file storage (MinIO), and PostGIS site/asset patterns already proven
  in Sandpitt would be the natural things to reuse, but that integration is not assumed
  or scoped here.
