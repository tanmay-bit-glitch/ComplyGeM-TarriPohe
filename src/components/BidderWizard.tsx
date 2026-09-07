import React, { useState } from 'react';
import { 
  Tender, 
  RequiredDocumentSpec, 
  SubmittedDocument, 
  BidderSubmission, 
  ComplianceScorecard, 
  DocumentType 
} from '../types';
import { CameraCaptureModal } from './CameraCaptureModal';
import { generateSampleDocumentDataUrl } from '../utils/sampleDocumentGenerator';
import { extractDocumentWithAI, queryDepartmentGateway, postAuditLog, postNotification } from '../services/apiService';
import { evaluateBidCompliance } from '../utils/ruleEngine';
import { 
  Building2, 
  FileCheck, 
  Camera, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ArrowRight, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  RefreshCw, 
  ExternalLink,
  HelpCircle,
  Clock
} from 'lucide-react';

interface BidderWizardProps {
  tenders: Tender[];
  onSubmitBid: (submission: BidderSubmission) => void;
  language: 'EN' | 'HI';
}

export const BidderWizard: React.FC<BidderWizardProps> = ({
  tenders,
  onSubmitBid,
  language,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedTenderId, setSelectedTenderId] = useState<string>(tenders[0]?.id || '');
  
  // Bidder Form Info
  const [bidderName, setBidderName] = useState('Bharat Infotech & Electronics Solutions Ltd.');
  const [bidderEmail, setBidderEmail] = useState('tenders@bharatinfotech.in');
  const [bidderPhone, setBidderPhone] = useState('+91 98201 44521');
  const [panNumber, setPanNumber] = useState('AAACB1234D');
  const [gstinNumber, setGstinNumber] = useState('27AAACB1234D1Z5');
  const [udyamNumber, setUdyamNumber] = useState('UDYAM-MH-12-0048921');
  const [cinNumber, setCinNumber] = useState('U72900MH2016PLC284102');
  const [registeredState, setRegisteredState] = useState('Maharashtra');
  const [enterpriseType, setEnterpriseType] = useState<'MICRO' | 'SMALL' | 'MEDIUM' | 'LARGE' | 'STARTUP'>('SMALL');
  const [declaredLocalContentPercent, setDeclaredLocalContentPercent] = useState<number>(65);

  // Uploaded documents state
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, SubmittedDocument>>({});
  
  // Camera Modal
  const [cameraModalOpen, setCameraModalOpen] = useState(false);
  const [activeSpecForCamera, setActiveSpecForCamera] = useState<RequiredDocumentSpec | null>(null);

  // Verification State
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationProgress, setVerificationProgress] = useState<{
    stage: string;
    detail: string;
    percent: number;
  }>({ stage: '', detail: '', percent: 0 });
  const [generatedScorecard, setGeneratedScorecard] = useState<ComplianceScorecard | null>(null);
  const [finalSubmissionToken, setFinalSubmissionToken] = useState<string | null>(null);

  const currentTender = tenders.find(t => t.id === selectedTenderId) || tenders[0];

  // 1-Click Fill Helpers for non-technical evaluation
  const handleLoadCompliantSample = () => {
    setBidderName('Bharat Infotech & Electronics Solutions Ltd.');
    setBidderEmail('tenders@bharatinfotech.in');
    setBidderPhone('+91 98201 44521');
    setPanNumber('AAACB1234D');
    setGstinNumber('27AAACB1234D1Z5');
    setUdyamNumber('UDYAM-MH-12-0048921');
    setCinNumber('U72900MH2016PLC284102');
    setRegisteredState('Maharashtra');
    setEnterpriseType('SMALL');
    setDeclaredLocalContentPercent(65);

    // Auto-populate all required documents with authentic sample SVG data URLs
    const sampleDocsMap: Record<string, SubmittedDocument> = {};
    currentTender.requiredDocuments.forEach(spec => {
      const dataUrl = generateSampleDocumentDataUrl(spec.type, 'Bharat Infotech & Electronics Solutions Ltd.', 
        spec.type === 'UDYAM' ? 'UDYAM-MH-12-0048921' :
        spec.type === 'GSTIN' ? '27AAACB1234D1Z5' :
        spec.type === 'PAN' ? 'AAACB1234D' :
        spec.type === 'MAKE_IN_INDIA' ? 'MII-2026-645' :
        spec.type === 'OEM_AUTH' ? 'MAF-OEM-9921' : 'AFF-NOTARY-2026',
        { localContent: 65 }
      );

      sampleDocsMap[spec.id] = {
        id: `doc-${spec.id}-${Date.now()}`,
        specId: spec.id,
        documentType: spec.type,
        fileName: `${spec.type}_Registration_Certificate.pdf`,
        fileSize: '512 KB',
        uploadMethod: 'FILE_UPLOAD',
        uploadedAt: new Date().toISOString(),
        fileDataUrl: dataUrl,
        verificationStatus: 'PENDING',
      };
    });

    setUploadedDocs(sampleDocsMap);
  };

  const handleLoadNonCompliantSample = () => {
    setBidderName('Omega Networks & Hardware Corp');
    setBidderEmail('sales@omeganetworks.in');
    setBidderPhone('+91 94120 99812');
    setPanNumber('BBBCO9918F'); // Note: Income tax database lists this under Omega Trading & Imports LLP
    setGstinNumber('07BBBCO9918F1Z2'); // Note: GSTN database has pending GSTR-3B defaults
    setUdyamNumber('UDYAM-DL-03-0019241');
    setCinNumber('U51909DL2019PTC349102');
    setRegisteredState('Delhi');
    setEnterpriseType('MEDIUM');
    setDeclaredLocalContentPercent(28); // Tender requires 50%!

    const sampleDocsMap: Record<string, SubmittedDocument> = {};
    currentTender.requiredDocuments.forEach(spec => {
      const isMii = spec.type === 'MAKE_IN_INDIA';
      const dataUrl = generateSampleDocumentDataUrl(spec.type, 'Omega Networks & Hardware Corp',
        spec.type === 'UDYAM' ? 'UDYAM-DL-03-0019241' :
        spec.type === 'GSTIN' ? '07BBBCO9918F1Z2' :
        spec.type === 'PAN' ? 'BBBCO9918F' :
        spec.type === 'MAKE_IN_INDIA' ? 'MII-2026-285' :
        spec.type === 'OEM_AUTH' ? 'MAF-OMEGA-441' : 'AFF-NOTARY-991',
        { localContent: 28 }
      );

      sampleDocsMap[spec.id] = {
        id: `doc-${spec.id}-${Date.now()}`,
        specId: spec.id,
        documentType: spec.type,
        fileName: `${spec.type}_Document.pdf`,
        fileSize: '430 KB',
        uploadMethod: 'FILE_UPLOAD',
        uploadedAt: new Date().toISOString(),
        fileDataUrl: dataUrl,
        verificationStatus: 'PENDING',
      };
    });

    setUploadedDocs(sampleDocsMap);
  };

  // Upload handlers
  const handleFileUpload = (spec: RequiredDocumentSpec, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      setUploadedDocs(prev => ({
        ...prev,
        [spec.id]: {
          id: `doc-${spec.id}-${Date.now()}`,
          specId: spec.id,
          documentType: spec.type,
          fileName: file.name,
          fileSize: `${(file.size / 1024).toFixed(0)} KB`,
          uploadMethod: 'FILE_UPLOAD',
          uploadedAt: new Date().toISOString(),
          fileDataUrl: dataUrl,
          verificationStatus: 'PENDING',
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleCameraCapture = (dataUrl: string) => {
    if (!activeSpecForCamera) return;
    const spec = activeSpecForCamera;
    setUploadedDocs(prev => ({
      ...prev,
      [spec.id]: {
        id: `doc-${spec.id}-${Date.now()}`,
        specId: spec.id,
        documentType: spec.type,
        fileName: `Camera_Scan_${spec.type}_${Date.now().toString().slice(-4)}.jpg`,
        fileSize: '780 KB',
        uploadMethod: 'CAMERA_CAPTURE',
        uploadedAt: new Date().toISOString(),
        fileDataUrl: dataUrl,
        verificationStatus: 'PENDING',
      },
    }));
    setActiveSpecForCamera(null);
  };

  const handleQuickLoadSingleDoc = (spec: RequiredDocumentSpec) => {
    const dataUrl = generateSampleDocumentDataUrl(
      spec.type,
      bidderName,
      spec.type === 'UDYAM' ? udyamNumber :
      spec.type === 'GSTIN' ? gstinNumber :
      spec.type === 'PAN' ? panNumber :
      `STAT-${Math.floor(100000 + Math.random() * 900000)}`,
      { localContent: declaredLocalContentPercent }
    );

    setUploadedDocs(prev => ({
      ...prev,
      [spec.id]: {
        id: `doc-${spec.id}-${Date.now()}`,
        specId: spec.id,
        documentType: spec.type,
        fileName: `Official_${spec.type}_Certificate.pdf`,
        fileSize: '540 KB',
        uploadMethod: 'FILE_UPLOAD',
        uploadedAt: new Date().toISOString(),
        fileDataUrl: dataUrl,
        verificationStatus: 'PENDING',
      },
    }));
  };

  // Execution: AI OCR + Multi-portal Verification + Rule Engine Scoring
  const handleRunFullVerification = async () => {
    setIsVerifying(true);
    setCurrentStep(3);

    const docList: SubmittedDocument[] = Object.values(uploadedDocs);
    const verifiedDocList: SubmittedDocument[] = [];

    try {
      // Step 1: AI OCR Extraction for each document via Sarvam AI
      for (let i = 0; i < docList.length; i++) {
        const doc = docList[i];
        setVerificationProgress({
          stage: `Sarvam Indic OCR & Forensic Scan (${i + 1}/${docList.length})`,
          detail: `Scanning ${doc.fileName} with Sarvam AI Indic Sovereign Engine for Ashoka Emblem, bilingual Devanagari text, stamps & digital signatures...`,
          percent: Math.round(((i + 1) / (docList.length * 2)) * 100),
        });

        const extracted = await extractDocumentWithAI(doc.documentType, doc.fileName, doc.fileDataUrl, 'SARVAM');

        // Step 2: Department verification gateway dispatch
        setVerificationProgress({
          stage: `Government Portal Gateway Query (${doc.documentType})`,
          detail: `Connecting to ${
            doc.documentType === 'UDYAM' ? 'Ministry of MSME Udyam Portal' :
            doc.documentType === 'GSTIN' ? 'Goods & Services Tax Network (GSTN)' :
            doc.documentType === 'PAN' ? 'Income Tax Department (CBDT)' :
            doc.documentType === 'DEBARMENT_AFFIDAVIT' ? 'CPPP Central Debarment Watchlist' :
            'National Procurement Gateway'
          }...`,
          percent: Math.round(((docList.length + i + 1) / (docList.length * 2)) * 100),
        });

        let deptCode = 'STATUTORY_GATEWAY';
        let queryId = extracted?.documentNumber || panNumber;

        if (doc.documentType === 'UDYAM') {
          deptCode = 'MSME_UDYAM';
          queryId = extracted?.documentNumber || udyamNumber;
        } else if (doc.documentType === 'GSTIN') {
          deptCode = 'GSTN';
          queryId = extracted?.documentNumber || gstinNumber;
        } else if (doc.documentType === 'PAN') {
          deptCode = 'INCOME_TAX_PAN';
          queryId = extracted?.documentNumber || panNumber;
        } else if (doc.documentType === 'DEBARMENT_AFFIDAVIT') {
          deptCode = 'CPPP_DEBARMENT';
          queryId = bidderName;
        } else if (doc.documentType === 'EPFO') {
          deptCode = 'EPFO_ESIC';
          queryId = 'MH/BAN/0049210';
        }

        const deptResult = await queryDepartmentGateway(deptCode, queryId, bidderName);

        verifiedDocList.push({
          ...doc,
          extractedData: extracted,
          departmentResult: deptResult,
          verificationStatus: deptResult.status === 'MATCHED' ? 'VERIFIED' : 'DISCREPANCY_FLAGGED',
        });
      }

      // Step 3: Run the GeM Bid Compliance Rule Engine
      setVerificationProgress({
        stage: 'GeM Rule Engine Evaluation',
        detail: 'Computing 100-point statutory compliance score and classifying bidder risk level...',
        percent: 95,
      });

      const scorecard = evaluateBidCompliance(
        currentTender,
        {
          bidderName,
          panNumber,
          gstinNumber,
          udyamNumber,
          declaredLocalContentPercent,
        },
        verifiedDocList
      );

      setGeneratedScorecard(scorecard);

      // Create submission token
      const token = `GEM-SUB-${new Date().getFullYear()}-${currentTender.tenderNumber.replace(/[^0-9]/g, '').slice(-4)}-${Math.floor(100 + Math.random() * 900)}`;
      setFinalSubmissionToken(token);

      // Record in central store
      const finalSubmission: BidderSubmission = {
        id: `sub-${Date.now()}`,
        tenderId: currentTender.id,
        tenderNumber: currentTender.tenderNumber,
        bidderName,
        bidderEmail,
        bidderPhone,
        panNumber,
        gstinNumber,
        udyamNumber,
        cinNumber,
        registeredState,
        enterpriseType,
        submissionDate: new Date().toISOString(),
        documents: verifiedDocList,
        complianceScorecard: scorecard,
        officerDecision: 'PENDING_REVIEW',
        trackingToken: token,
        lastUpdated: new Date().toISOString(),
      };

      onSubmitBid(finalSubmission);

      // Post real-time audit log and notification
      await postAuditLog({
        submissionId: finalSubmission.id,
        tenderNumber: currentTender.tenderNumber,
        actor: 'BIDDER',
        actorName: bidderName,
        action: 'BID_VERIFICATION_COMPLETED',
        details: `Bidder submitted ${verifiedDocList.length} documents. Automated Compliance Score: ${scorecard.totalScore}/100. Risk: ${scorecard.riskLevel}.`,
      });

      await postNotification({
        title: `New Bid Submitted: ${bidderName}`,
        message: `Tender ${currentTender.tenderNumber} - Compliance Score: ${scorecard.totalScore}/100 (${scorecard.riskLevel} Risk). Ready for Procurement Officer review.`,
        type: scorecard.riskLevel === 'HIGH' ? 'ALERT' : scorecard.riskLevel === 'MEDIUM' ? 'WARNING' : 'SUCCESS',
        relatedSubmissionId: finalSubmission.id,
      });

      setVerificationProgress({
        stage: 'Verification Complete',
        detail: 'Compliance scorecard generated successfully.',
        percent: 100,
      });

      setCurrentStep(4);
    } catch (err: any) {
      console.log('Verification workflow notice:', err?.message || 'Workflow finished');
    } finally {
      setIsVerifying(false);
    }
  };

  const missingCount = currentTender.requiredDocuments.filter(
    req => req.isMandatory && !uploadedDocs[req.id]
  ).length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* 1. Header & Stepper */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <span className="text-xs font-bold text-[#F27D26] uppercase tracking-wider bg-orange-50 px-2.5 py-0.5 rounded border border-orange-200">
              Bidder Self-Service Portal
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              GeM Bid Statutory Compliance & Document Verification
            </h2>
            <p className="text-sm text-slate-500">
              Upload statutory registrations via camera or file form. AI will extract identifiers, cross-verify with government databases, and compute your GeM Compliance Score.
            </p>
          </div>

          {/* Quick 1-Click Evaluation Presets */}
          <div className="flex flex-wrap items-center gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span className="text-[11px] font-bold text-slate-600 flex items-center space-x-1">
              <Sparkles className="w-3.5 h-3.5 text-[#F27D26]" />
              <span>1-Click Test Data:</span>
            </span>
            <button
              id="preset-compliant-btn"
              onClick={handleLoadCompliantSample}
              className="px-2.5 py-1 text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-md transition-colors"
              title="Loads a fully compliant MSME bidder profile with all certificates"
            >
              ✓ Sample Compliant MSME (96%)
            </button>
            <button
              id="preset-noncompliant-btn"
              onClick={handleLoadNonCompliantSample}
              className="px-2.5 py-1 text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-300 rounded-md transition-colors"
              title="Loads a bidder with GST default, name mismatch, and low local content to test rule engine"
            >
              ⚠️ Sample Non-Compliant Bidder (42%)
            </button>
          </div>
        </div>

        {/* Stepper Progress Bar */}
        <div className="grid grid-cols-4 gap-3 pt-5 text-xs font-semibold text-center">
          <div className={`p-3 rounded-lg border flex flex-col items-center justify-center transition-all ${
            currentStep === 1 ? 'bg-[#002B5B] text-white border-[#002B5B] shadow-sm' : 
            currentStep > 1 ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-slate-50 text-slate-500 border-slate-200'
          }`}>
            <span className={`text-[10px] uppercase font-bold ${currentStep === 1 ? 'text-[#F27D26]' : 'opacity-80'}`}>Step 1</span>
            <span className="font-bold">Tender & Bidder Profile</span>
          </div>

          <div className={`p-3 rounded-lg border flex flex-col items-center justify-center transition-all ${
            currentStep === 2 ? 'bg-[#002B5B] text-white border-[#002B5B] shadow-sm' : 
            currentStep > 2 ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-slate-50 text-slate-500 border-slate-200'
          }`}>
            <span className={`text-[10px] uppercase font-bold ${currentStep === 2 ? 'text-[#F27D26]' : 'opacity-80'}`}>Step 2</span>
            <span className="font-bold">Document Upload & Scan</span>
          </div>

          <div className={`p-3 rounded-lg border flex flex-col items-center justify-center transition-all ${
            currentStep === 3 ? 'bg-[#002B5B] text-white border-[#002B5B] shadow-sm' : 
            currentStep > 3 ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : 'bg-slate-50 text-slate-500 border-slate-200'
          }`}>
            <span className={`text-[10px] uppercase font-bold ${currentStep === 3 ? 'text-[#F27D26]' : 'opacity-80'}`}>Step 3</span>
            <span className="font-bold">AI OCR & Verification</span>
          </div>

          <div className={`p-3 rounded-lg border flex flex-col items-center justify-center transition-all ${
            currentStep === 4 ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm' : 'bg-slate-50 text-slate-500 border-slate-200'
          }`}>
            <span className="text-[10px] uppercase font-bold opacity-80">Step 4</span>
            <span className="font-bold">Compliance Scorecard</span>
          </div>
        </div>
      </div>

      {/* STEP 1: Tender Selection & Bidder Info */}
      {currentStep === 1 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6">
          <h3 className="text-base font-bold text-slate-900 mb-1 flex items-center space-x-2">
            <Building2 className="w-5 h-5 text-[#1e3a8a]" />
            <span>Select Tender & Verify Organization Details</span>
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            Ensure your legal organization name exactly matches your Income Tax PAN and GST Registration.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            {/* Tender Selection Dropdown */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Active GeM Tender *
              </label>
              <select
                id="tender-selector-dropdown"
                value={selectedTenderId}
                onChange={e => setSelectedTenderId(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 font-medium focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              >
                {tenders.map(t => (
                  <option key={t.id} value={t.id}>
                    [{t.tenderNumber}] {t.title} ({t.department})
                  </option>
                ))}
              </select>
              
              {/* Tender Parameters Highlight */}
              <div className="mt-2.5 p-3 bg-amber-50/70 rounded-lg border border-amber-200 text-xs flex flex-wrap gap-4">
                <div>
                  <span className="text-slate-500">Estimated Value:</span>{' '}
                  <span className="font-bold text-slate-800">
                    ₹{(currentTender.estimatedValueINR / 10000000).toFixed(2)} Cr
                  </span>
                </div>
                <div>
                  <span className="text-slate-500">Min. Annual Turnover:</span>{' '}
                  <span className="font-bold text-slate-800">
                    ₹{(currentTender.minimumTurnoverINR / 10000000).toFixed(2)} Cr
                  </span>
                </div>
                <div>
                  <span className="text-slate-500">Mandatory Local Content (MII):</span>{' '}
                  <span className="font-bold text-amber-900">
                    {currentTender.minimumLocalContentPercent}%
                  </span>
                </div>
                <div>
                  <span className="text-slate-500">MSE Purchase Preference:</span>{' '}
                  <span className="font-bold text-emerald-800">
                    {currentTender.isMsePreferenceApplicable ? 'Applicable (Udyam Valid)' : 'No'}
                  </span>
                </div>
              </div>
            </div>

            {/* Legal Entity Name */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Legal Entity Name (As per PAN / Incorporation) *
              </label>
              <input
                id="bidder-name-input"
                type="text"
                value={bidderName}
                onChange={e => setBidderName(e.target.value)}
                placeholder="e.g. Bharat Infotech Solutions Ltd."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 font-semibold focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>

            {/* Registered Email */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Authorized Nodal Contact Email *
              </label>
              <input
                type="email"
                value={bidderEmail}
                onChange={e => setBidderEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>

            {/* PAN Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Permanent Account Number (PAN) *
              </label>
              <input
                id="bidder-pan-input"
                type="text"
                maxLength={10}
                value={panNumber}
                onChange={e => setPanNumber(e.target.value.toUpperCase())}
                placeholder="e.g. AAACB1234D"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono font-bold text-slate-900 tracking-wider uppercase focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>

            {/* GSTIN Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Goods and Services Tax ID (GSTIN) *
              </label>
              <input
                id="bidder-gstin-input"
                type="text"
                maxLength={15}
                value={gstinNumber}
                onChange={e => setGstinNumber(e.target.value.toUpperCase())}
                placeholder="e.g. 27AAACB1234D1Z5"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono font-bold text-slate-900 tracking-wider uppercase focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>

            {/* Udyam Registration Number */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                MSME Udyam Registration Number (If applicable)
              </label>
              <input
                id="bidder-udyam-input"
                type="text"
                value={udyamNumber}
                onChange={e => setUdyamNumber(e.target.value.toUpperCase())}
                placeholder="e.g. UDYAM-MH-12-0048921"
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-mono text-slate-900 uppercase focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>

            {/* Enterprise Category */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Enterprise Classification *
              </label>
              <select
                value={enterpriseType}
                onChange={e => setEnterpriseType(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              >
                <option value="MICRO">Micro Enterprise (&lt; 1 Cr Investment, &lt; 5 Cr Turnover)</option>
                <option value="SMALL">Small Enterprise (&lt; 10 Cr Investment, &lt; 50 Cr Turnover)</option>
                <option value="MEDIUM">Medium Enterprise (&lt; 50 Cr Investment, &lt; 250 Cr Turnover)</option>
                <option value="LARGE">Large Industrial Corporation</option>
                <option value="STARTUP">DPIIT Recognized Startup</option>
              </select>
            </div>

            {/* Declared Local Content % */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Declared Make in India Local Content (% of domestic value addition) *
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min={0}
                  max={100}
                  value={declaredLocalContentPercent}
                  onChange={e => setDeclaredLocalContentPercent(Number(e.target.value))}
                  className="w-28 bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                />
                <span className="text-xs font-bold text-slate-600">%</span>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded ${
                  declaredLocalContentPercent >= currentTender.minimumLocalContentPercent
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  {declaredLocalContentPercent >= currentTender.minimumLocalContentPercent
                    ? `Meets Tender Requirement (≥ ${currentTender.minimumLocalContentPercent}%)`
                    : `Below Tender Threshold (${currentTender.minimumLocalContentPercent}%)`}
                </span>
              </div>
            </div>

            {/* Registered State */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Registered Principal Business State *
              </label>
              <input
                type="text"
                value={registeredState}
                onChange={e => setRegisteredState(e.target.value)}
                placeholder="e.g. Maharashtra, Delhi, Gujarat..."
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-sm text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-200">
            <button
              id="step1-next-btn"
              onClick={() => setCurrentStep(2)}
              disabled={!bidderName || !panNumber || !gstinNumber}
              className="px-6 py-2.5 bg-[#1e3a8a] hover:bg-[#1e40af] disabled:opacity-50 text-white font-bold text-sm rounded-lg shadow-xs transition-colors flex items-center space-x-2"
            >
              <span>Proceed to Document Upload</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Document Upload & Camera Scan */}
      {currentStep === 2 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <FileCheck className="w-5 h-5 text-[#1e3a8a]" />
                <span>Upload Required Statutory Documents</span>
              </h3>
              <p className="text-xs text-slate-500">
                You can upload documents from your computer or capture them directly using your phone/laptop camera.
              </p>
            </div>

            <div className="text-right text-xs">
              <span className={`font-bold px-2 py-1 rounded ${
                missingCount === 0 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {missingCount === 0 
                  ? 'All Mandatory Documents Attached' 
                  : `${missingCount} Mandatory Document(s) Pending`}
              </span>
            </div>
          </div>

          {/* Document Upload Cards */}
          <div className="space-y-4 mb-6">
            {currentTender.requiredDocuments.map(spec => {
              const uploaded = uploadedDocs[spec.id];

              return (
                <div
                  key={spec.id}
                  className={`p-4 rounded-xl border transition-all ${
                    uploaded
                      ? 'bg-emerald-50/40 border-emerald-300'
                      : spec.isMandatory
                      ? 'bg-slate-50 border-slate-300'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    {/* Left: Document Info */}
                    <div className="max-w-xl">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 text-[10px] font-bold rounded uppercase tracking-wider ${
                          spec.isMandatory ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {spec.isMandatory ? 'Mandatory' : 'Optional'}
                        </span>
                        <span className="text-[11px] font-bold text-slate-500">
                          {spec.departmentAuthority}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 mt-1">
                        {spec.title}
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {spec.description}
                      </p>
                      <div className="text-[11px] text-slate-500 mt-1">
                        <span className="font-semibold text-slate-700">Audit Rule:</span> {spec.validationCriteria}
                      </div>
                    </div>

                    {/* Right: Upload Actions */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                      {uploaded ? (
                        <div className="flex items-center space-x-3 bg-white px-3 py-2 rounded-lg border border-emerald-200 shadow-2xs">
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                          <div className="text-xs">
                            <p className="font-bold text-slate-900 truncate max-w-[180px]">
                              {uploaded.fileName}
                            </p>
                            <span className="text-[10px] text-slate-500">
                              {uploaded.uploadMethod === 'CAMERA_CAPTURE' ? '📷 Camera Scan' : '📁 File Upload'} • {uploaded.fileSize}
                            </span>
                          </div>
                          
                          <button
                            onClick={() => {
                              const newMap = { ...uploadedDocs };
                              delete newMap[spec.id];
                              setUploadedDocs(newMap);
                            }}
                            className="text-xs text-rose-600 hover:text-rose-800 font-semibold ml-2 underline"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-wrap items-center gap-2">
                          {/* File Upload Button */}
                          <label className="cursor-pointer px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded text-xs font-semibold shadow-2xs flex items-center space-x-1.5 transition-colors">
                            <Upload className="w-3.5 h-3.5 text-blue-600" />
                            <span>Choose File</span>
                            <input
                              type="file"
                              accept="image/*,.pdf"
                              onChange={e => handleFileUpload(spec, e)}
                              className="hidden"
                            />
                          </label>

                          {/* Camera Scan Button */}
                          <button
                            onClick={() => {
                              setActiveSpecForCamera(spec);
                              setCameraModalOpen(true);
                            }}
                            className="px-3 py-1.5 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 rounded text-xs font-semibold shadow-2xs flex items-center space-x-1.5 transition-colors"
                          >
                            <Camera className="w-3.5 h-3.5 text-amber-600" />
                            <span>Scan with Camera</span>
                          </button>

                          {/* Quick Sample Load Button */}
                          <button
                            onClick={() => handleQuickLoadSingleDoc(spec)}
                            className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-600 text-[11px] font-medium rounded transition-colors"
                            title="Load pre-generated authentic government document sample"
                          >
                            Use Sample
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-4 border-t border-slate-200">
            <button
              onClick={() => setCurrentStep(1)}
              className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 font-semibold text-xs rounded-lg transition-colors flex items-center space-x-1.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Tender Info</span>
            </button>

            <button
              id="start-ai-verification-btn"
              onClick={handleRunFullVerification}
              disabled={missingCount > 0 || isVerifying}
              className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 disabled:opacity-50 text-white font-bold text-sm rounded-lg shadow-xs transition-colors flex items-center space-x-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Run AI Verification & Cross-Portal Check</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Automated AI Verification in Progress */}
      {currentStep === 3 && isVerifying && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-8 text-center max-w-2xl mx-auto">
          <div className="w-16 h-16 bg-blue-50 text-[#1e3a8a] rounded-full flex items-center justify-center mx-auto mb-4 animate-spin">
            <RefreshCw className="w-8 h-8" />
          </div>

          <h3 className="text-lg font-bold text-slate-900 mb-1">
            {verificationProgress.stage || 'AI Verification Engine Running...'}
          </h3>
          <p className="text-xs text-slate-500 mb-6">
            {verificationProgress.detail || 'Extracting OCR text, verifying signatures and querying government gateways...'}
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 rounded-full h-3 mb-6 overflow-hidden">
            <div
              className="bg-[#1e3a8a] h-3 rounded-full transition-all duration-300"
              style={{ width: `${verificationProgress.percent}%` }}
            ></div>
          </div>

          {/* Simulated Gateway Status Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-[11px] font-semibold text-left">
            <div className="p-2 rounded bg-orange-50 border border-orange-200 flex items-center space-x-2 text-orange-950 font-bold">
              <span className="w-2 h-2 rounded-full bg-[#F27D26] animate-pulse"></span>
              <span>Sarvam Indic OCR</span>
            </div>
            <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>MSME Udyam</span>
            </div>
            <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>GSTN Network</span>
            </div>
            <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Income Tax CBDT</span>
            </div>
            <div className="p-2 rounded bg-slate-50 border border-slate-200 flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>CPPP Debarment</span>
            </div>
          </div>
        </div>
      )}

      {/* STEP 4: Compliance Scorecard & Results */}
      {currentStep === 4 && generatedScorecard && (
        <div className="space-y-6">
          {/* Top Score Banner */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                    Bidder Tracking Token:
                  </span>
                  <span className="font-mono font-bold text-xs bg-slate-100 px-2.5 py-1 rounded text-slate-800">
                    {finalSubmissionToken}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  Compliance Assessment: {bidderName}
                </h3>
                <p className="text-xs text-slate-500">
                  Tender: {currentTender.tenderNumber} • Evaluated on {new Date().toLocaleDateString('en-IN')}
                </p>
              </div>

              {/* Big Score Box */}
              <div className="flex items-center space-x-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div className="text-right">
                  <span className="text-[11px] font-bold text-slate-500 block uppercase">
                    Calculated Score
                  </span>
                  <div className="text-3xl font-extrabold text-slate-900 font-mono">
                    {generatedScorecard.totalScore}
                    <span className="text-sm font-medium text-slate-400">/100</span>
                  </div>
                </div>

                <div className={`px-4 py-2 rounded-lg font-bold text-xs text-center ${
                  generatedScorecard.riskLevel === 'LOW' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                  generatedScorecard.riskLevel === 'MEDIUM' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                  'bg-rose-100 text-rose-900 border border-rose-300'
                }`}>
                  <span className="block text-[10px] uppercase opacity-80">Risk Level</span>
                  <span className="text-sm font-extrabold">{generatedScorecard.riskLevel} RISK</span>
                </div>
              </div>
            </div>

            {/* AI Recommendation Alert */}
            <div className={`mt-5 p-4 rounded-lg border text-xs leading-relaxed ${
              generatedScorecard.riskLevel === 'LOW' ? 'bg-emerald-50 border-emerald-200 text-emerald-900' :
              generatedScorecard.riskLevel === 'MEDIUM' ? 'bg-amber-50 border-amber-200 text-amber-900' :
              'bg-rose-50 border-rose-200 text-rose-900'
            }`}>
              <div className="flex items-start space-x-2">
                <Sparkles className="w-4 h-4 shrink-0 mt-0.5 text-[#F27D26]" />
                <div className="w-full">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold uppercase tracking-wider block">
                      AI Decision Support Recommendation:
                    </span>
                    <span className="text-[10px] font-bold bg-[#F27D26]/15 text-[#F27D26] px-2 py-0.5 rounded border border-[#F27D26]/30">
                      Sarvam AI Sovereign Engine
                    </span>
                  </div>
                  <p>{generatedScorecard.aiRecommendation}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Rule Breakdown Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
              <h4 className="text-sm font-bold text-slate-900">
                Detailed Statutory Rule Evaluation Breakdown
              </h4>
              <span className="text-xs text-slate-500">
                Rule Engine Standards • GeM Circular 2026
              </span>
            </div>

            <div className="divide-y divide-slate-200">
              {generatedScorecard.items.map(item => (
                <div key={item.ruleId} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="max-w-2xl">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        item.status === 'PASS' ? 'bg-emerald-100 text-emerald-800' :
                        item.status === 'WARN' ? 'bg-amber-100 text-amber-800' :
                        'bg-rose-100 text-rose-800'
                      }`}>
                        {item.status}
                      </span>
                      <span className="font-bold text-slate-800">{item.ruleDescription}</span>
                    </div>
                    <p className="text-slate-600 pl-1">{item.details}</p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-mono font-bold text-sm text-slate-900">
                      {item.awardedScore} / {item.maxScore}
                    </span>
                    <span className="block text-[10px] text-slate-500">pts awarded</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions Bottom Bar */}
          <div className="bg-slate-100 p-4 rounded-xl border border-slate-300 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div className="text-xs text-slate-600">
              <span className="font-bold">Next Steps:</span> Final statutory qualification decision is pending officer review on GeM Portal.
            </div>

            <div className="flex items-center space-x-3">
              <button
                id="submit-another-bid-btn"
                onClick={() => {
                  setCurrentStep(1);
                  setUploadedDocs({});
                  setGeneratedScorecard(null);
                }}
                className="px-4 py-2 border border-slate-300 hover:bg-white text-slate-700 text-xs font-semibold rounded-lg transition-colors"
              >
                Submit Another Bid
              </button>

              <button
                id="print-bid-slip-btn"
                onClick={() => {
                  window.print();
                }}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg shadow-xs transition-colors flex items-center space-x-1.5"
              >
                <FileCheck className="w-4 h-4 text-emerald-400" />
                <span>Print GeM Submission Slip</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Camera Capture Modal */}
      {cameraModalOpen && activeSpecForCamera && (
        <CameraCaptureModal
          documentTitle={activeSpecForCamera.title}
          isOpen={cameraModalOpen}
          onClose={() => {
            setCameraModalOpen(false);
            setActiveSpecForCamera(null);
          }}
          onCaptureComplete={handleCameraCapture}
        />
      )}
    </div>
  );
};
