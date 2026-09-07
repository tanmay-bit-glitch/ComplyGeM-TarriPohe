import React, { useState } from 'react';
import { 
  Tender, 
  BidderSubmission, 
  BidderDecision, 
  RiskLevel 
} from '../types';
import { BidderInspectionModal } from './BidderInspectionModal';
import { 
  ShieldCheck, 
  Search, 
  Filter, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  FileText, 
  Clock, 
  Eye, 
  Plus, 
  Download, 
  Building2, 
  TrendingUp,
  Sparkles
} from 'lucide-react';

interface OfficerDashboardProps {
  tenders: Tender[];
  submissions: BidderSubmission[];
  onOpenTenderModal: () => void;
  onRecordOfficerDecision: (
    submissionId: string, 
    decision: BidderDecision, 
    remarks: string
  ) => void;
  language: 'EN' | 'HI';
}

export const OfficerDashboard: React.FC<OfficerDashboardProps> = ({
  tenders,
  submissions,
  onOpenTenderModal,
  onRecordOfficerDecision,
  language,
}) => {
  const [selectedTenderFilter, setSelectedTenderFilter] = useState<string>('ALL');
  const [riskFilter, setRiskFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectingSubmission, setInspectingSubmission] = useState<BidderSubmission | null>(null);

  // Computed metrics
  const totalSubmissions = submissions.length;
  const qualifiedCount = submissions.filter(s => s.officerDecision === 'QUALIFIED' || s.complianceScorecard?.riskLevel === 'LOW').length;
  const pendingCount = submissions.filter(s => s.officerDecision === 'PENDING_REVIEW' || s.officerDecision === 'CLARIFICATION_REQUESTED').length;
  const highRiskCount = submissions.filter(s => s.complianceScorecard?.riskLevel === 'HIGH' || s.officerDecision === 'DISQUALIFIED').length;

  // Filtered submissions
  const filteredSubmissions = submissions.filter(sub => {
    if (selectedTenderFilter !== 'ALL' && sub.tenderId !== selectedTenderFilter) return false;
    if (riskFilter !== 'ALL' && sub.complianceScorecard?.riskLevel !== riskFilter) return false;
    if (statusFilter !== 'ALL' && sub.officerDecision !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = sub.bidderName.toLowerCase().includes(q);
      const matchPan = sub.panNumber.toLowerCase().includes(q);
      const matchGst = sub.gstinNumber.toLowerCase().includes(q);
      const matchToken = sub.trackingToken.toLowerCase().includes(q);
      if (!matchName && !matchPan && !matchGst && !matchToken) return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* 1. Official Officer Banner */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">
            Bidder Verification Console
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Real-time multi-portal verification, signature authenticity scoring, and statutory rule audit trail.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            id="create-new-tender-btn"
            onClick={onOpenTenderModal}
            className="px-4 py-2 bg-[#002B5B] hover:bg-[#003875] text-white font-medium text-sm rounded-lg shadow-sm transition-all flex items-center space-x-2"
          >
            <Plus className="w-4 h-4 text-[#F27D26]" />
            <span>Configure New Tender Checklist</span>
          </button>
        </div>
      </div>

      {/* 2. System Status & Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: Total Bids */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center text-slate-500 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Total Submissions</span>
            <Building2 className="w-4 h-4 text-slate-400" />
          </div>
          <div className="text-3xl font-black text-slate-900 font-mono">
            {totalSubmissions}
          </div>
          <span className="text-[11px] text-slate-500">
            Across {tenders.length} active GeM tenders
          </span>
        </div>

        {/* Metric 2: AI-Qualified (Low Risk) */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center text-emerald-700 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Eligible / Low Risk</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-600 font-mono">
            {qualifiedCount}
          </div>
          <span className="text-[11px] text-emerald-700 font-medium">
            Score ≥ 85 • All Portals Cleared
          </span>
        </div>

        {/* Metric 3: Clarification / Pending */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center text-amber-700 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">Pending Review</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-amber-700 font-mono">
            {pendingCount}
          </div>
          <span className="text-[11px] text-amber-700 font-medium">
            Awaiting Officer Sign-Off / Clarification
          </span>
        </div>

        {/* Metric 4: High Risk / Flagged */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center text-rose-700 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider">High Risk / Flagged</span>
            <AlertTriangle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-3xl font-black text-rose-700 font-mono">
            {highRiskCount}
          </div>
          <span className="text-[11px] text-rose-700 font-medium">
            Discrepancy or tax default detected
          </span>
        </div>
      </div>

      {/* System Health Strip (from Professional Polish theme) */}
      <div className="bg-slate-900 rounded-xl p-4 text-white shadow-md border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 rounded-lg bg-blue-900/60 border border-blue-700/60 flex items-center justify-center text-blue-300">
            <Sparkles className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Verification Gateway & AI Engine Health
              </span>
              <span className="bg-green-500/20 text-green-400 border border-green-500/30 text-[10px] font-bold px-2 py-0.2 rounded-full">
                OPERATIONAL
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Udyam MSME Databank • GSTN e-Filing • Income Tax CBDT • CPPP Debarment Registry
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6 w-full md:w-auto">
          <div className="w-full md:w-44">
            <div className="flex justify-between items-center text-[10px] text-white mb-1">
              <span className="text-slate-400">AI OCR Precision</span>
              <span className="text-green-400 font-mono font-bold">99.2%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '99.2%' }}></div>
            </div>
          </div>

          <div className="w-full md:w-44">
            <div className="flex justify-between items-center text-[10px] text-white mb-1">
              <span className="text-slate-400">Statutory API Uptime</span>
              <span className="text-green-400 font-mono font-bold">100%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: '100%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Filters & Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            id="bidder-search-input"
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search bidder name, PAN, GSTIN or Token..."
            className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden transition-colors"
          />
        </div>

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto justify-end">
          {/* Tender Filter */}
          <select
            value={selectedTenderFilter}
            onChange={e => setSelectedTenderFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
          >
            <option value="ALL">All Tenders ({tenders.length})</option>
            {tenders.map(t => (
              <option key={t.id} value={t.id}>
                {t.tenderNumber}
              </option>
            ))}
          </select>

          {/* Risk Filter */}
          <select
            value={riskFilter}
            onChange={e => setRiskFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
          >
            <option value="ALL">All Risk Levels</option>
            <option value="LOW">Low Risk</option>
            <option value="MEDIUM">Medium Risk</option>
            <option value="HIGH">High Risk</option>
          </select>

          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
          >
            <option value="ALL">All Decisions</option>
            <option value="PENDING_REVIEW">Pending Review</option>
            <option value="QUALIFIED">Qualified</option>
            <option value="DISQUALIFIED">Disqualified</option>
            <option value="CLARIFICATION_REQUESTED">Clarification Sought</option>
          </select>
        </div>
      </div>

      {/* 4. Submissions Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-100 p-2 rounded-lg text-blue-700">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Bidder Submissions & AI Compliance Records
              </h3>
              <p className="text-xs text-slate-500">
                Direct statutory verification across GSTN, Udyam, Income Tax & CPPP
              </p>
            </div>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            Showing {filteredSubmissions.length} of {submissions.length} bidders
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-6">Bidder Details</th>
                <th className="py-3 px-6">Tender Ref</th>
                <th className="py-3 px-6">Statutory Identifiers</th>
                <th className="py-3 px-6 text-center">AI Compliance Score</th>
                <th className="py-3 px-6 text-center">Risk Classification</th>
                <th className="py-3 px-6 text-center">Officer Decision</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-sm">
              {filteredSubmissions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-500">
                    No submissions found matching selected filters.
                  </td>
                </tr>
              ) : (
                filteredSubmissions.map(sub => {
                  const scorecard = sub.complianceScorecard;

                  return (
                    <tr key={sub.id} className="hover:bg-blue-50/30 transition-colors">
                      {/* Bidder Details */}
                      <td className="py-4 px-6">
                        <div className="font-semibold text-slate-900 text-sm">
                          {sub.bidderName}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center space-x-2 mt-0.5">
                          <span>{sub.enterpriseType} Enterprise</span>
                          <span>•</span>
                          <span>{sub.registeredState}</span>
                        </div>
                        <div className="text-[10px] font-mono text-slate-400 mt-0.5">
                          Ref: {sub.trackingToken}
                        </div>
                      </td>

                      {/* Tender Ref */}
                      <td className="py-4 px-6 font-mono text-slate-700 font-semibold text-xs">
                        {sub.tenderNumber}
                      </td>

                      {/* Statutory Identifiers */}
                      <td className="py-4 px-6 font-mono text-[11px] space-y-0.5">
                        <div>
                          <span className="text-slate-400">PAN:</span>{' '}
                          <span className="font-bold text-slate-800">{sub.panNumber}</span>
                        </div>
                        <div>
                          <span className="text-slate-400">GSTIN:</span>{' '}
                          <span className="text-slate-700">{sub.gstinNumber}</span>
                        </div>
                        {sub.udyamNumber && (
                          <div>
                            <span className="text-slate-400">Udyam:</span>{' '}
                            <span className="text-emerald-700">{sub.udyamNumber}</span>
                          </div>
                        )}
                      </td>

                      {/* AI Compliance Score */}
                      <td className="py-4 px-6 text-center">
                        {scorecard ? (
                          <div>
                            <span className={`font-black font-mono text-lg ${
                              scorecard.totalScore >= 80 ? 'text-green-600' :
                              scorecard.totalScore >= 60 ? 'text-amber-600' :
                              'text-rose-600'
                            }`}>
                              {scorecard.totalScore}
                            </span>
                            <span className="text-xs font-normal text-slate-400">/100</span>
                          </div>
                        ) : (
                          <span className="text-slate-400 italic text-xs">Processing...</span>
                        )}
                      </td>

                      {/* Risk Classification */}
                      <td className="py-4 px-6 text-center">
                        {scorecard ? (
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border inline-flex items-center space-x-1 ${
                            scorecard.riskLevel === 'LOW' ? 'bg-green-100 text-green-700 border-green-200' :
                            scorecard.riskLevel === 'MEDIUM' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                            'bg-red-100 text-red-700 border-red-200'
                          }`}>
                            <span>{scorecard.riskLevel} RISK</span>
                          </span>
                        ) : (
                          <span className="text-slate-400">-</span>
                        )}
                      </td>

                      {/* Officer Decision */}
                      <td className="py-4 px-6 text-center">
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                          sub.officerDecision === 'QUALIFIED' ? 'bg-green-100 text-green-700 border-green-200' :
                          sub.officerDecision === 'DISQUALIFIED' ? 'bg-red-100 text-red-700 border-red-200' :
                          sub.officerDecision === 'CLARIFICATION_REQUESTED' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                          'bg-slate-100 text-slate-600 border-slate-200'
                        }`}>
                          {sub.officerDecision === 'PENDING_REVIEW' ? 'Pending Review' :
                           sub.officerDecision === 'QUALIFIED' ? 'Qualified' :
                           sub.officerDecision === 'DISQUALIFIED' ? 'Disqualified' : 'Clarification Sought'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => setInspectingSubmission(sub)}
                          className="px-3.5 py-1.5 bg-[#002B5B] hover:bg-[#003875] text-white font-medium text-xs rounded-lg shadow-xs transition-all inline-flex items-center space-x-1.5"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#F27D26]" />
                          <span>Inspect & Verify</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Deep-Dive Inspection Modal */}
      {inspectingSubmission && (
        <BidderInspectionModal
          submission={inspectingSubmission}
          isOpen={!!inspectingSubmission}
          onClose={() => setInspectingSubmission(null)}
          onRecordDecision={(subId, dec, remarks) => {
            onRecordOfficerDecision(subId, dec, remarks);
            setInspectingSubmission(null);
          }}
        />
      )}
    </div>
  );
};
