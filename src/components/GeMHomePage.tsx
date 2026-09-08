import React, { useState } from 'react';
import { 
  Tender, 
  AuthUser, 
  UserRole 
} from '../types';
import { DEMO_OFFICER_USER, DEMO_BIDDER_USERS } from '../data/mockUsers';
import { 
  ShieldCheck, 
  Building2, 
  Search, 
  Lock, 
  Mail, 
  User, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  AlertTriangle, 
  ArrowRight, 
  Globe, 
  Shield, 
  ExternalLink, 
  HelpCircle, 
  Phone, 
  FileText, 
  Award, 
  TrendingUp, 
  Sparkles, 
  X, 
  ChevronRight, 
  Landmark, 
  Briefcase, 
  Users, 
  Check, 
  Info, 
  FileCheck2, 
  Scale,
  Calendar,
  Clock,
  Layers
} from 'lucide-react';

interface GeMHomePageProps {
  tenders: Tender[];
  currentUser: AuthUser | null;
  onLogin: (user: AuthUser) => void;
  onLogout: () => void;
  onNavigateToWorkspace: (role: UserRole, targetTenderId?: string) => void;
  language: 'EN' | 'HI';
  onToggleLanguage: () => void;
  magnification: number;
  onIncreaseMagnification: () => void;
  onDecreaseMagnification: () => void;
  onResetMagnification: () => void;
}

