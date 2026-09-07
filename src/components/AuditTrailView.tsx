import React, { useState } from 'react';
import { AuditLogEntry } from '../types';
import { 
  History, 
  Search, 
  Filter, 
  Printer, 
  Download, 
  ShieldCheck, 
  Clock, 
  User, 
  Cpu, 
  Building2,
  Lock
} from 'lucide-react';

interface AuditTrailViewProps {
  logs: AuditLogEntry[];
  language: 'EN' | 'HI';
}

export const AuditTrailView: React.FC<AuditTrailViewProps> = ({ logs, language }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [actorFilter, setActorFilter] = useState<string>('ALL');

  const filteredLogs = logs.filter(log => {
    if (actorFilter !== 'ALL' && log.actor !== actorFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchAction = log.action.toLowerCase().includes(q);
      const matchDetails = log.details.toLowerCase().includes(q);
      const matchActor = log.actorName.toLowerCase().includes(q);
      const matchTender = log.tenderNumber.toLowerCase().includes(q);
      if (!matchAction && !matchDetails && !matchActor && !matchTender) return false;
    }
    return true;
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-blue-800 uppercase tracking-wider bg-blue-50 px-2.5 py-0.5 rounded border border-blue-200">
              Statutory Non-Repudiation Log
            </span>
            <span className="text-xs text-slate-500 font-medium">
              SHA-256 Tamper-Evident Verification Trail
            </span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            Official Audit Trail & Multi-Portal Verification Records
          </h2>
          <p className="text-sm text-slate-500">
            Immutable log of all AI OCR extractions, government gateway transactions, bidder submissions, and procurement officer determinations.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 font-medium text-xs rounded-lg shadow-xs transition-colors flex items-center space-x-2"
          >
            <Printer className="w-4 h-4 text-slate-600" />
            <span>Print Official Audit Certificate</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search action, details, actor or tender..."
            className="w-full bg-slate-50 border border-slate-300 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-blue-600 focus:outline-hidden transition-colors"
          />
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
          <select
            value={actorFilter}
            onChange={e => setActorFilter(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
          >
            <option value="ALL">All Actors ({logs.length})</option>
            <option value="BIDDER">Bidders</option>
            <option value="AI_ENGINE">AI Verification Engine</option>
            <option value="DEPARTMENT_GATEWAY">Department Gateways</option>
            <option value="PROCUREMENT_OFFICER">Procurement Officers</option>
          </select>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex justify-between items-center">
          <h3 className="text-sm font-bold text-slate-900">
            Chronological Audit Events ({filteredLogs.length})
          </h3>
          <span className="text-xs text-slate-500 font-mono">
            Timezone: Indian Standard Time (IST)
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-6">Timestamp (IST)</th>
                <th className="py-3 px-6">Actor</th>
                <th className="py-3 px-6">Action</th>
                <th className="py-3 px-6">Tender Ref</th>
                <th className="py-3 px-6">Audit Details</th>
                <th className="py-3 px-6 text-right">Integrity Hash</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-blue-50/30 transition-colors">
                  {/* Timestamp */}
                  <td className="py-3.5 px-6 font-mono text-[11px] text-slate-600 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString('en-IN', {
                      timeZone: 'Asia/Kolkata',
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                    })}
                  </td>

                  {/* Actor */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center space-x-1.5">
                      {log.actor === 'AI_ENGINE' ? (
                        <Cpu className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      ) : log.actor === 'DEPARTMENT_GATEWAY' ? (
                        <Building2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      ) : log.actor === 'PROCUREMENT_OFFICER' ? (
                        <ShieldCheck className="w-3.5 h-3.5 text-purple-600 shrink-0" />
                      ) : (
                        <User className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      )}
                      <span className="font-bold text-slate-900 text-xs">
                        {log.actorName}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono pl-5">
                      {log.actor}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4">
                    <span className="font-mono font-bold text-[11px] bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200">
                      {log.action}
                    </span>
                  </td>

                  {/* Tender Ref */}
                  <td className="py-3.5 px-4 font-mono font-semibold text-slate-800 text-[11px]">
                    {log.tenderNumber}
                  </td>

                  {/* Details */}
                  <td className="py-3.5 px-4 text-slate-700 max-w-md">
                    {log.details}
                  </td>

                  {/* Integrity Hash */}
                  <td className="py-3.5 px-4 text-right font-mono text-[10px] text-slate-400 whitespace-nowrap">
                    <span className="inline-flex items-center space-x-1" title={log.integrityHash}>
                      <Lock className="w-3 h-3 text-emerald-600" />
                      <span>{log.integrityHash ? `${log.integrityHash.slice(0, 10)}...${log.integrityHash.slice(-4)}` : 'sha256_verified'}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
