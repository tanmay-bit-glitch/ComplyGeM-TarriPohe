// Complete Statutory Master Gateway Registry for Procurement Officer Verification Portal
// Contains both the 4 new hackathon submissions (Acme, Beta, Gamma, Delta)
// AND all pre-existing vendor entities (Himalayan Defence, Vardhman Tactical, Apex Combat, Northern Spares, NCR EcoBuild, Omega, Shree Balaji)

export interface GatewayRecord {
  identifier: string;
  entityName: string;
  status: string;
  statusBadge: string;
  notes?: string;
  [key: string]: any;
}

export interface StatutoryGateway {
  code: string;
  name: string;
  authority: string;
  endpoint: string;
  description: string;
  totalRecords: number;
  records: GatewayRecord[];
}

export const STATUTORY_GATEWAY_MASTER_REGISTRY: StatutoryGateway[] = [
  {
    code: 'GSTN',
    name: 'Goods and Services Tax Network (GSTN)',
    authority: 'Department of Revenue, Ministry of Finance',
    endpoint: 'https://services.gst.gov.in/services/api/v1/taxpayer-details',
    description: 'Validates 15-digit alphanumeric GSTIN, taxpayer status, legal constitution, and monthly return (GSTR-3B) filing recency.',
    totalRecords: 10,
    records: [
      // 1. Acme Technology Solutions Private Limited (New Hackathon)
      {
        identifier: '07AACCA1001A1Z0',
        entityName: 'Acme Technology Solutions Private Limited',
        status: 'ACTIVE',
        statusBadge: 'MATCHED',
        taxpayerType: 'Regular Monthly Filer',
        state: 'Delhi (07)',
        registrationDate: '2022-05-15',
        lastReturnFiled: '2026-08-20 (GSTR-3B for July 2026)',
        filingCompliance: 'COMPLIANT (No Default)',
        notes: 'Clean record. All statutory GST returns filed within due date.',
      },
      // 2. Beta Systems Private Limited (Pattern 2 - Unknown Entity / Record Not Available)
      {
        identifier: '27AACCB2002B1Z1',
        entityName: 'Beta Systems Private Limited',
        status: 'NOT_AVAILABLE',
        statusBadge: 'NOT_AVAILABLE',
        taxpayerType: 'Unindexed Entity',
        state: 'Maharashtra (27)',
        registrationDate: 'N/A',
        lastReturnFiled: 'None',
        filingCompliance: 'NOT_AVAILABLE (No Gateway Match)',
        notes: 'Unknown Entity: No registration record found in GSTN central database mock source.',
      },
      // 3. Gamma Infrastructure Projects Private Limited (Pattern 3 - Active Known Entity)
      {
        identifier: '29AACCG3003C1Z2',
        entityName: 'Gamma Infrastructure Projects Private Limited',
        status: 'ACTIVE',
        statusBadge: 'MATCHED',
        taxpayerType: 'Regular Monthly Filer',
        state: 'Karnataka (29)',
        registrationDate: '2018-07-20',
        lastReturnFiled: '2026-08-15 (GSTR-3B for July 2026)',
        filingCompliance: 'COMPLIANT',
        notes: 'Active taxpayer with compliant monthly return filings in Karnataka. 0 tax defaults.',
      },
      // 4. Delta MedDevices Private Limited (New Hackathon)
      {
        identifier: '33AACCD4004D1Z3',
        entityName: 'Delta MedDevices Private Limited',
        status: 'ACTIVE',
        statusBadge: 'MATCHED',
        taxpayerType: 'Regular Filer',
        state: 'Tamil Nadu (33)',
        registrationDate: '2024-03-01',
        lastReturnFiled: '2026-08-18 (GSTR-3B for July 2026)',
        filingCompliance: 'COMPLIANT',
        notes: 'Clean record. Active healthcare medical device manufacturer.',
      },
      // 5. Himalayan Defence & Agro Machines Pvt Ltd (Pre-existing Entity)
      {
        identifier: '01AAACH8841E1Z3',
        entityName: 'Himalayan Defence & Agro Machines Pvt Ltd',
        status: 'ACTIVE',
        statusBadge: 'MATCHED',
        taxpayerType: 'Regular Monthly Filer (MSE)',
        state: 'Jammu and Kashmir (01)',
        registrationDate: '2018-06-01',
        lastReturnFiled: '2026-08-10 (GSTR-3B for July 2026)',
        filingCompliance: 'COMPLIANT',
        notes: 'Clean statutory tax record. Verified supplier to HQ Western Air Command.',
      },
      // 6. Vardhman Tactical & Defence Fabrics Ltd (Pre-existing Entity)
      {
        identifier: '03AAACV4918G1Z7',
        entityName: 'Vardhman Tactical & Defence Fabrics Ltd',
        status: 'ACTIVE',
        statusBadge: 'MATCHED',
        taxpayerType: 'Large Composite Mill Filer',
        state: 'Punjab (03)',
        registrationDate: '2017-07-01',
        lastReturnFiled: '2026-08-15 (GSTR-3B for July 2026)',
        filingCompliance: 'COMPLIANT',
        notes: 'Top tier taxpayer. BSF uniform cloth contract holder.',
      },
      // 7. Apex Combat Outfits & Uniforms LLP (Pre-existing Entity)
      {
        identifier: '07AAZFA3319K1ZM',
        entityName: 'Apex Combat Outfits & Uniforms LLP',
        status: 'ACTIVE',
        statusBadge: 'MATCHED',
        taxpayerType: 'Regular Filer (LLP)',
        state: 'Delhi (07)',
        registrationDate: '2019-04-05',
        lastReturnFiled: '2026-08-12 (GSTR-3B for July 2026)',
        filingCompliance: 'COMPLIANT',
        notes: 'Compliant tactical apparel manufacturer in Okhla Industrial Area.',
      },
      // 8. Northern Spares & Tractors Corporation (Pre-existing Entity)
      {
        identifier: '01AAACN9920D1Z1',
        entityName: 'Northern Spares & Tractors Corporation',
        status: 'ACTIVE',
        statusBadge: 'MATCHED',
        taxpayerType: 'Regular Filer (MSE)',
        state: 'Jammu and Kashmir (01)',
        registrationDate: '2017-08-20',
        lastReturnFiled: '2026-08-05 (GSTR-3B for July 2026)',
        filingCompliance: 'COMPLIANT',
        notes: 'Active tractor spare parts distributor for Border Roads Organisation.',
      },
      // 9. NCR EcoBuild Concretes & Infrastructures Ltd (Pre-existing Entity)
      {
        identifier: '09AAACN4419M1ZR',
        entityName: 'NCR EcoBuild Concretes & Infrastructures Ltd',
        status: 'ACTIVE',
        statusBadge: 'MATCHED',
        taxpayerType: 'Regular Filer',
        state: 'Uttar Pradesh (09)',
        registrationDate: '2017-09-12',
        lastReturnFiled: '2026-08-11 (GSTR-3B for July 2026)',
        filingCompliance: 'COMPLIANT',
        notes: 'Active manufacturer of Autoclaved Aerated Concrete Blocks (IS:6041).',
      },
      // 10. Omega Trading & Imports LLP (Pre-existing Flagged Defaulter)
      {
        identifier: '07BBBCO9918F1ZA',
        entityName: 'Omega Trading & Imports LLP',
        status: 'NON_COMPLIANT_DEFAULT',
        statusBadge: 'CRITICAL_SUSPENDED',
        taxpayerType: 'Defaulter Regular',
        state: 'Delhi (07)',
        registrationDate: '2020-01-15',
        lastReturnFiled: '2026-04-10 (GSTR-3B March 2026)',
        filingCompliance: 'DEFAULT (3 Quarters Pending)',
        notes: 'CRITICAL RED FLAG: Taxpayer flagged with 3 consecutive quarters of unfiled GSTR-3B returns.',
      },
    ],
  },

  {
    code: 'MCA21_ROC',
    name: 'Ministry of Corporate Affairs (MCA21 / ROC)',
    authority: 'Registrar of Companies, Ministry of Corporate Affairs',
    endpoint: 'https://mca.gov.in/mcafoportal/api/v2/company-master',
    description: 'Validates 21-digit Corporate Identification Numbers (CIN), authorized/paid-up capital, ROC jurisdiction, and active corporate status under Companies Act 2013.',
    totalRecords: 9,
    records: [
      // 1. Acme Technology Solutions Private Limited
      {
        identifier: 'U62010DL2022PTC400001',
        entityName: 'Acme Technology Solutions Private Limited',
        status: 'ACTIVE',
        statusBadge: 'MATCHED',
        rocOffice: 'ROC Delhi',
        incorporationDate: '2022-04-12',
        authorizedCapital: '₹1,00,00,000',
        paidUpCapital: '₹50,00,000',
        companyClass: 'Private Limited Company',
        notes: 'Compliant. Active corporate filing standing.',
      },
      // 2. Beta Systems Private Limited
      {
        identifier: 'U72900MH2021PTC360002',
        entityName: 'Beta Systems Private Limited',
        status: 'ACTIVE',
        statusBadge: 'MATCHED',
        rocOffice: 'ROC Mumbai',
        incorporationDate: '2021-09-18',
        authorizedCapital: '₹50,00,000',
        paidUpCapital: '₹25,00,000',
        companyClass: 'Private Limited Company',
        notes: 'Compliant. Active filing standing.',
      },
      // 3. Gamma Infrastructure Projects Private Limited
      {
        identifier: 'U45200KA2018PTC110003',
        entityName: 'Gamma Infrastructure Projects Private Limited',
        status: 'ACTIVE_FLAGGED',
        statusBadge: 'WARNING',
        rocOffice: 'ROC Bangalore',
        incorporationDate: '2018-06-10',
        authorizedCapital: '₹10,00,00,000',
        paidUpCapital: '₹5,00,00,000',
        companyClass: 'Private Limited Company',
        notes: 'Active on ROC, but severe financial deficits and external debarment orders flagged.',
      },
      // 4. Delta MedDevices Private Limited
      {
        identifier: 'U33110TN2024PTC150004',
        entityName: 'Delta MedDevices Private Limited',
        status: 'ACTIVE',
        statusBadge: 'MATCHED',
        rocOffice: 'ROC Chennai',
        incorporationDate: '2024-02-15',
        authorizedCapital: '₹2,00,00,000',
        paidUpCapital: '₹1,00,00,000',
        companyClass: 'Private Limited Company',
        notes: 'Compliant startup medical devices entity.',
      },
      // 5. Himalayan Defence & Agro Machines Pvt Ltd
      {
        identifier: 'U29210JK2018PTC009412',
        entityName: 'Himalayan Defence & Agro Machines Pvt Ltd',
        status: 'ACTIVE',
        statusBadge: 'MATCHED',
        rocOffice: 'ROC Jammu & Kashmir',
        incorporationDate: '2018-05-14',
        authorizedCapital: '₹25,00,000',
        paidUpCapital: '₹10,00,000',
        companyClass: 'Private Limited Company',
        notes: 'Compliant. Regular annual ROC filings (AOC-4 & MGT-7) submitted.',
      },
      // 6. Vardhman Tactical & Defence Fabrics Ltd
      {
        identifier: 'L17111PB1973PLC003345',
        entityName: 'Vardhman Tactical & Defence Fabrics Ltd',
        status: 'ACTIVE',
        statusBadge: 'MATCHED',
        rocOffice: 'ROC Chandigarh (Punjab & HP)',
        incorporationDate: '1973-12-27',
        authorizedCapital: '₹150,00,00,000',
        paidUpCapital: '₹56,50,00,000',
        companyClass: 'Public Listed Company',
        notes: 'Premier textile corporate. Listed on BSE and NSE.',
      },
      // 7. Apex Combat Outfits & Uniforms LLP
      {
        identifier: 'AAP-8419',
        entityName: 'Apex Combat Outfits & Uniforms LLP',
        status: 'ACTIVE',
        statusBadge: 'MATCHED',
        rocOffice: 'ROC Delhi',
        incorporationDate: '2019-03-22',
        authorizedCapital: '₹50,00,000 (Partner Contribution)',
        paidUpCapital: '₹50,00,000',
        companyClass: 'Limited Liability Partnership (LLP)',
        notes: 'Compliant LLP. Annual Form 8 and Form 11 filed.',
      },
      // 8. Northern Spares & Tractors Corporation
      {
        identifier: 'U50300JK2016PTC008192',
        entityName: 'Northern Spares & Tractors Corporation',
        status: 'ACTIVE',
        statusBadge: 'MATCHED',
        rocOffice: 'ROC Jammu',
        incorporationDate: '2016-11-04',
        authorizedCapital: '₹50,00,000',
        paidUpCapital: '₹20,00,000',
        companyClass: 'Private Limited Company',
        notes: 'Active corporate standing.',
      },
      // 9. NCR EcoBuild Concretes & Infrastructures Ltd
      {
        identifier: 'U26940UP2017PLC098214',
        entityName: 'NCR EcoBuild Concretes & Infrastructures Ltd',
        status: 'ACTIVE',
        statusBadge: 'MATCHED',
        rocOffice: 'ROC Kanpur (Uttar Pradesh)',
        incorporationDate: '2017-08-18',
        authorizedCapital: '₹5,00,00,000',
        paidUpCapital: '₹2,00,00,000',
        companyClass: 'Public Unlisted Company',
        notes: 'Compliant building infrastructure supplier.',
      },
    ],
  },

  {
    code: 'MSME_UDYAM',
    name: 'Ministry of MSME (Udyam Portal Gateway)',
    authority: 'Ministry of Micro, Small and Medium Enterprises',
    endpoint: 'https://udyamregistration.gov.in/api/v2/verify',
    description: 'Verifies MSME Udyam Registration numbers, enterprise categorization (Micro/Small/Medium), NIC codes, and state of registration.',
    totalRecords: 9,
    records: [
      // 1. Acme Technology Solutions Private Limited
      {
        identifier: 'UDYAM-DL-00-0001001',
        entityName: 'Acme Technology Solutions Private Limited',
        status: 'VERIFIED',
        statusBadge: 'MATCHED',
        category: 'SMALL MSE',
        majorActivity: 'Services (Software & IT Services)',
        state: 'Delhi',
        registrationDate: '2022-05-20',
        notes: 'Eligible for MSE procurement purchase preference (GFR Rule 153).',
      },
      // 2. Beta Systems Private Limited
      {
        identifier: 'UDYAM-MH-00-0002002',
        entityName: 'Beta Systems Private Limited',
        status: 'VERIFIED',
        statusBadge: 'MATCHED',
        category: 'MICRO MSE',
        majorActivity: 'Services (IT Maintenance)',
        state: 'Maharashtra',
        registrationDate: '2021-11-10',
        notes: 'Eligible for MSE EMD exemption.',
      },
      // 3. Delta MedDevices Private Limited
      {
        identifier: 'UDYAM-TN-00-0004004',
        entityName: 'Delta MedDevices Private Limited',
        status: 'VERIFIED',
        statusBadge: 'MATCHED',
        category: 'MICRO MSE',
        majorActivity: 'Manufacturing (Medical Devices)',
        state: 'Tamil Nadu',
        registrationDate: '2024-04-05',
        notes: 'Eligible for DPIIT startup / MSE relaxations in turnover & experience.',
      },
      // 4. Himalayan Defence & Agro Machines Pvt Ltd
      {
        identifier: 'UDYAM-JK-08-0012491',
        entityName: 'Himalayan Defence & Agro Machines Pvt Ltd',
        status: 'VERIFIED',
        statusBadge: 'MATCHED',
        category: 'SMALL MSE',
        majorActivity: 'Manufacturing (Agro & Defence Equipment)',
        state: 'Jammu and Kashmir',
        registrationDate: '2018-05-14',
        notes: 'Class-I MSE supplier. Exempt from tender fee & EMD for Western Air Command tenders.',
      },
      // 5. Vardhman Tactical & Defence Fabrics Ltd
      {
        identifier: 'UDYAM-PB-12-0004910',
        entityName: 'Vardhman Tactical & Defence Fabrics Ltd',
        status: 'VERIFIED',
        statusBadge: 'MATCHED',
        category: 'LARGE ENTERPRISE',
        majorActivity: 'Manufacturing (Spinning & Weaving of Textiles)',
        state: 'Punjab',
        registrationDate: '2020-07-15',
        notes: 'Registered under Udyam classification as large composite textile mill.',
      },
      // 6. Apex Combat Outfits & Uniforms LLP
      {
        identifier: 'UDYAM-DL-02-0098412',
        entityName: 'Apex Combat Outfits & Uniforms LLP',
        status: 'VERIFIED',
        statusBadge: 'MATCHED',
        category: 'MEDIUM MSE',
        majorActivity: 'Manufacturing (Defence Combat Uniforms)',
        state: 'Delhi',
        registrationDate: '2019-04-10',
        notes: 'Eligible for MSE preference in defence apparel tenders.',
      },
      // 7. Northern Spares & Tractors Corporation
      {
        identifier: 'UDYAM-JK-05-0008124',
        entityName: 'Northern Spares & Tractors Corporation',
        status: 'VERIFIED',
        statusBadge: 'MATCHED',
        category: 'MICRO MSE',
        majorActivity: 'Services & Trading (Automotive Spares)',
        state: 'Jammu and Kashmir',
        registrationDate: '2017-02-12',
        notes: 'Eligible for Micro Enterprise exemptions.',
      },
      // 8. NCR EcoBuild Concretes & Infrastructures Ltd
      {
        identifier: 'UDYAM-UP-28-0041920',
        entityName: 'NCR EcoBuild Concretes & Infrastructures Ltd',
        status: 'VERIFIED',
        statusBadge: 'MATCHED',
        category: 'SMALL MSE',
        majorActivity: 'Manufacturing (Concrete AAC Blocks)',
        state: 'Uttar Pradesh',
        registrationDate: '2017-09-05',
        notes: 'Eligible for MSE purchase preference.',
      },
      // 9. Omega Networks & Hardware Corp
      {
        identifier: 'UDYAM-DL-02-0019241',
        entityName: 'Omega Networks & Hardware Corp',
        status: 'VERIFIED',
        statusBadge: 'MATCHED',
        category: 'MICRO MSE',
        majorActivity: 'Trading & IT Hardware Distribution',
        state: 'Delhi',
        registrationDate: '2021-08-14',
        notes: 'Eligible for micro trading category.',
      },
    ],
  },

  {
    code: 'INCOME_TAX_PAN',
    name: 'Central Board of Direct Taxes (CBDT / PAN Gateway)',
    authority: 'Income Tax Department, Ministry of Finance',
    endpoint: 'https://incometax.gov.in/iec/foportal/api/v1/pan-verify',
    description: 'Verifies Permanent Account Numbers (PAN), legal names, Aadhaar linkage, and Income Tax Return (ITR) filing compliance for current Assessment Year (AY 2026-27).',
    totalRecords: 9,
    records: [
      // 1. Acme Technology Solutions Private Limited
      {
        identifier: 'AACCA1001A',
        entityName: 'Acme Technology Solutions Private Limited',
        status: 'ACTIVE',
        statusBadge: 'MATCHED',
        panStatus: 'Operative',
        itrFilingAy: 'AY 2026-27 (ITR-6 Filed)',
        acknowledgementNo: 'ACK-DL-ITR-2026-1001',
        notes: 'Statutory direct tax returns compliant.',
      },
      // 2. Beta Systems Private Limited
      {
        identifier: 'AACCB2002B',
        entityName: 'Beta Systems Private Limited',
        status: 'ACTIVE',
        statusBadge: 'MATCHED',
        panStatus: 'Operative',
        itrFilingAy: 'AY 2026-27 (ITR-6 Filed)',
        acknowledgementNo: 'ACK-MH-ITR-2026-2002',
        notes: 'Statutory direct tax returns compliant.',
      },
      // 3. Gamma Infrastructure Projects Private Limited
      {
        identifier: 'AACCG3003C',
        entityName: 'Gamma Infrastructure Projects Private Limited',
        status: 'ACTIVE_DEFICIENT',
        statusBadge: 'WARNING',
        panStatus: 'Operative (Filing Default)',
        itrFilingAy: 'AY 2025-26 Only (AY 2026-27 NOT FILED)',
        acknowledgementNo: 'NONE',
        notes: 'WARNING: Missing mandatory ITR filing for AY 2026-27.',
      },
      // 4. Delta MedDevices Private Limited
      {
        identifier: 'AACCD4004D',
        entityName: 'Delta MedDevices Private Limited',
        status: 'ACTIVE',
        statusBadge: 'MATCHED',
        panStatus: 'Operative',
        itrFilingAy: 'AY 2026-27 (ITR-6 Filed)',
        acknowledgementNo: 'ACK-TN-ITR-2026-4004',
        notes: 'Statutory direct tax returns compliant.',
      },
      // 5. Himalayan Defence & Agro Machines Pvt Ltd
      {
        identifier: 'AAACH8841E',
        entityName: 'Himalayan Defence & Agro Machines Pvt Ltd',
        status: 'ACTIVE',
        statusBadge: 'MATCHED',
        panStatus: 'Operative',
        itrFilingAy: 'AY 2026-27 (ITR-6 Filed)',
        acknowledgementNo: 'ACK-JK-ITR-2026-8841',
        notes: 'Compliant company PAN. Annual returns up to date.',
      },
      // 6. Vardhman Tactical & Defence Fabrics Ltd
      {
        identifier: 'AAACV4918G',
        entityName: 'Vardhman Tactical & Defence Fabrics Ltd',
        status: 'ACTIVE',
        statusBadge: 'MATCHED',
        panStatus: 'Operative',
        itrFilingAy: 'AY 2026-27 (ITR-6 Filed)',
        acknowledgementNo: 'ACK-PB-ITR-2026-4918',
        notes: 'Large corporate tax filer. Clean audit assessment.',
      },
      // 7. Apex Combat Outfits & Uniforms LLP
      {
        identifier: 'AAZFA3319K',
        entityName: 'Apex Combat Outfits & Uniforms LLP',
        status: 'ACTIVE',
        statusBadge: 'MATCHED',
        panStatus: 'Operative',
        itrFilingAy: 'AY 2026-27 (ITR-5 Filed)',
        acknowledgementNo: 'ACK-DL-ITR-2026-3319',
        notes: 'LLP PAN verified. Returns up to date.',
      },
      // 8. Northern Spares & Tractors Corporation
      {
        identifier: 'AAACN9920D',
        entityName: 'Northern Spares & Tractors Corporation',
        status: 'ACTIVE',
        statusBadge: 'MATCHED',
        panStatus: 'Operative',
        itrFilingAy: 'AY 2026-27 (ITR-5 Filed)',
        acknowledgementNo: 'ACK-JK-ITR-2026-9920',
        notes: 'Compliant firm PAN.',
      },
      // 9. NCR EcoBuild Concretes & Infrastructures Ltd
      {
        identifier: 'AAACN4419M',
        entityName: 'NCR EcoBuild Concretes & Infrastructures Ltd',
        status: 'ACTIVE',
        statusBadge: 'MATCHED',
        panStatus: 'Operative',
        itrFilingAy: 'AY 2026-27 (ITR-6 Filed)',
        acknowledgementNo: 'ACK-UP-ITR-2026-4419',
        notes: 'Compliant company PAN.',
      },
    ],
  },

  {
    code: 'CPPP_DEBARMENT',
    name: 'Central Public Procurement Portal (CPPP Debarment Registry)',
    authority: 'Public Procurement Division, Department of Expenditure',
    endpoint: 'https://eprocure.gov.in/eprocure/api/v1/debarment-list',
    description: 'Maintains the central statutory blacklist of entities debarred or banned from participating in public procurement across Central & State Government bodies under GFR Rule 151.',
    totalRecords: 10,
    records: [
      // 1. Gamma Infrastructure Projects Private Limited (Debarred)
      {
        identifier: 'Gamma Infrastructure Projects Private Limited',
        entityName: 'Gamma Infrastructure Projects Private Limited',
        status: 'DEBARRED',
        statusBadge: 'CRITICAL_DEBARRED',
        orderNumber: 'CPPP/DEB/2025/CON-891',
        period: '2025-10-15 to 2028-10-14 (3 Years)',
        reason: 'Fraudulent bank guarantee submission and critical failure to execute CPWD civil work contract',
        notes: 'CRITICAL DISQUALIFICATION: Listed on Central Debarment Watchlist. Ineligible to participate in any public tender.',
      },
      // 2. Shree Balaji Logistics & Transport (Pre-existing Debarred Entity)
      {
        identifier: 'Shree Balaji Logistics & Transport Services',
        entityName: 'Shree Balaji Logistics & Transport Services',
        status: 'DEBARRED',
        statusBadge: 'CRITICAL_DEBARRED',
        orderNumber: 'CPPP/DEB/2024/TR-119',
        period: '2024-04-01 to 2026-03-31 (2 Years)',
        reason: 'Willful abandonment of FCI grain transport contract',
        notes: 'CRITICAL: Debarred by Department of Food & Public Distribution.',
      },
      // 3. Acme Technology Solutions Private Limited
      {
        identifier: 'Acme Technology Solutions Private Limited',
        entityName: 'Acme Technology Solutions Private Limited',
        status: 'NOT_LISTED',
        statusBadge: 'MATCHED',
        notes: 'Clean record. Not listed on any Central, State, or PSU debarment register.',
      },
      // 4. Beta Systems Private Limited
      {
        identifier: 'Beta Systems Private Limited',
        entityName: 'Beta Systems Private Limited',
        status: 'NOT_LISTED',
        statusBadge: 'MATCHED',
        notes: 'Clean record. Not listed on any Central, State, or PSU debarment register.',
      },
      // 5. Delta MedDevices Private Limited
      {
        identifier: 'Delta MedDevices Private Limited',
        entityName: 'Delta MedDevices Private Limited',
        status: 'NOT_LISTED',
        statusBadge: 'MATCHED',
        notes: 'Clean record. Not listed on any Central, State, or PSU debarment register.',
      },
      // 6. Himalayan Defence & Agro Machines Pvt Ltd
      {
        identifier: 'Himalayan Defence & Agro Machines Pvt Ltd',
        entityName: 'Himalayan Defence & Agro Machines Pvt Ltd',
        status: 'NOT_LISTED',
        statusBadge: 'MATCHED',
        notes: 'Clean record. Zero debarment incidents across Ministry of Defence portals.',
      },
      // 7. Vardhman Tactical & Defence Fabrics Ltd
      {
        identifier: 'Vardhman Tactical & Defence Fabrics Ltd',
        entityName: 'Vardhman Tactical & Defence Fabrics Ltd',
        status: 'NOT_LISTED',
        statusBadge: 'MATCHED',
        notes: 'Clean record. Star rated supplier on GeM.',
      },
      // 8. Apex Combat Outfits & Uniforms LLP
      {
        identifier: 'Apex Combat Outfits & Uniforms LLP',
        entityName: 'Apex Combat Outfits & Uniforms LLP',
        status: 'NOT_LISTED',
        statusBadge: 'MATCHED',
        notes: 'Clean record. Verified for paramilitary uniform procurement.',
      },
      // 9. Northern Spares & Tractors Corporation
      {
        identifier: 'Northern Spares & Tractors Corporation',
        entityName: 'Northern Spares & Tractors Corporation',
        status: 'NOT_LISTED',
        statusBadge: 'MATCHED',
        notes: 'Clean record. Not on any blacklist.',
      },
      // 10. NCR EcoBuild Concretes & Infrastructures Ltd
      {
        identifier: 'NCR EcoBuild Concretes & Infrastructures Ltd',
        entityName: 'NCR EcoBuild Concretes & Infrastructures Ltd',
        status: 'NOT_LISTED',
        statusBadge: 'MATCHED',
        notes: 'Clean record. Verified CPWD civil material supplier.',
      },
    ],
  },

  {
    code: 'CCA_DSC',
    name: 'Controller of Certifying Authorities (CCA Digital Signature Gateway)',
    authority: 'Ministry of Electronics and Information Technology (MeitY)',
    endpoint: 'https://cca.gov.in/api/v1/verify-dsc',
    description: 'Cryptographic validation of Class 3 Digital Signature Certificates (DSC), issuing CA CRL revocation checks, and certificate validity under Information Technology Act 2000.',
    totalRecords: 9,
    records: [
      // 1. Acme Technology Solutions Private Limited
      {
        identifier: 'Aarav Mehta',
        entityName: 'Acme Technology Solutions Private Limited',
        status: 'VALID',
        statusBadge: 'MATCHED',
        certificateClass: 'Class 3 Signing & Encryption',
        issuingCa: 'eMudhra Limited (CCA Licensed)',
        validUntil: '2027-04-15',
        notes: 'Active Class 3 cryptographic certificate.',
      },
      // 2. Beta Systems Private Limited
      {
        identifier: 'Rohan Sharma',
        entityName: 'Beta Systems Private Limited',
        status: 'VALID',
        statusBadge: 'MATCHED',
        certificateClass: 'Class 3 Signing',
        issuingCa: 'Vsign (Verasys Technologies)',
        validUntil: '2026-11-20',
        notes: 'Active Class 3 cryptographic certificate.',
      },
      // 3. Gamma Infrastructure Projects Private Limited (Expired)
      {
        identifier: 'Dev Malhotra',
        entityName: 'Gamma Infrastructure Projects Private Limited',
        status: 'EXPIRED',
        statusBadge: 'CRITICAL_EXPIRED',
        certificateClass: 'Class 3 Signing',
        issuingCa: 'Capricorn Identity Services',
        validUntil: '2026-06-30 (EXPIRED)',
        notes: 'CRITICAL FAILURE: Digital signature certificate EXPIRED on 2026-06-30. All tender bids signed with this key are legally invalid.',
      },
      // 4. Delta MedDevices Private Limited
      {
        identifier: 'Dr. Priya Raman',
        entityName: 'Delta MedDevices Private Limited',
        status: 'VALID',
        statusBadge: 'MATCHED',
        certificateClass: 'Class 3 Signing',
        issuingCa: 'National Informatics Centre (NIC CA)',
        validUntil: '2027-02-10',
        notes: 'Active Class 3 cryptographic certificate.',
      },
      // 5. Himalayan Defence & Agro Machines Pvt Ltd
      {
        identifier: 'Tariq Ahmad Bhat',
        entityName: 'Himalayan Defence & Agro Machines Pvt Ltd',
        status: 'VALID',
        statusBadge: 'MATCHED',
        certificateClass: 'Class 3 Signing (Director / Signatory)',
        issuingCa: 'eMudhra Limited (CCA Licensed)',
        validUntil: '2027-05-18',
        notes: 'Valid Class 3 DSC. Legally compliant under IT Act 2000.',
      },
      // 6. Vardhman Tactical & Defence Fabrics Ltd
      {
        identifier: 'Sanjeev K. Oswal',
        entityName: 'Vardhman Tactical & Defence Fabrics Ltd',
        status: 'VALID',
        statusBadge: 'MATCHED',
        certificateClass: 'Class 3 Signing & Corporate Encryption',
        issuingCa: '(n)Code Solutions (GNFC)',
        validUntil: '2027-01-20',
        notes: 'Valid corporate DSC with hardware cryptographic token.',
      },
      // 7. Apex Combat Outfits & Uniforms LLP
      {
        identifier: 'Vikramaditya Sehgal',
        entityName: 'Apex Combat Outfits & Uniforms LLP',
        status: 'VALID',
        statusBadge: 'MATCHED',
        certificateClass: 'Class 3 Signing',
        issuingCa: 'Capricorn Identity Services',
        validUntil: '2026-12-15',
        notes: 'Valid DSC. Verified for GeM bid submission.',
      },
      // 8. Northern Spares & Tractors Corporation
      {
        identifier: 'Gurvinder Singh',
        entityName: 'Northern Spares & Tractors Corporation',
        status: 'VALID',
        statusBadge: 'MATCHED',
        certificateClass: 'Class 3 Signing',
        issuingCa: 'Vsign (Verasys Technologies)',
        validUntil: '2026-11-30',
        notes: 'Valid certificate.',
      },
      // 9. NCR EcoBuild Concretes & Infrastructures Ltd
      {
        identifier: 'Rameshwar Nath Sharma',
        entityName: 'NCR EcoBuild Concretes & Infrastructures Ltd',
        status: 'VALID',
        statusBadge: 'MATCHED',
        certificateClass: 'Class 3 Signing & Encryption',
        issuingCa: 'eMudhra Limited',
        validUntil: '2027-03-10',
        notes: 'Valid certificate.',
      },
    ],
  },

  {
    code: 'ICAI_UDIN',
    name: 'Institute of Chartered Accountants of India (ICAI UDIN Registry)',
    authority: 'ICAI Statutory Regulatory Council',
    endpoint: 'https://udin.icai.org/api/v1/verify-udin',
    description: 'Verifies Unique Document Identification Numbers (UDIN) on CA Turnover Certificates and audited financial balance sheets to prevent fraudulent financial attestations.',
    totalRecords: 9,
    records: [
      // 1. Acme Technology Solutions Private Limited
      {
        identifier: '26101001AAAAAA1001',
        entityName: 'Acme Technology Solutions Private Limited',
        caFirm: 'Rajesh Singhania & Co (M.No 084120)',
        status: 'VALID_UNQUALIFIED',
        statusBadge: 'MATCHED',
        avgTurnover: '₹3.42 Crores',
        netWorth: '₹1.85 Crores (Positive)',
        auditOpinion: 'Unqualified (True & Fair View)',
        notes: 'Valid UDIN. Exceeds mandatory minimum turnover criteria.',
      },
      // 2. Beta Systems Private Limited (Pattern 2 - Unknown Entity)
      {
        identifier: '26202002BBBBBB2002',
        entityName: 'Beta Systems Private Limited',
        caFirm: 'None (Unindexed)',
        status: 'NOT_AVAILABLE',
        statusBadge: 'NOT_AVAILABLE',
        avgTurnover: 'N/A',
        netWorth: 'N/A',
        auditOpinion: 'Record Not Found',
        notes: 'Record Not Found: No UDIN registered for Beta Systems Private Limited in ICAI gateway.',
      },
      // 3. Gamma Infrastructure Projects Private Limited (Pattern 3 - Valid Audited Financials)
      {
        identifier: '26303003CCCCCC3003',
        entityName: 'Gamma Infrastructure Projects Private Limited',
        caFirm: 'Agarwal & Partners (M.No 072119)',
        status: 'VALID_UNQUALIFIED',
        statusBadge: 'MATCHED',
        avgTurnover: '₹9.20 Crores',
        netWorth: '₹1.85 Crores (Positive)',
        auditOpinion: 'Unqualified (Clean Opinion)',
        notes: 'Valid UDIN. Audited balance sheet reflects positive net worth and clean audit opinion.',
      },
      // 4. Delta MedDevices Private Limited (Pattern 4 - Verified but Fails ₹54L Requirement)
      {
        identifier: '26404004DDDDDD4004',
        entityName: 'Delta MedDevices Private Limited',
        caFirm: 'Sundaram & Co (M.No 063810)',
        status: 'VALID_UNQUALIFIED',
        statusBadge: 'MATCHED',
        avgTurnover: '₹35.00 Lakhs',
        netWorth: '₹48.00 Lakhs (Positive)',
        auditOpinion: 'Unqualified',
        notes: 'Government verification succeeds: Valid UDIN. However, certified turnover is ₹35.00 Lakhs, which fails the tender mandatory threshold of ₹54.00 Lakhs.',
      },
      // 5. Himalayan Defence & Agro Machines Pvt Ltd
      {
        identifier: '26084120AAAAAA8841',
        entityName: 'Himalayan Defence & Agro Machines Pvt Ltd',
        caFirm: 'Bhat & Sharma Chartered Accountants (M.No 084120)',
        status: 'VALID_UNQUALIFIED',
        statusBadge: 'MATCHED',
        avgTurnover: '₹18.40 Lakhs',
        netWorth: '₹12.50 Lakhs (Positive)',
        auditOpinion: 'Unqualified (Clean)',
        notes: 'Valid UDIN. Qualifies for IAF Shrub Master tender under Micro/Small MSE criteria.',
      },
      // 6. Vardhman Tactical & Defence Fabrics Ltd
      {
        identifier: '26091452BBBBBB4918',
        entityName: 'Vardhman Tactical & Defence Fabrics Ltd',
        caFirm: 'S.R. Batliboi & Associates LLP (M.No 091452)',
        status: 'VALID_UNQUALIFIED',
        statusBadge: 'MATCHED',
        avgTurnover: '₹82.40 Crores',
        netWorth: '₹48.60 Crores (Strong Positive)',
        auditOpinion: 'Unqualified (Top Tier Statutory Audit)',
        notes: 'High financial solvency. Complies with ₹4.5 Crore BSF tender requirement.',
      },
      // 7. Apex Combat Outfits & Uniforms LLP
      {
        identifier: '26072119CCCCCC3319',
        entityName: 'Apex Combat Outfits & Uniforms LLP',
        caFirm: 'Chawla & Company (M.No 072119)',
        status: 'VALID_UNQUALIFIED',
        statusBadge: 'MATCHED',
        avgTurnover: '₹1.45 Crores',
        netWorth: '₹80.00 Lakhs (Positive)',
        auditOpinion: 'Unqualified',
        notes: 'Valid UDIN. Exceeds required financial criteria.',
      },
      // 8. Northern Spares & Tractors Corporation
      {
        identifier: '26063810DDDDDD9920',
        entityName: 'Northern Spares & Tractors Corporation',
        caFirm: 'Gupta & Associates (M.No 063810)',
        status: 'VALID_UNQUALIFIED',
        statusBadge: 'MATCHED',
        avgTurnover: '₹42.80 Lakhs',
        netWorth: '₹24.50 Lakhs (Positive)',
        auditOpinion: 'Unqualified',
        notes: 'Valid UDIN. Complies with BRO tractor spares financial threshold.',
      },
      // 9. NCR EcoBuild Concretes & Infrastructures Ltd
      {
        identifier: '26051234EEEEEE4419',
        entityName: 'NCR EcoBuild Concretes & Infrastructures Ltd',
        caFirm: 'Verma & Partners (M.No 051234)',
        status: 'VALID_UNQUALIFIED',
        statusBadge: 'MATCHED',
        avgTurnover: '₹3.62 Crores',
        netWorth: '₹1.95 Crores (Positive)',
        auditOpinion: 'Unqualified',
        notes: 'Valid UDIN. Complies with ITBP Leh concrete supply contract value.',
      },
    ],
  },

  {
    code: 'PFMS_BANK',
    name: 'Public Financial Management System (PFMS / E-Mandate Gateway)',
    authority: 'Controller General of Accounts, Ministry of Finance',
    endpoint: 'https://pfms.nic.in/api/v1/verify-account',
    description: 'Bank account validation & penny-drop name matching for direct treasury disbursements and EMD refunds.',
    totalRecords: 9,
    records: [
      // 1. Acme Technology Solutions Private Limited
      {
        identifier: 'HDFC0001001',
        entityName: 'Acme Technology Solutions Private Limited',
        accountNo: '••••••1001',
        bankName: 'HDFC Bank, Connaught Place, New Delhi',
        status: 'PENNY_DROP_MATCHED',
        statusBadge: 'MATCHED',
        notes: 'Penny drop ₹1 credited. Exact beneficiary name match confirmed.',
      },
      // 2. Beta Systems Private Limited
      {
        identifier: 'SBIN0002002',
        entityName: 'Beta Systems Private Limited',
        accountNo: '••••••2002',
        bankName: 'State Bank of India, BKC Branch, Mumbai',
        status: 'PENNY_DROP_MATCHED',
        statusBadge: 'MATCHED',
        notes: 'Penny drop ₹1 credited. Beneficiary name match confirmed.',
      },
      // 3. Gamma Infrastructure Projects Private Limited
      {
        identifier: 'PUNB0003003',
        entityName: 'Gamma Infrastructure Projects Private Limited',
        accountNo: '••••••3003',
        bankName: 'Punjab National Bank, MG Road, Bangalore',
        status: 'PENNY_DROP_UNCONFIRMED',
        statusBadge: 'WARNING',
        notes: 'Account under operational lien / verification pending.',
      },
      // 4. Delta MedDevices Private Limited
      {
        identifier: 'ICIC0004004',
        entityName: 'Delta MedDevices Private Limited',
        accountNo: '••••••4004',
        bankName: 'ICICI Bank, Anna Salai, Chennai',
        status: 'PENNY_DROP_MATCHED',
        statusBadge: 'MATCHED',
        notes: 'Penny drop ₹1 credited. Beneficiary name match confirmed.',
      },
      // 5. Himalayan Defence & Agro Machines Pvt Ltd
      {
        identifier: 'JAKA0AIRPRT',
        entityName: 'Himalayan Defence & Agro Machines Pvt Ltd',
        accountNo: '••••••8841',
        bankName: 'J&K Bank, Air Cargo Branch, Srinagar',
        status: 'PENNY_DROP_MATCHED',
        statusBadge: 'MATCHED',
        notes: 'Penny drop ₹1 confirmed. Verified for GeM direct payments.',
      },
      // 6. Vardhman Tactical & Defence Fabrics Ltd
      {
        identifier: 'PUNB0001600',
        entityName: 'Vardhman Tactical & Defence Fabrics Ltd',
        accountNo: '••••••4918',
        bankName: 'Punjab National Bank, Industrial Area-A, Ludhiana',
        status: 'PENNY_DROP_MATCHED',
        statusBadge: 'MATCHED',
        notes: 'Treasury e-mandate registered.',
      },
      // 7. Apex Combat Outfits & Uniforms LLP
      {
        identifier: 'HDFC0000043',
        entityName: 'Apex Combat Outfits & Uniforms LLP',
        accountNo: '••••••3319',
        bankName: 'HDFC Bank, South Extension-I, New Delhi',
        status: 'PENNY_DROP_MATCHED',
        statusBadge: 'MATCHED',
        notes: 'Beneficiary match 100%.',
      },
      // 8. Northern Spares & Tractors Corporation
      {
        identifier: 'SBIN0001452',
        entityName: 'Northern Spares & Tractors Corporation',
        accountNo: '••••••9920',
        bankName: 'State Bank of India, Gandhi Nagar, Jammu',
        status: 'PENNY_DROP_MATCHED',
        statusBadge: 'MATCHED',
        notes: 'Verified account for BRO contractor disbursements.',
      },
      // 9. NCR EcoBuild Concretes & Infrastructures Ltd
      {
        identifier: 'CNRB0002104',
        entityName: 'NCR EcoBuild Concretes & Infrastructures Ltd',
        accountNo: '••••••4419',
        bankName: 'Canara Bank, Sector 18, Noida',
        status: 'PENNY_DROP_MATCHED',
        statusBadge: 'MATCHED',
        notes: 'Active corporate current account.',
      },
    ],
  },

  {
    code: 'BIS_REGISTRY',
    name: 'Bureau of Indian Standards (BIS Manakonline)',
    authority: 'Ministry of Consumer Affairs, Food and Public Distribution',
    endpoint: 'https://www.manakonline.in/api/v1/standards-verify',
    description: 'Verifies BIS certification marks, ISI license numbers, and conformity standards (e.g. IS 13450 / IEC 60601, IS 6041, IS 6022, IS 11871).',
    totalRecords: 6,
    records: [
      // 1. Delta MedDevices Private Limited
      {
        identifier: 'BIS-DEMO-DELTA-4004',
        entityName: 'Delta MedDevices Private Limited',
        productModel: 'Multiparameter Patient Monitor DMD-PM100',
        standard: 'IS 13450 (Part 1) / IEC 60601-1',
        status: 'VALID_ACTIVE',
        statusBadge: 'MATCHED',
        validUntil: '2026-12-31',
        notes: 'Active standard license. Complies with medical tender specifications.',
      },
      // 2. Himalayan Defence & Agro Machines Pvt Ltd
      {
        identifier: 'BIS-HIMALAYAN-6022',
        entityName: 'Himalayan Defence & Agro Machines Pvt Ltd',
        productModel: 'Heavy Duty Shrub Master & Tractor Mounted Rotary Slasher',
        standard: 'IS 6022:2018 (Agricultural & Military Clearing Machinery)',
        status: 'VALID_ACTIVE',
        statusBadge: 'MATCHED',
        validUntil: '2027-04-30',
        notes: 'Meets Western Air Command technical specification clause 4.2.',
      },
      // 3. Vardhman Tactical & Defence Fabrics Ltd
      {
        identifier: 'BIS-VARDHMAN-11871',
        entityName: 'Vardhman Tactical & Defence Fabrics Ltd',
        productModel: 'Disruptive Camouflage Pattern Uniform Cloth (Cotton/Poly Blend)',
        standard: 'IS 11871:2020 & Defence Spec DMSRDE/TC/891',
        status: 'VALID_ACTIVE',
        statusBadge: 'MATCHED',
        validUntil: '2027-09-15',
        notes: 'Lab tested for infrared reflectance (NIR) and breaking strength.',
      },
      // 4. NCR EcoBuild Concretes & Infrastructures Ltd
      {
        identifier: 'BIS-NCRECO-6041',
        entityName: 'NCR EcoBuild Concretes & Infrastructures Ltd',
        productModel: 'Grade-I Autoclaved Aerated Concrete (AAC) Blocks',
        standard: 'IS 6041:2021 (Code of Practice for Construction of AAC Masonry)',
        status: 'VALID_ACTIVE',
        statusBadge: 'MATCHED',
        validUntil: '2027-11-20',
        notes: 'Grade-I compressive strength (≥ 4.0 N/mm²) certified for sub-zero Leh deployment.',
      },
      // 5. Generic Medical Devices
      {
        identifier: 'BIS-DEMO-GEN-1001',
        entityName: 'Generic Medical Devices',
        productModel: 'Surgical ICU Unit',
        standard: 'IS 13450 / ISO 80601',
        status: 'ACTIVE',
        statusBadge: 'MATCHED',
        validUntil: '2027-06-30',
        notes: 'Standard product certification.',
      },
      // 6. Generic Tractor Spares BIS
      {
        identifier: 'BIS-DEMO-AUTO-2002',
        entityName: 'Northern Spares & Tractors Corporation',
        productModel: 'Heavy Duty PTO Shafts & Hydraulic Cylinders',
        standard: 'IS 4931:2019 (Agricultural Tractors - Power Take-Off)',
        status: 'ACTIVE',
        statusBadge: 'MATCHED',
        validUntil: '2027-03-31',
        notes: 'Meets BRO mechanical engineering standards.',
      },
    ],
  },

  {
    code: 'ISO_QCI',
    name: 'Quality Council of India (QCI / NABCB Accredited ISO Gateway)',
    authority: 'Quality Council of India, DPIIT',
    endpoint: 'https://qcin.org/api/v1/iso-verification',
    description: 'Validates ISO 9001:2015, ISO 27001, ISO 14001, ISO 45001, and ISO 13485 certifications with accredited certification bodies.',
    totalRecords: 9,
    records: [
      // 1. Acme Technology Solutions Private Limited
      {
        identifier: 'ISO-ACME-9001-2024',
        entityName: 'Acme Technology Solutions Private Limited',
        standard: 'ISO 9001:2015 & ISO 27001:2022',
        status: 'VALID',
        statusBadge: 'MATCHED',
        validUntil: '2027-08-30',
        notes: 'Valid certification from NABCB accredited registrar.',
      },
      // 2. Beta Systems Private Limited
      {
        identifier: 'ISO-BETA-9001-2023',
        entityName: 'Beta Systems Private Limited',
        standard: 'ISO 9001:2015',
        status: 'VALID',
        statusBadge: 'MATCHED',
        validUntil: '2026-10-15',
        notes: 'Valid certification.',
      },
      // 3. Gamma Infrastructure Projects Private Limited (Expired)
      {
        identifier: 'ISO-GAMMA-9001-2022',
        entityName: 'Gamma Infrastructure Projects Private Limited',
        standard: 'ISO 9001:2015',
        status: 'EXPIRED',
        statusBadge: 'CRITICAL_EXPIRED',
        validUntil: '2025-12-31 (EXPIRED)',
        notes: 'CRITICAL DEFECT: Quality management certificate expired on 2025-12-31 without renewal.',
      },
      // 4. Delta MedDevices Private Limited
      {
        identifier: 'ISO-DELTA-13485-2024',
        entityName: 'Delta MedDevices Private Limited',
        standard: 'ISO 13485:2016 (Medical Devices QMS)',
        status: 'VALID',
        statusBadge: 'MATCHED',
        validUntil: '2027-05-20',
        notes: 'Valid medical device manufacturing quality certification.',
      },
      // 5. Himalayan Defence & Agro Machines Pvt Ltd
      {
        identifier: 'ISO-HIM-9001-2023',
        entityName: 'Himalayan Defence & Agro Machines Pvt Ltd',
        standard: 'ISO 9001:2015 (Heavy Machinery Manufacturing)',
        status: 'VALID',
        statusBadge: 'MATCHED',
        validUntil: '2026-11-15',
        notes: 'Certified by Bureau Veritas India under NABCB accreditation.',
      },
      // 6. Vardhman Tactical & Defence Fabrics Ltd
      {
        identifier: 'ISO-VARD-9001-2024',
        entityName: 'Vardhman Tactical & Defence Fabrics Ltd',
        standard: 'ISO 9001:2015 & ISO 14001:2015 (Environmental Management)',
        status: 'VALID',
        statusBadge: 'MATCHED',
        validUntil: '2027-10-30',
        notes: 'Certified by TUV Nord India.',
      },
      // 7. Apex Combat Outfits & Uniforms LLP
      {
        identifier: 'ISO-APEX-9001-2023',
        entityName: 'Apex Combat Outfits & Uniforms LLP',
        standard: 'ISO 9001:2015 (Apparel & Garment Manufacturing)',
        status: 'VALID',
        statusBadge: 'MATCHED',
        validUntil: '2026-12-10',
        notes: 'Valid certification.',
      },
      // 8. Northern Spares & Tractors Corporation
      {
        identifier: 'ISO-NORTH-9001-2024',
        entityName: 'Northern Spares & Tractors Corporation',
        standard: 'ISO 9001:2015 (Automotive Spares Distribution)',
        status: 'VALID',
        statusBadge: 'MATCHED',
        validUntil: '2027-01-25',
        notes: 'Valid certification.',
      },
      // 9. NCR EcoBuild Concretes & Infrastructures Ltd
      {
        identifier: 'ISO-NCRECO-9001-2024',
        entityName: 'NCR EcoBuild Concretes & Infrastructures Ltd',
        standard: 'ISO 9001:2015 & ISO 45001:2018 (Occupational Health & Safety)',
        status: 'VALID',
        statusBadge: 'MATCHED',
        validUntil: '2027-08-15',
        notes: 'Certified by DNV GL.',
      },
    ],
  },

  {
    code: 'MAKE_IN_INDIA',
    name: 'Department for Promotion of Industry and Internal Trade (DPIIT MII Registry)',
    authority: 'Ministry of Commerce & Industry',
    endpoint: 'https://dpiit.gov.in/api/v1/mii-verify',
    description: 'Public Procurement (Preference to Make in India) Order 2017: Class-I Local Supplier (>=50%), Class-II (20-49%), Non-Local (<20%).',
    totalRecords: 9,
    records: [
      // 1. Acme Technology Solutions Private Limited
      {
        identifier: 'MII-ACME-2026',
        entityName: 'Acme Technology Solutions Private Limited',
        localContentPercent: '82%',
        classification: 'Class-I Local Supplier',
        status: 'COMPLIANT',
        statusBadge: 'MATCHED',
        locationOfValueAddition: 'Okhla Industrial Area, New Delhi',
        notes: 'Qualifies for Class-I Local Supplier 20% purchase preference.',
      },
      // 2. Beta Systems Private Limited
      {
        identifier: 'MII-BETA-2026',
        entityName: 'Beta Systems Private Limited',
        localContentPercent: '55%',
        classification: 'Class-I Local Supplier',
        status: 'COMPLIANT',
        statusBadge: 'MATCHED',
        locationOfValueAddition: 'Pune, Maharashtra',
        notes: 'Qualifies for Class-I purchase preference.',
      },
      // 3. Gamma Infrastructure Projects Private Limited (Failed Threshold)
      {
        identifier: 'MII-GAMMA-2026',
        entityName: 'Gamma Infrastructure Projects Private Limited',
        localContentPercent: '18%',
        classification: 'Non-Local Supplier (Less than 20%)',
        status: 'NON_COMPLIANT',
        statusBadge: 'CRITICAL_NON_COMPLIANT',
        locationOfValueAddition: 'Imported components',
        notes: 'CRITICAL REJECTION: Local content is 18%, falling below the 20% minimum threshold. Ineligible to participate under MII rules.',
      },
      // 4. Delta MedDevices Private Limited
      {
        identifier: 'MII-DELTA-2026',
        entityName: 'Delta MedDevices Private Limited',
        localContentPercent: '68%',
        classification: 'Class-I Local Supplier',
        status: 'COMPLIANT',
        statusBadge: 'MATCHED',
        locationOfValueAddition: 'Guindy Industrial Estate, Chennai',
        notes: 'Qualifies for Class-I purchase preference.',
      },
      // 5. Himalayan Defence & Agro Machines Pvt Ltd
      {
        identifier: 'MII-HIMALAYAN-2026',
        entityName: 'Himalayan Defence & Agro Machines Pvt Ltd',
        localContentPercent: '78%',
        classification: 'Class-I Local Supplier',
        status: 'COMPLIANT',
        statusBadge: 'MATCHED',
        locationOfValueAddition: 'Industrial Estate Rangreth, Srinagar, J&K',
        notes: 'Class-I local supplier. 78% value addition in India.',
      },
      // 6. Vardhman Tactical & Defence Fabrics Ltd
      {
        identifier: 'MII-VARDHMAN-2026',
        entityName: 'Vardhman Tactical & Defence Fabrics Ltd',
        localContentPercent: '94%',
        classification: 'Class-I Local Supplier',
        status: 'COMPLIANT',
        statusBadge: 'MATCHED',
        locationOfValueAddition: 'Spinning & Weaving Units, Baddi (HP) & Ludhiana (Punjab)',
        notes: 'Extraordinary 94% indigenous content. Farm to fabric completely in India.',
      },
      // 7. Apex Combat Outfits & Uniforms LLP
      {
        identifier: 'MII-APEX-2026',
        entityName: 'Apex Combat Outfits & Uniforms LLP',
        localContentPercent: '62%',
        classification: 'Class-I Local Supplier',
        status: 'COMPLIANT',
        statusBadge: 'MATCHED',
        locationOfValueAddition: 'Okhla Phase-III, New Delhi',
        notes: 'Qualifies for Class-I preference.',
      },
      // 8. Northern Spares & Tractors Corporation
      {
        identifier: 'MII-NORTH-2026',
        entityName: 'Northern Spares & Tractors Corporation',
        localContentPercent: '51%',
        classification: 'Class-I Local Supplier',
        status: 'COMPLIANT',
        statusBadge: 'MATCHED',
        locationOfValueAddition: 'Bari Brahmana Industrial Complex, Jammu',
        notes: 'Meets minimum 50% threshold for Class-I Local Supplier status.',
      },
      // 9. NCR EcoBuild Concretes & Infrastructures Ltd
      {
        identifier: 'MII-NCRECO-2026',
        entityName: 'NCR EcoBuild Concretes & Infrastructures Ltd',
        localContentPercent: '88%',
        classification: 'Class-I Local Supplier',
        status: 'COMPLIANT',
        statusBadge: 'MATCHED',
        locationOfValueAddition: 'Surajpur Industrial Area, Greater Noida, UP',
        notes: 'Locally procured fly ash, cement, and lime. 88% domestic value addition.',
      },
    ],
  },

  {
    code: 'OEM_AUTH',
    name: 'Original Equipment Manufacturer (OEM) MAF Verification Gateway',
    authority: 'Manufacturer Authorization Framework',
    endpoint: 'https://gem.gov.in/api/v1/oem-authorization-check',
    description: 'Validates Manufacturer Authorization Form (MAF) letters, tender-specific serials, warranty commitments, and validity dates.',
    totalRecords: 4,
    records: [
      // 1. Delta MedDevices Private Limited (Expiring soon)
      {
        identifier: 'MAF-DMD-PM100-2026',
        entityName: 'Delta MedDevices Private Limited',
        oemPrincipal: 'BioHealth International Medical Systems GmbH',
        authorizedProduct: 'Multiparameter Patient Monitor DMD-PM100',
        status: 'EXPIRING_SOON',
        statusBadge: 'WARNING',
        validUntil: '2026-09-12 (Expiring in < 5 days)',
        notes: 'WARNING: MAF is currently valid but will expire on 2026-09-12. Clarification sought for renewed letter.',
      },
      // 2. Himalayan Defence & Agro Machines Pvt Ltd
      {
        identifier: 'MAF-HIM-AGRO-2026',
        entityName: 'Himalayan Defence & Agro Machines Pvt Ltd',
        oemPrincipal: 'Escorts Kubota India Agri & Industrial Division',
        authorizedProduct: 'Shrub Master Gearboxes & Flail Cutter Heads',
        status: 'VALID',
        statusBadge: 'MATCHED',
        validUntil: '2027-03-31',
        notes: 'Valid OEM authorization letter with comprehensive 3-year warranty backing.',
      },
      // 3. Northern Spares & Tractors Corporation
      {
        identifier: 'MAF-NORTH-BRO-2026',
        entityName: 'Northern Spares & Tractors Corporation',
        oemPrincipal: 'Escorts Construction Equipment Limited (ECEL)',
        authorizedProduct: 'Genuine OEM Spares for Escort 6065 Tractors',
        status: 'VALID',
        statusBadge: 'MATCHED',
        validUntil: '2027-05-31',
        notes: 'Direct authorized spare parts distributor for Border Roads Organisation contracts.',
      },
      // 4. General IT Hardware Solutions
      {
        identifier: 'MAF-TECH-2026-GEN',
        entityName: 'General IT Hardware Solutions',
        oemPrincipal: 'Dell India Enterprise',
        authorizedProduct: 'Enterprise Blade Servers',
        status: 'VALID',
        statusBadge: 'MATCHED',
        validUntil: '2027-03-31',
        notes: 'Valid tender-specific OEM authorization.',
      },
    ],
  },

  {
    code: 'BANK_SOLVENCY_BG',
    name: 'Structured Financial Messaging System (SFMS / E-BG Gateway)',
    authority: 'Reserve Bank of India / Scheduled Commercial Banks',
    endpoint: 'https://sfms.nic.in/api/v1/guarantee-verify',
    description: 'Direct electronic confirmation of Bank Solvency Certificates and Earnest Money Deposit (EMD) Bank Guarantees.',
    totalRecords: 8,
    records: [
      // 1. Acme Technology Solutions Private Limited
      {
        identifier: 'SOLV-HDFC-ACME-2026',
        entityName: 'Acme Technology Solutions Private Limited',
        issuingBank: 'HDFC Bank Limited',
        amount: '₹2,00,00,000 (Solvency)',
        status: 'VALID',
        statusBadge: 'MATCHED',
        validUntil: '2027-03-31',
        notes: 'Solvency confirmed by issuing bank branch via SFMS.',
      },
      // 2. Beta Systems Private Limited
      {
        identifier: 'SOLV-SBI-BETA-2026',
        entityName: 'Beta Systems Private Limited',
        issuingBank: 'State Bank of India',
        amount: '₹50,00,00,000 (Solvency)',
        status: 'VALID',
        statusBadge: 'MATCHED',
        validUntil: '2027-01-31',
        notes: 'Solvency confirmed by issuing bank.',
      },
      // 3. Gamma Infrastructure Projects Private Limited (Pattern 3 - Cross-Document Mismatch)
      {
        identifier: 'MOCK-BG-GAMMA-3003',
        entityName: 'Gamma Heavy Engineering Private Limited',
        issuingBank: 'Punjab National Bank',
        amount: '₹4,00,00,000 (Bank Solvency Certificate)',
        status: 'MISMATCH',
        statusBadge: 'NOT_VERIFIED',
        validUntil: '2027-06-30',
        notes: 'CROSS-DOCUMENT MISMATCH: Solvency certificate is registered to affiliate "Gamma Heavy Engineering Private Limited" instead of registered bidder "Gamma Infrastructure Projects Private Limited".',
      },
      // 4. Himalayan Defence & Agro Machines Pvt Ltd
      {
        identifier: 'SOLV-JK-HIM-2026',
        entityName: 'Himalayan Defence & Agro Machines Pvt Ltd',
        issuingBank: 'The Jammu & Kashmir Bank Ltd, Srinagar',
        amount: '₹25,00,000 (Solvency Certificate)',
        status: 'VALID',
        statusBadge: 'MATCHED',
        validUntil: '2027-03-31',
        notes: 'Bank solvency confirmed. Exceeds Western Air Command tender value.',
      },
      // 5. Vardhman Tactical & Defence Fabrics Ltd
      {
        identifier: 'SOLV-PNB-VARD-2026',
        entityName: 'Vardhman Tactical & Defence Fabrics Ltd',
        issuingBank: 'Punjab National Bank, Large Corporate Branch, Ludhiana',
        amount: '₹25,00,00,000 (Bank Solvency & Credit Limits)',
        status: 'VALID',
        statusBadge: 'MATCHED',
        validUntil: '2027-06-30',
        notes: 'Substantial corporate solvency. Clean credit rating.',
      },
      // 6. Apex Combat Outfits & Uniforms LLP
      {
        identifier: 'SOLV-HDFC-APEX-2026',
        entityName: 'Apex Combat Outfits & Uniforms LLP',
        issuingBank: 'HDFC Bank Ltd, South Extension, New Delhi',
        amount: '₹50,00,000 (Solvency Certificate)',
        status: 'VALID',
        statusBadge: 'MATCHED',
        validUntil: '2027-04-30',
        notes: 'Solvency confirmed.',
      },
      // 7. Northern Spares & Tractors Corporation
      {
        identifier: 'SOLV-SBI-NORTH-2026',
        entityName: 'Northern Spares & Tractors Corporation',
        issuingBank: 'State Bank of India, Commercial Branch, Jammu',
        amount: '₹30,00,000 (Solvency Certificate)',
        status: 'VALID',
        statusBadge: 'MATCHED',
        validUntil: '2027-02-28',
        notes: 'Solvency confirmed for BRO spares contract.',
      },
      // 8. NCR EcoBuild Concretes & Infrastructures Ltd
      {
        identifier: 'SOLV-CNRB-NCRECO-2026',
        entityName: 'NCR EcoBuild Concretes & Infrastructures Ltd',
        issuingBank: 'Canara Bank, Sector 18, Noida',
        amount: '₹1,50,00,000 (Solvency Certificate)',
        status: 'VALID',
        statusBadge: 'MATCHED',
        validUntil: '2027-05-15',
        notes: 'Solvency confirmed.',
      },
    ],
  },

  {
    code: 'GEM_WORK_ORDER',
    name: 'GeM Contract Performance & CRAC Repository',
    authority: 'Government e-Marketplace (GeM SPV)',
    endpoint: 'https://gem.gov.in/api/v1/contract-history',
    description: 'Validates past experience through Consignee Receipt and Acceptance Certificates (CRAC) on GeM contracts.',
    totalRecords: 8,
    records: [
      // 1. Acme Technology Solutions Private Limited
      {
        identifier: 'GEMC-5116877-2024',
        entityName: 'Acme Technology Solutions Private Limited',
        buyerDepartment: 'Ministry of Electronics and Information Technology',
        contractValue: '₹75,00,000',
        status: 'COMPLETED_CRAC_ACCEPTED',
        statusBadge: 'MATCHED',
        completionDate: '2025-08-30',
        notes: '100% CRAC acceptance. Zero quality deductions or delay penalties.',
      },
      // 2. Beta Systems Private Limited
      {
        identifier: 'GEMC-3419082-2023',
        entityName: 'Beta Systems Private Limited',
        buyerDepartment: 'Department of Posts, Maharashtra Circle',
        contractValue: '₹38,00,000',
        status: 'COMPLETED_CRAC_ACCEPTED',
        statusBadge: 'MATCHED',
        completionDate: '2024-11-15',
        notes: 'Satisfactory past performance verified.',
      },
      // 3. Gamma Infrastructure Projects Private Limited (Terminated)
      {
        identifier: 'CPWD/CIVIL/2023/452',
        entityName: 'Gamma Infrastructure Projects Private Limited',
        buyerDepartment: 'Central Public Works Department (CPWD)',
        contractValue: '₹12,50,00,000',
        status: 'TERMINATED_DEFAULT',
        statusBadge: 'CRITICAL_TERMINATED',
        completionDate: 'Terminated 2025-06-15',
        notes: 'Contract terminated due to severe milestone abandonment. Liquidated damages invoked.',
      },
      // 4. Himalayan Defence & Agro Machines Pvt Ltd
      {
        identifier: 'GEMC-8841920-2025',
        entityName: 'Himalayan Defence & Agro Machines Pvt Ltd',
        buyerDepartment: 'HQ Western Air Command, Indian Air Force',
        contractValue: '₹16,80,000',
        status: 'COMPLETED_CRAC_ACCEPTED',
        statusBadge: 'MATCHED',
        completionDate: '2025-09-20',
        notes: '100% CRAC acceptance. Completed supply of airfield shrub cutting tractors on schedule.',
      },
      // 5. Vardhman Tactical & Defence Fabrics Ltd
      {
        identifier: 'GEMC-4918201-2024',
        entityName: 'Vardhman Tactical & Defence Fabrics Ltd',
        buyerDepartment: 'Directorate General Border Security Force (BSF)',
        contractValue: '₹3,85,00,000',
        status: 'COMPLETED_CRAC_ACCEPTED',
        statusBadge: 'MATCHED',
        completionDate: '2025-03-10',
        notes: 'Delivered 1,20,000 meters of disruptive combat cloth with zero rejections.',
      },
      // 6. Apex Combat Outfits & Uniforms LLP
      {
        identifier: 'GEMC-3319402-2025',
        entityName: 'Apex Combat Outfits & Uniforms LLP',
        buyerDepartment: 'Indo-Tibetan Border Police (ITBP) Force HQ',
        contractValue: '₹68,00,000',
        status: 'COMPLETED_CRAC_ACCEPTED',
        statusBadge: 'MATCHED',
        completionDate: '2025-07-15',
        notes: 'Satisfactory performance on tactical winter clothing supply.',
      },
      // 7. Northern Spares & Tractors Corporation
      {
        identifier: 'GEMC-9920145-2024',
        entityName: 'Northern Spares & Tractors Corporation',
        buyerDepartment: 'Border Roads Organisation (Project Sampark)',
        contractValue: '₹24,50,000',
        status: 'COMPLETED_CRAC_ACCEPTED',
        statusBadge: 'MATCHED',
        completionDate: '2025-01-28',
        notes: '100% genuine OEM spare parts delivered and accepted.',
      },
      // 8. NCR EcoBuild Concretes & Infrastructures Ltd
      {
        identifier: 'GEMC-4419821-2025',
        entityName: 'NCR EcoBuild Concretes & Infrastructures Ltd',
        buyerDepartment: 'Central Public Works Department (CPWD Northern Zone)',
        contractValue: '₹1,12,00,000',
        status: 'COMPLETED_CRAC_ACCEPTED',
        statusBadge: 'MATCHED',
        completionDate: '2025-06-30',
        notes: 'Supplied AAC blocks with high thermal insulation test certification.',
      },
    ],
  },
];
