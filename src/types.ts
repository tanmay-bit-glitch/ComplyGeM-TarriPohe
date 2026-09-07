export type DocumentType =
  | 'UDYAM'
  | 'GSTIN'
  | 'PAN'
  | 'ITR_V'
  | 'MAKE_IN_INDIA'
  | 'EPFO'
  | 'ESIC'
  | 'STARTUP_INDIA'
  | 'NSIC'
  | 'OEM_AUTH'
  | 'DIGILOCKER_CERT'
  | 'DEBARMENT_AFFIDAVIT'
  | 'FINANCIAL_STATEMENT'
  | 'OTHER_STATUTORY';

export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH';
export type VerificationStatus = 'PENDING' | 'AI_VERIFYING' | 'VERIFIED' | 'DISCREPANCY_FLAGGED' | 'REJECTED';
export type BidderDecision = 'PENDING_REVIEW' | 'QUALIFIED' | 'DISQUALIFIED' | 'CLARIFICATION_REQUESTED';

export type UserRole = 'PROCUREMENT_OFFICER' | 'BIDDER';

export interface AuthUser {
  id: string;
  role: UserRole;
  name: string;
  designationOrEntity: string;
  departmentOrCompany: string;
  email: string;
  identifierNumber: string;
  avatarInitials: string;
  lastLogin: string;
  companyDetails?: {
    bidderName: string;
    bidderEmail: string;
    bidderPhone: string;
    phone?: string;
    companyName?: string;
    panNumber: string;
    gstinNumber: string;
    udyamNumber?: string;
    cinNumber?: string;
    registeredState: string;
    enterpriseType: 'MICRO' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'STARTUP';
    annualTurnover: string;
    primarySector: string;
    categoryFocus?: string;
    defaultLocalContent?: number;
    defaultTenderId?: string;
  };
}

export interface RequiredDocumentSpec {
  id: string;
  type: DocumentType;
  title: string;
  hindiTitle?: string;
  description: string;
  isMandatory: boolean;
  departmentAuthority: string; // e.g. "Ministry of MSME", "GSTN / CBIC", "Income Tax Dept", "DPIIT"
  validationCriteria: string;
  weightagePoints: number;
}

export interface Tender {
  id: string;
  tenderNumber: string; // e.g. "GEM/2026/B/7841288"
  title: string;
  category: string;
  department: string;
  ministry?: string;
  organisation?: string;
  officeName?: string;
  dated?: string;
  closingDate: string;
  openingDate?: string;
  bidOfferValidityDays?: number;
  totalQuantity?: number | string;
  estimatedValueINR: number;
  minimumTurnoverINR: number;
  oemTurnoverINR?: number;
  yearsPastExperience?: number;
  pastPerformancePercent?: number;
  emdAmountINR?: number;
  epbgPercentage?: number;
  epbgDurationMonths?: number;
  beneficiary?: string;
  consignee?: string;
  deliveryDays?: number;
  minimumLocalContentPercent: number;
  isMsePreferenceApplicable: boolean;
  isStartupExemptionApplicable: boolean;
  isMiiReserved?: boolean;
  requiredDocuments: RequiredDocumentSpec[];
  status: 'ACTIVE' | 'EVALUATION' | 'CLOSED';
}

export interface ExtractedDocData {
  documentType: DocumentType;
  documentNumber: string; // e.g., GSTIN or Udyam number
  entityName: string;
  issueDate?: string;
  validityDate?: string;
  isPerpetual?: boolean;
  signatoryName?: string;
  signatureDetected: boolean;
  signatureConfidence: number; // 0-100
  sealDetected: boolean;
  sealConfidence: number; // 0-100
  localContentPercentage?: number;
  turnoverValueINR?: number;
  rawExtractedText: string;
  importantClauses?: string[]; // Important clauses extracted from document text by Sarvam
  aiAuthenticityScore: number; // 0-100
  aiObservations: string[];
  flags: string[];
  isValidDocument?: boolean; // false if image is a selfie, personal photo, random object, non-document
  isExpectedDocumentType?: boolean; // false if document is of wrong category
  isEntityNameMatch?: boolean; // false if document was issued to a different company or bidder
  declaredBidderName?: string; // Declared bidder name for cross-check
  rejectionReason?: string; // Clear user-facing reason if rejected or flagged
  detectedTypeDescription?: string; // e.g. "Personal Selfie / Photograph" or "Form GST REG-06"
  verificationStatus?: VerificationStatus;
  aiEngine?: 'SARVAM_AI' | 'GEMINI_AI' | 'STATUTORY_ENGINE';
  aiEngineModel?: string; // e.g., "sarvam-105b (Sarvam AI Indic Sovereign)"
  indicScriptDetected?: string; // e.g., "Devanagari & Latin"
}

