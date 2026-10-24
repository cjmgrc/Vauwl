<div align="center">

# Vauwl

### Your life, secured and remembered.

**A personal life-management platform connecting the things you own, the records behind them, and the actions they require.**

<!-- Replace this path with the actual logo asset in your repository. -->
<img src="apps\web\public\vauwl-logo.png" alt="Vauwl logo" width="160" />

[Overview](#-overview) · [Features](#-features) · [Architecture](#-architecture) · [Getting Started](#-getting-started) · [Roadmap](#-roadmap)

</div>

---

> **Status:** In development. This README describes the intended product direction and proposed architecture. It does not imply that every listed feature is already implemented.

## 📖 Overview

**Vauwl** (pronounced like _vault_) is a personal life-management system inspired by the security of a vault and the awareness of an owl. It aims to give people one organized place to manage their belongings, purchase records, documents, expenses, warranties, maintenance, and reminders.

Important information often gets scattered across email, photo galleries, paper receipts, spreadsheets, and memory. Vauwl is designed to bring those details together and make them useful.

Rather than treating every record as an isolated entry, Vauwl connects related information. An item can be linked to its receipt, warranty, repair history, ownership costs, and future reminders—creating a clearer picture of ownership.

### The idea

- **Vault:** Keep important personal records organized and protected.
- **Owl:** Bring awareness to details, relationships, and upcoming responsibilities.
- **Connected records:** Turn scattered information into a useful, searchable system.

### Goals

- Create a reliable source of truth for personal belongings and their records.
- Make ownership history and costs easier to understand.
- Help users act before warranties expire or maintenance becomes overdue.
- Explore natural-language search and automation grounded in saved data.
- Demonstrate thoughtful product design and full-stack engineering.

## ✨ Features

The following describes the intended product direction. Update this section as features become available in the codebase.

### 📦 Living Items

Create detailed profiles for electronics, appliances, furniture, tools, and other belongings.

An item profile may include:

- Name, description, category, and photo
- Brand, model, serial number, and purchase date
- Purchase price, seller, and estimated current value
- Storage location and condition
- Warranty information
- Linked receipts, manuals, and documents
- Accessories, repairs, and maintenance history
- Related expenses and reminders

### 🕸️ LifeGraph

Explore relationships between items and records through an interactive graph.

For example, a laptop can connect to its purchase receipt, warranty, repair record, accessories, and maintenance reminders. The goal is to make those relationships visible instead of requiring users to find each record separately.

### 🔎 LifeQuery

Search saved information using natural language.

Example questions:

- “Which devices are still under warranty?”
- “How much have I spent maintaining my laptop?”
- “What maintenance is coming up this month?”
- “Show the receipts connected to my camera.”

Answers should be grounded in records the user is authorized to access. If data is missing or incomplete, Vauwl should explain the limitation rather than inventing an answer.

### 💰 TrueCost

Understand the recorded cost of owning an item over time.

A planned calculation can include:

`Purchase cost + repairs + maintenance − resale proceeds`

Vauwl should distinguish recorded amounts from estimates and show which records contribute to each total.

### ⚡ Consequence Engine

Create rules that turn important dates and changes into useful follow-up actions.

Potential automations include:

- Remind me before a warranty expires.
- Schedule recurring maintenance.
- Notify me when a document or inspection is due.
- Create a follow-up task after recording a repair.

Automations should be transparent, avoid duplicate notifications, and let users review or disable rules.

### 📸 Capture Once

Reduce manual entry by extracting details from receipts, product labels, or documents using OCR.

Intended flow:

1. Upload or capture a document.
2. Extract possible fields such as seller, date, and total.
3. Review and correct the extracted information.
4. Confirm before saving.
5. Link the document to the relevant item or record.

Extracted data should remain a suggestion until the user confirms it.

### 🔐 Documents Vault

Organize receipts, warranties, manuals, invoices, and repair documents alongside the records they belong to. Private documents should not be exposed through public file URLs; access must be authorized for the relevant account.

### 📅 Reminders & Timeline

Review upcoming tasks and important events in one place, including warranty expirations, maintenance dates, repairs, and item-related milestones.

### 📊 Dashboard & Analytics

Get an overview of inventory, upcoming responsibilities, recorded expenses, and other personal records.

## 🧭 Planned Application Modules

| Module                   | Purpose                                           |
| ------------------------ | ------------------------------------------------- |
| **Dashboard**            | Overview of items, expenses, and upcoming actions |
| **My Inventory**         | Browse, search, filter, and organize belongings   |
| **Item Details**         | Review an item's profile and connected records    |
| **LifeGraph**            | Explore relationships between items and records   |
| **LifeQuery**            | Ask natural-language questions about saved data   |
| **TrueCost Analytics**   | Understand recorded ownership costs               |
| **Consequence Engine**   | Configure rules, reminders, and follow-up actions |
| **Documents Vault**      | Organize receipts, warranties, manuals, and files |
| **Reminders & Timeline** | Track due dates and historical events             |
| **Settings & Security**  | Manage account preferences and security options   |

## 🛠️ Technology Stack

The stack below is the intended architecture. Adjust it to match the packages and services actually used in this repository.

### Frontend

- **React** — component-based user interface
- **Vite** — development server and build tooling
- **TypeScript** — static typing
- **CSS** — responsive styling and design system

### Backend

- **Node.js** — server-side runtime
- **Fastify** — HTTP API framework
- **TypeScript** — shared type safety
- **REST API** — communication between frontend and backend

### Data & Infrastructure

- **PostgreSQL** — relational data storage
- **Prisma** — schema modeling, queries, and migrations
- **Private object storage** — item photos and documents
- **Background jobs** — scheduled reminders and automation
- **Docker** — reproducible local services and deployment
- **GitHub Actions** — continuous integration and automated checks

### Optional integrations

These are possible extensions, not requirements for the initial version:

- OCR for receipt and document extraction
- AI-assisted natural-language querying
- Email or push notifications
- Calendar integrations
- Secure file storage providers

## 🏗️ Architecture

Vauwl is planned as a modular full-stack application. The frontend communicates with a backend API. The backend validates requests, enforces authorization, and accesses the database and private file storage.

```text
┌──────────────────────────┐
│       React + Vite       │
│       Web Frontend       │
└────────────┬─────────────┘
             │ HTTPS / REST
             ▼
┌──────────────────────────┐
│    Node.js + Fastify     │
│       Backend API        │
├──────────────────────────┤
│ Authentication           │
│ Validation & Authorization│
│ Domain Services          │
│ Reminders & Automation   │
└───────┬─────────┬────────┘
        │         │
        ▼         ▼
┌──────────────┐ ┌──────────────────┐
│ PostgreSQL   │ │ Private Object   │
│ + Prisma     │ │ Storage          │
└──────────────┘ └──────────────────┘
```

### Suggested repository structure

The actual structure may differ as development progresses.

```text
vauwl/
├── apps/
│   ├── web/                  # React + Vite frontend
│   └── api/                  # Fastify backend
├── packages/
│   └── shared/               # Shared types and schemas
├── database/
│   └── prisma/               # Prisma schema and migrations
├── docs/                     # Documentation and assets
├── infrastructure/           # Docker and deployment configuration
├── .github/
│   └── workflows/            # CI workflows
├── .env.example
├── package.json
└── README.md
```

## 🚀 Getting Started

Vauwl is under active development. The commands below are a **suggested setup** for the intended monorepo; verify the actual scripts, package manager, and folder structure in the repository before using them.

### Prerequisites

- [Node.js](https://nodejs.org/) — use the version specified by the project, if configured
- npm or the package manager specified by the repository
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/) if running PostgreSQL locally in a container
- A PostgreSQL instance, local or containerized

### 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd vauwl
```

Replace `<YOUR_REPOSITORY_URL>` with your repository's clone URL.

### 2. Install dependencies

For an npm-workspaces monorepo:

```bash
npm install
```

If the repository uses separate package folders or another package manager, follow its lockfile and scripts.

### 3. Configure environment variables

Create a local environment file from the example:

```bash
cp .env.example .env
```

On Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Example variables for the planned architecture:

```dotenv
# API
NODE_ENV=development
API_PORT=3000
WEB_ORIGIN=http://localhost:5173

# Database
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/vauwl

# Authentication
SESSION_SECRET=replace-with-a-long-random-secret

# File storage (only if your implementation uses object storage)
STORAGE_ENDPOINT=
STORAGE_BUCKET=
STORAGE_ACCESS_KEY=
STORAGE_SECRET_KEY=
```

These variable names are examples, not a guarantee of the current application's configuration. Use the names required by the actual code. **Never commit real credentials, session secrets, access keys, or production environment files.**

### 4. Start the database

If the repository provides a Docker Compose configuration, follow its instructions. A typical command is:

```bash
docker compose up -d
```

This command only works if a suitable Compose file is present.

### 5. Apply database migrations

If Prisma is configured:

```bash
npx prisma migrate dev
npx prisma generate
```

Run these commands from the package or workspace where the Prisma schema is configured, after setting up the database connection.

### 6. Start the development servers

Use the scripts defined in the root or workspace `package.json`. A typical monorepo might provide:

```bash
npm run dev
```

If the frontend and backend run separately, use the relevant workspace scripts. The frontend commonly runs at `http://localhost:5173`; the API may run at `http://localhost:3000`. Actual ports depend on the configuration.

## ⚙️ Environment Variables

Configure only the variables used by the current implementation.

| Variable             | Purpose                                      | Example                 |
| -------------------- | -------------------------------------------- | ----------------------- |
| `NODE_ENV`           | Runtime environment                          | `development`           |
| `API_PORT`           | Backend listening port                       | `3000`                  |
| `WEB_ORIGIN`         | Allowed frontend origin for CORS             | `http://localhost:5173` |
| `DATABASE_URL`       | PostgreSQL connection string                 | `postgresql://...`      |
| `SESSION_SECRET`     | Secret for the chosen session implementation | Keep private            |
| `STORAGE_ENDPOINT`   | Object-storage endpoint, if used             | Provider-specific       |
| `STORAGE_BUCKET`     | Private file bucket, if used                 | `vauwl-files`           |
| `STORAGE_ACCESS_KEY` | Storage access credential, if used           | Keep private            |
| `STORAGE_SECRET_KEY` | Storage secret credential, if used           | Keep private            |

Do not expose server-only secrets through frontend variables. In Vite, variables prefixed with `VITE_` are exposed to client-side code and must never contain secrets.

## 🔒 Security Principles

Vauwl is intended to handle personal records and potentially sensitive documents, so security should be part of the design from the beginning.

- **Authentication:** Use a well-maintained authentication approach and securely hash passwords if passwords are stored.
- **Authorization:** Verify ownership and permissions on every private record and file operation.
- **Session security:** Prefer appropriately configured secure, HTTP-only cookies for browser sessions where suitable.
- **Input validation:** Validate request bodies, query parameters, identifiers, and uploaded files on the server.
- **Private file access:** Keep documents private and use short-lived, authorized access links when needed.
- **Secrets management:** Keep credentials out of source control and use environment variables or a secret manager.
- **Rate limiting:** Protect authentication and other sensitive endpoints from abuse.
- **Data integrity:** Use database constraints and transactions where appropriate.
- **Reliable automation:** Make background jobs retry-safe and prevent duplicate reminders.
- **Privacy-conscious AI:** Restrict AI-assisted queries to records the authenticated user may access. AI output must never act as an authorization mechanism.
- **Backups and recovery:** Document backup, restoration, and data-retention procedures before production use.

These are design goals, not a claim that every control is already implemented.

## 🧪 Testing & Quality

As the codebase grows, useful checks include:

- Unit tests for domain logic and utility functions
- API integration tests for validation and authorization
- Frontend component and interaction tests
- End-to-end tests for important user journeys
- Database migration checks
- Accessibility and responsive-layout checks
- Linting, formatting, type checking, and production builds in CI

Suggested commands—only if the corresponding scripts exist in `package.json`:

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

## 🗺️ Roadmap

This roadmap is a planning guide. Mark items as complete only after they are implemented and tested.

- [ ] **Foundation**
  - [ ] Set up frontend and backend workspaces
  - [ ] Configure database schema and migrations
  - [ ] Establish API conventions and error handling
  - [ ] Add authentication and authorization
- [ ] **Core records**
  - [ ] Create, view, edit, and archive inventory items
  - [ ] Add search, sorting, filtering, and categories
  - [ ] Build detailed item pages and record relationships
- [ ] **Documents & ownership**
  - [ ] Attach receipts, warranties, and manuals
  - [ ] Record purchase, repair, and maintenance expenses
  - [ ] Track warranties and item condition
- [ ] **Reminders & automation**
  - [ ] Add a reminders timeline
  - [ ] Support recurring maintenance
  - [ ] Build reliable, configurable automation rules
- [ ] **Distinctive features**
  - [ ] Visualize relationships with LifeGraph
  - [ ] Calculate recorded ownership costs with TrueCost
  - [ ] Add LifeQuery with record-grounded answers
  - [ ] Explore OCR-based Capture Once workflows
- [ ] **Production readiness**
  - [ ] Expand automated tests and CI
  - [ ] Improve accessibility and responsive behavior
  - [ ] Review security, privacy, and data retention
  - [ ] Document deployment, backups, and recovery

## 🎨 Design Direction

Vauwl's visual identity combines the idea of a secure vault with the watchful character of an owl.

- **Personality:** calm, clever, secure, approachable, and dependable
- **Visual style:** minimal, modern, and product-focused
- **Palette:** charcoal and warm neutrals with restrained sage or mint accents
- **Interface:** clear hierarchy, generous spacing, readable typography, and purposeful motion
- **Responsive design:** comfortable use across desktop, tablet, and mobile
- **Accessibility:** keyboard support, visible focus states, readable contrast, and clear feedback

The owl-and-vault concept should inform the brand without making the interface feel overly playful or visually busy.

## 💡 Why Vauwl?

Many people keep receipts in one place, warranties in another, and maintenance notes somewhere else. Vauwl's central idea is to connect those records and help them lead to useful actions.

Its intended differentiators are:

1. **Connected ownership records** rather than isolated item entries.
2. **Visible relationships** through LifeGraph.
3. **Traceable cost calculations** through TrueCost.
4. **Actionable reminders and rules** through the Consequence Engine.
5. **Natural-language access** through LifeQuery, grounded in saved data.
6. **Assisted capture with user confirmation** instead of silently trusting extracted information.

These are product goals and should be evaluated against existing tools as implementation and user research progress.

## 🧑‍💻 Project Purpose

Vauwl is also an opportunity to demonstrate end-to-end software development and product thinking, including:

- Responsive React interface design
- TypeScript and shared data contracts
- REST API design and backend integration
- Relational database modeling and migrations
- Authentication, authorization, and file access controls
- Search, filtering, analytics, and data visualization
- Background jobs and event-driven workflows
- Automated testing, CI/CD, and deployment practices
- Accessibility, documentation, and maintainable architecture

## 🤝 Contributing

Contributions, suggestions, and constructive feedback are welcome as the project evolves.

1. Check existing issues and discussions before starting a large change.
2. Create a focused branch for your work.
3. Keep changes small and explain the reasoning behind them.
4. Add or update tests when behavior changes.
5. Update documentation when setup, configuration, or behavior changes.
6. Open a pull request describing the change and how it was verified.

If contribution guidelines or issue templates are added later, follow those repository-specific instructions.

## 📄 License

No license has been specified in this README. Add a `LICENSE` file and name the selected license here before presenting the project as open source. Without a license, standard copyright restrictions generally apply.

## 📬 Contact

For questions, ideas, or collaboration, open a GitHub issue or use the contact details provided in the repository owner's profile.

---

<div align="center">

**Vauwl — Your life, secured and remembered.**

_Keep the details. See the connections. Stay one step ahead._

</div>
