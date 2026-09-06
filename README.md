# ComplyGeM-TarriPohe
# 🚀 AI-Powered Integrated Bid Compliance Verification Platform for GeM Procurement

### Smart India Hackathon 2026 — SIH26100

> **Problem Statement:** AI-Powered Integrated Bid Compliance Verification Platform for GeM Procurement  
> **Organization:** Ministry of Petroleum & Natural Gas / Chennai Petroleum Corporation Limited (CPCL)  
> **Category:** Software  
> **Theme:** Smart Automation  
> **Team:** Tarri Pohe

---

## 📌 1. Problem Statement

Government procurement through the **Government e-Marketplace (GeM)** involves verifying whether bidders satisfy a large number of eligibility, statutory, financial, technical, and tender-specific requirements.

Currently, procurement officers may need to manually examine multiple bidder documents and verify information across different government systems such as:

- GSTN
- Udyam / MSME
- PAN / Income Tax
- MCA21
- EPFO / ESIC
- Startup India
- NSIC
- DigiLocker
- Make in India / Local Content declarations
- OEM Authorization
- Blacklisting / Debarment records
- Tender-specific eligibility requirements

This creates several challenges:

- Manual verification is time-consuming.
- Important information may be buried inside lengthy documents.
- The same information may appear differently across documents.
- Missing documents or fields can be overlooked.
- Cross-verification between documents is difficult.
- Different tenders have different eligibility requirements.
- Government portals are distributed across different systems.
- Maintaining a complete and auditable verification trail is difficult.

### The objective

Build an **AI-powered integrated platform** that assists procurement officers in verifying bidder compliance by combining:

**Document Intelligence + Government Data Verification + Deterministic Rule Engine + Compliance Scoring + Audit Trail**

The final qualification/disqualification decision remains with the authorized Procurement Officer.

---

# 💡 2. Our Proposed Solution

We propose a centralized **Bid Compliance Verification Platform** where a procurement officer can:

1. Select or upload tender requirements.
2. Upload bidder documents.
3. Automatically extract relevant information from documents.
4. Verify extracted information using deterministic validations.
5. Cross-check information across different documents.
6. Retrieve/verify information from authoritative government sources where available.
7. Apply tender-specific compliance rules.
8. Calculate a compliance score.
9. Identify risks, missing requirements, and inconsistencies.
10. Generate a transparent compliance report.
11. Maintain an audit trail of the verification process.

### Core workflow

```text
                 ┌──────────────────────┐
                 │    Tender / GeM Bid   │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │ Requirement          │
                 │ Extraction           │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │ Bidder Document      │
                 │ Upload               │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │ Sarvam AI            │
                 │ Document Intelligence│
                 └──────────┬───────────┘
                            │
                    Structured JSON
                            │
                            ▼
                 ┌──────────────────────┐
                 │ Document Validation  │
                 │ & Normalization      │
                 └──────────┬───────────┘
                            │
                            ▼
             ┌──────────────┴──────────────┐
             │                             │
             ▼                             ▼
   ┌──────────────────┐         ┌──────────────────┐
   │ Government/API   │         │ Cross Document   │
   │ Verification     │         │ Verification     │
   └────────┬─────────┘         └────────┬─────────┘
            │                            │
            └──────────────┬─────────────┘
                           │
                           ▼
                 ┌──────────────────────┐
                 │ Deterministic        │
                 │ Rule Engine          │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │ Compliance Score     │
                 │ Risk & Issues        │
                 └──────────┬───────────┘
                            │
                            ▼
                 ┌──────────────────────┐
                 │ Procurement Officer  │
                 │ Review & Decision    │
                 └──────────────────────┘
```

---

# 🧠 3. What Makes Our Solution Different?

Our platform is **not simply an OCR system** and it is **not an AI chatbot**.

It combines multiple verification layers.

### Layer 1 — Document Intelligence

AI understands uploaded documents and extracts structured information.

### Layer 2 — Field Validation

Extracted information is checked for:

- Missing fields
- Invalid formats
- Invalid dates
- Invalid identifiers
- Unreadable values
- Low-confidence extraction

### Layer 3 — Cross-Document Verification

Information from different documents is compared.

For example:

```text
PAN
     ↓
ABC INDUSTRIES PVT LTD

GST
     ↓
ABC INDUSTRIES PVT LTD

Udyam
     ↓
ABC INDUSTRIES PVT LTD
```

If the entities match → consistent.

If:

