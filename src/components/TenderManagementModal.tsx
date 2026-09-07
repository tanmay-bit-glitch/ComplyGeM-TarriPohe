import React, { useState } from 'react';
import { Tender, RequiredDocumentSpec, DocumentType } from '../types';
import { X, Plus, Trash2, CheckCircle2, ShieldAlert } from 'lucide-react';

interface TenderManagementModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveTender: (newTender: Tender) => void;
}

export const TenderManagementModal: React.FC<TenderManagementModalProps> = ({
  isOpen,
  onClose,
  onSaveTender,
}) => {
  const [tenderNumber, setTenderNumber] = useState(`GEM/2026/B/${Math.floor(1000 + Math.random() * 9000)}`);
  const [title, setTitle] = useState('Procurement of IT Infrastructure & Secure Cloud Terminals');
  const [department, setDepartment] = useState('Ministry of Electronics & Information Technology (MeitY)');
  const [estimatedValueCr, setEstimatedValueCr] = useState<number>(3.5);
  const [minimumTurnoverCr, setMinimumTurnoverCr] = useState<number>(1.2);
  const [minimumLocalContent, setMinimumLocalContent] = useState<number>(50);
  const [isMseApplicable, setIsMseApplicable] = useState<boolean>(true);

  // Default checklist specs
  const [requiredDocs, setRequiredDocs] = useState<RequiredDocumentSpec[]>([
    {
      id: 'spec-udyam-1',
      type: 'UDYAM',
      title: 'MSME Udyam Registration Certificate',
      description: 'Valid Udyam certificate verifying enterprise classification and manufacturing activity.',
      isMandatory: true,
      departmentAuthority: 'Ministry of MSME',
      validationCriteria: 'Active status in Udyam portal; NIC code 2620 matching IT equipment manufacturing',
      weightagePoints: 20,
    },
    {
      id: 'spec-gstin-1',
      type: 'GSTIN',
      title: 'GST Registration Certificate & Return Filings (GSTR-3B)',
      description: 'Form GST REG-06 and proof of active return filing for previous 3 consecutive tax periods.',
      isMandatory: true,
      departmentAuthority: 'Goods & Services Tax Network (GSTN)',
      validationCriteria: 'GSTIN active; no return defaults in last 3 months',
      weightagePoints: 20,
    },
    {
      id: 'spec-pan-1',
      type: 'PAN',
      title: 'Permanent Account Number (PAN) & ITR Acknowledgment',
      description: 'CBDT PAN verification and Income Tax return acknowledgment for AY 2025-26.',
      isMandatory: true,
      departmentAuthority: 'Income Tax Department (CBDT)',
      validationCriteria: 'PAN operational; valid ITR acknowledgment on e-Filing portal',
      weightagePoints: 20,
    },
    {
      id: 'spec-mii-1',
      type: 'MAKE_IN_INDIA',
      title: 'Make in India (MII) Local Content Self-Declaration',
      description: 'Declaration on company letterhead countersigned by statutory auditor certifying domestic value addition.',
      isMandatory: true,
      departmentAuthority: 'Department for Promotion of Industry and Internal Trade (DPIIT)',
      validationCriteria: 'Local content >= 50% for Class-I Local Supplier status',
      weightagePoints: 15,
    },
    {
      id: 'spec-oem-1',
      type: 'OEM_AUTH',
      title: 'Manufacturer Authorization Form (MAF)',
      description: 'Direct authorization from Original Equipment Manufacturer guaranteeing back-to-back 3-year warranty.',
      isMandatory: true,
      departmentAuthority: 'Original Equipment Manufacturer (OEM)',
      validationCriteria: 'Authorized reseller certificate with direct warranty commitment',
      weightagePoints: 15,
    },
    {
      id: 'spec-debarment-1',
      type: 'DEBARMENT_AFFIDAVIT',
      title: 'Non-Debarment / Blacklisting Undertaking',
      description: 'Notarized undertaking on Rs. 100 non-judicial stamp paper confirming entity is not debarred.',
      isMandatory: true,
      departmentAuthority: 'Central Public Procurement Portal (CPPP)',
      validationCriteria: 'No active debarment or blacklisting orders on CPPP or GeM database',
      weightagePoints: 10,
    },
  ]);

  if (!isOpen) return null;

  const handleToggleDocMandatory = (docId: string) => {
    setRequiredDocs(prev =>
      prev.map(d => (d.id === docId ? { ...d, isMandatory: !d.isMandatory } : d))
    );
  };

  const handleRemoveDoc = (docId: string) => {
    setRequiredDocs(prev => prev.filter(d => d.id !== docId));
  };

  const handleSave = () => {
    const newTender: Tender = {
      id: `tender-${Date.now()}`,
      tenderNumber,
      title,
      category: 'IT & Hardware Equipment',
      department,
      closingDate: new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0],
      estimatedValueINR: estimatedValueCr * 10000000,
      minimumTurnoverINR: minimumTurnoverCr * 10000000,
      minimumLocalContentPercent: minimumLocalContent,
      isMsePreferenceApplicable: isMseApplicable,
      isStartupExemptionApplicable: true,
      requiredDocuments: requiredDocs,
      status: 'ACTIVE',
    };

    onSaveTender(newTender);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col border border-slate-300 overflow-hidden">
        {/* Header */}
        <div className="bg-[#002B5B] text-white px-6 py-4 flex justify-between items-center border-b-2 border-[#F27D26]">
          <div>
            <h3 className="text-base font-bold">Configure Tender Statutory Checklist</h3>
            <p className="text-xs text-blue-200">
              Set statutory compliance thresholds and document criteria for automated verification.
            </p>
          </div>
          <button onClick={onClose} className="text-blue-200 hover:text-white p-1 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Tender Reference ID *</label>
              <input
                type="text"
                value={tenderNumber}
                onChange={e => setTenderNumber(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 font-mono font-bold text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Department / Ministry *</label>
              <input
                type="text"
                value={department}
                onChange={e => setDepartment(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-slate-900"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Tender Title / Scope *</label>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 font-semibold text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Estimated Value (₹ Crores)</label>
              <input
                type="number"
                step="0.1"
                value={estimatedValueCr}
                onChange={e => setEstimatedValueCr(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-slate-900"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Mandatory Local Content (MII %)</label>
              <input
                type="number"
                min={0}
                max={100}
                value={minimumLocalContent}
                onChange={e => setMinimumLocalContent(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-1.5 text-slate-900"
              />
            </div>
          </div>

          {/* MSE Preference checkbox */}
          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center space-x-3">
            <input
              type="checkbox"
              id="mse-pref-check"
              checked={isMseApplicable}
              onChange={e => setIsMseApplicable(e.target.checked)}
              className="rounded text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="mse-pref-check" className="text-xs font-semibold text-emerald-900 cursor-pointer">
              Enable Micro & Small Enterprise (MSE) Purchase Preference (Exemption from EMD & Turnover Criteria)
            </label>
          </div>

          {/* Required Documents Checklist */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                Statutory Documents Checklist ({requiredDocs.length})
              </span>
            </div>

            <div className="space-y-2">
              {requiredDocs.map(doc => (
                <div key={doc.id} className="p-3 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between gap-3">
                  <div className="max-w-md">
                    <div className="font-bold text-slate-900 flex items-center space-x-2">
                      <span>{doc.title}</span>
                      <span className="text-[10px] text-slate-500">({doc.departmentAuthority})</span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-0.5">{doc.validationCriteria}</p>
                  </div>

                  <div className="flex items-center space-x-3 shrink-0">
                    <button
                      type="button"
                      onClick={() => handleToggleDocMandatory(doc.id)}
                      className={`px-2 py-1 rounded text-[10px] font-bold ${
                        doc.isMandatory ? 'bg-rose-100 text-rose-800' : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {doc.isMandatory ? 'Mandatory' : 'Optional'}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleRemoveDoc(doc.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-100 px-6 py-3.5 border-t border-slate-200 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-slate-300 hover:bg-white text-slate-700 font-semibold text-xs rounded-lg"
          >
            Cancel
          </button>
          <button
            id="save-tender-checklist-btn"
            onClick={handleSave}
            className="px-5 py-2.5 bg-[#002B5B] hover:bg-[#003875] text-white font-bold text-xs rounded-lg shadow-sm transition-all flex items-center space-x-1.5"
          >
            <span>Save & Publish Checklist</span>
          </button>
        </div>
      </div>
    </div>
  );
};
