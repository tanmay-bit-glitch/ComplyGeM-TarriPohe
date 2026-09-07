// Generates realistic SVG data URLs for government documents
export function generateSampleDocumentDataUrl(
  type: string,
  entityName: string,
  docNumber: string,
  extra?: { localContent?: number; status?: string }
): string {
  const width = 600;
  const height = 800;

  let title = 'GOVERNMENT OF INDIA';
  let subtitle = 'STATUTORY COMPLIANCE DOCUMENT';
  let bodyLines = [
    `IDENTIFIER: ${docNumber}`,
    `LEGAL ENTITY: ${entityName}`,
    `STATUS: REGISTERED & ACTIVE`,
  ];
  let headerColor = '#1e3a8a';
  let stampText = 'VERIFIED & NOTARIZED';

  if (type === 'UDYAM') {
    title = 'MINISTRY OF MICRO, SMALL AND MEDIUM ENTERPRISES';
    subtitle = 'UDYAM REGISTRATION CERTIFICATE';
    headerColor = '#b45309';
    stampText = 'MSME GOVT OF INDIA';
    bodyLines = [
      `UDYAM REGISTRATION NUMBER: ${docNumber}`,
      `NAME OF ENTERPRISE: ${entityName}`,
      `CLASSIFICATION: SMALL ENTERPRISE`,
      `MAJOR ACTIVITY: MANUFACTURING / IT SERVICES`,
      `DATE OF INCORPORATION: 14/08/2021`,
      `NATIONAL INDUSTRY CLASSIFICATION (NIC): 2620 - Computers & Peripherals`,
    ];
  } else if (type === 'GSTIN') {
    title = 'GOODS AND SERVICES TAX NETWORK';
    subtitle = 'GOVERNMENT OF INDIA - FORM GST REG-06';
    headerColor = '#065f46';
    stampText = 'TAX AUTHORITY APPROVED';
    bodyLines = [
      `REGISTRATION NUMBER (GSTIN): ${docNumber}`,
      `LEGAL NAME: ${entityName}`,
      `CONSTITUTION OF BUSINESS: PUBLIC LIMITED COMPANY`,
      `PRINCIPAL PLACE: TECH PARK, ANDHERI (E), MUMBAI - 400069`,
      `DATE OF LIABILITY: 01/07/2017`,
      `TYPE OF REGISTRATION: REGULAR TAXPAYER`,
      `PERIOD OF VALIDITY: PERPETUAL (ACTIVE)`,
    ];
  } else if (type === 'PAN') {
    title = 'INCOME TAX DEPARTMENT - GOVT OF INDIA';
    subtitle = 'PERMANENT ACCOUNT NUMBER (PAN)';
    headerColor = '#1e3a8a';
    stampText = 'INCOME TAX DEPT';
    bodyLines = [
      `PERMANENT ACCOUNT NUMBER: ${docNumber}`,
      `NAME: ${entityName}`,
      `CATEGORY: COMPANY`,
      `DATE OF INCORPORATION: 22/04/2016`,
      `ITR FILING STATUS: VERIFIED FOR AY 2025-26`,
    ];
  } else if (type === 'MAKE_IN_INDIA') {
    title = 'PUBLIC PROCUREMENT ORDER 2017';
    subtitle = 'MAKE IN INDIA (MII) LOCAL CONTENT SELF-DECLARATION';
    headerColor = '#c2410c';
    stampText = 'STATUTORY AUDITOR SEAL';
    const percent = extra?.localContent ?? 65;
    bodyLines = [
      `DECLARATION REFERENCE: ${docNumber}`,
      `BIDDER: ${entityName}`,
      `LOCAL CONTENT PERCENTAGE: ${percent}% (DOMESTIC VALUE ADDITION)`,
      `SUPPLIER CATEGORY: CLASS-I LOCAL SUPPLIER (>= 50%)`,
      `MANUFACTURING LOCATION: CHENNAI ELECTRONIC HARDWARE SEZ`,
      `AUDITOR CERTIFICATE: UDIN-26491028301984`,
    ];
  } else if (type === 'OEM_AUTH') {
    title = 'MANUFACTURER AUTHORIZATION FORM (MAF)';
    subtitle = 'PRINCIPAL OEM TENDER AUTHORIZATION';
    headerColor = '#4338ca';
    stampText = 'OEM CORPORATE SEAL';
    bodyLines = [
      `OEM AUTHORIZATION ID: ${docNumber}`,
      `AUTHORIZED PARTNER: ${entityName}`,
      `AUTHORIZATION SCOPE: GeM TENDER GEM/2026/B/8941`,
      `WARRANTY COMMITMENT: 3 YEARS BACK-TO-BACK OEM ONSITE SUPPORT`,
      `PRINCIPAL OEM: SILICON CORP INTERNATIONAL INDIA PVT LTD`,
    ];
  } else if (type === 'DEBARMENT_AFFIDAVIT') {
    title = 'NON-JUDICIAL STAMP PAPER (RS. 100)';
    subtitle = 'AFFIDAVIT OF NON-DEBARMENT & INTEGRITY PACT';
    headerColor = '#4b5563';
    stampText = 'ADVOCATE & NOTARY GOVT OF INDIA';
    bodyLines = [
      `AFFIDAVIT NUMBER: ${docNumber}`,
      `DEPONENT: ${entityName}`,
      `STATUTORY DECLARATION: The firm, its directors, and partners have NEVER been debarred, blacklisted or suspended by GeM, Central/State Ministries or CPSEs.`,
      `VERIFIED BY NOTARY PUBLIC, DELHI JURISDICTION`,
    ];
  }

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      <defs>
        <linearGradient id="headerGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="${headerColor}" />
          <stop offset="100%" stop-color="#0f172a" />
        </linearGradient>
        <pattern id="bgPattern" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 0 40 L 40 0 M 0 0 L 40 40" fill="none" stroke="#f1f5f9" stroke-width="0.5" />
        </pattern>
      </defs>
      
      <!-- Document Base Paper -->
      <rect width="${width}" height="${height}" fill="#fafbfc" />
      <rect width="${width}" height="${height}" fill="url(#bgPattern)" />
      <rect x="15" y="15" width="${width - 30}" height="${height - 30}" fill="none" stroke="#cbd5e1" stroke-width="2" />
      <rect x="20" y="20" width="${width - 40}" height="${height - 40}" fill="none" stroke="#e2e8f0" stroke-width="1" />

      <!-- Tricolor Accent Top -->
      <rect x="20" y="20" width="${width - 40}" height="4" fill="#FF9933" />
      <rect x="20" y="24" width="${width - 40}" height="4" fill="#FFFFFF" />
      <rect x="20" y="28" width="${width - 40}" height="4" fill="#138808" />

      <!-- Government Header Header Band -->
      <rect x="20" y="32" width="${width - 40}" height="75" fill="url(#headerGrad)" />
      <text x="${width / 2}" y="62" font-family="serif" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle" letter-spacing="1">
        ${title}
      </text>
      <text x="${width / 2}" y="86" font-family="sans-serif" font-size="12" font-weight="600" fill="#fcd34d" text-anchor="middle" letter-spacing="0.5">
        ${subtitle}
      </text>

      <!-- Ashoka Emblem Motif Watermark -->
      <circle cx="${width / 2}" cy="420" r="140" fill="none" stroke="#f1f5f9" stroke-width="4" stroke-dasharray="6,4" />
      <text x="${width / 2}" y="425" font-family="serif" font-size="18" fill="#e2e8f0" font-weight="bold" text-anchor="middle" opacity="0.6">
        सत्यमेव जयते • GOVERNMENT OF INDIA
      </text>

      <!-- QR Code Simulation -->
      <rect x="470" y="125" width="85" height="85" fill="#ffffff" stroke="#94a3b8" stroke-width="1" />
      <rect x="478" y="133" width="24" height="24" fill="#1e293b" />
      <rect x="523" y="133" width="24" height="24" fill="#1e293b" />
      <rect x="478" y="178" width="24" height="24" fill="#1e293b" />
      <rect x="508" y="165" width="12" height="12" fill="#1e293b" />
      <rect x="525" y="180" width="18" height="18" fill="#1e293b" />
      <text x="512" y="222" font-family="monospace" font-size="9" fill="#64748b" text-anchor="middle">
        VERIFIED QR
      </text>

      <!-- Document Metadata Fields -->
      <g transform="translate(45, 140)">
        <text x="0" y="0" font-family="sans-serif" font-size="11" font-weight="bold" fill="#64748b">
          DOCUMENT REF NO:
        </text>
        <text x="130" y="0" font-family="monospace" font-size="12" font-weight="bold" fill="#0f172a">
          ${docNumber}
        </text>
        <text x="0" y="24" font-family="sans-serif" font-size="11" font-weight="bold" fill="#64748b">
          ISSUED ON:
        </text>
        <text x="130" y="24" font-family="sans-serif" font-size="11" fill="#334155">
          14-Aug-2021 | NEW DELHI
        </text>
      </g>

      <line x1="45" y1="230" x2="${width - 45}" y2="230" stroke="#e2e8f0" stroke-width="1" />

      <!-- Body Content -->
      <g transform="translate(45, 260)">
        ${bodyLines
          .map(
            (line, idx) => `
          <rect x="0" y="${idx * 45}" width="${width - 90}" height="35" fill="${idx % 2 === 0 ? '#f8fafc' : '#ffffff'}" rx="4" />
          <text x="14" y="${idx * 45 + 22}" font-family="sans-serif" font-size="12" font-weight="600" fill="#1e293b">
            ${line}
          </text>
        `
          )
          .join('')}
      </g>

      <!-- Security Stamp & Notary Seal (Visual verification indicator) -->
      <g transform="translate(110, 640)">
        <circle cx="50" cy="50" r="46" fill="none" stroke="#b91c1c" stroke-width="2.5" stroke-dasharray="4,2" />
        <circle cx="50" cy="50" r="38" fill="none" stroke="#b91c1c" stroke-width="1" />
        <text x="50" y="42" font-family="sans-serif" font-size="9" font-weight="bold" fill="#b91c1c" text-anchor="middle">
          OFFICIAL
        </text>
        <text x="50" y="55" font-family="sans-serif" font-size="8" font-weight="bold" fill="#b91c1c" text-anchor="middle">
          ${stampText}
        </text>
        <text x="50" y="68" font-family="sans-serif" font-size="7" fill="#b91c1c" text-anchor="middle">
          REG NO. 4819/2021
        </text>
      </g>

      <!-- Digital Signature Box -->
      <g transform="translate(360, 630)">
        <rect x="0" y="0" width="190" height="85" fill="#f0fdf4" stroke="#16a34a" stroke-width="1.5" rx="6" />
        <text x="12" y="20" font-family="sans-serif" font-size="10" font-weight="bold" fill="#15803d">
          ✓ DIGITALLY SIGNED
        </text>
        <text x="12" y="38" font-family="cursive" font-size="18" fill="#1e3a8a">
          Rajesh V. Sharma
        </text>
        <text x="12" y="56" font-family="sans-serif" font-size="9" fill="#334155">
          Signatory: Managing Director
        </text>
        <text x="12" y="70" font-family="monospace" font-size="8" fill="#64748b">
          Time: 2026-09-06 14:32:08 IST
        </text>
      </g>

      <!-- Footer Disclaimer -->
      <rect x="20" y="${height - 40}" width="${width - 40}" height="20" fill="#f1f5f9" />
      <text x="${width / 2}" y="${height - 26}" font-family="sans-serif" font-size="9" fill="#64748b" text-anchor="middle">
        Official GeM Verification Copy • Authenticated through Central Government Statutory Gateway
      </text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