```text
PAN  → ABC INDUSTRIES PVT LTD
GST  → XYZ INDUSTRIES PVT LTD
```

the system flags:

> ⚠ Entity mismatch — Manual Review Required

### Layer 4 — Authoritative Verification

Where official APIs or verification mechanisms are available, extracted information can be checked against authoritative sources.

### Layer 5 — Rule Engine

The verified information is evaluated against the **specific tender requirements**.

### Layer 6 — Human-in-the-Loop

The system assists the Procurement Officer.

It does **not** make the final legal/procurement decision automatically.

---

# 🤖 4. Role of AI

AI is primarily used for **document understanding and information extraction**.

Our implementation uses **Sarvam AI / Sarvam Vision Document Intelligence**.

Sarvam can process documents and extract structured fields using schema-based extraction.

For example, from a GST certificate:

```json
{
  "gstin": "27XXXXXXXXXX",
  "legal_name": "ABC INDUSTRIES PVT LTD",
  "trade_name": "ABC INDUSTRIES",
  "registration_date": "2021-05-12",
  "status": "ACTIVE",
  "principal_address": "Pune, Maharashtra"
}
```

The extracted values are then passed to the verification and rule-engine layers.

### Important design principle

```text
AI
 ↓
Understand & Extract

Verification Layer
 ↓
Validate & Cross-check

Rule Engine
 ↓
Determine Compliance

Procurement Officer
 ↓
Final Decision
```

AI is therefore **not the final authority** for compliance decisions.

---

# 📄 5. Documents Supported

The prototype focuses on a representative set of bidder documents.

### GST Certificate

Extracts:

- GSTIN
- Legal Name
- Trade Name
- Registration Date
- Registration Status
- Principal Address

### Udyam / MSME Certificate

Extracts:

- Udyam Registration Number
- Enterprise Name
- Enterprise Type
- Registration Date
- Major Activity
- Classification

### PAN

Extracts:

- PAN Number
- Name
- Date of Birth/Incorporation where applicable
- Document details

### Financial Documents

Extracts information such as:

- Revenue
- Turnover
- Profit
- Financial year
- Auditor information

### Experience Certificate

Extracts:

- Organization/client
- Contract/project
- Contract value
- Work description
- Completion date
- Certificate issuer

The architecture is designed to support additional document types.

---

# 🔍 6. Document Verification

Document verification is performed through multiple checks.

## 6.1 Required Field Check

Checks whether required fields were successfully extracted.

```text
GSTIN       ✓
Legal Name  ✓
Status      ✓
Address     ✓
```

---

## 6.2 Format Validation

Examples:

```text
GSTIN → Valid format
PAN   → Valid format
Udyam → Expected registration format
```

---

## 6.3 Date Validation

Examples:

```text
Registration Date < Current Date
Certificate Date < Expiry Date
Completion Date < Submission Date
```

---

## 6.4 Cross-Document Entity Matching

The system compares entities across documents.

```text
PAN Name
     │
     ├──────────┐
     ▼          ▼
GST Name     Udyam Name
     │          │
     └────┬─────┘
          ▼
    Entity Matching
```

Possible outcomes:

```text
MATCH
PARTIAL_MATCH
MISMATCH
REVIEW
```

---

## 6.5 AI Confidence

Sarvam provides confidence information for extracted fields.

Example:

```text
GSTIN          98%
Legal Name     99%
Address        91%
Registration   96%
```

Low-confidence fields can be sent for manual review.

### Important

**Extraction confidence ≠ compliance score**

For example:

```text
GSTIN extraction confidence = 98%

does NOT mean

Bid compliance = 98%
```

The compliance score is calculated separately by the Rule Engine.

---

# ⚙️ 7. Rule Engine

The Rule Engine is responsible for evaluating whether the bidder satisfies the requirements of a particular tender.

Rules are represented independently from the document extraction layer.

Example:

```json
{
  "rule_id": "GST_ACTIVE",
  "field": "gst.status",
  "operator": "EQUALS",
  "value": "ACTIVE",
  "critical": true
}
```

Another example:

```json
{
  "rule_id": "MIN_TURNOVER",
  "field": "financial.turnover",
  "operator": "GREATER_THAN_OR_EQUAL",
  "value": 50000000,
  "critical": true
}
```

The Rule Engine can evaluate:

```text
PASS
FAIL
REVIEW
```

---

# 📊 8. Compliance Scoring

The platform can calculate an overall compliance score based on tender-defined criteria.

