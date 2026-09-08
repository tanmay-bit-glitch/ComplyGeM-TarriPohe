<div align="center">

# 🏛️ ComplyGeM (TarriPohe)
### **Autonomous AI Compliance, Sovereign Statutory Gateway Verification & Forensic Tender Intelligence for Government e-Marketplace (GeM)**

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Node Version](https://img.shields.io/badge/Node.js-v18%2B%20%7C%20v20%2B-339933?style=for-the-badge&logo=node.js)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-19.0.1-61DAFB?style=for-the-badge&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8.2-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4.1-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)
[![Google Gemini GenAI](https://img.shields.io/badge/Google%20GenAI-Gemini%202.0%20%7C%201.5-8E75B2?style=for-the-badge&logo=google)](https://ai.google.dev)
[![Vite](https://img.shields.io/badge/Vite-6.2.3-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev)
[![GIGW 3.0](https://img.shields.io/badge/Compliance-GIGW%203.0%20Gov-FF9933?style=for-the-badge)](https://guidelines.india.gov.in)

<p align="center">
  <b>ComplyGeM</b> revolutionizes public procurement evaluation on India's <b>Government e-Marketplace (GeM)</b> by delivering real-time bidder compliance validation, autonomous forensic document analysis, and zero-trust cross-verification across 14+ statutory government gateways.
</p>

[Explore the Problem](#-the-problem) •
[Our Approach & Differentiators](#-our-approach--why-we-are-different) •
[The Solution](#-the-solution) •
[Zero-API Key Operation](#-standalone-zero-api-key-operation) •
[Local Setup Guide](#-how-to-run-locally-on-your-system) •
[Demo Personas](#-preloaded-demo-personas--walkthrough)

---

</div>

## 📌 Table of Contents
- [Executive Overview](#-executive-overview)
- [The Problem: The Public Procurement Crisis](#-the-problem)
  - [1. The Manual Review Bottleneck](#1-the-manual-review-bottleneck)
  - [2. Statutory Fraud & Document Forgery](#2-statutory-fraud--document-forgery)
  - [3. The Legitimate Bidder Rejection Tragedy](#3-the-legitimate-bidder-rejection-tragedy)
- [Our Approach & Why We Are Different](#-our-approach--why-we-are-different)
  - [Key Differentiators & Competitive Comparison](#key-differentiators-at-a-glance)
- [The Solution: Architecture & Core Capabilities](#-the-solution)
  - [1. Bidder Pre-Submission Compliance Wizard](#1-bidder-pre-submission-compliance-wizard)
  - [2. Procurement Officer Forensic Evaluation Hub](#2-procurement-officer-forensic-evaluation-hub)
  - [3. 14-Authority Unified Statutory Gateway](#3-14-authority-unified-statutory-gateway)
  - [4. Cross-Verification & Fraud Risk Scoring Engine](#4-cross-verification--fraud-risk-scoring-engine)
  - [5. Sovereign GIGW 3.0 Accessibility & Bilingual UI](#5-sovereign-gigw-30-accessibility--bilingual-ui)
- [Standalone & Zero-API-Key Operation](#-standalone-zero-api-key-operation)
- [How to Run Locally on Your System](#-how-to-run-locally-on-your-system)
  - [Prerequisites](#prerequisites)
  - [Installation & Quick Start](#installation--quick-start)
  - [Environment Variables (Optional)](#environment-variables-optional)
  - [Available Scripts](#available-scripts)
- [Preloaded Demo Personas & Walkthrough](#-preloaded-demo-personas--walkthrough)
- [Statutory Gateway Master Registry](#-statutory-gateway-master-registry)
- [Tech Stack](#-tech-stack)
- [Team & Acknowledgments](#-team--acknowledgments)

---

## 🚀 Executive Overview

The **Government e-Marketplace (GeM)** handles transactions worth hundreds of billions of rupees for ministries, public sector undertakings (PSUs), and defense entities across India. While GeM has democratized market access, verifying statutory compliance and technical qualifications remains a grueling, manual, and error-prone process.

**ComplyGeM** bridges this divide by providing:
1. **For Bidders:** A guided pre-submission wizard with real-time Indic OCR and clause validation that prevents disqualification due to clerical errors.
2. **For Procurement Officers:** A unified forensic command center with automated risk scores, cross-document verification, and instant statutory checks against 14 government authorities (GSTN, MCA21, Udyam, Income Tax, CPPP Debarment, ICAI UDIN, and more).
3. **For Developers & Evaluators:** A completely self-contained, air-gapped simulation architecture that runs **100% locally out-of-the-box with zero required API keys**, while seamlessly supporting Google Gemini 2.0/1.5 Flash multimodal AI vision when an API key is provided.

---

## 🚨 The Problem

Government procurement officers face thousands of tender submissions, each accompanied by 20 to 50 pages of scanned documents, certificates, affidavits, and technical compliance sheets. Today's process suffers from three critical vulnerabilities:

### 1. The Manual Review Bottleneck
- Officers must manually inspect every page of every bidder's PDF submissions.
- Cross-referencing documents against external statutory portals (checking if a GSTIN is active, verifying if an MSME Udyam registration is authentic, querying MCA-21 for active Director CINs) requires logging into 10+ disconnected external websites.
- A single tender evaluation frequently takes **weeks to months**, causing severe delivery delays for critical public infrastructure, healthcare, and defense supplies.

### 2. Statutory Fraud & Document Forgery
- **Forged MSME / Udyam Certificates:** Non-qualifying large enterprises submit forged Udyam certificates to falsely claim Earnest Money Deposit (EMD) exemptions and tender fee waivers.
- **Unverified CA Turnover Certificates:** Audited turnover sheets are uploaded without verifiable **ICAI Unique Document Identification Numbers (UDIN)**, bypassing financial eligibility thresholds.
- **Blacklisted / Debarred Bidders:** Entities debarred under the Central Public Procurement Portal (CPPP) or Ministry blacklists alter slight spellings or entity names to participate undetected.
- **Mismatched Tax & Identity Records:** Bids submitted under one corporate entity contain PAN, GSTIN, or Bank Solvency documents belonging to third parties or dissolved sister companies.

### 3. The Legitimate Bidder Rejection Tragedy
- Small, genuine MSMEs and Indian startups often get summarily disqualified at technical opening simply because they missed a single format requirement, omitted an annexure seal, or uploaded an unreadable scan.
- Bidders receive **zero pre-submission feedback** on whether their documents satisfy the tender's mandatory clauses until after the bid window closes and rejection is final.

---

## 💡 Our Approach & Why We Are Different

ComplyGeM introduces a **two-sided, proactive compliance paradigm**: instead of punishing bidders *after* submission or burdening officers with *manual verification*, ComplyGeM validates compliance at the point of ingestion and surfaces actionable forensic intelligence.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                COMPLYGEM WORKFLOW                                      │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│  [ BIDDER SIDE ]                                                                       │
│  Upload Document / Camera Scan                                                         │
│         │                                                                              │
│         ▼                                                                              │
│  Dual AI/Heuristic Extraction (Indic OCR + Regex Parsing)                              │
│         │                                                                              │
│         ▼                                                                              │
│  Instant Pre-Submission Validation (Validity, UDIN, Format Check)                     │
│         │                                                                              │
│         ▼                                                                              │
│  Fix Discrepancies Before Final GeM Submission                                         │
│                                                                                        │
├────────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                        │
│  [ OFFICER SIDE ]                                                                      │
│  One-Click Parallel Statutory Cross-Verification                                       │
│         │                                                                              │
│         ├── GSTN (Active Taxpayer, GSTR-3B filings)                                    │
│         ├── MCA-21 (Company Status, Directors)                                         │
│         ├── MSME Udyam (Enterprise Tier, NIC code)                                     │
│         ├── CPPP Debarment Registry (Blacklist Check)                                  │
│         ├── ICAI UDIN (CA Turnover Authenticity)                                       │
│         └── 9+ Additional Sovereign Gateways                                           │
│         │                                                                              │
│         ▼                                                                              │
│  Autonomous Risk Classification (LOW / MEDIUM / HIGH) + Audit Trail                    │
│                                                                                        │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

### Key Differentiators at a Glance

| Feature / Capability | Traditional GeM Workflow | Generic AI Document Viewers | ComplyGeM (TarriPohe) |
| :--- | :---: | :---: | :---: |
| **Pre-Submission Bidder Feedback** | ❌ None (Rejection after deadline) | ❌ None (Generic OCR only) | ✅ **Real-Time Interactive Guidance & Clause Check** |
| **Statutory Cross-Verification** | ❌ 100% Manual across 10+ portals | ❌ Not connected to Gov Registries | ✅ **Unified 14-Gateway Sovereign Master Registry** |
| **ICAI UDIN Forensic Check** | ❌ Rare / Manual spot check | ❌ Unaware of Indian statutory formats | ✅ **Automated 18-digit UDIN validation & status verify** |
| **CPPP Debarment Detection** | ❌ Cumbersome manual blacklist search | ❌ Ignored | ✅ **Instant automated debarment & suspension flag** |
| **Zero-API-Key Standalone Mode** | ❌ N/A | ❌ Fails without paid Cloud keys | ✅ **Fully operational offline with sovereign simulation** |
| **Dual Vision Pipeline** | ❌ None | ⚠️ Cloud-only or slow | ✅ **Gemini 2.0 Multimodal + Offline Deterministic Engine** |
| **Indian Portal Standard (GIGW 3.0)** | ⚠️ Basic | ❌ None | ✅ **Bilingual (EN/HI), Zoom 70-160%, Tricolor Gov UI** |
| **Tamper-Evident Audit Trail** | ❌ Fragmented paper / Excel trails | ❌ None | ✅ **Real-Time Immutable Audit Log & Live Notifications** |

---

## 🛠️ The Solution

ComplyGeM delivers an integrated, enterprise-grade suite purpose-built for Indian public procurement:

### 1. Bidder Pre-Submission Compliance Wizard
- **Interactive Multi-Step Tender Application:** Guides vendors through tender selection, mandatory document uploads, and technical clause compliance.
- **Live Document Inspection & Camera Capture:** Upload PDFs, images, or use the integrated camera scanner to capture physical certificates directly from a desk or mobile device.
- **Real-Time Indic Forensic Analysis:** Automatically extracts document numbers (UDYAM, GSTIN, PAN, CIN, UDIN), legal entity names, dates of validity, and issuing authorities.
- **Immediate Discrepancy Warnings:** If a bidder uploads an expired document, an mismatched GSTIN, or an invalid UDIN format, the wizard immediately alerts the bidder with clear remediation instructions *before* submission.

### 2. Procurement Officer Forensic Evaluation Hub
- **Executive Tender Dashboard:** View all incoming vendor bids with consolidated metrics: overall compliance rate, risk breakdown (Low, Medium, High), and tender deadlines.
- **Side-by-Side Document & Gateway Inspection:** Inspect extracted document fields right alongside official statutory gateway records.
- **One-Click Autonomous Verification:** Run multi-gateway statutory verification across all submitted documents simultaneously.
- **Formal Evaluation Decisions:** Record official procurement verdicts (`QUALIFIED`, `DISQUALIFIED`, `CLARIFICATION_REQUESTED`) accompanied by mandatory evaluation remarks and digital audit stamps.

### 3. 14-Authority Unified Statutory Gateway
Integrated query engine and explorer across 14 central government statutory registries:
1. **GSTN** — Goods and Services Tax Network (Taxpayer status, GSTR-3B filing recency)
2. **MCA-21 / ROC** — Ministry of Corporate Affairs (CIN, active company status, directors)
3. **MSME Udyam** — Ministry of Micro, Small and Medium Enterprises (Classification, NIC codes)
4. **Income Tax (CBDT)** — PAN validity, name matching, ITR-V filing status
5. **CPPP Debarment** — Central Public Procurement Portal debarment and blacklist records
6. **CCA / DSC** — Controller of Certifying Authorities (Class-3 Digital Signature validity)
7. **ICAI UDIN** — Institute of Chartered Accountants of India (Turnover certificate UDIN validation)
8. **PFMS / Bank** — Public Financial Management System & PFMS vendor bank mandate
9. **BIS Registry** — Bureau of Indian Standards (ISI mark & product standard certification)
10. **ISO / QCI** — Quality Council of India & NABCB accredited ISO certificates
11. **Make in India (DPIIT)** — Public Procurement Preference to Make in India local content verification
12. **OEM Authorization** — Principal equipment manufacturer authorization validation
13. **Bank Solvency / e-BG** — Electronic Bank Guarantee & Solvency Certificate validation
14. **GeM Work Order History** — Past performance and work order execution history on GeM

### 4. Cross-Verification & Fraud Risk Scoring Engine
- Computes an **Authenticity & Compliance Score (0–100%)** based on statutory alignment.
- Flags discrepancy types:
  - `CRITICAL_DEBARRED`: Bidder entity or director matches national blacklist.
  - `UDIN_NOT_FOUND`: CA turnover certificate does not exist in ICAI database.
  - `NAME_MISMATCH`: PAN legal name does not match GSTIN or MCA-21 records.
  - `LOCAL_CONTENT_DEFICIT`: Declared Make-in-India percentage is below tender threshold.
  - `TAX_DEFAULT`: Multiple missed GSTR-3B filings or suspended GSTIN.

### 5. Sovereign GIGW 3.0 Accessibility & Bilingual UI
- Complies with the **Guidelines for Indian Government Websites (GIGW 3.0)**.
- **Bilingual Interface:** Instant one-click toggle between **English** and **हिन्दी (Hindi)** across all navigation, forms, and alerts.
- **Accessibility Font Magnification:** Built-in font zoom controls (from **70%** up to **160%**) adhering to WCAG 2.1 AA contrast and readability guidelines.
- **Official Gov Identity:** National portal header featuring the emblem of India, tricolor accents, secure session badge, and official emergency contacts.

---

## 🔒 Standalone & Zero-API-Key Operation

> ### ⚡ No External API Key Required to Clone and Run!
> One of the biggest hurdles in evaluating hackathon and open-source procurement projects is relying on paid cloud APIs, expired trial tokens, or proprietary government gateway credentials that are restricted to authorized government personnel.

**ComplyGeM is engineered to run completely standalone:**

1. **Integrated Sovereign Mock Gateways:** Includes a comprehensive dataset (`statutoryGatewayRegistry.ts`) mirroring all 14 statutory registries with realistic compliant, mismatched, and blacklisted vendor profiles.
2. **Local Deterministic Extraction Engine:** Built-in pattern recognition, checksum validators, and regex extractors parse document numbers (UDYAM, GSTIN, PAN, CIN, UDIN) even when no external AI vision service is reachable.
3. **Pre-Loaded Hackathon Test Cases:** Shipped with realistic vendor profiles (`Acme Tech`, `Beta Systems`, `Gamma Infra`, `Delta Solutions`) representing distinct compliance patterns:
   - **Pattern 1:** Fully compliant Class-I MSME (Clean Pass)
   - **Pattern 2:** Unindexed / unregistered entity (Missing Gateway Record)
   - **Pattern 3:** Blacklisted / debarred contractor on CPPP (Instant Disqualification)
   - **Pattern 4:** Invalid / forged ICAI UDIN turnover certificate (Discrepancy Flag)
4. **Optional Gemini AI Vision:** If you choose to add your own free `GEMINI_API_KEY`, the server automatically upgrades to **Google Gemini 2.0 / 1.5 Flash multimodal vision** for deep visual OCR on custom uploaded files. If no key is supplied, it gracefully and seamlessly falls back to the local extraction engine.

---

## 💻 How to Run Locally on Your System

Follow these step-by-step instructions to clone, set up, and run ComplyGeM on your local machine:

### Prerequisites
- **Node.js**: `v18.0.0` or higher (v20+ recommended)
- **npm**: `v9.0.0` or higher (comes bundled with Node.js)
- **Git**: Installed on your system
- A modern web browser (Google Chrome, Firefox, Microsoft Edge, or Safari)

### Installation & Quick Start

```bash
# 1. Clone the repository
git clone https://github.com/tanmay-bit-glitch/ComplyGeM-TarriPohe.git

# 2. Navigate to the project directory
cd ComplyGeM-TarriPohe

# 3. Install project dependencies
npm install

# 4. (Optional) Set up your Gemini API key (Not required for standalone demo!)
# If you have a Gemini API key and want live multimodal AI vision:
cp .env.local.example .env.local
# Then edit .env.local and insert: GEMINI_API_KEY=your_actual_key_here

# 5. Start the development server
npm run dev
```

Once started, open your browser and navigate to:
```
http://localhost:3000
```

### Environment Variables (Optional)

The application includes an `.env.local` configuration. It is **completely optional**:

| Variable | Required? | Default | Description |
| :--- | :---: | :---: | :--- |
| `PORT` | Optional | `3000` | Port for the Express backend & Vite dev server. |
| `GEMINI_API_KEY` | Optional | *(None)* | Google Gemini API key. When set, enables live multimodal GenAI document OCR. When omitted, ComplyGeM operates via its deterministic extraction engine and simulated registry. |

### Available Scripts

| Command | Action |
| :--- | :--- |
| `npm run dev` | Runs the full stack (Express API + Vite Dev Server) using `tsx server.ts` |
| `npm run build` | Compiles the client bundle via Vite and bundles the server via esbuild |
| `npm run start` | Runs the compiled production server (`dist/server.cjs`) |
| `npm run lint` | Runs TypeScript type checking (`tsc --noEmit`) |
| `npm run clean` | Cleans build artifacts (`dist`, `server.js`) |

---

## 🎭 Preloaded Demo Personas & Walkthrough

ComplyGeM comes with pre-configured personas accessible via the top navigation bar or the login screen. You can switch between roles with a single click:

### 1. Procurement Officer Persona
- **Name:** Shri Arvind K. Rao
- **Designation:** Chief Procurement & Evaluation Officer
- **Department:** GeM Central Evaluation Cell • Defence & Paramilitary Wing
- **Role ID:** `GEM-OFF-4891`
- **What to try:**
  - Navigate to **Officer Dashboard** to inspect active tenders.
  - Open **"GEM/2026/B/7841288 - Ruggedized Tactical Computing Terminals"**.
  - Inspect vendor submissions. Compare **Acme Technology** (Low Risk, 94% score) with **Gamma Infrastructure** (High Risk, 25% score, CPPP Debarred).
  - Click **"Verify All with Statutory APIs"** to trigger live parallel verification against the 14 gateways.
  - Make an official decision (`QUALIFIED` / `DISQUALIFIED`) with officer remarks.
  - Open **Statutory API Data Explorer** from the header to query raw gateway records.

### 2. Bidder Personas
Switch to the **Bidder Portal** to experience pre-submission compliance:
- **Acme Technology Solutions (Compliant Class-I MSE):**
  - Demonstrates a fully verified submission with valid Udyam, GSTIN, PAN, Make-in-India declaration, and OEM MAF.
- **Beta Systems Private Limited (Unindexed Entity):**
  - Demonstrates gateway non-indexing where statutory databases return `NOT_AVAILABLE`.
- **Gamma Infrastructure Projects (Debarred Entity):**
  - Demonstrates an entity flagged on the CPPP national blacklist for past contract defaults.
- **Delta Engineering & IT Solutions (UDIN Discrepancy):**
  - Demonstrates a financial turnover certificate with an unverified or invalid ICAI UDIN.

---

## 📚 Statutory Gateway Master Registry

ComplyGeM contains simulated endpoints for the following central statutory systems:

```
src/data/statutoryGatewayRegistry.ts
 ├── GSTN              -> Goods and Services Tax Network
 ├── MCA21_ROC         -> Ministry of Corporate Affairs (ROC Central Portal)
 ├── MSME_UDYAM        -> Ministry of MSME Udyam Portal
 ├── INCOME_TAX_PAN    -> Central Board of Direct Taxes (CBDT)
 ├── CPPP_DEBARMENT    -> Central Public Procurement Portal Debarment List
 ├── CCA_DSC           -> Controller of Certifying Authorities (Digital Signatures)
 ├── ICAI_UDIN         -> Institute of Chartered Accountants of India (UDIN)
 ├── PFMS_BANK         -> Public Financial Management System
 ├── BIS_REGISTRY      -> Bureau of Indian Standards
 ├── ISO_QCI           -> Quality Council of India / NABCB
 ├── MAKE_IN_INDIA     -> DPIIT Public Procurement Preference Portal
 ├── OEM_AUTH          -> Original Equipment Manufacturer Authorization Gateway
 ├── BANK_SOLVENCY_BG  -> Scheduled Commercial Banks e-BG / Solvency Hub
 └── GEM_WORK_ORDER    -> GeM Past Performance & Execution Database
```

All 14 gateways can be inspected and queried in real-time via the built-in **Statutory API Data Explorer** tab in the top navigation.

---

## 💻 Tech Stack

- **Frontend Core:** [React 19](https://react.dev), [TypeScript 5.8](https://www.typescriptlang.org), [Vite 6](https://vitejs.dev)
- **Styling & Design System:** [Tailwind CSS v4](https://tailwindcss.com), [Lucide React Icons](https://lucide.dev)
- **Animations:** [Motion](https://motion.dev)
- **Backend & Middleware:** [Express 4](https://expressjs.com), [tsx](https://github.com/privatenumber/tsx), [esbuild](https://esbuild.github.io)
- **Artificial Intelligence:** [@google/genai](https://www.npmjs.com/package/@google/genai) (Gemini 2.0 Flash / Gemini 1.5 Flash) with fallback to native deterministic regex and forensic extractors
- **Compliance Standards:** Guidelines for Indian Government Websites (GIGW 3.0), Web Content Accessibility Guidelines (WCAG 2.1 AA)

---

## 👥 Team & Acknowledgments

Developed by **Team TarriPohe** for the GeM AI Compliance Innovation Challenge.

- **Objective:** Transforming Indian public procurement with transparent, autonomous, and zero-trust statutory compliance.
- **Dedicated to:** All micro, small, and medium enterprises (MSMEs), honest bidders, and public procurement officers working toward a transparent Digital India.

---

<div align="center">
  <sub>Built with ❤️ for a transparent, efficient, and self-reliant Bharat 🇮🇳</sub>
</div>
