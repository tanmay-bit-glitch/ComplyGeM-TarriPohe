import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Building2, 
  History, 
  Globe, 
  CheckCircle2, 
  AlertTriangle,
  LogOut,
  User,
  Sparkles,
  ArrowLeftRight
} from 'lucide-react';
import { AuthUser } from '../types';

interface GovernmentHeaderProps {
  currentView: 'OFFICER' | 'BIDDER' | 'AUDIT';
  onSelectView: (view: 'OFFICER' | 'BIDDER' | 'AUDIT') => void;
  language: 'EN' | 'HI';
  onToggleLanguage: () => void;
  magnification: number;
  onIncreaseMagnification: () => void;
  onDecreaseMagnification: () => void;
  onResetMagnification: () => void;
  currentUser: AuthUser;
  onLogout: () => void;
  onSwitchRole?: () => void;
}

export const GovernmentHeader: React.FC<GovernmentHeaderProps> = ({
  currentView,
  onSelectView,
  language,
  onToggleLanguage,
  magnification,
  onIncreaseMagnification,
  onDecreaseMagnification,
  onResetMagnification,
  currentUser,
  onLogout,
  onSwitchRole,
}) => {
  const [istTime, setIstTime] = useState<string>('');

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

          {/* Right: Officer Avatar Profile & Actions */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* User Profile & Role Chip */}
            <div className="flex items-center space-x-2.5">
              <div className="text-right hidden sm:block">
                <div className="flex items-center justify-end space-x-1.5">
                  <p className="text-white text-xs font-semibold leading-tight">{currentUser.name}</p>
                  <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded uppercase tracking-wider ${
                    currentUser.role === 'PROCUREMENT_OFFICER'
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'bg-emerald-400 text-slate-950 font-bold'
                  }`}>
                    {currentUser.role === 'PROCUREMENT_OFFICER' ? 'Officer' : 'Bidder'}
                  </span>
                </div>
                <p className="text-blue-200 text-[10px] leading-tight truncate max-w-[160px]" title={currentUser.designationOrEntity}>
                  {currentUser.designationOrEntity}
                </p>
              </div>

              {/* Avatar circle */}
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold ring-2 ${
                currentUser.role === 'PROCUREMENT_OFFICER'
                  ? 'bg-blue-600 ring-amber-400/60'
                  : 'bg-emerald-700 ring-emerald-400/60'
              }`}>
                {currentUser.avatarInitials}
              </div>

              {/* Switch Role Quick Action Button (if handler provided) */}
              {onSwitchRole && (
                <button
                  id="header-switch-role-btn"
                  onClick={onSwitchRole}
                  className="p-1.5 rounded-lg bg-blue-900/60 hover:bg-blue-800/90 text-blue-200 hover:text-white border border-blue-700/60 transition-colors hidden md:flex items-center space-x-1 text-[10px]"
                  title="Switch between Procurement Officer and Bidder views"
                >
                  <ArrowLeftRight className="w-3.5 h-3.5 text-amber-300" />
                  <span>Switch Role</span>
                </button>
              )}

              {/* Logout Button */}
              <button
                id="header-logout-btn"
                onClick={onLogout}
                className="p-2 rounded-lg bg-rose-950/40 hover:bg-rose-900/80 text-rose-200 hover:text-white border border-rose-800/60 transition-colors"
                title={language === 'HI' ? 'लॉगआउट करें (Sign Out)' : 'Sign Out / Logout'}
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Professional Navigation Tab Bar - Strictly Role-Segregated */}
      <nav className="bg-slate-900 border-b border-slate-800 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between py-1.5">
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {/* PROCUREMENT OFFICER ONLY TABS */}
            {currentUser.role === 'PROCUREMENT_OFFICER' && (
              <>
                <button
                  id="nav-officer-portal"
                  onClick={() => onSelectView('OFFICER')}
                  className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    currentView === 'OFFICER'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-amber-300" />
                  <span>{language === 'HI' ? 'प्रोक्योरमेंट ऑफिसर डैशबोर्ड' : 'Procurement Officer Dashboard'}</span>
                </button>

                <button
                  id="nav-audit-trail"
                  onClick={() => onSelectView('AUDIT')}
                  className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                    currentView === 'AUDIT'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <History className="w-4 h-4 text-blue-300" />
                  <span>{language === 'HI' ? 'ऑडिट लॉग्स एवं सत्यापन प्रमाण' : 'Audit Logs & Verification Trail'}</span>
                </button>
              </>
            )}

            {/* REGISTERED BIDDER ONLY TABS */}
            {currentUser.role === 'BIDDER' && (
              <button
                id="nav-bidder-portal"
                onClick={() => onSelectView('BIDDER')}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition-all ${
                  currentView === 'BIDDER'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Building2 className="w-4 h-4 text-emerald-300" />
                <span>{language === 'HI' ? 'बोलीदाता दस्तावेज़ सत्यापन विज़ार्ड' : 'Bidder Document Submission Wizard'}</span>
              </button>
            )}
          </div>

          <div className="hidden lg:flex items-center space-x-2 text-[11px] text-slate-400">
            <span className={`w-1.5 h-1.5 rounded-full ${currentUser.role === 'PROCUREMENT_OFFICER' ? 'bg-amber-400' : 'bg-emerald-400'}`}></span>
            <span>
              {currentUser.role === 'PROCUREMENT_OFFICER' 
                ? 'Authorized Officer Enclave • Bidder Pages Restricted'
                : 'Registered Bidder Enclave • Officer Pages Restricted'}
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
};