Example:

| Requirement | Weight |
|---|---:|
| GST Compliance | 20% |
| MSME/Udyam | 15% |
| PAN | 15% |
| Financial Eligibility | 30% |
| Technical Experience | 20% |
| **Total** | **100%** |

Example result:

```text
Compliance Score: 86/100
```

However, a critical requirement may override the numerical score.

For example:

```text
Compliance Score = 92%

GST Status = CANCELLED
Critical Rule = FAILED

Final Status = NOT COMPLIANT
```

This prevents the score from hiding critical eligibility failures.

---

# 🚦 9. Compliance Status

The system uses three primary states:

### ✅ VERIFIED / PASS

The requirement is satisfied and evidence is sufficient.

### ❌ FAILED

The requirement is clearly not satisfied.

### ⚠ NEEDS REVIEW

The system cannot confidently establish compliance.

Examples:

```text
Low AI confidence
Missing document
Government API unavailable
Entity mismatch
Ambiguous document
Unclear information
```

This is important because:

> **Unavailable verification should not automatically be treated as compliance.**

Instead, it should be routed to manual review.

---

# ⚠️ 10. Risk Classification

The system can categorize bidders based on compliance results.

Example:

```text
LOW RISK
Most requirements satisfied
No critical issues

MEDIUM RISK
Some requirements require review

HIGH RISK
Critical requirements failed
or significant inconsistencies detected
```

Risk logic is configurable according to tender requirements.

---

# 🔌 11. Government Data / API Integration

The architecture supports integrations with relevant government systems.

Potential verification sources include:

| Source | Example Verification |
|---|---|
| GSTN | GST registration/status |
| Udyam | MSME registration |
| PAN / Income Tax | PAN-related information |
| MCA21 | Company information |
| EPFO | Registration/compliance |
| ESIC | Registration/compliance |
| Startup India | Startup recognition |
| NSIC | Registration |
| DigiLocker | Issued document verification |
| Blacklisting sources | Debarment/blacklisting |
| GeM | Tender/bid information |

### Prototype approach

Not every government system provides unrestricted public API access.

Therefore, the architecture separates:

```text
Government API Adapter
        │
        ├── Live API
        │
        └── Mock Adapter
```

When an official API is unavailable or credentials are not available during the prototype:

```text
Verification Status = NEEDS_REVIEW
```

A mock adapter may be used for demonstration, but it must be clearly labeled as **DEMO/MOCK DATA**.

---

# 🔐 12. DigiLocker Integration

DigiLocker integration is designed around the official requester/integration model.

The production system would require:

- Registered requester application
- Appropriate credentials
- User consent
- OAuth-based authorization
- Official API integration

The platform should **not** assume unrestricted access to a user's DigiLocker documents.

For the prototype, DigiLocker verification may be represented through a mock integration if official credentials are unavailable.

---

# 🏗️ 13. System Architecture

```text
                         USER
                          │
                          ▼
                 ┌─────────────────┐
                 │    Frontend     │
                 │ Procurement UI  │
                 └────────┬────────┘
                          │
                          ▼
                 ┌─────────────────┐
                 │ Backend / API   │
                 └────────┬────────┘
                          │
          ┌───────────────┼────────────────┐
          │               │                │
          ▼               ▼                ▼
   ┌────────────┐  ┌─────────────┐  ┌─────────────┐
   │ Document   │  │ Government  │  │ Tender      │
   │ Intelligence│  │ APIs        │  │ Requirements│
   └─────┬──────┘  └──────┬──────┘  └──────┬──────┘
         │                │                 │
         ▼                ▼                 ▼
   ┌────────────────────────────────────────────┐
   │           Verification Layer               │
   │                                            │
   │  Validation + Normalization + Matching     │
   └────────────────────┬───────────────────────┘
                        │
                        ▼
               ┌─────────────────┐
               │   Rule Engine   │
               └────────┬────────┘
                        │
                        ▼
               ┌─────────────────┐
               │ Score / Risk /  │
               │ Compliance      │
               └────────┬────────┘
                        │
                        ▼
               ┌─────────────────┐
               │ Audit Trail &   │
               │ Report          │
               └─────────────────┘
```

---

# 🧩 14. Major Modules

## Module 1 — Tender Requirement Management

Responsible for:

- Tender upload
- Requirement extraction
- Eligibility criteria
- Mandatory documents
- Financial criteria
- Technical criteria
- Tender-specific rules