export const GeMHomePage: React.FC<GeMHomePageProps> = ({
  tenders,
  currentUser,
  onLogin,
  onLogout,
  onNavigateToWorkspace,
  language,
  onToggleLanguage,
  magnification,
  onIncreaseMagnification,
  onDecreaseMagnification,
  onResetMagnification,
}) => {
  // Login Modal State
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeLoginTab, setActiveLoginTab] = useState<UserRole>('PROCUREMENT_OFFICER');
  
  // Login Form States
  const [username, setUsername] = useState('arvind.rao@gem.gov.in');
  const [password, setPassword] = useState('GovGem@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [captchaCode, setCaptchaCode] = useState('8P3K');
  const [captchaInput, setCaptchaInput] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Top header search
  const [headerSearchQuery, setHeaderSearchQuery] = useState('');
  const [headerSearchScope, setHeaderSearchScope] = useState<'ALL' | 'BIDS' | 'PRODUCTS' | 'SERVICES'>('BIDS');

  // Generate a new 4-char alphanumeric captcha
  const refreshCaptcha = (prefill = true) => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
    setCaptchaInput(prefill ? result : '');
    setLoginError(null);
  };

  // Open Login Modal with specific role selected
  const openLogin = (role: UserRole) => {
    setActiveLoginTab(role);
    setLoginError(null);
    if (role === 'PROCUREMENT_OFFICER') {
      setUsername('arvind.rao@gem.gov.in');
      setPassword('GovGem@2026');
    } else {
      setUsername('tenders@himalayanagro.in');
      setPassword('Bidder@2026');
    }
    refreshCaptcha(true);
    setIsLoginModalOpen(true);
  };

  // Switch tabs inside modal
  const handleSwitchLoginTab = (role: UserRole) => {
    setActiveLoginTab(role);
    setLoginError(null);
    if (role === 'PROCUREMENT_OFFICER') {
      setUsername('arvind.rao@gem.gov.in');
      setPassword('GovGem@2026');
    } else {
      setUsername('tenders@himalayanagro.in');
      setPassword('Bidder@2026');
    }
    refreshCaptcha(true);
  };

  // Form Submit Handler
  const handleFormLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);

    if (!username.trim() || !password.trim()) {
      setLoginError(
        language === 'HI' 
          ? 'कृपया उपयोगकर्ता आईडी और पासवर्ड दर्ज करें।' 
          : 'Please enter both User ID / Email and Password.'
      );
      return;
    }

    if (captchaInput.trim().toUpperCase() !== captchaCode) {
      setLoginError(
        language === 'HI'
          ? 'अमान्य सुरक्षा कोड (कैप्चा)। कृपया पुनः प्रयास करें।'
          : 'Security Captcha does not match. Please verify and retry.'
      );
      refreshCaptcha();
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      if (activeLoginTab === 'PROCUREMENT_OFFICER') {
        const officerUser: AuthUser = {
          ...DEMO_OFFICER_USER,
          email: username.includes('@') ? username : `${username}@gem.gov.in`,
          lastLogin: new Date().toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }) + ' IST',
        };
        onLogin(officerUser);
      } else {
        const matchedBidder = DEMO_BIDDER_USERS.find(b => 
          b.email.toLowerCase() === username.trim().toLowerCase() ||
          b.identifierNumber.toLowerCase() === username.trim().toLowerCase()
        ) || DEMO_BIDDER_USERS[0];

        const bidderUser: AuthUser = {
          ...matchedBidder,
          email: username.includes('@') ? username : matchedBidder.email,
          lastLogin: new Date().toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }) + ' IST',
        };
        onLogin(bidderUser);
      }
      setIsSubmitting(false);
      setIsLoginModalOpen(false);
    }, 450);
  };

  return (
    <div 
      className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans"
      style={{ zoom: `${magnification}%` }}
    >
      {/* 1. Official National Tricolor Strip */}
      <div className="w-full h-1 flex">
        <div className="w-1/3 bg-[#FF9933]"></div>
        <div className="w-1/3 bg-white"></div>
        <div className="w-1/3 bg-[#138808]"></div>
      </div>

      {/* 2. Top Accessibility & Government Identification Ribbon */}
      <div className="bg-[#001D3D] text-slate-200 px-4 sm:px-6 py-1.5 text-xs flex flex-wrap justify-between items-center border-b border-blue-950">
        <div className="flex items-center space-x-3">
          <span className="font-semibold text-white tracking-wide text-[11px]">
            {language === 'HI' ? 'भारत सरकार' : 'GOVERNMENT OF INDIA'}
          </span>
          <span className="text-blue-400/60">|</span>
          <span className="text-blue-200 text-[11px] hidden sm:inline">
            {language === 'HI' ? 'वाणिज्य एवं उद्योग मंत्रालय' : 'Ministry of Commerce and Industry'}
          </span>
          <span className="text-blue-400/60 hidden md:inline">|</span>
          <span className="text-blue-300/80 text-[10px] hidden md:inline">
            {language === 'HI' ? 'सार्वजनिक खरीद पोर्टल' : 'Public Procurement Portal'}
          </span>
        </div>

        <div className="flex items-center space-x-3 text-[11px]">
          {/* Helpdesk Toll Free Phone */}
          <div className="hidden lg:flex items-center space-x-1.5 text-blue-200/90 pr-2 border-r border-blue-800/60">
            <Phone className="w-3 h-3 text-[#F27D26]" />
            <span>Toll-Free: <strong className="text-white font-mono">1800-419-3436</strong></span>
          </div>

          {/* Font Magnification (A-, A, A+) */}
          <div className="flex items-center space-x-1 border border-blue-800/60 rounded px-1.5 py-0.5 bg-[#002B5B]">
            <button
              id="gem-font-decrease"
              onClick={onDecreaseMagnification}
              className="px-1.5 py-0.5 rounded text-blue-200 hover:text-white font-semibold transition-colors"
              title="Decrease Font Size (A-)"
            >
              A-
            </button>
            <button
              id="gem-font-reset"
              onClick={onResetMagnification}
              className={`px-1.5 py-0.5 rounded font-semibold transition-colors ${
                magnification === 100 ? 'text-[#F27D26] font-bold' : 'text-blue-200 hover:text-white'
              }`}
              title="Reset Font Size (A)"
            >
              A
            </button>
            <button
              id="gem-font-increase"
              onClick={onIncreaseMagnification}
              className="px-1.5 py-0.5 rounded text-blue-200 hover:text-white font-semibold transition-colors"
              title="Increase Font Size (A+)"
            >
              A+
            </button>
          </div>

          {/* Language Switcher */}
          <button
            id="gem-lang-toggle"
            onClick={onToggleLanguage}
            className="flex items-center space-x-1 px-2 py-0.5 rounded bg-[#002B5B] hover:bg-blue-900 text-blue-100 border border-blue-800/60 transition-colors"
          >
            <Globe className="w-3 h-3 text-[#F27D26]" />
            <span className="font-semibold">{language === 'HI' ? 'English' : 'हिंदी'}</span>
          </button>
        </div>
      </div>

      {/* 3. Main GeM Brand & Navigation Header with Direct Dual Logins */}
      <header className="bg-white border-b border-slate-200 shadow-xs sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left: GeM Logo & Portal Identity */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#002B5B] tracking-tight flex items-center">
                  GeM
                </span>
              </div>
              <p className="text-[11px] font-bold text-slate-700 uppercase tracking-wide">
                {language === 'HI' ? 'गवर्नमेंट ई-मार्केटप्लेस' : 'Government e-Marketplace'}
              </p>
              <p className="text-[10px] text-slate-500 hidden sm:block">
                {language === 'HI' 
                  ? 'दक्ष • पारदर्शी • समावेशी सार्वजनिक खरीद' 
                  : 'Efficient • Transparent • Inclusive Public Procurement'}
              </p>
            </div>
          </div>

          {/* Middle: Integrated Search Bar (Products, Services, Tenders) */}
          <div className="w-full md:w-auto md:flex-1 md:max-w-md lg:max-w-lg">
            <div className="flex rounded-lg border border-slate-300 shadow-2xs overflow-hidden focus-within:ring-2 focus-within:ring-[#002B5B] focus-within:border-transparent bg-white">
              <select
                aria-label="Search scope"
                value={headerSearchScope}
                onChange={e => setHeaderSearchScope(e.target.value as any)}
                className="bg-slate-50 text-[11px] text-slate-700 px-2.5 py-2 border-r border-slate-200 outline-none font-medium cursor-pointer"
              >
                <option value="BIDS">Bids / Tenders</option>
                <option value="PRODUCTS">Products</option>
                <option value="SERVICES">Services</option>
                <option value="ALL">All Categories</option>
              </select>
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder={
                    language === 'HI'
                      ? 'बोली संख्या, उत्पाद, श्रेणी या मंत्रालय खोजें...'
                      : 'Search Bids (e.g. GEM/2026/B...), Uniforms, Solar, Machineries...'
                  }
                  value={headerSearchQuery}
                  onChange={e => setHeaderSearchQuery(e.target.value)}
                  className="w-full text-xs text-slate-900 px-3 py-2 outline-none placeholder:text-slate-400"
                />
              </div>
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('gem-statutory-engine-section');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="bg-[#002B5B] hover:bg-blue-900 text-white px-3.5 flex items-center justify-center transition-colors"
                title="Search"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: The Two Primary Logins (Officer & Bidder) */}
          <div className="flex items-center space-x-2.5 shrink-0">
            {currentUser ? (
              /* If already logged in, show user badge + quick access to workspace */
              <div className="flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-lg p-1.5 pr-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ${
                  currentUser.role === 'PROCUREMENT_OFFICER' ? 'bg-[#002B5B]' : 'bg-emerald-700'
                }`}>
                  {currentUser.avatarInitials}
                </div>
                <div className="text-left">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-xs font-bold text-slate-800 truncate max-w-[130px]">
                      {currentUser.name}
                    </span>
                    <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-white text-blue-900 border border-blue-200">
                      {currentUser.role === 'PROCUREMENT_OFFICER' ? 'Officer' : 'Bidder'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 mt-0.5">
                    <button
                      onClick={() => onNavigateToWorkspace(currentUser.role)}
                      className="text-[10px] font-bold text-[#F27D26] hover:underline flex items-center"
                    >
                      {currentUser.role === 'PROCUREMENT_OFFICER' ? 'Open Dashboard' : 'Open Workspace'}
                      <ChevronRight className="w-2.5 h-2.5 ml-0.5" />
                    </button>
                    <span className="text-slate-300">|</span>
                    <button
                      onClick={onLogout}
                      className="text-[10px] text-rose-600 hover:text-rose-800 font-medium"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* When not logged in: Two Dedicated Buttons for Officer and Bidder */
              <div className="flex items-center space-x-2">
                {/* 1. Procurement Officer Login Button */}
                <button
                  id="officer-header-login-btn"
                  onClick={() => openLogin('PROCUREMENT_OFFICER')}
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-[#002B5B] hover:bg-[#001D3D] text-white text-xs font-bold shadow-xs transition-all border border-blue-900 group"
                  title="Procurement Officer (Buyer) Login"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>{language === 'HI' ? 'अधिकारी लॉगिन' : 'Officer Login'}</span>
                </button>

                {/* 2. Registered Bidder Login Button */}
                <button
                  id="bidder-header-login-btn"
                  onClick={() => openLogin('BIDDER')}
                  className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-[#F27D26] hover:bg-[#d96716] text-white text-xs font-bold shadow-xs transition-all group"
                  title="Registered Bidder (Seller) Login"
                >
                  <Building2 className="w-3.5 h-3.5 text-white group-hover:scale-110 transition-transform" />
                  <span>{language === 'HI' ? 'बोलीदाता लॉगिन' : 'Bidder Login'}</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 4. Primary Navy Navigation Ribbon */}
        <nav className="bg-[#002B5B] text-white text-xs border-t border-blue-900/60 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between overflow-x-auto scrollbar-none py-2 gap-4">
            <div className="flex items-center space-x-1 sm:space-x-4 shrink-0 font-medium text-blue-100">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-2.5 py-1 rounded hover:bg-blue-900 text-white font-bold transition-colors flex items-center space-x-1"
              >
                <span>🏛️</span>
                <span>{language === 'HI' ? 'होम पोर्टल' : 'Home'}</span>
              </button>

              <button 
                onClick={() => {
                  const el = document.getElementById('gem-statutory-engine-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-2.5 py-1 rounded hover:bg-blue-900 text-blue-100 hover:text-white transition-colors flex items-center space-x-1"
              >
                <span>⚖️</span>
                <span>{language === 'HI' ? 'वैधानिक अनुपालन इंजन' : 'Statutory Compliance'}</span>
              </button>

              <button 
                onClick={() => {
                  const el = document.getElementById('gem-initiatives-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-2.5 py-1 rounded hover:bg-blue-900 text-blue-100 hover:text-white transition-colors flex items-center space-x-1"
              >
                <span>🌟</span>
                <span>{language === 'HI' ? 'विशेष पहल (MSME / ODOP)' : 'Special Initiatives'}</span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* 5. HERO SECTION: GeM Official Showcase & The Two Integrated Login Cards */}
      <section className="relative bg-gradient-to-b from-[#002B5B] via-[#003B7A] to-[#002B5B] text-white py-10 sm:py-14 border-b-4 border-[#F27D26] overflow-hidden">
        {/* Background Subtle Watermark & Grid Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
          <span className="text-[320px] font-black tracking-tighter select-none">GeM</span>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center">
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-snug">
            {language === 'HI' ? (
              <>
                राष्ट्रीय सार्वजनिक खरीद पोर्टल <br />
                <span className="text-[#F27D26]">वैधानिक अनुपालन एवं पात्रता सत्यापन मंच</span>
              </>
            ) : (
              <>
                National Public Procurement Portal <br />
                <span className="text-[#F27D26]">Statutory Compliance & Eligibility Verification Gateway</span>
              </>
            )}
          </h1>

          <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mt-4">
            {language === 'HI'
              ? 'गवर्नमेंट ई-मार्केटप्लेस (GeM) केंद्र और राज्य मंत्रालयों, सशस्त्र बलों एवं सीपीएसई के लिए स्वचालित वैधानिक सत्यापन, उद्यम, जीएसटीएन, पैन और सीबीपीपी एकीकृत सुरक्षा प्रदान करता है।'
              : 'An integrated public procurement gateway connecting Government Buyer Entities with Registered Sellers. Featuring automated GSTR-3B tax return audits, MSME Udyam classification, Make-in-India preference scoring, and cryptographic non-repudiation.'}
          </p>

          {/* Key Trust Pillars strip */}
          <div className="mt-8 pt-6 border-t border-blue-800/40 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs text-blue-100">
            <div className="bg-blue-900/40 border border-blue-700/40 rounded-lg p-2.5 flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>GSTN & CBDT Sync</span>
            </div>
            <div className="bg-blue-900/40 border border-blue-700/40 rounded-lg p-2.5 flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>MSME 25% Exemption</span>
            </div>
            <div className="bg-blue-900/40 border border-blue-700/40 rounded-lg p-2.5 flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>CPPP Debarment Screen</span>
            </div>
            <div className="bg-blue-900/40 border border-blue-700/40 rounded-lg p-2.5 flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Cryptographic Audit</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. STATUTORY VERIFICATION PILLARS (Why GeM GFR Compliance) */}
      <section id="gem-statutory-engine-section" className="py-12 bg-white border-t border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center space-x-1.5 text-xs font-bold text-[#F27D26] uppercase tracking-wider mb-2">
              <Scale className="w-4 h-4" />
              <span>GFR 2017 & Legal Integrity Framework</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#002B5B] tracking-tight">
              Integrated Multi-Portal Statutory Compliance Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              GeM directly communicates with statutory national databases in real-time, eliminating forged documentation, default tax records, shell contractors, and arbitrary disqualifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-[#002B5B] flex items-center justify-center mb-3">
                <FileCheck2 className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">GSTN Real-Time Return Sync</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Direct validation of 15-digit GSTIN active status and latest quarterly GSTR-3B filings to verify tax compliance before bid submission.
              </p>
              <div className="mt-3 text-[10px] font-mono text-blue-800 bg-blue-50 px-2 py-1 rounded inline-block">
                CBIC / GSTN Network
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">MSME Udyam Gateway</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automated 5-digit NIC code validation ensuring genuine Micro and Small Enterprises receive mandatory 25% procurement preference and EMD waivers.
              </p>
              <div className="mt-3 text-[10px] font-mono text-emerald-800 bg-emerald-50 px-2 py-1 rounded inline-block">
                Ministry of MSME
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-[#b3530e] flex items-center justify-center mb-3">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">CPPP Debarment Screening</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Immediate cross-screening against the Central Public Procurement Portal blacklist database to instantly prevent blacklisted contractors from bidding.
              </p>
              <div className="mt-3 text-[10px] font-mono text-amber-800 bg-amber-50 px-2 py-1 rounded inline-block">
                CPPP / Ministry of Finance
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center mb-3">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Sarvam AI Indic OCR & Gemini</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Optical character recognition capable of reading scanned Hindi and English certificates, affidavits, and notary seals with forensic discrepancy flagging.
              </p>
              <div className="mt-3 text-[10px] font-mono text-purple-800 bg-purple-50 px-2 py-1 rounded inline-block">
                AI Document Engine
              </div>
            </div>

            {/* Pillar 5 */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-lg bg-sky-100 text-sky-800 flex items-center justify-center mb-3">
                <Landmark className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">MCA-21 & ROC Company Registry</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Verification of Corporate Identification Number (CIN), active directors, paid-up capital, and corporate standing directly from Ministry of Corporate Affairs.
              </p>
              <div className="mt-3 text-[10px] font-mono text-sky-800 bg-sky-50 px-2 py-1 rounded inline-block">
                Ministry of Corporate Affairs
              </div>
            </div>

            {/* Pillar 6 */}
            <div className="bg-slate-50 rounded-xl p-5 border border-slate-200 hover:border-blue-300 transition-all">
              <div className="w-10 h-10 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center mb-3">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 mb-1">Cryptographic Audit Trail</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Every document upload, officer evaluation remark, and statutory check produces an immutable SHA-256 hash log adhering to GFR 2017 accountability norms.
              </p>
              <div className="mt-3 text-[10px] font-mono text-rose-800 bg-rose-50 px-2 py-1 rounded inline-block">
                IT Act 2000 Stamping
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 9. SPECIAL INITIATIVES (Womaniya, Startup India, ODOP, GeM Sahay) */}
      <section id="gem-initiatives-section" className="py-10 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {language === 'HI' ? 'GeM विशेष समावेशी पहल' : 'GeM Inclusivity & Empowerment Initiatives'}
              </h2>
              <p className="text-xs text-slate-500">
                Empowering marginalized, women-led, and startup enterprises in the national procurement mainstream.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow">
              <span className="text-2xl">👩‍💼</span>
              <h4 className="text-xs font-bold text-slate-900 mt-2">Womaniya on GeM</h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                Dedicated category for women entrepreneurs and Self-Help Groups (SHGs) with zero listing fees.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow">
              <span className="text-2xl">🚀</span>
              <h4 className="text-xs font-bold text-slate-900 mt-2">Startup Runway</h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                Exemption on prior turnover and past experience for DPIIT recognized startups bidding on tenders.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow">
              <span className="text-2xl">🏺</span>
              <h4 className="text-xs font-bold text-slate-900 mt-2">One District One Product (ODOP)</h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                Direct government procurement of regional artisanal crafts, handlooms, and indigenous agriculture.
              </p>
            </div>

            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs hover:shadow-xs transition-shadow">
              <span className="text-2xl">💳</span>
              <h4 className="text-xs font-bold text-slate-900 mt-2">GeM Sahay 2.0</h4>
              <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                Instant digital, collateral-free purchase order financing for MSE sellers within 10 minutes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. OFFICIAL GOVERNMENT FOOTER */}
      <footer className="w-full bg-[#001D3D] text-slate-300 border-t-2 border-[#F27D26] text-xs">
        {/* Tricolor Ribbon */}
        <div className="w-full h-1 flex">
          <div className="w-1/3 bg-[#FF9933]"></div>
          <div className="w-1/3 bg-white"></div>
          <div className="w-1/3 bg-[#138808]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 text-[11px]">
            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F27D26]"></span>
                <span>About GeM Portal</span>
              </h4>
              <p className="text-slate-400 leading-relaxed">
                Government e-Marketplace (GeM) is a one-stop National Public Procurement Portal facilitating end-to-end procurement of common use Goods & Services required by various Central and State Government Ministries / Departments / CPSEs.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F27D26]"></span>
                <span>Dual Role Workspaces</span>
              </h4>
              <ul className="space-y-1.5 text-slate-400">
                <li>
                  <button 
                    onClick={() => openLogin('PROCUREMENT_OFFICER')}
                    className="text-amber-300 hover:underline flex items-center space-x-1"
                  >
                    <span>• Procurement Officer Login (Buyers)</span>
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => openLogin('BIDDER')}
                    className="text-amber-300 hover:underline flex items-center space-x-1"
                  >
                    <span>• Registered Bidder Login (Sellers)</span>
                  </button>
                </li>
                <li>• General Financial Rules (GFR) 2017 Compliance</li>
                <li>• Rule 149 Mandatory Public Procurement</li>
                <li>• Public Procurement (Preference to Make in India) Order</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F27D26]"></span>
                <span>Helpline & Technical Support</span>
              </h4>
              <p className="text-slate-400">Toll-Free National Numbers:</p>
              <p className="font-mono text-[#F27D26] font-bold mt-1 text-xs">
                1800-419-3436 / 1800-102-3436
              </p>
              <p className="text-slate-400 text-[10px] mt-1">
                Mon - Sat: 9:00 AM – 8:00 PM IST
              </p>
              <p className="text-slate-400 mt-1">
                Helpdesk Email: <span className="text-blue-200">helpdesk-gem@gov.in</span>
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Security & Certification</span>
              </h4>
              <div className="flex items-center space-x-2 text-emerald-400 font-semibold mb-2">
                <Shield className="w-4 h-4" />
                <span>STQC Certified • ISO 27001</span>
              </div>
              <p className="text-slate-400 text-[10px] leading-relaxed">
                Hosted at National Data Centre. All transactions digitally signed with non-repudiation under IT Act 2000.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-blue-900/60 flex flex-col sm:flex-row justify-between items-center gap-2 text-slate-400 text-[10px]">
            <div>
              © 2026 Government e-Marketplace (GeM) • Ministry of Commerce & Industry, Government of India
            </div>
            <div>
              Designed & Developed by National Informatics Centre (NIC) | GeM SPV Version 4.8.2
            </div>
          </div>
        </div>
      </footer>

      {/* 11. INTERACTIVE LOGIN DIALOG / MODAL (SUPPORTING BOTH OFFICER & BIDDER) */}
      {isLoginModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsLoginModalOpen(false);
          }}
        >
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Top Tricolor Strip */}
            <div className="w-full h-1 flex">
              <div className="w-1/3 bg-[#FF9933]"></div>
              <div className="w-1/3 bg-white"></div>
              <div className="w-1/3 bg-[#138808]"></div>
            </div>

            {/* Modal Header */}
            <div className="bg-[#002B5B] text-white p-4 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-8 h-8 bg-white text-[#002B5B] rounded flex items-center justify-center text-sm font-bold">
                  🏛️
                </div>
                <div>
                  <h3 className="text-sm font-bold tracking-tight">
                    {language === 'HI' ? 'GeM सुरक्षित लॉगिन पोर्टल' : 'GeM Secure Unified Login'}
                  </h3>
                  <p className="text-[10px] text-blue-200">
                    Government e-Marketplace • Single Sign-On Gateway
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsLoginModalOpen(false)}
                className="text-blue-200 hover:text-white p-1 rounded hover:bg-blue-900 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Role Tabs (Procurement Officer vs Registered Bidder) */}
            <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50">
              <button
                type="button"
                onClick={() => handleSwitchLoginTab('PROCUREMENT_OFFICER')}
                className={`py-3 text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors border-b-2 ${
                  activeLoginTab === 'PROCUREMENT_OFFICER'
                    ? 'border-[#002B5B] text-[#002B5B] bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-[#002B5B]" />
                <span>{language === 'HI' ? 'प्रोक्योरमेंट ऑफिसर' : 'Procurement Officer'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleSwitchLoginTab('BIDDER')}
                className={`py-3 text-xs font-bold flex items-center justify-center space-x-1.5 transition-colors border-b-2 ${
                  activeLoginTab === 'BIDDER'
                    ? 'border-[#F27D26] text-[#F27D26] bg-white'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Building2 className="w-4 h-4 text-[#F27D26]" />
                <span>{language === 'HI' ? 'पंजीकृत बोलीदाता' : 'Registered Bidder'}</span>
              </button>
            </div>

            {/* Login Form Body */}
            <div className="p-5">
              {/* Error Message */}
              {loginError && (
                <div className="mb-4 p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{loginError}</span>
                </div>
              )}

              {/* Form */}
              <form id="gem-login-modal-form" onSubmit={handleFormLoginSubmit} className="space-y-3.5">
                {/* Username / Email */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {activeLoginTab === 'PROCUREMENT_OFFICER' 
                      ? 'Officer User ID / Govt Email (@gem.gov.in)' 
                      : 'Registered Bidder Email / Vendor ID'}
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      placeholder={activeLoginTab === 'PROCUREMENT_OFFICER' ? 'arvind.rao@gem.gov.in' : 'tenders@himalayanagro.in'}
                      className="w-full text-xs text-slate-900 pl-8 pr-3 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-[#002B5B]"
                      required
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'HI' ? 'पासवर्ड' : 'Password'}
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full text-xs text-slate-900 pl-8 pr-9 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-[#002B5B]"
                      required
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute left-2.5 top-2.5" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Alphanumeric Security Captcha */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Security Code (CAPTCHA)
                  </label>
                  <div className="flex items-center space-x-2">
                    <div className="bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 font-mono font-bold tracking-widest text-base text-[#002B5B] select-none shadow-inner">
                      {captchaCode}
                    </div>
                    <button
                      type="button"
                      onClick={refreshCaptcha}
                      className="p-2 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition-colors"
                      title="Refresh Captcha"
                    >
                      <RefreshCw className="w-4 h-4" />
                    </button>
                    <input
                      id="home-modal-captcha-input"
                      type="text"
                      maxLength={4}
                      value={captchaInput}
                      onChange={e => setCaptchaInput(e.target.value.toUpperCase())}
                      placeholder="Enter code"
                      className="flex-1 text-xs text-slate-900 px-3 py-2 border border-slate-300 rounded-lg outline-none font-mono uppercase focus:ring-2 focus:ring-[#002B5B]"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  id="gem-login-submit-btn"
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-2.5 px-4 text-white text-xs font-bold rounded-lg shadow-sm flex items-center justify-center space-x-1.5 transition-all mt-4 ${
                    activeLoginTab === 'PROCUREMENT_OFFICER'
                      ? 'bg-[#002B5B] hover:bg-[#001D3D]'
                      : 'bg-[#F27D26] hover:bg-[#d96716]'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>Authenticating Credentials...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" />
                      <span>
                        {activeLoginTab === 'PROCUREMENT_OFFICER'
                          ? 'Sign In as Officer (Chief Procurement)'
                          : 'Sign In as Bidder (Vendor Portal)'}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