export interface DatabaseFieldComparison {
  field: string;
  extractedFromDoc: string;
  databaseMasterValue: string;
  match: boolean;
  notes?: string;
}

export interface DepartmentApiResult {
  departmentCode: string;
  departmentName: string;
  queryEndpoint: string;
  queriedIdentifier: string;
  queryTimestamp: string;
  status: 'MATCHED' | 'MISMATCH' | 'NOT_FOUND' | 'DEBARRED' | 'SUSPENDED';
  verifiedAttributes: Record<string, string | number | boolean>;
  extractedTextSent?: string; // Important text extracted by Sarvam sent to the department API
  databaseRecord?: Record<string, any>; // Master database record retrieved from department
  fieldComparisons?: DatabaseFieldComparison[]; // Field-by-field verification cross-match
  apiReferenceId: string;
  statusMessage: string;
  verifiedAt?: string;
}

export interface RuleEvaluationItem {
  ruleId: string;
  category: 'STATUTORY' | 'FINANCIAL' | 'LOCAL_CONTENT' | 'AUTHENTICITY' | 'DEBARMENT';
  ruleDescription: string;
  maxScore: number;
  awardedScore: number;
  status: 'PASS' | 'WARN' | 'FAIL';
  details: string;
  isCriticalFailure?: boolean;
}

export interface ComplianceScorecard {
  totalScore: number; // Out of 100
  maxPossibleScore: number;
  riskLevel: RiskLevel;
  items: RuleEvaluationItem[];
  missingMandatoryDocuments: string[];
  criticalFailures: string[];
  aiRecommendation: string;
  aiOfficerSummary: string;
  evaluatedAt: string;
}

export interface SubmittedDocument {
  id: string;
  specId: string;
  documentType: DocumentType;
  fileName: string;
  fileSize: string;
  uploadMethod: 'CAMERA_CAPTURE' | 'FILE_UPLOAD';
  uploadedAt: string;
  fileDataUrl: string; // Base64 or preview URL
  extractedData?: ExtractedDocData;
  departmentResult?: DepartmentApiResult;
  verificationStatus: VerificationStatus;
}

export interface BidderSubmission {
  id: string;
  tenderId: string;
  tenderNumber: string;
  bidderName: string;
  bidderEmail: string;
  bidderPhone: string;
  panNumber: string;
  gstinNumber: string;
  udyamNumber?: string;
  cinNumber?: string;
  registeredState: string;
  enterpriseType: 'MICRO' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'STARTUP';
  submissionDate: string;
  documents: SubmittedDocument[];
  complianceScorecard?: ComplianceScorecard;
  officerDecision: BidderDecision;
  officerRemarks?: string;
  officerActionDate?: string;
  trackingToken: string;
  lastUpdated: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  submissionId?: string;
  tenderNumber: string;
  actor: 'BIDDER' | 'AI_ENGINE' | 'DEPARTMENT_GATEWAY' | 'PROCUREMENT_OFFICER';
  actorName: string;
  action: string;
  details: string;
  ipAddress: string;
  integrityHash: string; // SHA-256 simulation
}

export interface SystemNotification {
  id: string;
  timestamp: string;
  type: 'INFO' | 'SUCCESS' | 'WARNING' | 'ALERT';
  title: string;
  message: string;
  read: boolean;
  relatedSubmissionId?: string;
}
