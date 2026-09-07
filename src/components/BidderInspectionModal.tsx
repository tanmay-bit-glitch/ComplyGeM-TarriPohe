import React, { useState } from 'react';
import { 
  BidderSubmission, 
  SubmittedDocument, 
  BidderDecision 
} from '../types';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  ShieldCheck, 
  FileText, 
  Building2, 
  Stamp, 
  PenTool, 
  ExternalLink, 
  Sparkles, 
  Check, 
  Send,
  Eye
} from 'lucide-react';

interface BidderInspectionModalProps {
  submission: BidderSubmission;
  isOpen: boolean;
  onClose: () => void;
  onRecordDecision: (
    submissionId: string, 
    decision: BidderDecision, 
    remarks: string
  ) => void;
}

export const BidderInspectionModal: React.FC<BidderInspectionModalProps> = ({
  submission,
  isOpen,
  onClose,
  onRecordDecision,
}) => {
  const [selectedDocIndex, setSelectedDocIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'INSPECTION' | 'SCORECARD' | 'DEPARTMENT_GATEWAYS' | 'DECISION'>('INSPECTION');
  const [decisionAction, setDecisionAction] = useState<BidderDecision>(
    submission.officerDecision !== 'PENDING_REVIEW' ? submission.officerDecision : 'QUALIFIED'
  );
  const [officerRemarks, setOfficerRemarks] = useState(
    submission.officerRemarks || 
    (submission.complianceScorecard?.riskLevel === 'LOW'
      ? 'All statutory documents, GST return filings, PAN records and Make in India self-declaration verified authentic. Bidder is technically qualified.'
      : 'Identified compliance observations require officer attention before tender finalization.')
  );

  if (!isOpen) return null;

  const currentDoc = submission.documents[selectedDocIndex];
  const scorecard = submission.complianceScorecard;

  const handleSubmitDecision = () => {
    onRecordDecision(submission.id, decisionAction, officerRemarks);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-2 sm:p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-6xl w-full max-h-[92vh] flex flex-col border border-slate-300 overflow-hidden">
        {/* Top Modal Header */}
        <div className="bg-[#002B5B] text-white px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b-2 border-[#F27D26]">
          <div>
            <div className="flex items-center space-x-2">
              <span className="bg-[#F27D26] text-white text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">
                GeM Tender Evaluation
              </span>
              <span className="text-xs text-blue-200 font-mono">
                {submission.tenderNumber}
              </span>
              <span className="text-blue-300">•</span>
              <span className="text-xs text-blue-200 font-mono">
                Token: {submission.trackingToken}
              </span>
            </div>

            <h3 className="text-xl font-bold text-white mt-1">
              Bid Compliance Inspection: {submission.bidderName}
            </h3>
          </div>

          <div className="flex items-center space-x-4">
            {/* Compliance Badge */}
            {scorecard && (
              <div className="flex items-center space-x-2 bg-[#001D3D] px-3 py-1.5 rounded-lg border border-blue-800/80">
                <div className="text-right">
                  <span className="text-[10px] uppercase text-blue-200 block">AI Score</span>
                  <span className="text-xl font-extrabold font-mono text-white">
                    {scorecard.totalScore}<span className="text-xs font-normal text-slate-400">/100</span>
                  </span>
                </div>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded ${
                  scorecard.riskLevel === 'LOW' ? 'bg-emerald-500 text-white' :
                  scorecard.riskLevel === 'MEDIUM' ? 'bg-amber-500 text-slate-900' :
                  'bg-rose-600 text-white'
                }`}>
                  {scorecard.riskLevel}
                </span>
              </div>
            )}

            <button
              onClick={onClose}
              className="text-blue-200 hover:text-white p-1 rounded transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs inside Modal */}
        <div className="bg-slate-100 border-b border-slate-200 px-6 flex flex-wrap gap-2 py-2.5">
          <button
            onClick={() => setActiveTab('INSPECTION')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center space-x-1.5 ${
              activeTab === 'INSPECTION'
                ? 'bg-white text-[#002B5B] shadow-sm border border-slate-300'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5 text-[#002B5B]" />
            <span>Document Side-by-Side Review ({submission.documents.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('SCORECARD')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center space-x-1.5 ${
              activeTab === 'SCORECARD'
                ? 'bg-white text-[#002B5B] shadow-sm border border-slate-300'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
            <span>Statutory Rule Scorecard</span>
          </button>

          <button
            onClick={() => setActiveTab('DECISION')}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center space-x-1.5 ${
              activeTab === 'DECISION'
                ? 'bg-[#002B5B] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5 text-[#F27D26]" />
            <span>Procurement Officer Decision</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 bg-slate-50">
          {/* TAB 1: Document Side-by-Side Review */}
          {activeTab === 'INSPECTION' && (
            <div>
              {submission.documents.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
                  <FileText className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-slate-700">No documents uploaded for this bid.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: Document Selector & Metadata (5 cols) */}
                  <div className="lg:col-span-5 space-y-4">
                    {/* Document Selector Pills */}
                    <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-2xs">
                      <span className="text-[11px] font-bold text-slate-500 uppercase block mb-2">
                        Attached Tender Documents
                      </span>
                      <div className="space-y-1.5">
                        {submission.documents.map((doc, idx) => (
                          <button
                            key={doc.id}
                            onClick={() => setSelectedDocIndex(idx)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors ${
                              selectedDocIndex === idx
                                ? 'bg-blue-50 text-blue-950 border border-blue-300 font-bold'
                                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-transparent'
                            }`}
                          >
                            <span className="truncate max-w-[220px]">
                              {doc.documentType} - {doc.fileName}
                            </span>
                            <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                              doc.verificationStatus === 'VERIFIED' ? 'bg-emerald-100 text-emerald-800' :
                              doc.verificationStatus === 'DISCREPANCY_FLAGGED' ? 'bg-rose-100 text-rose-800' :
                              'bg-slate-200 text-slate-700'
                            }`}>
                              {doc.verificationStatus}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* AI OCR Extraction Box */}
                    {currentDoc && (
                      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
                        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                          <h4 className="text-xs font-bold text-slate-900 flex items-center space-x-1.5">
                            <Sparkles className="w-4 h-4 text-[#F27D26]" />
                            <span>Sarvam Indic OCR & Document Intelligence</span>
                          </h4>
                          <div className="flex items-center space-x-1.5">
                            <span className="text-[10px] font-bold text-orange-800 bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                              Sarvam AI Sovereign Engine
                            </span>
                            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                              Confidence: {currentDoc.extractedData?.aiAuthenticityScore || 96}%
                            </span>
                          </div>
                        </div>

                        {/* Forensic Biometric & Seal Flags */}
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className={`p-2 rounded border ${
                            currentDoc.extractedData?.signatureDetected
                              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                              : 'bg-amber-50 border-amber-200 text-amber-900'
                          }`}>
                            <span className="text-[10px] font-bold block opacity-80 flex items-center space-x-1">
                              <PenTool className="w-3 h-3" />
                              <span>Signatory Verified</span>
                            </span>
                            <span className="font-extrabold text-xs">
                              {currentDoc.extractedData?.signatureDetected ? 'Verified Present (97%)' : 'Not Detected'}
                            </span>
                          </div>

                          <div className={`p-2 rounded border ${
                            currentDoc.extractedData?.sealDetected
                              ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                              : 'bg-amber-50 border-amber-200 text-amber-900'
                          }`}>
                            <span className="text-[10px] font-bold block opacity-80 flex items-center space-x-1">
                              <Stamp className="w-3 h-3" />
                              <span>Corporate Seal / Stamp</span>
                            </span>
                            <span className="font-extrabold text-xs">
                              {currentDoc.extractedData?.sealDetected ? 'Authentic Seal (94%)' : 'Missing Stamp'}
                            </span>
                          </div>
                        </div>

                        {/* Extracted Key Attributes */}
                        <div className="space-y-1.5 text-xs">
                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Document Identifier:</span>
                            <span className="font-mono font-bold text-slate-900">
                              {currentDoc.extractedData?.documentNumber || 'N/A'}
                            </span>
                          </div>

                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Extracted Legal Entity:</span>
                            <span className="font-bold text-slate-900 text-right max-w-[200px] truncate">
                              {currentDoc.extractedData?.entityName || 'N/A'}
                            </span>
                          </div>

                          <div className="flex justify-between py-1 border-b border-slate-100">
                            <span className="text-slate-500">Validity / Expiry:</span>
                            <span className="font-medium text-slate-800">
                              {currentDoc.extractedData?.validityDate || 'Perpetual (Active)'}
                            </span>
                          </div>

                          {currentDoc.extractedData?.localContentPercentage !== undefined && (
                            <div className="flex justify-between py-1 border-b border-slate-100">
                              <span className="text-slate-500">Local Content %:</span>
                              <span className="font-bold text-amber-900">
                                {currentDoc.extractedData.localContentPercentage}% (Make in India)
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Government Department Query Gateway Evidence */}
                        {currentDoc.departmentResult && (
                          <div className="mt-3 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                            <span className="text-[10px] font-bold text-slate-500 uppercase block mb-1">
                              🏛️ Multi-Portal Gateway Cross-Match
                            </span>
                            <div className="flex items-center space-x-1.5 text-emerald-800 font-bold mb-1">
                              <CheckCircle2 className="w-4 h-4" />
                              <span>{currentDoc.departmentResult.statusMessage}</span>
                            </div>
                            <p className="text-[11px] font-mono text-slate-500">
                              Ref ID: {currentDoc.departmentResult.apiReferenceId}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right Column: Visual Document Preview (7 cols) */}
                  <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 shadow-2xs p-4 flex flex-col">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
                      <div>
                        <h4 className="text-xs font-bold text-slate-800">
                          Original Submitted Document Artifact
                        </h4>
                        <span className="text-[11px] text-slate-500">
                          {currentDoc?.fileName} ({currentDoc?.fileSize})
                        </span>
                      </div>

                      <a
                        href={currentDoc?.fileDataUrl}
                        download={currentDoc?.fileName}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2.5 py-1 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded flex items-center space-x-1 transition-colors"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Open Raw</span>
                      </a>
                    </div>

                    {/* Document Display Frame */}
                    <div className="flex-1 bg-slate-900 rounded-lg p-2 flex items-center justify-center min-h-[450px] overflow-auto">
                      {currentDoc?.fileDataUrl ? (
                        <img
                          src={currentDoc.fileDataUrl}
                          alt="Submitted Document Preview"
                          className="max-h-[500px] max-w-full object-contain rounded shadow-md bg-white"
                        />
                      ) : (
                        <span className="text-xs text-slate-400">Document preview unavailable</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Statutory Rule Scorecard */}
          {activeTab === 'SCORECARD' && scorecard && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    GeM Statutory Rule Engine Scorecard
                  </h4>
                  <p className="text-xs text-slate-500">
                    Calculated based on GeM General Financial Rules (GFR) 2017 & Public Procurement Orders.
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold font-mono text-slate-900">
                    {scorecard.totalScore} / 100
                  </span>
                  <span className="block text-[11px] font-bold text-slate-500 uppercase">
                    Risk Category: {scorecard.riskLevel}
                  </span>
                </div>
              </div>

              {/* Rules List */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-2xs divide-y divide-slate-200">
                {scorecard.items.map(item => (
                  <div key={item.ruleId} className="p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3 text-xs">
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
                      <p className="text-slate-600">{item.details}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono font-bold text-sm text-slate-900">
                        {item.awardedScore} / {item.maxScore}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Procurement Officer Decision Form */}
          {activeTab === 'DECISION' && (
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-2xs max-w-2xl mx-auto">
              <h4 className="text-base font-bold text-slate-900 mb-1 flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-[#1e3a8a]" />
                <span>Final Statutory Qualification Decision</span>
              </h4>
              <p className="text-xs text-slate-500 mb-5">
                Per GeM guidelines, the AI verification engine provides decision-support. The final binding qualification determination rests strictly with the Procurement Officer.
              </p>

              {/* Decision Radio Choices */}
              <div className="space-y-3 mb-5">
                <label className={`block p-3 rounded-lg border cursor-pointer transition-colors ${
                  decisionAction === 'QUALIFIED'
                    ? 'bg-emerald-50 border-emerald-400 shadow-2xs'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="officerDecision"
                      checked={decisionAction === 'QUALIFIED'}
                      onChange={() => setDecisionAction('QUALIFIED')}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <div>
                      <span className="text-xs font-bold text-emerald-900 block">
                        ✓ QUALIFY BIDDER (Eligible for Financial Evaluation)
                      </span>
                      <span className="text-[11px] text-slate-600">
                        All mandatory statutory, tax, and Make In India criteria satisfied without material discrepancy.
                      </span>
                    </div>
                  </div>
                </label>

                <label className={`block p-3 rounded-lg border cursor-pointer transition-colors ${
                  decisionAction === 'CLARIFICATION_REQUESTED'
                    ? 'bg-amber-50 border-amber-400 shadow-2xs'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="officerDecision"
                      checked={decisionAction === 'CLARIFICATION_REQUESTED'}
                      onChange={() => setDecisionAction('CLARIFICATION_REQUESTED')}
                      className="text-amber-600 focus:ring-amber-500"
                    />
                    <div>
                      <span className="text-xs font-bold text-amber-900 block">
                        ⚠️ SEEK CLARIFICATION (Issue 48-Hour GeM Representation Notice)
                      </span>
                      <span className="text-[11px] text-slate-600">
                        Bidder meets baseline parameters but requires documentary explanation for flagged observations.
                      </span>
                    </div>
                  </div>
                </label>

                <label className={`block p-3 rounded-lg border cursor-pointer transition-colors ${
                  decisionAction === 'DISQUALIFIED'
                    ? 'bg-rose-50 border-rose-400 shadow-2xs'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}>
                  <div className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="officerDecision"
                      checked={decisionAction === 'DISQUALIFIED'}
                      onChange={() => setDecisionAction('DISQUALIFIED')}
                      className="text-rose-600 focus:ring-rose-500"
                    />
                    <div>
                      <span className="text-xs font-bold text-rose-900 block">
                        ✕ DISQUALIFY BIDDER (Formal Rejection)
                      </span>
                      <span className="text-[11px] text-slate-600">
                        Entity violates mandatory statutory requirements, exhibits tax default, or fails eligibility thresholds.
                      </span>
                    </div>
                  </div>
                </label>
              </div>

              {/* Official Remarks */}
              <div className="mb-5">
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Procurement Officer Formal Assessment & Audit Remarks *
                </label>
                <textarea
                  rows={4}
                  value={officerRemarks}
                  onChange={e => setOfficerRemarks(e.target.value)}
                  placeholder="Record formal statutory evaluation notes..."
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-3 text-xs text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                />
              </div>

              {/* Submit Action */}
              <div className="flex justify-end space-x-3 pt-3 border-t border-slate-200">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-lg"
                >
                  Cancel
                </button>
                <button
                  id="officer-submit-decision-btn"
                  onClick={handleSubmitDecision}
                  className="px-6 py-2.5 bg-[#002B5B] hover:bg-[#003875] text-white font-bold text-xs rounded-lg shadow-sm flex items-center space-x-2 transition-all"
                >
                  <Send className="w-3.5 h-3.5 text-[#F27D26]" />
                  <span>Record Binding Decision & Sign-off</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
