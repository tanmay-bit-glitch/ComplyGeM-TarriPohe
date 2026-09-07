import React, { useState, useEffect } from 'react';
import { 
  Tender, 
  BidderSubmission, 
  AuditLogEntry, 
  SystemNotification, 
  BidderDecision,
  AuthUser,
  UserRole 
} from './types';
import { 
  INITIAL_TENDERS, 
  INITIAL_SUBMISSIONS, 
  INITIAL_AUDIT_LOGS, 
  INITIAL_NOTIFICATIONS 
} from './data/mockData';
import { DEMO_OFFICER_USER, DEMO_BIDDER_USER } from './data/mockUsers';
import { GovernmentHeader } from './components/GovernmentHeader';
import { LoginPage } from './components/LoginPage';
import { BidderWizard } from './components/BidderWizard';
import { OfficerDashboard } from './components/OfficerDashboard';
import { AuditTrailView } from './components/AuditTrailView';
import { TenderManagementModal } from './components/TenderManagementModal';
import { postAuditLog, postNotification, fetchLiveNotifications } from './services/apiService';
import { Shield, ExternalLink, HelpCircle } from 'lucide-react';

export default function App() {
  // Authentication & Role State (defaults to null so login page is displayed)
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(() => {
    try {
      const stored = localStorage.getItem('gem_auth_user');
      if (stored) {
        return JSON.parse(stored) as AuthUser;
      }
    } catch {
      // Fallback
    }
    return null;
  });

  const [currentView, setCurrentView] = useState<'OFFICER' | 'BIDDER' | 'AUDIT'>('OFFICER');
  const [tenders, setTenders] = useState<Tender[]>(INITIAL_TENDERS);
  const [submissions, setSubmissions] = useState<BidderSubmission[]>(INITIAL_SUBMISSIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [notifications, setNotifications] = useState<SystemNotification[]>(INITIAL_NOTIFICATIONS);

  // Language State
  const [language, setLanguage] = useState<'EN' | 'HI'>('EN');

  // Magnification Zoom State (70% - 160%)
  const [magnification, setMagnification] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('gem_magnification');
      if (saved) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed) && parsed >= 70 && parsed <= 160) {
          return parsed;
        }
      }
    } catch {
      // Fallback
    }
    return 100;
  });

  const handleIncreaseMagnification = () => {
    setMagnification(prev => {
      const next = Math.min(160, prev + 10);
      try {
        localStorage.setItem('gem_magnification', next.toString());
      } catch {}
      return next;
    });
  };

  const handleDecreaseMagnification = () => {
    setMagnification(prev => {
      const next = Math.max(70, prev - 10);
      try {
        localStorage.setItem('gem_magnification', next.toString());
      } catch {}
      return next;
    });
  };

  const handleResetMagnification = () => {
    setMagnification(100);
    try {
      localStorage.setItem('gem_magnification', '100');
    } catch {}
  };

  // Modals
  const [isTenderModalOpen, setIsTenderModalOpen] = useState(false);

  // Synchronize view with user role on login
  const handleLogin = (user: AuthUser) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('gem_auth_user', JSON.stringify(user));
    } catch {
      // Ignore
    }

    if (user.role === 'PROCUREMENT_OFFICER') {
      setCurrentView('OFFICER');
    } else {
      setCurrentView('BIDDER');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('gem_auth_user');
    } catch {
      // Ignore
    }
  };

  // Quick switch role between Officer and Bidder for testing
  const handleSwitchRole = () => {
    if (!currentUser) return;
    if (currentUser.role === 'PROCUREMENT_OFFICER') {
      handleLogin(DEMO_BIDDER_USER);
    } else {
      handleLogin(DEMO_OFFICER_USER);
    }
  };

  // Enforce strict role confinement: bidders NEVER see officer pages
  useEffect(() => {
    if (currentUser) {
      if (currentUser.role === 'BIDDER' && currentView !== 'BIDDER') {
        setCurrentView('BIDDER');
      } else if (currentUser.role === 'PROCUREMENT_OFFICER' && currentView === 'BIDDER') {
        setCurrentView('OFFICER');
      }
    }
  }, [currentUser, currentView]);

  // Periodic check for new live notifications
  useEffect(() => {
    let isMounted = true;

    const pollNotifications = async () => {
      try {
        const serverNotifs = await fetchLiveNotifications();
        if (isMounted && Array.isArray(serverNotifs) && serverNotifs.length > 0) {
          setNotifications(prev => {
            const existingIds = new Set(prev.map(p => p.id));
            const newItems = serverNotifs.filter(n => !existingIds.has(n.id));
            if (newItems.length > 0) {
              return [...newItems, ...prev];
            }
            return prev;
          });
        }
      } catch {
        // Non-blocking fallback
      }
    };

    // Stagger initial check to allow dev server / middleware hydration
    const timer = setTimeout(pollNotifications, 1200);
    const pollInterval = setInterval(pollNotifications, 15000);

    return () => {
      isMounted = false;
      clearTimeout(timer);
      clearInterval(pollInterval);
    };
  }, []);

  // Handler: When a Bidder submits a new bid or runs verification
  const handleSubmitBid = (newSubmission: BidderSubmission) => {
    setSubmissions(prev => {
      const filtered = prev.filter(s => s.id !== newSubmission.id);
      return [newSubmission, ...filtered];
    });

    // Create an audit entry
    const newLog: AuditLogEntry = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      submissionId: newSubmission.id,
      tenderNumber: newSubmission.tenderNumber,
      actor: 'BIDDER',
      actorName: newSubmission.bidderName,
      action: 'BID_SUBMISSION_FINALIZED',
      details: `Bid submitted with ${newSubmission.documents.length} verified documents. Score: ${newSubmission.complianceScorecard?.totalScore}/100.`,
      ipAddress: '10.24.18.92',
      integrityHash: 'sha256_' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
    };
    setAuditLogs(prev => [newLog, ...prev]);

    // Create notification
    const newNotif: SystemNotification = {
      id: `notif-${Date.now()}`,
      title: `Bid Submitted: ${newSubmission.bidderName}`,
      message: `Tender ${newSubmission.tenderNumber} received a bid with score ${newSubmission.complianceScorecard?.totalScore}/100 (${newSubmission.complianceScorecard?.riskLevel} Risk).`,
      timestamp: new Date().toISOString(),
      type: newSubmission.complianceScorecard?.riskLevel === 'HIGH' ? 'ALERT' : 'SUCCESS',
      read: false,
      relatedSubmissionId: newSubmission.id,
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // Handler: When Procurement Officer records formal qualification/disqualification decision
  const handleRecordOfficerDecision = async (
    submissionId: string,
    decision: BidderDecision,
    remarks: string
  ) => {
    let targetSub: BidderSubmission | undefined;

    setSubmissions(prev =>
      prev.map(sub => {
        if (sub.id === submissionId) {
          targetSub = sub;
          return {
            ...sub,
            officerDecision: decision,
            officerRemarks: remarks,
            lastUpdated: new Date().toISOString(),
          };
        }
        return sub;
      })
    );

    if (targetSub) {
      const decisionLabel =
        decision === 'QUALIFIED'
          ? 'QUALIFIED'
          : decision === 'DISQUALIFIED'
          ? 'DISQUALIFIED'
          : 'CLARIFICATION SOUGHT';

      const log = await postAuditLog({
        submissionId,
        tenderNumber: targetSub.tenderNumber,
        actor: 'PROCUREMENT_OFFICER',
        actorName: 'Shri Arvind Rao (Chief Procurement Officer)',
        action: `DECISION_${decision}`,
        details: `Official status marked as ${decisionLabel}. Officer Remarks: "${remarks}"`,
      });

      if (log) {
        setAuditLogs(prev => [log, ...prev]);
      }

      const notif: SystemNotification = {
        id: `notif-${Date.now()}`,
        title: `Decision Recorded: ${targetSub.bidderName}`,
        message: `Procurement Officer marked bid ${targetSub.trackingToken} as ${decisionLabel}.`,
        timestamp: new Date().toISOString(),
        type: decision === 'QUALIFIED' ? 'SUCCESS' : decision === 'DISQUALIFIED' ? 'ALERT' : 'WARNING',
        read: false,
        relatedSubmissionId: submissionId,
      };
      setNotifications(prev => [notif, ...prev]);
    }
  };

  // Handler: When Procurement Officer saves a newly configured tender
  const handleSaveTender = async (newTender: Tender) => {
    setTenders(prev => [newTender, ...prev]);

    const log = await postAuditLog({
      tenderNumber: newTender.tenderNumber,
      actor: 'PROCUREMENT_OFFICER',
      actorName: 'Shri Arvind Rao (Chief Procurement Officer)',
      action: 'TENDER_CHECKLIST_CONFIGURED',
      details: `Created new tender checklist for "${newTender.title}" with ${newTender.requiredDocuments.length} statutory requirements.`,
    });

    if (log) {
      setAuditLogs(prev => [log, ...prev]);
    }

    const notif: SystemNotification = {
      id: `notif-${Date.now()}`,
      title: `Tender Published: ${newTender.tenderNumber}`,
      message: `Checklist published with ${newTender.requiredDocuments.length} mandatory statutory criteria.`,
      timestamp: new Date().toISOString(),
      type: 'INFO',
      read: false,
    };
    setNotifications(prev => [notif, ...prev]);
  };

  // If no user is logged in, show the dedicated Role-Based Login Gateway
  if (!currentUser) {
    return (
      <LoginPage
        onLogin={handleLogin}
        language={language}
        onToggleLanguage={() => setLanguage(l => (l === 'EN' ? 'HI' : 'EN'))}
        magnification={magnification}
        onIncreaseMagnification={handleIncreaseMagnification}
        onDecreaseMagnification={handleDecreaseMagnification}
        onResetMagnification={handleResetMagnification}
      />
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col bg-slate-100 text-slate-900 font-sans"
      style={{ zoom: `${magnification}%` }}
    >
      {/* 1. Official Government Header with active role session */}
      <GovernmentHeader
        currentView={currentView}
        onSelectView={setCurrentView}
        language={language}
        onToggleLanguage={() => setLanguage(l => (l === 'EN' ? 'HI' : 'EN'))}
        magnification={magnification}
        onIncreaseMagnification={handleIncreaseMagnification}
        onDecreaseMagnification={handleDecreaseMagnification}
        onResetMagnification={handleResetMagnification}
        currentUser={currentUser}
        onLogout={handleLogout}
        onSwitchRole={handleSwitchRole}
      />

      {/* 2. Main Body Content Switcher - Strictly Role Segregated */}
      <main className="flex-1">
        {/* Officer Only: Dashboard */}
        {currentUser.role === 'PROCUREMENT_OFFICER' && currentView === 'OFFICER' && (
          <OfficerDashboard
            tenders={tenders}
            submissions={submissions}
            onOpenTenderModal={() => setIsTenderModalOpen(true)}
            onRecordOfficerDecision={handleRecordOfficerDecision}
            language={language}
          />
        )}

        {/* Bidder Only: Submission Wizard */}
        {currentUser.role === 'BIDDER' && currentView === 'BIDDER' && (
          <BidderWizard
            tenders={tenders}
            onSubmitBid={handleSubmitBid}
            language={language}
          />
        )}

        {/* Officer Only: Audit Trail & Tamper-Evident Verification Logs */}
        {currentUser.role === 'PROCUREMENT_OFFICER' && currentView === 'AUDIT' && (
          <AuditTrailView
            logs={auditLogs}
            language={language}
          />
        )}
      </main>

      {/* 3. Official Indian Government Footer */}
      <footer className="w-full bg-[#001D3D] text-slate-300 border-t-2 border-[#F27D26] text-xs mt-12">
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
                <span>About GeM Compliance Platform</span>
              </h4>
              <p className="text-slate-400 leading-relaxed">
                An integrated AI-assisted statutory compliance verification platform ensuring integrity, speed, and transparency in public procurement across Central & State Ministries.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F27D26]"></span>
                <span>Integrated Portals & Gateways</span>
              </h4>
              <ul className="space-y-1 text-slate-400">
                <li>• Ministry of MSME (Udyam Registration)</li>
                <li>• Goods and Services Tax Network (GSTN)</li>
                <li>• Central Board of Direct Taxes (CBDT / PAN)</li>
                <li>• Central Public Procurement Portal (CPPP)</li>
                <li>• EPFO & ESIC Statutory Gateways</li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F27D26]"></span>
                <span>Helpdesk & Support</span>
              </h4>
              <p className="text-slate-400">
                GeM Toll-Free Helplines:
              </p>
              <p className="font-mono text-[#F27D26] font-bold mt-1 text-xs">
                1800-419-3436 / 1800-102-3436
              </p>
              <p className="text-slate-400 text-[10px] mt-1">
                Monday to Saturday: 9:00 AM – 8:00 PM IST
              </p>
              <p className="text-slate-400 mt-1">
                Email: <span className="text-blue-200">helpdesk-gem@gov.in</span>
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white uppercase tracking-wider mb-2 flex items-center space-x-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                <span>Security & Standards</span>
              </h4>
              <div className="flex items-center space-x-2 text-emerald-400 font-semibold mb-2">
                <Shield className="w-4 h-4" />
                <span>STQC Certified • ISO 27001</span>
              </div>
              <p className="text-slate-400 text-[10px] leading-relaxed">
                All uploaded documents and cryptographic signatures are processed under IT Act 2000 and General Financial Rules (GFR) 2017 standards.
              </p>
            </div>
          </div>

          <div className="pt-6 border-t border-blue-900/60 flex flex-col sm:flex-row justify-between items-center gap-2 text-slate-400 text-[10px]">
            <div>
              © 2026 Government e-Marketplace (GeM) • Ministry of Commerce & Industry, Government of India
            </div>
            <div>
              Designed & Developed by National Informatics Centre (NIC) | Portal Version 4.8.2-AI
            </div>
          </div>
        </div>
      </footer>

      {/* Tender Configuration Modal */}
      {isTenderModalOpen && (
        <TenderManagementModal
          isOpen={isTenderModalOpen}
          onClose={() => setIsTenderModalOpen(false)}
          onSaveTender={handleSaveTender}
        />
      )}
    </div>
  );
}