---

## Module 2 — Document Upload

Responsible for:

- PDF upload
- Image upload
- Document classification
- File validation
- Temporary storage

---

## Module 3 — AI Document Intelligence

Powered by Sarvam Vision.

Responsible for:

- Document understanding
- OCR/document digitization
- Structured field extraction
- Field confidence
- Schema-based extraction

---

## Module 4 — Verification Engine

Responsible for:

- Format validation
- Required field validation
- Entity matching
- Cross-document consistency
- Date validation
- Verification status

---

## Module 5 — Government API Layer

Responsible for connecting verification adapters to authoritative sources.

Examples:

```text
GST Adapter
Udyam Adapter
MCA Adapter
DigiLocker Adapter
EPFO Adapter
ESIC Adapter
```

---

## Module 6 — Rule Engine

Responsible for:

- Tender-specific rules
- PASS/FAIL/REVIEW
- Critical requirements
- Weighted scoring
- Risk calculation

---

## Module 7 — Compliance Dashboard

Displays:

```text
Bidder Name
       ↓
Documents
       ↓
Verification Status
       ↓
Compliance Score
       ↓
Risk Level
       ↓
Issues
       ↓
Evidence
       ↓
Officer Decision
```

---

## Module 8 — Audit Trail

Records:

- Uploaded documents
- Extracted values
- Verification checks
- API responses
- Rule evaluations
- Issues
- Timestamps
- User actions
- Final officer decision

This makes the verification process transparent and traceable.

---

# 📦 15. Standard Data Contract

The Document Intelligence module sends standardized data to the Rule Engine.

Example:

```json
{
  "document_type": "GST_CERTIFICATE",
  "extraction_status": "SUCCESS",

  "fields": {
    "gstin": "27XXXXXXXXXX",
    "legal_name": "ABC INDUSTRIES PVT LTD",
    "status": "ACTIVE"
  },

  "field_confidence": {
    "gstin": 0.98,
    "legal_name": 0.99,
    "status": 0.97
  },

  "verification": {
    "required_fields_present": true,
    "format_valid": true,
    "entity_match": true,
    "status": "VERIFIED"
  }
}
```

The Rule Engine consumes this structured output.

---

# 🗂️ 16. Suggested Project Structure

```text
sih-gem-compliance/
│
├── frontend/
│   ├── components/
│   ├── pages/
│   └── services/
│
├── backend/
│   ├── routes/
│   │
│   ├── services/
│   │   ├── sarvam/
│   │   ├── verification/
│   │   ├── government_apis/
│   │   └── rule_engine/
│   │
│   ├── schemas/
│   ├── models/
│   └── utils/
│
├── data/
│   └── sample/
│
├── docs/
│
├── tests/
│
├── .env.example
├── .gitignore
├── requirements.txt
└── README.md
```

---

# 🔑 17. Environment Variables

Sensitive credentials should never be committed to GitHub.

Example:

```env
SARVAM_API_KEY=your_api_key_here

DATABASE_URL=your_database_url

GST_API_URL=your_api_url
GST_API_KEY=your_api_key

DIGILOCKER_CLIENT_ID=your_client_id
DIGILOCKER_CLIENT_SECRET=your_client_secret
```

The actual `.env` file should remain local.

---

# 🛠️ 18. Technology Stack

### Frontend

Possible technologies:

- React
- Next.js
- HTML/CSS/JavaScript
- Tailwind CSS

### Backend

Possible technologies:

- Python
- FastAPI
- Node.js

### AI

**Sarvam AI / Sarvam Vision Document Intelligence**

Used for:

- Document understanding
- OCR/document digitization
- Structured extraction
- Confidence estimation

### Database

Possible:

- PostgreSQL
- MongoDB
- SQLite for prototype

### APIs

REST APIs for communication between:

```text
Frontend
   ↓
Backend
   ↓
AI / Verification / Rule Engine
```

---

# 🔄 19. Example End-to-End Scenario

Suppose a company named:

**ABC Industries Pvt. Ltd.**

submits a bid.

The tender requires:

```text
✓ Active GST registration
✓ Valid Udyam registration
✓ Valid PAN
✓ Minimum ₹5 Crore turnover
✓ At least 3 years experience
```

### Step 1 — Upload Documents

The bidder submits:

```text
GST Certificate
Udyam Certificate
PAN
Financial Statement
Experience Certificate
```

### Step 2 — AI Extraction

Sarvam extracts structured information.

Example:

