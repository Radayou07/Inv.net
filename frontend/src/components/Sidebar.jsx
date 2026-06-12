import React from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onClose?: () => void;
  isMobile?: boolean;
}

export default function Sidebar({ activeTab, setActiveTab, onClose, isMobile = false }: SidebarProps) {
  const menuItems = [
    { id: 'home', label: 'Dashboard', icon: 'dashboard' },
    { id: 'product', label: 'Product Catalog', icon: 'inventory_2' },
    { id: 'inventory', label: 'Inventory Monitor', icon: 'warehouse' },
    { id: 'customer', label: 'Customer Metrics', icon: 'group' },
    { id: 'supplier', label: 'Supplier Oversight', icon: 'local_shipping' },
  ];

  const adminItems = [
    { id: 'account', label: 'Account Profile', icon: 'manage_accounts' },
    { id: 'admin', label: 'Settings', icon: 'settings' },
  ];

  return (
    <div className={`h-full flex flex-col bg-white text-slate-800 select-none ${isMobile ? 'w-64' : 'w-full'}`} id="sidebar-container">
      {/* Brand Header */}
      <div className="p-8 flex items-center justify-between border-b border-slate-200 h-20 shrink-0" id="sidebar-header">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-sm rotate-45 flex-shrink-0 flex items-center justify-center text-white" id="brand-logo">
            <span className="material-symbols-outlined text-[16px] -rotate-45" style={{ fontVariationSettings: "'FILL' 1" }}>
              security
            </span>
          </div>
          <div>
            <h1 className="font-sans text-lg font-bold text-slate-900 uppercase tracking-widest leading-none">Nexus.Core</h1>
            <p className="font-sans text-[10px] text-slate-400 mt-1 uppercase tracking-wider font-semibold">Enterprise Access</p>
          </div>
        </div>
        {/* Mobile Close Button */}
        {isMobile && onClose && (
          <button 
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-sm text-slate-500 hover:text-slate-900 transition-colors focus:outline-none"
            aria-label="Close menu"
            id="mobile-close-btn"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        )}
      </div>

      {/* Navigation List */}
      <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-0.5" id="sidebar-navigation">
        {menuItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (isMobile && onClose) onClose();
              }}
              className={`flex items-center gap-4 px-8 py-3.5 font-sans text-sm font-semibold transition-all duration-150 text-left border-l-4 ${
                isActive
                  ? 'text-blue-700 border-blue-600 bg-slate-100'
                  : 'text-slate-500 border-transparent hover:text-slate-900 hover:bg-slate-50'
              }`}
              id={`nav-item-${item.id}`}
            >
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: isActive ? "'FILL' 1" : undefined }}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}

        <div className="my-4 border-t border-slate-100" />

        {adminItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (isMobile && onClose) onClose();
              }}
              className={`flex items-center gap-4 px-8 py-3.5 font-sans text-sm font-semibold transition-all duration-150 text-left border-l-4 ${
                isActive
                  ? 'text-blue-700 border-blue-600 bg-slate-100'
                  : 'text-slate-500 border-transparent hover:text-slate-900 hover:bg-slate-50'
              }`}
              id={`nav-item-${item.id}`}
            >
              <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: isActive ? "'FILL' 1" : undefined }}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* User Information Profile Section */}
      <div className="p-8 border-t border-slate-100 shrink-0" id="sidebar-profile">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-100 border border-slate-200 rounded-full flex items-center justify-center font-bold text-slate-600 shadow-none text-sm shrink-0" id="user-avatar-badge">
            EP
          </div>
          <div className="flex flex-col min-w-0" id="user-info-text">
            <span className="text-sm font-bold text-slate-800 truncate leading-tight">E. Mitchell</span>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">ID: 94028</span>
          </div>
        </div>
      </div>
    </div>
  );
}
