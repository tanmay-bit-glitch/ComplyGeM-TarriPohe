import React, { useState } from 'react';
import { 
  Tender, 
  BidderSubmission, 
  BidderDecision, 
  RiskLevel 
} from '../types';
import { BidderInspectionModal } from './BidderInspectionModal';
import { StatutoryApiDataExplorer } from './StatutoryApiDataExplorer';
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
  Download, 
  Building2, 
  TrendingUp,
  Database,
  Cpu,
  Lock,
  Sparkles
} from 'lucide-react';

interface OfficerDashboardProps {
  tenders: Tender[];
  submissions: BidderSubmission[];
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
  onRecordOfficerDecision,
  language,
}) => {
  const [officerTab, setOfficerTab] = useState<'SUBMISSIONS' | 'API_REGISTRY' | 'SARVAM_AI'>('SUBMISSIONS');
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
      {/* Officer Navigation & Quick Sub-bar */}
      <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Left: Officer Role Pill */}
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#002B5B] text-white flex items-center justify-center font-bold text-xs shadow-xs">
            <Lock className="w-4 h-4 text-amber-400" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold text-slate-900">
                Procurement Officer Evaluation Console
              </span>
              <span className="text-[9px] font-mono px-1.5 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 rounded font-bold uppercase">
                Officer Confidential
              </span>
            </div>
            <p className="text-[10px] text-slate-500">
              Statutory verification under GFR 2017 & GeM Transparency Norms
            </p>
          </div>
        </div>

        {/* Right: Section Tabs */}
        <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-xl w-full md:w-auto justify-center">
          <button
            id="officer-tab-submissions"
            onClick={() => setOfficerTab('SUBMISSIONS')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              officerTab === 'SUBMISSIONS'
                ? 'bg-[#002B5B] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Bidder Submissions & Bids</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-black ${
              officerTab === 'SUBMISSIONS' ? 'bg-blue-800 text-amber-300' : 'bg-slate-200 text-slate-700'
            }`}>
              {submissions.length}
            </span>
          </button>

          <button
            id="officer-tab-api-data"
            onClick={() => setOfficerTab('API_REGISTRY')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              officerTab === 'API_REGISTRY'
                ? 'bg-[#002B5B] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Database className="w-3.5 h-3.5 text-[#F27D26]" />
            <span>Statutory API Data Registry</span>
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-amber-100 text-amber-900 font-bold">
              14 Gateways
            </span>
          </button>

          <button
            id="officer-tab-sarvam-ai"
            onClick={() => setOfficerTab('SARVAM_AI')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
              officerTab === 'SARVAM_AI'
                ? 'bg-[#002B5B] text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
            }`}
          >
            <Cpu className="w-3.5 h-3.5 text-emerald-600" />
            <span>Sarvam AI Status</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </button>
        </div>
      </div>

      {/* Conditionally Render Statutory API Explorer or Standard Officer Dashboard */}
      {officerTab === 'API_REGISTRY' && (
        <StatutoryApiDataExplorer initialSubTab="GATEWAYS" language={language} />
      )}

      {officerTab === 'SARVAM_AI' && (
        <StatutoryApiDataExplorer initialSubTab="SARVAM_AI" language={language} />
      )}

      {officerTab === 'SUBMISSIONS' && (
        <>
      {/* System Status & Metric Cards */}
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
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-blue-600 focus:outline-hidden max-w-[260px] truncate"
          >
            <option value="ALL">All Tenders ({tenders.length})</option>
            {tenders.map(t => (
              <option key={t.id} value={t.id}>
                {t.tenderNumber} - {t.organisation || t.department}
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
                  <td colSpan={7} className="py-14 text-center">
                    <div className="max-w-md mx-auto text-center px-4">
                      <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-3 text-slate-400">
                        <FileText className="w-6 h-6" />
                      </div>
                      <h4 className="text-sm font-bold text-slate-800">
                        {submissions.length === 0 ? 'No Bidder Submission Records' : 'No Matching Submissions'}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {submissions.length === 0 
                          ? 'All previous submission records have been cleared. When registered bidders submit technical proposals through the Bidder Portal, verified scorecards and compliance evaluations will appear here automatically.' 
                          : 'No submissions found matching your search term or active category filters. Try resetting the filter criteria.'}
                      </p>
                    </div>
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
                      <td className="py-4 px-6 text-xs">
                        <div className="font-mono text-slate-800 font-bold">{sub.tenderNumber}</div>
                        {(() => {
                          const matchedTender = tenders.find(t => t.id === sub.tenderId || t.tenderNumber === sub.tenderNumber);
                          return matchedTender ? (
                            <div className="text-[11px] font-sans font-medium text-slate-500 truncate max-w-[160px]" title={matchedTender.title}>
                              {matchedTender.organisation || matchedTender.department}
                            </div>
                          ) : null;
                        })()}
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
      </>
      )}

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
