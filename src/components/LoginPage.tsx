import React, { useState } from 'react';
import { UserRole, AuthUser } from '../types';
import { DEMO_OFFICER_USER, DEMO_BIDDER_USER } from '../data/mockUsers';
import { 
  ShieldCheck, 
  Building2, 
  Lock, 
  Mail, 
  User, 
  RefreshCw, 
  Eye, 
  EyeOff, 
  Shield, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Globe,
  FileCheck,
  Sparkles
} from 'lucide-react';

interface LoginPageProps {
  onLogin: (user: AuthUser) => void;
  language: 'EN' | 'HI';
  onToggleLanguage: () => void;
  magnification: number;
  onIncreaseMagnification: () => void;
  onDecreaseMagnification: () => void;
  onResetMagnification: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onLogin,
  language,
  onToggleLanguage,
  magnification,
  onIncreaseMagnification,
  onDecreaseMagnification,
  onResetMagnification,
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole>('PROCUREMENT_OFFICER');
  const [username, setUsername] = useState('arvind.rao@gem.gov.in');
  const [password, setPassword] = useState('GovGem@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaCode, setCaptchaCode] = useState('9K7M');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Generate a new 4-character alphanumeric captcha
  const handleRefreshCaptcha = () => {
    const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaCode(result);
    setCaptchaInput('');
    setErrorMessage(null);
  };

  // Switch role and update default credentials
  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setErrorMessage(null);
    if (role === 'PROCUREMENT_OFFICER') {
      setUsername('arvind.rao@gem.gov.in');
      setPassword('GovGem@2026');
    } else {
      setUsername('bids@bharat-infotech.com');
      setPassword('Bidder@2026');
    }
  };

  // Quick 1-click login handler
  const handleQuickLogin = (role: UserRole) => {
    setIsLoading(true);
    setTimeout(() => {
      if (role === 'PROCUREMENT_OFFICER') {
        onLogin(DEMO_OFFICER_USER);
      } else {
        onLogin(DEMO_BIDDER_USER);
      }
      setIsLoading(false);
    }, 400);
  };

