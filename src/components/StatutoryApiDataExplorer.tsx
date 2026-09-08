import React, { useState, useEffect } from 'react';
import { 
  Database, 
  Shield, 
  ShieldCheck, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Search, 
  RefreshCw, 
  ExternalLink, 
  Cpu, 
  Layers, 
  FileCode, 
  Sparkles, 
  Globe, 
  Activity, 
  Clock, 
  ArrowRight, 
  Lock, 
  Building2, 
  Server,
  FileText,
  ChevronRight,
  Terminal,
  Info
} from 'lucide-react';
import { fetchOfficerApiRegistry, testSarvamAiStatus, queryDepartmentGateway } from '../services/apiService';

interface StatutoryApiDataExplorerProps {
  initialSubTab?: 'GATEWAYS' | 'SARVAM_AI' | 'SUBMISSIONS_DATASET' | 'QUERY_SANDBOX';
  language: 'EN' | 'HI';
}

export const StatutoryApiDataExplorer: React.FC<StatutoryApiDataExplorerProps> = ({
  initialSubTab = 'GATEWAYS',
  language,
}) => {
  const [activeTab, setActiveTab] = useState<'GATEWAYS' | 'SARVAM_AI' | 'SUBMISSIONS_DATASET' | 'QUERY_SANDBOX'>(initialSubTab);
  const [registryData, setRegistryData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Gateway Selection & Search
  const [selectedGatewayCode, setSelectedGatewayCode] = useState<string>('GSTN');
  const [gatewaySearchQuery, setGatewaySearchQuery] = useState<string>('');

  // Sarvam AI Diagnostic State
  const [sarvamTestLoading, setSarvamTestLoading] = useState<boolean>(false);
  const [sarvamTestResult, setSarvamTestResult] = useState<any>(null);

  // Live Query Sandbox State
  const [sandboxGateway, setSandboxGateway] = useState<string>('GSTN');
  const [sandboxIdentifier, setSandboxIdentifier] = useState<string>('07AACCA1001A1Z0');
  const [sandboxEntityName, setSandboxEntityName] = useState<string>('Acme Technology Solutions Private Limited');
  const [sandboxLoading, setSandboxLoading] = useState<boolean>(false);
  const [sandboxResponse, setSandboxResponse] = useState<any>(null);

  // Load registry data on mount
  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchOfficerApiRegistry();
      if (data && data.success) {
        setRegistryData(data);
      } else {
        setError('Failed to load statutory gateway registry.');
      }
    } catch (e: any) {
      setError(e?.message || 'Error loading statutory registry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handle live Sarvam AI ping
  const handleTestSarvamAi = async () => {
    setSarvamTestLoading(true);
    try {
      const res = await testSarvamAiStatus();
      setSarvamTestResult(res);
    } catch (e: any) {
      setSarvamTestResult({ success: false, message: e?.message || 'Error testing Sarvam AI' });
    } finally {
      setSarvamTestLoading(false);
    }
  };

  // Handle live gateway sandbox query
  const handleExecuteSandboxQuery = async () => {
    setSandboxLoading(true);
    setSandboxResponse(null);
    try {
      const res = await queryDepartmentGateway(
        sandboxGateway,
        sandboxIdentifier,
        sandboxEntityName,
        true,
        `Procurement Officer Manual Inquiry via Gateway Sandbox: ${sandboxIdentifier}`
      );
      setSandboxResponse(res);
    } catch (e: any) {
      setSandboxResponse({ success: false, error: e?.message || 'Sandbox query failed' });
    } finally {
      setSandboxLoading(false);
    }
  };

  const gateways = registryData?.gateways || [];
  const selectedGateway = gateways.find((g: any) => g.code === selectedGatewayCode) || gateways[0];
  const sarvamStatus = registryData?.sarvamStatus;

  // Filter records within selected gateway
  const filteredRecords = (selectedGateway?.records || []).filter((r: any) => {
    if (!gatewaySearchQuery.trim()) return true;
    const q = gatewaySearchQuery.toLowerCase();
    return (
      (r.identifier || '').toLowerCase().includes(q) ||
      (r.entityName || '').toLowerCase().includes(q) ||
      (r.status || '').toLowerCase().includes(q) ||
      (r.notes || '').toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* 1. Procurement Officer Authority Banner */}
      <div className="bg-gradient-to-r from-[#001D3D] to-[#002B5B] text-white rounded-2xl p-6 shadow-md border-l-4 border-[#F27D26]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center space-x-2">
              <span className="px-2 py-0.5 text-[10px] font-black bg-[#F27D26] text-white rounded uppercase tracking-wider">
                OFFICER PRIVILEGE ONLY
              </span>
              <span className="text-xs text-blue-200 font-mono flex items-center space-x-1">
                <Lock className="w-3 h-3 text-amber-400" />
                <span>CONFIDENTIAL GFR 2017 & GeM MASTER DATA REGISTRY</span>
              </span>
            </div>
            <h2 className="text-xl font-bold tracking-tight text-white flex items-center space-x-2">
              <Database className="w-6 h-6 text-[#F27D26]" />
              <span>Statutory API Gateway Registry & Sarvam AI Engine Status</span>
            </h2>
            <p className="text-xs text-blue-100/80 max-w-3xl leading-relaxed">
              This restricted console allows Procurement Officers to inspect the authoritative datasets stored inside statutory government gateways (GSTN, MCA21, MSME, CBDT, CPPP, CCA DSC, ICAI UDIN, PFMS, BIS), review the synthetic hackathon submission dataset, and monitor live Sarvam AI sovereign document intelligence health.
            </p>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={loadData}
              disabled={loading}
              className="px-3 py-1.5 bg-blue-900/60 hover:bg-blue-800 text-blue-100 border border-blue-700/60 rounded-lg text-xs font-semibold flex items-center space-x-1.5 transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Gateway Data</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 mt-6 pt-4 border-t border-blue-900/60">
          <button
            onClick={() => setActiveTab('GATEWAYS')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'GATEWAYS'
                ? 'bg-white text-[#002B5B] shadow-sm'
                : 'bg-blue-950/60 hover:bg-blue-900/60 text-blue-200'
            }`}
          >
            <Server className="w-4 h-4 text-[#F27D26]" />
            <span>Statutory Gateways Master Data ({gateways.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('SARVAM_AI')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'SARVAM_AI'
                ? 'bg-white text-[#002B5B] shadow-sm'
                : 'bg-blue-950/60 hover:bg-blue-900/60 text-blue-200'
            }`}
          >
            <Cpu className="w-4 h-4 text-emerald-400" />
            <span>Sarvam AI Sovereign Engine Status</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </button>

          <button
            onClick={() => setActiveTab('SUBMISSIONS_DATASET')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'SUBMISSIONS_DATASET'
                ? 'bg-white text-[#002B5B] shadow-sm'
                : 'bg-blue-950/60 hover:bg-blue-900/60 text-blue-200'
            }`}
          >
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Hackathon Mock Submissions Dataset</span>
          </button>

          <button
            onClick={() => setActiveTab('QUERY_SANDBOX')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'QUERY_SANDBOX'
                ? 'bg-white text-[#002B5B] shadow-sm'
                : 'bg-blue-950/60 hover:bg-blue-900/60 text-blue-200'
            }`}
          >
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span>Live Gateway Query Sandbox</span>
          </button>
        </div>
      </div>

      {/* 2. TAB CONTENT: SARVAM AI SOVEREIGN ENGINE STATUS */}
      {activeTab === 'SARVAM_AI' && (
        <div className="space-y-6">
          {/* Main Sarvam AI Health Card */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md">
                  <Cpu className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-base font-bold text-slate-900">
                      Sarvam AI Sovereign Document Intelligence
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300 flex items-center space-x-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                      <span>ACTIVE & VERIFIED</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    India Sovereign AI Model (<span className="font-mono font-semibold">sarvam-105b</span>) with bilingual Indic OCR, Devanagari header alignment, and national emblem validation
                  </p>
                </div>
              </div>

              <button
                id="test-sarvam-ai-btn"
                onClick={handleTestSarvamAi}
                disabled={sarvamTestLoading}
                className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-bold shadow-xs flex items-center space-x-2 transition-all disabled:opacity-50"
              >
                <Activity className={`w-4 h-4 ${sarvamTestLoading ? 'animate-spin' : ''}`} />
                <span>{sarvamTestLoading ? 'Testing Live Handshake...' : 'Run Live Sarvam AI Diagnostic Check'}</span>
              </button>
            </div>

            {/* Diagnostic Ping Output if tested */}
            {sarvamTestResult && (
              <div className={`p-4 rounded-xl border transition-all ${
                sarvamTestResult.success ? 'bg-emerald-50/80 border-emerald-200' : 'bg-rose-50 border-rose-200'
              }`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center space-x-2">
                    {sarvamTestResult.success ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    ) : (
                      <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                    )}
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">
                        {sarvamTestResult.success ? 'Sarvam AI Engine Connection Verified' : 'Diagnostic Check Notice'}
                      </h4>
                      <p className="text-xs text-slate-600 mt-0.5">
                        {sarvamTestResult.message}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      ⚡ Latency: {sarvamTestResult.latencyMs}ms
                    </span>
                    <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                      HTTP {sarvamTestResult.statusCode || 200} OK
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3 pt-3 border-t border-emerald-200/60 text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold">Engine Mode:</span>
                    <p className="font-mono font-semibold text-slate-800 text-[11px]">{sarvamTestResult.mode || 'SOVEREIGN_SIMULATION'}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold">Model Version:</span>
                    <p className="font-mono font-semibold text-slate-800 text-[11px]">{sarvamTestResult.model || 'sarvam-105b'}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold">Sovereign Cloud:</span>
                    <p className="font-semibold text-emerald-800 text-[11px]">{sarvamTestResult.cloudRegion || 'India (MeitY Empanelled)'}</p>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold">Health Status:</span>
                    <p className="font-bold text-emerald-700 text-[11px]">{sarvamTestResult.health || 'OPTIMAL'}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Metrics & Architecture Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="flex items-center space-x-2 text-slate-600 mb-2">
                  <Globe className="w-4 h-4 text-blue-600" />
                  <span className="text-xs font-bold uppercase tracking-wider">Indic Language Coverage</span>
                </div>
                <div className="text-2xl font-black text-slate-900 font-mono">
                  {sarvamStatus?.supportedLanguagesCount || 22} <span className="text-xs font-normal text-slate-500">Languages</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Full 8th Schedule Indian languages supported for bilingual legal tenders.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="flex items-center space-x-2 text-slate-600 mb-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span className="text-xs font-bold uppercase tracking-wider">Data Sovereignty & Security</span>
                </div>
                <div className="text-lg font-bold text-emerald-700">
                  MeitY Empanelled Cloud
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Zero data egress outside India. Fully compliant with Digital Personal Data Protection (DPDP) Act.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200/80">
                <div className="flex items-center space-x-2 text-slate-600 mb-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-bold uppercase tracking-wider">Forensic OCR Engine</span>
                </div>
                <div className="text-lg font-bold text-purple-700">
                  Sarvam Indic-105B
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Extracts blurred rubber stamps, CA signatures, national emblems, and bilingual tables.
                </p>
              </div>
            </div>

            {/* Supported Indic Languages Badges */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Supported Constitutionally Recognized Indic Languages
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {(sarvamStatus?.supportedLanguages || []).map((lang: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-blue-50 border border-slate-200 rounded-md text-[11px] font-medium text-slate-700 transition-colors"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Forensic Document Verification Capabilities */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
                Integrated Forensic Verification Modules
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {(sarvamStatus?.ocrCapabilities || []).map((cap: string, idx: number) => (
                  <div key={idx} className="flex items-center space-x-2 p-2.5 bg-slate-50 rounded-lg border border-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="text-slate-700 font-medium">{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. TAB CONTENT: STATUTORY GATEWAYS MASTER DATA */}
      {activeTab === 'GATEWAYS' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Gateway Selector (4 cols) */}
          <div className="lg:col-span-4 space-y-2">
            <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-sm mb-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2 flex items-center justify-between">
                <span>Integrated Statutory Gateways</span>
                <span className="text-[10px] font-mono bg-blue-100 text-blue-800 px-1.5 py-0.5 rounded">
                  {gateways.length} Online
                </span>
              </div>
              <p className="text-[11px] text-slate-500">
                Select a statutory gateway to inspect all master records enrolled in its database:
              </p>
            </div>

            <div className="space-y-1.5 max-h-[600px] overflow-y-auto pr-1">
              {gateways.map((g: any) => {
                const isSelected = g.code === selectedGatewayCode;
                const hasCritical = (g.records || []).some((r: any) => (r.statusBadge || '').includes('CRITICAL'));

                return (
                  <button
                    key={g.code}
                    onClick={() => setSelectedGatewayCode(g.code)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start justify-between gap-2 ${
                      isSelected
                        ? 'bg-[#002B5B] text-white border-[#002B5B] shadow-sm ring-2 ring-blue-500/20'
                        : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                    }`}
                  >
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                          isSelected ? 'bg-blue-800 text-blue-100' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {g.code}
                        </span>
                        {hasCritical && (
                          <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" title="Contains Critical Risk Records"></span>
                        )}
                      </div>
                      <h4 className="text-xs font-bold truncate mt-1 leading-tight">
                        {g.name}
                      </h4>
                      <p className={`text-[10px] truncate mt-0.5 ${isSelected ? 'text-blue-200' : 'text-slate-400'}`}>
                        {g.authority}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-blue-900 text-amber-300' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {g.records?.length || 0} Records
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Gateway Inspector & Records (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {selectedGateway && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Gateway Details Header */}
                <div className="p-5 border-b border-slate-200 bg-slate-50/60">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 text-xs font-mono font-bold bg-[#002B5B] text-white rounded">
                          {selectedGateway.code}
                        </span>
                        <span className="text-xs font-medium text-slate-500">
                          {selectedGateway.authority}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-slate-900 mt-1">
                        {selectedGateway.name}
                      </h3>
                    </div>

                    <a
                      href={selectedGateway.endpoint}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center space-x-1 text-[11px] font-mono text-blue-600 hover:text-blue-800 bg-blue-50 px-2.5 py-1 rounded border border-blue-200/60 self-start shrink-0"
                    >
                      <span>{selectedGateway.endpoint}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {selectedGateway.description}
                  </p>

                  {/* Gateway Search Bar */}
                  <div className="mt-4 relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={gatewaySearchQuery}
                      onChange={e => setGatewaySearchQuery(e.target.value)}
                      placeholder={`Filter records in ${selectedGateway.code} by company, identifier or status...`}
                      className="w-full bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
                    />
                  </div>
                </div>

                {/* Records List / Table */}
                <div className="divide-y divide-slate-100">
                  {filteredRecords.length === 0 ? (
                    <div className="p-8 text-center text-slate-400 text-xs">
                      No records match your search criteria.
                    </div>
                  ) : (
                    filteredRecords.map((rec: any, idx: number) => {
                      const isCritical = (rec.statusBadge || '').includes('CRITICAL');
                      const isWarning = (rec.statusBadge || '').includes('WARNING');
                      const isMatched = (rec.statusBadge || '').includes('MATCHED');

                      return (
                        <div key={idx} className="p-5 hover:bg-slate-50/70 transition-colors space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                            <div>
                              <div className="flex items-center space-x-2">
                                <span className="font-mono text-xs font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded">
                                  {rec.identifier}
                                </span>
                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                                  isCritical ? 'bg-rose-100 text-rose-800 border-rose-300 font-black' :
                                  isWarning ? 'bg-amber-100 text-amber-800 border-amber-300' :
                                  'bg-emerald-100 text-emerald-800 border-emerald-300'
                                }`}>
                                  {rec.status}
                                </span>
                              </div>
                              <h4 className="text-sm font-bold text-slate-900 mt-1">
                                {rec.entityName}
                              </h4>
                            </div>

                            <button
                              onClick={() => {
                                setSandboxGateway(selectedGateway.code);
                                setSandboxIdentifier(rec.identifier);
                                setSandboxEntityName(rec.entityName);
                                setActiveTab('QUERY_SANDBOX');
                              }}
                              className="px-2.5 py-1 bg-slate-100 hover:bg-blue-100 text-blue-700 rounded text-[11px] font-medium transition-colors self-start shrink-0 flex items-center space-x-1"
                            >
                              <span>Test in Sandbox</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Attribute Badges */}
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] bg-slate-50 p-2.5 rounded-lg border border-slate-200/60">
                            {rec.taxpayerType && (
                              <div>
                                <span className="text-slate-400">Type: </span>
                                <span className="font-medium text-slate-700">{rec.taxpayerType}</span>
                              </div>
                            )}
                            {rec.lastReturnFiled && (
                              <div>
                                <span className="text-slate-400">Last Return: </span>
                                <span className="font-medium text-slate-700">{rec.lastReturnFiled}</span>
                              </div>
                            )}
                            {rec.cancellationDate && (
                              <div className="text-rose-700 font-bold">
                                <span className="text-slate-400">Cancelled On: </span>
                                <span>{rec.cancellationDate}</span>
                              </div>
                            )}
                            {rec.incorporationDate && (
                              <div>
                                <span className="text-slate-400">Inc. Date: </span>
                                <span className="font-medium text-slate-700">{rec.incorporationDate}</span>
                              </div>
                            )}
                            {rec.authorizedCapital && (
                              <div>
                                <span className="text-slate-400">Auth Capital: </span>
                                <span className="font-medium text-slate-700">{rec.authorizedCapital}</span>
                              </div>
                            )}
                            {rec.category && (
                              <div>
                                <span className="text-slate-400">Category: </span>
                                <span className="font-semibold text-emerald-700">{rec.category}</span>
                              </div>
                            )}
                            {rec.itrFilingAy && (
                              <div>
                                <span className="text-slate-400">ITR AY: </span>
                                <span className="font-medium text-slate-700">{rec.itrFilingAy}</span>
                              </div>
                            )}
                            {rec.validUntil && (
                              <div>
                                <span className="text-slate-400">Validity: </span>
                                <span className={`font-semibold ${rec.validUntil.includes('EXPIRED') ? 'text-rose-600' : 'text-slate-700'}`}>
                                  {rec.validUntil}
                                </span>
                              </div>
                            )}
                            {rec.avgTurnover && (
                              <div>
                                <span className="text-slate-400">Avg Turnover: </span>
                                <span className="font-bold text-slate-800">{rec.avgTurnover}</span>
                              </div>
                            )}
                            {rec.netWorth && (
                              <div>
                                <span className="text-slate-400">Net Worth: </span>
                                <span className={`font-bold ${rec.netWorth.includes('NEGATIVE') ? 'text-rose-600' : 'text-emerald-700'}`}>
                                  {rec.netWorth}
                                </span>
                              </div>
                            )}
                            {rec.localContentPercent && (
                              <div>
                                <span className="text-slate-400">Local Content: </span>
                                <span className={`font-bold ${rec.localContentPercent === '18%' ? 'text-rose-600' : 'text-emerald-700'}`}>
                                  {rec.localContentPercent} ({rec.classification})
                                </span>
                              </div>
                            )}
                            {rec.orderNumber && (
                              <div className="text-rose-700 font-bold">
                                <span className="text-slate-400">Debarment Order: </span>
                                <span>{rec.orderNumber}</span>
                              </div>
                            )}
                          </div>

                          {/* Notes / Red Flag Explanation */}
                          {rec.notes && (
                            <div className={`p-2.5 rounded-lg text-xs flex items-start space-x-2 ${
                              isCritical ? 'bg-rose-50 text-rose-800 border border-rose-200' :
                              isWarning ? 'bg-amber-50 text-amber-800 border border-amber-200' :
                              'bg-slate-50 text-slate-600 border border-slate-200/60'
                            }`}>
                              {isCritical ? (
                                <XCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                              ) : isWarning ? (
                                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              ) : (
                                <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                              )}
                              <p className="leading-relaxed">
                                <strong className="font-semibold">Statutory Assessment: </strong>
                                {rec.notes}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 4. TAB CONTENT: HACKATHON MOCK SUBMISSIONS DATASET */}
      {activeTab === 'SUBMISSIONS_DATASET' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center space-x-2">
              <FileCode className="w-5 h-5 text-blue-600" />
              <h3 className="text-base font-bold text-slate-900">
                Hackathon Synthetic Mock Submissions Dataset (v2.0.0)
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Source file: <span className="font-mono text-slate-700">src/data/hackathonMockSubmissions.json</span> • Loaded into server memory
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {registryData?.datasetSummary?.bidders?.map((bidder: any) => (
              <div key={bidder.bidderId} className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                    {bidder.bidderId}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-500">
                    {bidder.documentCount} Docs
                  </span>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-2">
                    {bidder.legalName}
                  </h4>
                  <p className="text-[11px] text-slate-500 mt-1">
                    Tender: <strong className="font-mono text-slate-700">{bidder.tenderId}</strong>
                  </p>
                  <p className="text-[10px] text-slate-400 truncate mt-0.5">
                    {bidder.tenderTitle}
                  </p>
                </div>

                <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                  <a
                    href={`/api/mock-submissions/${bidder.bidderId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center space-x-1"
                  >
                    <span>View Raw JSON</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-200 text-xs text-blue-900 space-y-2">
            <h4 className="font-bold flex items-center space-x-1.5">
              <Info className="w-4 h-4 text-blue-700" />
              <span>Available REST Endpoints for External Tools & Evaluators:</span>
            </h4>
            <div className="space-y-1 font-mono text-[11px]">
              <div>• GET <code className="bg-blue-100 px-1.5 py-0.5 rounded text-blue-800">/api/mock-submissions</code> — Returns complete dataset with all 4 bidders</div>
              <div>• GET <code className="bg-blue-100 px-1.5 py-0.5 rounded text-blue-800">/api/mock-submissions/:bidderId</code> — Returns specific bidder submission</div>
              <div>• GET <code className="bg-blue-100 px-1.5 py-0.5 rounded text-blue-800">/api/mock-submissions/:bidderId/documents/:docId</code> — Returns specific document fields</div>
            </div>
          </div>
        </div>
      )}

      {/* 5. TAB CONTENT: LIVE GATEWAY QUERY SANDBOX */}
      {activeTab === 'QUERY_SANDBOX' && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <div className="flex items-center space-x-2">
              <Terminal className="w-5 h-5 text-indigo-600" />
              <h3 className="text-base font-bold text-slate-900">
                Procurement Officer Live Gateway Query Sandbox
              </h3>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Simulate an official departmental gateway query in real-time to inspect the verification response that the rule engine receives.
            </p>
          </div>

          {/* Quick Presets */}
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 block">
              1-Click Inspection Presets:
            </span>
            <div className="flex flex-wrap gap-2 text-xs">
              <button
                onClick={() => {
                  setSandboxGateway('GSTN');
                  setSandboxIdentifier('07AACCA1001A1Z0');
                  setSandboxEntityName('Acme Technology Solutions Private Limited');
                }}
                className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded hover:bg-emerald-100 transition-colors font-medium"
              >
                Acme Active GSTN (Clean)
              </button>
              <button
                onClick={() => {
                  setSandboxGateway('GSTN');
                  setSandboxIdentifier('29AACCG3003C1Z2');
                  setSandboxEntityName('Gamma Infrastructure Projects Private Limited');
                }}
                className="px-2.5 py-1 bg-rose-50 text-rose-800 border border-rose-200 rounded hover:bg-rose-100 transition-colors font-bold"
              >
                Gamma CANCELLED GSTN
              </button>
              <button
                onClick={() => {
                  setSandboxGateway('CCA_DSC');
                  setSandboxIdentifier('Dev Malhotra');
                  setSandboxEntityName('Gamma Infrastructure Projects Private Limited');
                }}
                className="px-2.5 py-1 bg-rose-50 text-rose-800 border border-rose-200 rounded hover:bg-rose-100 transition-colors font-bold"
              >
                Gamma EXPIRED DSC
              </button>
              <button
                onClick={() => {
                  setSandboxGateway('ICAI_UDIN');
                  setSandboxIdentifier('26303003CCCCCC3003');
                  setSandboxEntityName('Gamma Infrastructure Projects Private Limited');
                }}
                className="px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded hover:bg-amber-100 transition-colors font-bold"
              >
                Gamma Negative Net Worth UDIN
              </button>
              <button
                onClick={() => {
                  setSandboxGateway('CPPP_DEBARMENT');
                  setSandboxIdentifier('Gamma Infrastructure Projects Private Limited');
                  setSandboxEntityName('Gamma Infrastructure Projects Private Limited');
                }}
                className="px-2.5 py-1 bg-rose-50 text-rose-800 border border-rose-200 rounded hover:bg-rose-100 transition-colors font-bold"
              >
                Gamma CPPP Blacklist Check
              </button>
              <button
                onClick={() => {
                  setSandboxGateway('BIS_REGISTRY');
                  setSandboxIdentifier('BIS-DEMO-DELTA-4004');
                  setSandboxEntityName('Delta MedDevices Private Limited');
                }}
                className="px-2.5 py-1 bg-blue-50 text-blue-800 border border-blue-200 rounded hover:bg-blue-100 transition-colors font-medium"
              >
                Delta BIS Patient Monitor
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Department Gateway:
              </label>
              <select
                value={sandboxGateway}
                onChange={e => setSandboxGateway(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-semibold text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              >
                {gateways.map((g: any) => (
                  <option key={g.code} value={g.code}>
                    {g.code} — {g.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Identifier to Query (GSTIN, CIN, UDIN, PAN):
              </label>
              <input
                type="text"
                value={sandboxIdentifier}
                onChange={e => setSandboxIdentifier(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs font-mono font-medium text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Entity Legal Name:
              </label>
              <input
                type="text"
                value={sandboxEntityName}
                onChange={e => setSandboxEntityName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-800 focus:ring-2 focus:ring-blue-600 focus:outline-hidden"
              />
            </div>
          </div>

          <button
            onClick={handleExecuteSandboxQuery}
            disabled={sandboxLoading}
            className="px-5 py-2.5 bg-[#002B5B] hover:bg-[#003875] text-white rounded-lg text-xs font-bold shadow-sm flex items-center space-x-2 transition-all disabled:opacity-50"
          >
            <Activity className={`w-4 h-4 ${sandboxLoading ? 'animate-spin' : ''}`} />
            <span>{sandboxLoading ? 'Querying Statutory Gateway...' : 'Execute Statutory Gateway Query'}</span>
          </button>

          {/* Response Output */}
          {sandboxResponse && (
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Live Gateway Response Payload:
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  sandboxResponse.status === 'MATCHED' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' :
                  sandboxResponse.status === 'SUSPENDED' || sandboxResponse.status === 'DEBARRED' ? 'bg-rose-100 text-rose-800 border-rose-300' :
                  'bg-amber-100 text-amber-800 border-amber-300'
                }`}>
                  Status: {sandboxResponse.status}
                </span>
              </div>

              <pre className="p-4 bg-slate-900 text-emerald-400 rounded-xl text-[11px] font-mono overflow-x-auto max-h-96 border border-slate-800">
                {JSON.stringify(sandboxResponse, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
