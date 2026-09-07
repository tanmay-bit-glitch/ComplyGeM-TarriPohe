import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe, 
  CheckCircle2, 
  AlertTriangle,
  LogOut,
  User,
  Sparkles,
  ChevronDown,
  Mail,
  FileBadge2
} from 'lucide-react';
import { AuthUser } from '../types';

interface GovernmentHeaderProps {
  currentView?: 'OFFICER' | 'BIDDER';
  onSelectView?: (view: 'OFFICER' | 'BIDDER') => void;
  language: 'EN' | 'HI';
  onToggleLanguage: () => void;
  magnification: number;
  onIncreaseMagnification: () => void;
  onDecreaseMagnification: () => void;
  onResetMagnification: () => void;
  currentUser: AuthUser;
  onLogout: () => void;
}

export const GovernmentHeader: React.FC<GovernmentHeaderProps> = ({
  language,
  onToggleLanguage,
  magnification,
  onIncreaseMagnification,
  onDecreaseMagnification,
  onResetMagnification,
  currentUser,
  onLogout,
}) => {
  const [istTime, setIstTime] = useState<string>('');
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState<boolean>(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsProfileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setIstTime(
        now.toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }) + ' IST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full bg-white border-b border-slate-200 shadow-xs select-none">
      {/* 1. National Tricolor Strip */}
      <div className="w-full h-1 flex">
        <div className="w-1/3 bg-[#FF9933]"></div>
        <div className="w-1/3 bg-white"></div>
        <div className="w-1/3 bg-[#138808]"></div>
      </div>

      {/* 2. Top Accessibility & Utility Bar */}
      <div className="bg-[#001D3D] text-slate-200 px-4 sm:px-6 py-1 text-xs flex flex-wrap justify-between items-center border-b border-blue-950">
        <div className="flex items-center space-x-3">
          <span className="font-semibold text-blue-100 text-[11px] tracking-wide">
            {language === 'HI' ? 'भारत सरकार' : 'GOVERNMENT OF INDIA'}
          </span>
          <span className="text-blue-400/60">|</span>
          <span className="text-blue-200/80 text-[11px] hidden sm:inline">
            {language === 'HI' ? 'वाणिज्य एवं उद्योग मंत्रालय' : 'Ministry of Commerce & Industry'}
          </span>
        </div>

        <div className="flex items-center space-x-3">
          <span className="text-blue-200/70 font-mono text-[11px] hidden md:inline">
            {istTime}
          </span>

          {/* Magnification Controls (A-, A, A+) */}
          <div className="flex items-center space-x-1 border border-blue-800/60 rounded px-1.5 py-0.5 bg-[#002B5B]">
            <button
              id="font-size-decrease"
              onClick={onDecreaseMagnification}
              className="px-1.5 py-0.5 rounded hover:text-white text-blue-200/90 hover:bg-blue-800/60 font-semibold transition-colors"
              title="Decrease Magnification (A-)"
            >
              A-
            </button>
            <button
              id="font-size-reset"
              onClick={onResetMagnification}
              className={`px-2 py-0.5 rounded transition-colors font-semibold ${
                magnification === 100 ? 'font-bold text-[#F27D26]' : 'text-blue-200/90 hover:text-white'
              }`}
              title="Reset Magnification (A)"
            >
              A
            </button>
            <button
              id="font-size-increase"
              onClick={onIncreaseMagnification}
              className="px-1.5 py-0.5 rounded hover:text-white text-blue-200/90 hover:bg-blue-800/60 font-semibold transition-colors"
              title="Increase Magnification (A+)"
            >
              A+
            </button>
          </div>

          {/* Language Switcher */}
          <button
            id="language-toggle-btn"
            onClick={onToggleLanguage}
            className="flex items-center space-x-1 px-2 py-0.5 rounded bg-[#002B5B] hover:bg-blue-900 text-blue-100 border border-blue-800/60 transition-colors text-[11px]"
          >
            <Globe className="w-3 h-3 text-[#F27D26]" />
            <span className="font-semibold">{language === 'HI' ? 'English' : 'हिंदी'}</span>
          </button>
        </div>
      </div>

      {/* 3. Main Government & GeM Branding Banner in #002B5B with #F27D26 Bottom Accent */}
      <div className="bg-[#002B5B] border-b-4 border-[#F27D26] shadow-md text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* Left: National Emblem & GeM Title */}
          <div className="flex items-center space-x-3.5">
            {/* White Emblem Tile */}
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
                <span className="text-[10px] text-blue-200 uppercase tracking-widest font-medium">
                  {language === 'HI' ? 'वाणिज्य एवं उद्योग मंत्रालय | भारत सरकार' : 'Ministry of Commerce & Industry | Government of India'}
                </span>
              </div>

              <h1 className="text-lg sm:text-xl font-bold text-white tracking-tight leading-tight mt-0.5">
                {language === 'HI' ? 'GeM अनुपालन एवं सत्यापन मंच' : 'GeM Compliance & Verification Portal'}
              </h1>

              <p className="text-[11px] text-blue-100/80 hidden sm:block">
                {language === 'HI' 
                  ? 'उद्यम, जीएसटीएन, पैन, मेक इन इंडिया एवं सीबीपीपी एकीकृत पात्रता सत्यापन' 
                  : 'AI-Powered Statutory & Multi-Portal Document Eligibility Verification Engine'}
              </p>
            </div>
          </div>

          {/* Right: User Profile Dropdown Menu */}
          <div className="relative" ref={profileMenuRef}>
            {/* Interactive Profile Trigger Button - Avatar Icon Only */}
            <button
              id="header-user-profile-menu-btn"
              type="button"
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center space-x-1.5 p-1 pl-1 pr-2 rounded-full bg-blue-900/40 hover:bg-blue-900/80 border border-blue-700/50 hover:border-blue-500/60 transition-all group focus:outline-none focus:ring-2 focus:ring-amber-400/40"
              aria-expanded={isProfileMenuOpen}
              aria-haspopup="true"
              title={`${currentUser.name} (${currentUser.role === 'PROCUREMENT_OFFICER' ? 'Officer' : 'Bidder'}) - Click for menu`}
            >
              {/* Avatar circle */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ring-2 shrink-0 ${
                currentUser.role === 'PROCUREMENT_OFFICER'
                  ? 'bg-blue-600 ring-amber-400/60'
                  : 'bg-emerald-700 ring-emerald-400/60'
              }`}>
                {currentUser.avatarInitials}
              </div>

              {/* Chevron icon indicating dropdown */}
              <ChevronDown className={`w-3.5 h-3.5 text-blue-200 transition-transform duration-200 shrink-0 ${
                isProfileMenuOpen ? 'rotate-180 text-white' : 'group-hover:text-white'
              }`} />
            </button>

            {/* Dropdown Menu Container */}
            {isProfileMenuOpen && (
              <div
                id="header-user-dropdown-menu"
                className="absolute right-0 top-full mt-2 w-72 sm:w-80 bg-white rounded-xl shadow-2xl border border-slate-200/90 z-50 overflow-hidden text-slate-800 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                {/* User Info Header inside Dropdown */}
                <div className="p-4 bg-gradient-to-br from-slate-50 to-blue-50/40 border-b border-slate-100">
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-xs ring-2 ${
                      currentUser.role === 'PROCUREMENT_OFFICER'
                        ? 'bg-[#002B5B] ring-amber-400'
                        : 'bg-emerald-700 ring-emerald-400'
                    }`}>
                      {currentUser.avatarInitials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <p className="text-sm font-bold text-slate-900 truncate">
                          {currentUser.name}
                        </p>
                        <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0 ${
                          currentUser.role === 'PROCUREMENT_OFFICER'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        }`}>
                          {currentUser.role === 'PROCUREMENT_OFFICER' 
                            ? (language === 'HI' ? 'अधिकारी' : 'Officer')
                            : (language === 'HI' ? 'बोलीदाता' : 'Bidder')}
                        </span>
                      </div>
                      <p className="text-xs font-medium text-slate-600 truncate mt-0.5" title={currentUser.designationOrEntity}>
                        {currentUser.designationOrEntity}
                      </p>
                      <div className="flex items-center space-x-1.5 text-[11px] text-slate-500 mt-1">
                        <Mail className="w-3 h-3 shrink-0 text-slate-400" />
                        <span className="truncate">{currentUser.email}</span>
                      </div>
                    </div>
                  </div>

                  {/* Company / Department & Registration Details */}
                  <div className="mt-3 pt-3 border-t border-slate-200/70 text-[11px] space-y-1 text-slate-600">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">
                        {currentUser.role === 'PROCUREMENT_OFFICER' ? 'Department:' : 'Company:'}
                      </span>
                      <span className="font-semibold text-slate-800 truncate max-w-[180px]" title={currentUser.departmentOrCompany}>
                        {currentUser.departmentOrCompany}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-400">
                        {currentUser.role === 'PROCUREMENT_OFFICER' ? 'Officer ID:' : 'Identifier/PAN:'}
                      </span>
                      <span className="font-mono font-medium text-slate-700">
                        {currentUser.identifierNumber}
                      </span>
                    </div>
                    {currentUser.companyDetails?.enterpriseType && (
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Enterprise:</span>
                        <span className="font-semibold text-emerald-700">
                          {currentUser.companyDetails.enterpriseType} ({currentUser.companyDetails.registeredState})
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Dropdown Menu Actions */}
                <div className="p-2">
                  <button
                    id="dropdown-logout-btn"
                    type="button"
                    onClick={() => {
                      setIsProfileMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-rose-700 hover:bg-rose-50 hover:text-rose-900 transition-colors group text-left"
                  >
                    <div className="w-8 h-8 rounded-lg bg-rose-100 group-hover:bg-rose-200 flex items-center justify-center text-rose-700 shrink-0 transition-colors">
                      <LogOut className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold leading-tight">
                        {language === 'HI' ? 'लॉगआउट करें (Sign Out)' : 'Sign Out / Logout'}
                      </p>
                      <p className="text-[10px] text-rose-600/80 leading-tight mt-0.5">
                        {language === 'HI' ? 'सक्रिय सत्र सुरक्षित रूप से समाप्त करें' : 'Safely end active session'}
                      </p>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