```text
GSTIN → 27XXXXXXXXXX
GST Status → ACTIVE
Turnover → ₹6.5 Crore
Experience → 5 years
```

### Step 3 — Validation

System checks:

```text
GSTIN format → PASS
PAN format → PASS
Required fields → PASS
```

### Step 4 — Cross-Document Check

```text
PAN Name
ABC INDUSTRIES PVT LTD

GST Name
ABC INDUSTRIES PVT LTD

Udyam Name
ABC INDUSTRIES PVT LTD

→ MATCH
```

### Step 5 — Rule Engine

```text
GST Active
→ PASS

Udyam Valid
→ PASS

PAN Valid
→ PASS

Turnover ≥ ₹5 Crore
→ PASS

Experience ≥ 3 years
→ PASS
```

### Step 6 — Final System Output

```text
Compliance Score: 100%

Risk: LOW

Status: COMPLIANT

Issues: None
```

The Procurement Officer can then review the evidence and make the final decision.

---

# ⚠️ 20. Non-Compliant Example

Suppose the tender requires:

```text
Minimum Turnover = ₹5 Crore
```

but the financial statement shows:

```text
Turnover = ₹2.8 Crore
```

The system produces:

```text
Turnover Requirement
Required: ₹5 Crore
Actual: ₹2.8 Crore

Rule Result: FAIL
```

If this is a critical requirement:

```text
Overall Status:
NOT COMPLIANT
```

---

# ⚠️ 21. Needs-Review Example

Suppose:

```text
PAN:
ABC INDUSTRIES PVT LTD

GST:
ABC INDUSTRIES LIMITED
```

The system should not automatically declare fraud or reject the bidder.

Instead:

```text
Entity Match:
PARTIAL / UNCERTAIN

Status:
NEEDS REVIEW

Reason:
Entity names differ across submitted documents.
```

The Procurement Officer can investigate further.

---

# 👥 22. Team Responsibilities

### Person 1 — Tender & GeM Research

Responsible for:

- GeM workflow
- Tender structure
- Eligibility requirements
- Existing process
- Tender requirement research
- Sample tender data

---

### Person 2 — Government API Integration

Responsible for:

- GST
- Udyam
- MCA
- PAN/Income Tax
- EPFO
- ESIC
- Startup India
- NSIC
- DigiLocker
- Mock adapters where required

---

### Person 3 — AI / Sarvam Document Intelligence

Responsible for:

- Sarvam AI integration
- Document upload processing
- Extraction schemas
- GST extraction
- Udyam extraction
- PAN extraction
- Financial document extraction
- Experience certificate extraction
- Extraction confidence
- Document validation
- Cross-document matching
- Standardized JSON output

---

### Person 4 — Rule Engine

Responsible for:

- Tender rules
- Rule representation
- PASS/FAIL/REVIEW
- Compliance score
- Risk logic
- Critical requirements
- Final compliance evaluation

---

### Person 5 — Frontend / Dashboard

Responsible for:

- UI
- Dashboard
- Document upload
- Verification status
- Compliance score
- Risk visualization
- Issues
- Reports
- Demo experience

---

# 🔀 23. GitHub Collaboration

The team works from one repository.

Recommended branches:

```text
main
│
├── person1-tender
├── person2-api
├── person3-sarvam
├── person4-rule-engine
└── person5-frontend
```

Each member works primarily on their own module.

Example:

```bash
git checkout person3-sarvam

git pull origin main

git add .

git commit -m "Add Sarvam GST document extraction"

git push origin person3-sarvam
```

Then create a Pull Request into `main`.

### Important

Do not put:

```text
.env
Real bidder documents
Personal information
API keys
Private credentials
```

into GitHub.

---

# 🔒 24. Security & Privacy

Bidder documents can contain sensitive business and identity information.

The prototype therefore follows these principles:

- Do not commit real documents to GitHub.
- Keep API keys in environment variables.
- Avoid public document URLs.
- Use temporary storage for prototype documents.
- Restrict access to uploaded documents.
- Store extracted data separately from raw documents where practical.
- Maintain audit logs.
- Use official APIs and consent mechanisms where required.
- Do not expose government credentials to the frontend.

A production deployment should additionally implement:

- Encryption at rest
- Encryption in transit
- Role-based access control
- Secure object storage
- Document retention policies
- Access logging
- Credential rotation
- Strong authentication

---

# 🧪 25. Testing Strategy

The system should be tested with different scenarios.