  // Form submit handler
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!username.trim() || !password.trim()) {
      setErrorMessage(
        language === 'HI' 
          ? 'कृपया उपयोगकर्ता आईडी और पासवर्ड दर्ज करें।' 
          : 'Please enter both User ID / Email and Password.'
      );
      return;
    }

    if (captchaInput.trim().toUpperCase() !== captchaCode) {
      setErrorMessage(
        language === 'HI'
          ? 'अमान्य सुरक्षा कोड (कैप्चा)। कृपया पुनः प्रयास करें।'
          : 'Security Captcha does not match. Please verify and retry.'
      );
      handleRefreshCaptcha();
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      if (selectedRole === 'PROCUREMENT_OFFICER') {
        const user: AuthUser = {
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
        onLogin(user);
      } else {
        const user: AuthUser = {
          ...DEMO_BIDDER_USER,
          email: username.includes('@') ? username : `${username}@vendor.gem.in`,
          lastLogin: new Date().toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }) + ' IST',
        };
        onLogin(user);
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div 
      className="min-h-screen flex flex-col justify-between bg-slate-100 text-slate-900"
      style={{ zoom: `${magnification}%` }}
    >
      {/* 1. Official Government Header Bar */}
      <header className="w-full">
        {/* National Tricolor Ribbon */}
        <div className="w-full h-1 flex">
          <div className="w-1/3 bg-[#FF9933]"></div>
          <div className="w-1/3 bg-white"></div>
          <div className="w-1/3 bg-[#138808]"></div>
        </div>

        {/* Top Ministry Bar */}
        <div className="bg-[#001D3D] text-slate-200 px-4 sm:px-6 py-2 border-b border-blue-900 flex justify-between items-center text-xs">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-white">भारत सरकार</span>
            <span className="text-blue-400">|</span>
            <span className="text-slate-300 hidden sm:inline">Government of India</span>
            <span className="text-blue-400/60 hidden md:inline">•</span>
            <span className="text-slate-300 hidden md:inline">Ministry of Commerce & Industry</span>
          </div>

          <div className="flex items-center space-x-3">
            {/* Magnification Controls (A-, A, A+) */}
            <div className="flex items-center space-x-1 border border-blue-800/80 rounded px-1.5 py-0.5 bg-[#002B5B]">
              <button
                id="login-font-decrease"
                type="button"
                onClick={onDecreaseMagnification}
                className="px-1.5 py-0.5 rounded text-xs text-blue-200 hover:text-white hover:bg-blue-800/60 font-semibold transition-colors"
                title="Decrease Magnification (A-)"
              >
                A-
              </button>
              <button
                id="login-font-reset"
                type="button"
                onClick={onResetMagnification}
                className={`px-2 py-0.5 rounded text-xs transition-colors font-semibold ${
                  magnification === 100 ? 'text-[#F27D26] font-bold' : 'text-blue-200 hover:text-white'
                }`}
                title="Reset Magnification (A)"
              >
                A
              </button>
              <button
                id="login-font-increase"
                type="button"
                onClick={onIncreaseMagnification}
                className="px-1.5 py-0.5 rounded text-xs text-blue-200 hover:text-white hover:bg-blue-800/60 font-semibold transition-colors"
                title="Increase Magnification (A+)"
              >
                A+
              </button>
            </div>

            {/* Language Switcher */}
            <button
              id="login-language-toggle"
              onClick={onToggleLanguage}
              className="flex items-center space-x-1 px-2 py-0.5 rounded bg-[#002B5B] hover:bg-blue-900 text-blue-100 border border-blue-800 transition-colors text-[11px]"
            >
              <Globe className="w-3 h-3 text-[#F27D26]" />
              <span className="font-semibold">{language === 'HI' ? 'English' : 'हिंदी'}</span>
            </button>
          </div>
        </div>

        {/* Branding Banner */}
        <div className="bg-[#002B5B] border-b-4 border-[#F27D26] shadow-md text-white py-4 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 bg-white rounded-lg flex flex-col items-center justify-center p-1 shadow-xs shrink-0">
                <span className="text-xl leading-none">🏛️</span>
                <span className="text-[7px] font-bold text-slate-700 mt-0.5 uppercase tracking-wider text-center">
                  सत्यमेव जयते
                </span>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-1.5 py-0.5 text-[9px] font-bold bg-[#F27D26] text-white rounded uppercase tracking-wider">
                    GeM
                  </span>
                  <h1 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                    {language === 'HI' 
                      ? 'गवर्नमेंट ई-मार्केटप्लेस (GeM) - एकल साइन-ऑन पोर्टल' 
                      : 'Government e-Marketplace (GeM) - Unified Single Sign-On'}
                  </h1>
                </div>
                <p className="text-xs text-blue-200">
                  {language === 'HI'
                    ? 'सार्वजनिक खरीद statutory अनुपालन एवं बोलीदाता सत्यापन प्रणाली'
                    : 'Statutory Bid Compliance Verification & Forensic Examination System'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-300 bg-blue-950/60 border border-blue-800 px-3 py-1 rounded-full">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>STQC Certified • IT Act 2000 Compliant</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Main Login Gateway Card */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-8 flex flex-col justify-center">
        {/* Role Separation Notice Banner */}
        <div className="mb-6 bg-blue-50 border-l-4 border-[#1e3a8a] p-4 rounded-r-lg shadow-xs text-xs text-blue-900 flex items-start space-x-3">
          <ShieldCheck className="w-5 h-5 text-[#1e3a8a] shrink-0 mt-0.5" />
          <div>
            <p className="font-bold uppercase tracking-wide text-slate-800">
              {language === 'HI' ? 'भूमिका-आधारित सुरक्षा अलगाव सूचना:' : 'Role-Based Security Boundary & Data Isolation Notice:'}
            </p>
            <p className="mt-0.5 text-slate-700 leading-relaxed">
              {language === 'HI'
                ? 'प्रोक्योरमेंट ऑफिसर और बोलीदाता (विक्रेता) अलग-अलग भूमिकाएँ निभाते हैं। सुरक्षा और हितों के टकराव से बचने के लिए, दोनों पक्ष एक-दूसरे के कार्यक्षेत्र और गोपनीय पन्नों को देखने के लिए अधिकृत नहीं हैं।'
                : 'Procurement Officers and Registered Bidders operate in mutually segregated workspaces. In compliance with GFR 2017 & GeM Transparency Norms, officers evaluate incoming tenders and configure statutory checklists, while bidders verify documents and submit bids. Neither role has access to the other’s interface.'}
            </p>
          </div>
        </div>

        {/* Main Card Container */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          {/* Role Selection Tabs */}
          <div className="grid grid-cols-2 border-b border-slate-200 bg-slate-50">
            {/* Tab 1: Procurement Officer */}
            <button
              id="role-tab-officer"
              type="button"
              onClick={() => handleRoleSelect('PROCUREMENT_OFFICER')}
              className={`p-4 sm:p-5 text-left transition-all relative flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3.5 ${
                selectedRole === 'PROCUREMENT_OFFICER'
                  ? 'bg-white text-[#002B5B] shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {selectedRole === 'PROCUREMENT_OFFICER' && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-[#1e3a8a]"></div>
              )}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                selectedRole === 'PROCUREMENT_OFFICER'
                  ? 'bg-[#002B5B] text-white shadow-xs'
                  : 'bg-slate-200 text-slate-600'
              }`}>
                <ShieldCheck className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-sm sm:text-base">
                    {language === 'HI' ? 'प्रोक्योरमेंट ऑफिसर' : 'Procurement Officer'}
                  </span>
                  {selectedRole === 'PROCUREMENT_OFFICER' && (
                    <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-1.5 py-0.2 rounded">
                      Selected
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {language === 'HI' 
                    ? 'सरकारी विभाग • निविदा मूल्यांकन एवं सत्यापन'
                    : 'Buyer Department • Bid Evaluation & Audit'}
                </p>
              </div>
            </button>

            {/* Tab 2: Registered Bidder */}
            <button
              id="role-tab-bidder"
              type="button"
              onClick={() => handleRoleSelect('BIDDER')}
              className={`p-4 sm:p-5 text-left transition-all relative flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-3.5 ${
                selectedRole === 'BIDDER'
                  ? 'bg-white text-emerald-900 shadow-xs'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {selectedRole === 'BIDDER' && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-600"></div>
              )}
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                selectedRole === 'BIDDER'
                  ? 'bg-emerald-800 text-white shadow-xs'
                  : 'bg-slate-200 text-slate-600'
              }`}>
                <Building2 className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-sm sm:text-base">
                    {language === 'HI' ? 'बोलीदाता / विक्रेता' : 'Registered Bidder'}
                  </span>
                  {selectedRole === 'BIDDER' && (
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.2 rounded">
                      Selected
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  {language === 'HI'
                    ? 'उद्यम / विक्रेता • बोली प्रस्तुतकरण एवं OCR सत्यापन'
                    : 'Vendor / MSME • Document OCR & Submission'}
                </p>
              </div>
            </button>
          </div>

          {/* Form Content Area */}
          <div className="p-6 sm:p-8">
            {/* Context Badge for current role */}
            <div className={`p-3.5 rounded-xl border mb-6 text-xs flex items-center justify-between ${
              selectedRole === 'PROCUREMENT_OFFICER'
                ? 'bg-blue-50/70 border-blue-200 text-blue-900'
                : 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
            }`}>
              <div className="flex items-center space-x-2">
                <span className={`w-2.5 h-2.5 rounded-full ${selectedRole === 'PROCUREMENT_OFFICER' ? 'bg-blue-600' : 'bg-emerald-600'}`}></span>
                <span className="font-bold">
                  {selectedRole === 'PROCUREMENT_OFFICER'
                    ? (language === 'HI' ? 'सत्यापन अधिकारी पोर्टल (Officer Portal)' : 'Officer Evaluation & Disqualification Console')
                    : (language === 'HI' ? 'विक्रेता बोली पोर्टल (Bidder Submission Portal)' : 'Vendor Document Verification & Submission Console')}
                </span>
              </div>
              <span className="text-[11px] font-medium opacity-80 hidden sm:inline">
                {selectedRole === 'PROCUREMENT_OFFICER'
                  ? 'Confidential Evaluation Workspace'
                  : 'Statutory Verification Workspace'}
              </span>
            </div>

            {/* Error Banner */}
            {errorMessage && (
              <div className="mb-6 p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-800 text-xs flex items-center space-x-2">
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* User ID Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {selectedRole === 'PROCUREMENT_OFFICER'
                    ? (language === 'HI' ? 'अधिकारी ईमेल / सरकारी आईडी' : 'Officer Parichay Email / Govt. ID')
                    : (language === 'HI' ? 'बोलीदाता ईमेल / GeM विक्रेता आईडी' : 'Bidder Email / GeM Seller ID')}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    id="login-username-input"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder={
                      selectedRole === 'PROCUREMENT_OFFICER'
                        ? 'officer.name@gem.gov.in'
                        : 'bids@company.com or GEM-VND-XXXXX'
                    }
                    className="w-full pl-9 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:border-transparent font-mono"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                    {language === 'HI' ? 'पासवर्ड' : 'Password'}
                  </label>
                  <span className="text-[11px] text-blue-700 hover:underline cursor-pointer">
                    {language === 'HI' ? 'पासवर्ड भूल गए?' : 'Forgot Password?'}
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    id="login-password-input"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-9 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:border-transparent font-mono"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Security Captcha Field */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {language === 'HI' ? 'सुरक्षा कोड (कैप्चा)' : 'Security Verification Code'}
                </label>
                <div className="flex items-center space-x-3">
                  {/* Captcha Display Box */}
                  <div className="flex items-center space-x-2 bg-slate-900 text-amber-300 px-4 py-2 rounded-lg font-mono text-lg font-bold tracking-widest select-none border border-slate-700 shadow-inner">
                    <span className="line-through decoration-slate-500 decoration-1">{captchaCode}</span>
                  </div>

                  <button
                    id="refresh-captcha-btn"
                    type="button"
                    onClick={handleRefreshCaptcha}
                    className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-300 transition-colors"
                    title="Refresh Security Code"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>

                  <input
                    id="login-captcha-input"
                    type="text"
                    maxLength={4}
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value.toUpperCase())}
                    placeholder="Enter Code"
                    className="flex-1 px-3 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#002B5B] focus:border-transparent font-mono uppercase tracking-widest text-center"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-3">
                <button
                  id="submit-login-btn"
                  type="submit"
                  disabled={isLoading}
                  className={`w-full py-3 px-4 rounded-xl text-white font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 ${
                    selectedRole === 'PROCUREMENT_OFFICER'
                      ? 'bg-[#002B5B] hover:bg-[#001D3D] shadow-blue-900/20'
                      : 'bg-emerald-700 hover:bg-emerald-800 shadow-emerald-900/20'
                  } ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <span>
                        {selectedRole === 'PROCUREMENT_OFFICER'
                          ? (language === 'HI' ? 'अधिकारी पोर्टल में प्रवेश करें' : 'Sign In as Procurement Officer')
                          : (language === 'HI' ? 'बोलीदाता पोर्टल में प्रवेश करें' : 'Sign In as Registered Bidder')}
                      </span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Quick Demo Logins Section */}
            <div className="mt-8 pt-6 border-t border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {language === 'HI' ? 'त्वरित डेमो परीक्षण लॉगिन:' : '1-Click Instant Evaluation Logins:'}
                </span>
                <span className="text-[11px] text-slate-400">
                  Click to test isolated role views
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Quick Button: Officer */}
                <button
                  id="quick-login-officer-btn"
                  type="button"
                  onClick={() => handleQuickLogin('PROCUREMENT_OFFICER')}
                  className="p-3 rounded-xl border border-blue-200 bg-blue-50/60 hover:bg-blue-100 text-left transition-colors flex items-center space-x-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-[#002B5B] text-white flex items-center justify-center shrink-0 shadow-xs">
                    <ShieldCheck className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-blue-950 truncate group-hover:text-blue-800">
                      Shri Arvind K. Rao
                    </p>
                    <p className="text-[10px] text-blue-800 truncate">
                      Sr. Procurement Officer (MoCI)
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-[#002B5B] bg-blue-200/70 px-2 py-0.5 rounded shrink-0">
                    Officer View
                  </span>
                </button>

                {/* Quick Button: Bidder */}
                <button
                  id="quick-login-bidder-btn"
                  type="button"
                  onClick={() => handleQuickLogin('BIDDER')}
                  className="p-3 rounded-xl border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100 text-left transition-colors flex items-center space-x-3 group"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Building2 className="w-4 h-4 text-emerald-200" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-emerald-950 truncate group-hover:text-emerald-800">
                      Bharat Infotech Ltd.
                    </p>
                    <p className="text-[10px] text-emerald-800 truncate">
                      Registered Bidder (Class-I MSE)
                    </p>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-200/70 px-2 py-0.5 rounded shrink-0">
                    Bidder View
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* 3. Official Government Footer */}
      <footer className="w-full bg-[#001D3D] text-slate-300 border-t-2 border-[#F27D26] text-xs py-6 mt-8">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-3 text-center sm:text-left text-[11px] text-slate-400">
          <div>
            © 2026 Government e-Marketplace (GeM) • Ministry of Commerce & Industry, Government of India
          </div>
          <div className="flex items-center space-x-3 text-slate-300">
            <span>NIC Cloud Infrastructure</span>
            <span>•</span>
            <span>256-Bit SSL Encryption</span>
            <span>•</span>
            <span>STQC Certified</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
