import React from 'react';
import { SystemNotification } from '../types';
import { X, Bell, CheckCircle2, AlertTriangle, AlertCircle, Info, Check } from 'lucide-react';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: SystemNotification[];
  onMarkAllRead: () => void;
  onSelectNotification?: (submissionId?: string) => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAllRead,
  onSelectNotification,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-2xs">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-300">
        {/* Drawer Header */}
        <div className="bg-[#002B5B] text-white px-5 py-4 flex items-center justify-between border-b-2 border-[#F27D26]">
          <div className="flex items-center space-x-2.5">
            <Bell className="w-5 h-5 text-[#F27D26]" />
            <div>
              <h3 className="text-sm font-bold">System Alerts & Notifications</h3>
              <p className="text-[11px] text-blue-200">
                Real-time compliance status changes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-blue-200 hover:text-white p-1 rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action toolbar */}
        <div className="bg-slate-50 px-5 py-2.5 border-b border-slate-200 flex justify-between items-center text-xs">
          <span className="font-bold text-slate-700">
            {notifications.filter(n => !n.read).length} Unread Notifications
          </span>
          <button
            onClick={onMarkAllRead}
            className="text-[#002B5B] hover:text-[#003875] font-bold flex items-center space-x-1 transition-colors"
          >
            <Check className="w-3.5 h-3.5" />
            <span>Mark All as Read</span>
          </button>
        </div>

        {/* Notifications list */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-xs">
              No notifications yet.
            </div>
          ) : (
            notifications.map(n => (
              <div
                key={n.id}
                onClick={() => {
                  if (onSelectNotification && n.relatedSubmissionId) {
                    onSelectNotification(n.relatedSubmissionId);
                  }
                }}
                className={`p-3.5 rounded-xl border text-xs transition-all cursor-pointer ${
                  !n.read ? 'bg-blue-50/50 border-blue-200 shadow-2xs' : 'bg-white border-slate-200'
                }`}
              >
                <div className="flex items-start space-x-2.5">
                  {n.type === 'ALERT' ? (
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  ) : n.type === 'WARNING' ? (
                    <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  ) : n.type === 'SUCCESS' ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  )}

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-0.5">
                      <h4 className="font-bold text-slate-900 text-xs">{n.title}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <p className="text-slate-600 leading-relaxed text-[11px]">{n.message}</p>
                    {n.relatedSubmissionId && (
                      <span className="inline-block mt-1.5 text-[10px] font-bold text-[#1e3a8a] bg-blue-100/70 px-2 py-0.5 rounded">
                        View Submission
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