### Test Case 1 — Fully Compliant

```text
All documents present
All fields valid
Government verification successful
No mismatch
All rules PASS
```

Expected:

```text
COMPLIANT
```

---

### Test Case 2 — Missing Document

```text
GST Certificate missing
```

Expected:

```text
NEEDS REVIEW / FAIL
```

depending on whether GST is a mandatory requirement.

---

### Test Case 3 — Entity Mismatch

```text
PAN Name ≠ GST Name
```

Expected:

```text
NEEDS REVIEW
```

---

### Test Case 4 — Financial Failure

```text
Required Turnover = ₹5 Cr
Actual Turnover = ₹2 Cr
```

Expected:

```text
FAIL
```

---

### Test Case 5 — Low AI Confidence

```text
GSTIN confidence = 0.61
```

Expected:

```text
NEEDS REVIEW
```

---

### Test Case 6 — API Unavailable

```text
Government API unavailable
```

Expected:

```text
NEEDS REVIEW
```

The system should not automatically mark the bidder compliant.

---

# 📈 26. Scalability

The architecture is modular.

New verification sources can be added using adapters:

```text
government_apis/
│
├── gst.py
├── udyam.py
├── mca.py
├── epfo.py
├── esic.py
├── startup_india.py
├── nsic.py
└── digilocker.py
```

Similarly, new document types can be added through new extraction schemas.

This avoids rebuilding the entire application for every new requirement.

---

# 🚀 27. Future Scope

Future versions can include:

### Automated GeM Integration

Directly retrieve tender and bid information where officially permitted.

### More Government Integrations

Expand verification across additional government systems.

### Advanced Fraud Detection

Detect:

- Altered documents
- Suspicious metadata
- Duplicate documents
- Template manipulation
- Unusual inconsistencies

### Historical Bidder Intelligence

Build historical compliance profiles for bidders.

### Explainable AI

Show exactly:

```text
Why was this requirement failed?
Which document provided the evidence?
Which rule was triggered?
```

### Automated Compliance Reports

Generate procurement-ready reports containing:

- Requirement
- Evidence
- Verification source
- Result
- Confidence
- Reason
- Officer action

### Role-Based Access

Support:

```text
Procurement Officer
Reviewer
Administrator
Auditor
```

---

# 🎯 28. Prototype Scope for SIH 2026

For the hackathon prototype, the focus is:

```text
Tender
  ↓
Bidder Documents
  ↓
Sarvam AI Extraction
  ↓
Validation
  ↓
Cross-Document Verification
  ↓
Government/API Mock or Live Verification
  ↓
Rule Engine
  ↓
Compliance Score
  ↓
Risk
  ↓
Explainable Report
```

We intentionally prioritize a **working end-to-end prototype** over implementing every possible government integration.

The architecture is designed so that additional integrations can be added later without changing the core verification system.

---

# 🏆 29. Key Innovation

The key innovation is the combination of:

```text
          AI
          +
 Government Verification
          +
 Cross-Document Matching
          +
 Deterministic Rules
          +
 Explainable Scoring
          +
 Human Review
```

Instead of replacing the Procurement Officer, the platform acts as an **intelligent verification assistant**.

It reduces repetitive manual work while keeping the final procurement decision under human authority.

---

# 📌 30. Important Design Principle

### AI should assist. Rules should decide. Humans should authorize.

```text
                 AI
          Understand Documents
                   │
                   ▼
            Verification
        Validate & Cross-check
                   │
                   ▼
             Rule Engine
          Evaluate Requirements
                   │
                   ▼
           Compliance Report
                   │
                   ▼
         Procurement Officer
            Final Decision
```

---

# 📚 31. References

### Smart India Hackathon

SIH 2026 Problem Statement:

`SIH26100 — AI-Powered Integrated Bid Compliance Verification Platform for GeM Procurement`

### Government e-Marketplace

Government e-Marketplace (GeM):

https://gem.gov.in/

### Sarvam AI

Sarvam AI Documentation:

https://docs.sarvam.ai/

### DigiLocker

DigiLocker Requester Integration:

https://www.digilocker.gov.in/web/partners/requesters

---

# 👨‍💻 32. Team

## Team Tarri Pohe

**Smart India Hackathon 2026**

Building an AI-assisted compliance verification platform for transparent, efficient and auditable government procurement.

---

## ⭐ Project Vision

> **From manual document checking to intelligent, explainable and auditable bid compliance verification.**

---
