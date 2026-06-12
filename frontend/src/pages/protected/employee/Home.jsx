import React, { useState, useMemo } from 'react';
import Sidebar from '../../../components/Sidebar';

// Type definitions
interface Product {
  id: string;
  code: string;
  name: string;
  category: 'Electronics' | 'Software' | 'Hardware' | 'Others';
  stock: number;
  minStock: number;
  price: number;
  salesVolume: number;
}

interface Customer {
  rank: number;
  id: string;
  name: string;
  avatar: string;
  avatarBg: string;
  industry: string;
  value: number;
  email: string;
}

interface Supplier {
  id: string;
  name: string;
  industry: string;
  reliability: 'Excellent' | 'Good' | 'Average' | 'Risk';
  contact: string;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  // Dynamic States reflecting actual application flow
  const [products, setProducts] = useState<Product[]>([
    { id: '1', code: 'PR-1', name: 'Premium Cloud Connector', category: 'Software', stock: 120, minStock: 20, price: 450, salesVolume: 820 },
    { id: '2', code: 'PR-2', name: 'AI Core Processor Board', category: 'Hardware', stock: 8, minStock: 15, price: 1200, salesVolume: 940 }, // Low Stock
    { id: '3', code: 'PR-3', name: 'Enterprise Router RX-9', category: 'Electronics', stock: 4, minStock: 10, price: 850, salesVolume: 410 }, // Low Stock
    { id: '4', code: 'PR-4', name: 'SaaS Suite Ultimate (1yr)', category: 'Software', stock: 450, minStock: 0, price: 299, salesVolume: 1250 },
    { id: '5', code: 'PR-5', name: 'Secured Enclave Module', category: 'Hardware', stock: 3, minStock: 12, price: 1500, salesVolume: 670 }, // Low Stock
    { id: '6', code: 'PR-6', name: 'Fibre Optic Transceiver', category: 'Electronics', stock: 85, minStock: 15, price: 120, salesVolume: 350 },
    { id: '7', code: 'PR-7', name: 'Biometric Scanner v2', category: 'Hardware', stock: 5, minStock: 10, price: 620, salesVolume: 512 }, // Low Stock
    { id: '8', code: 'PR-8', name: 'Database License Tier 4', category: 'Software', stock: 210, minStock: 5, price: 4400, salesVolume: 800 },
    { id: '9', code: 'PR-9', name: 'Smart Power Allocator', category: 'Electronics', stock: 2, minStock: 8, price: 340, salesVolume: 290 }, // Low Stock
    { id: '10', code: 'PR-10', name: 'Dynamic Access Matrix SDK', category: 'Software', stock: 95, minStock: 10, price: 199, salesVolume: 1100 },
  ]);

  const [customers, setCustomers] = useState<Customer[]>([
    { rank: 1, id: 'CUST-1', name: 'Acme Corp International', avatar: 'Ac', avatarBg: 'bg-secondary-container text-on-secondary-container', industry: 'Technology', value: 450000, email: 'billing@acme.com' },
    { rank: 2, id: 'CUST-2', name: 'Global Logistics Inc.', avatar: 'Gl', avatarBg: 'bg-tertiary-fixed text-on-tertiary-fixed', industry: 'Shipping', value: 380500, email: 'finance@globallogistics.com' },
    { rank: 3, id: 'CUST-3', name: 'Stark Industries', avatar: 'St', avatarBg: 'bg-surface-tint text-on-primary', industry: 'Manufacturing', value: 310200, email: 'accounts@stark.com' },
    { rank: 4, id: 'CUST-4', name: 'Wayne Enterprises', avatar: 'We', avatarBg: 'bg-primary-container text-on-primary-container', industry: 'Technology', value: 245000, email: 'finance@wayne.com' },
    { rank: 5, id: 'CUST-5', name: 'Umbrella Corporation', avatar: 'Uc', avatarBg: 'bg-error-container text-on-error-container', industry: 'BioTech', value: 189000, email: 'procure@umbrella.com' },
  ]);

  const [suppliers, setSuppliers] = useState<Supplier[]>([
    { id: 'SUP-01', name: 'Apex Semiconductors Ltd', industry: 'Silicon Foundry', reliability: 'Excellent', contact: 'sales@apexsemi.com' },
    { id: 'SUP-02', name: 'Zenith Logistics & Cargo', industry: 'Courier Services', reliability: 'Good', contact: 'delivery@zenithcargo.com' },
    { id: 'SUP-03', name: 'Summit Metal Prototyping', industry: 'Industrial Parts', reliability: 'Average', contact: 'proto@summitmetal.com' },
    { id: 'SUP-04', name: 'HyperScale Servers Org', industry: 'Cloud Nodes', reliability: 'Risk', contact: 'help@hyperscalers.org' },
  ]);

  // Selected item modals / popup states
  const [selectedLowStockModal, setSelectedLowStockModal] = useState<boolean>(false);
  const [viewAllCustomersModal, setViewAllCustomersModal] = useState<boolean>(false);
  const [addProductModal, setAddProductModal] = useState<boolean>(false);
  const [addCustomerModal, setAddCustomerModal] = useState<boolean>(false);

  // Add Product Form state
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    code: 'PR-11',
    name: '',
    category: 'Electronics',
    stock: 20,
    minStock: 5,
    price: 150,
    salesVolume: 0,
  });

  // Add Customer Form state
  const [newCustomer, setNewCustomer] = useState<Partial<Customer>>({
    name: '',
    industry: 'Technology',
    value: 50000,
    email: '',
  });

  // Interactive Chart Toggles
  const [financialTimeframe, setFinancialTimeframe] = useState<'month' | 'quarter' | 'year'>('month');
  const [categoryHighlight, setCategoryHighlight] = useState<string | null>(null);

  // Derived variables
  const lowStockItems = useMemo(() => {
    return products.filter((p) => p.stock < p.minStock);
  }, [products]);

  const totalProductsCount = useMemo(() => {
    return products.length;
  }, [products]);

  const totalCustomersCount = useMemo(() => {
    return customers.length;
  }, [customers]);

  // Add simulated analytics
  const rawProductSum = useMemo(() => {
    return products.reduce((acc, p) => acc + p.stock, 0);
  }, [products]);

  // Handle Form Submission
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.name || !newProduct.code) return;
    
    const productToAdd: Product = {
      id: Date.now().toString(),
      code: newProduct.code,
      name: newProduct.name,
      category: newProduct.category as any,
      stock: Number(newProduct.stock) || 0,
      minStock: Number(newProduct.minStock) || 0,
      price: Number(newProduct.price) || 0,
      salesVolume: Number(newProduct.salesVolume) || 0,
    };

    setProducts((prev) => [...prev, productToAdd]);
    setNewProduct({
      code: `PR-${products.length + 12}`,
      name: '',
      category: 'Electronics',
      stock: 25,
      minStock: 8,
      price: 299,
      salesVolume: 0,
    });
    setAddProductModal(false);
  };

  const handleAddCustomer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustomer.name || !newCustomer.email) return;

    const initials = newCustomer.name.substring(0, 2);
    const bgClasses = [
      'bg-primary-fixed text-on-primary-fixed-variant',
      'bg-secondary-fixed text-on-secondary-fixed-variant',
      'bg-tertiary-fixed text-on-tertiary-fixed-variant',
      'bg-surface-tint text-on-primary',
    ];
    const chosenBg = bgClasses[customers.length % bgClasses.length];

    const customerToAdd: Customer = {
      rank: customers.length + 1,
      id: `CUST-${customers.length + 1}`,
      name: newCustomer.name,
      avatar: initials,
      avatarBg: chosenBg,
      industry: newCustomer.industry || 'Technology',
      value: Number(newCustomer.value) || 12000,
      email: newCustomer.email,
    };

    // Sorted immediately based on Total Value
    const updated = [...customers, customerToAdd].sort((a, b) => b.value - a.value);
    
    // Re-assign ranks
    const reranked = updated.map((c, index) => ({
      ...c,
      rank: index + 1,
    }));

    setCustomers(reranked);
    setNewCustomer({
      name: '',
      industry: 'Technology',
      value: 100000,
      email: '',
    });
    setAddCustomerModal(false);
  };

  // Simulated restock function to help users test dashboard reactivity
  const handleRestock = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          // Add enough stock to go above minStock
          const additional = p.minStock + 10 - p.stock;
          return { ...p, stock: p.stock + additional };
        }
        return p;
      })
    );
  };

  // Filter lists based on global search in real time
  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [products, searchQuery]);

  const filteredCustomers = useMemo(() => {
    if (!searchQuery) return customers;
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.industry.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [customers, searchQuery]);

  // Donut chart category counting
  const categoryCounts = useMemo(() => {
    const counts = { Electronics: 0, Software: 0, Hardware: 0, Others: 0 };
    products.forEach((p) => {
      if (counts[p.category] !== undefined) {
        counts[p.category] += 1;
      } else {
        counts.Others += 1;
      }
    });
    return counts;
  }, [products]);

  // Simulated Area chart coordinates based on timeframe
  const financialData = useMemo(() => {
    switch (financialTimeframe) {
      case 'quarter':
        return {
          spendPath: 'M0,100 L0,55 Q20,70 40,40 T80,85 T100,50 L100,100 Z',
          spendLine: 'M0,55 Q20,70 40,40 T80,85 T100,50',
          spendFill: '#ffdad6',
          spendColor: '#ba1a1a',
          incomePath: 'M0,100 L0,85 Q15,45 35,65 T70,25 T100,30 L100,100 Z',
          incomeLine: 'M0,85 Q15,45 35,65 T70,25 T100,30',
          incomeFill: '#dfe0ff',
          incomeColor: '#142175',
          months: ['Jan', 'Feb', 'Mar'],
          incomeTotal: '$1.42M',
          spendTotal: '$0.84M',
        };
      case 'year':
        return {
          spendPath: 'M0,100 L0,65 Q30,45 60,75 T100,55 L100,100 Z',
          spendLine: 'M0,65 Q30,45 60,75 T100,55',
          spendFill: '#ffdad6',
          spendColor: '#ba1a1a',
          incomePath: 'M0,100 L0,90 Q20,40 50,60 T100,20 L100,100 Z',
          incomeLine: 'M0,90 Q20,40 50,60 T100,20',
          incomeFill: '#dfe0ff',
          incomeColor: '#142175',
          months: ['Q1', 'Q2', 'Q3', 'Q4'],
          incomeTotal: '$5.80M',
          spendTotal: '$3.10M',
        };
      case 'month':
      default:
        return {
          spendPath: 'M0,100 L0,70 Q25,80 50,50 T100,60 L100,100 Z',
          spendLine: 'M0,70 Q25,80 50,50 T100,60',
          spendFill: '#ffdad6',
          spendColor: '#ba1a1a',
          incomePath: 'M0,100 L0,90 Q20,60 40,80 T80,30 T100,40 L100,100 Z',
          incomeLine: 'M0,90 Q20,60 40,80 T80,30 T100,40',
          incomeFill: '#dfe0ff',
          incomeColor: '#142175',
          months: ['Wk 1', 'Wk 2', 'Wk 3', 'Wk 4'],
          incomeTotal: '$485,300.00',
          spendTotal: '$260,110.00',
        };
    }
  }, [financialTimeframe]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-55 text-slate-800 relative font-sans" id="app-root-layout">
      
      {/* 1. Normal Desktop Side Navigation Menu */}
      <aside className="hidden md:flex md:w-64 border-r border-slate-200 bg-white shrink-0" id="desktop-sidebar-aside">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      </aside>

      {/* 2. Responsive Modal Sidebar Drawer with dark modal overlay on mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex" id="mobile-sidebar-backdrop-portal">
          {/* Backdrop Overlay */}
          <div 
            className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
            id="mobile-sidebar-overlay"
          />
          {/* Drawer Panel Container */}
          <div className="relative z-50 animate-slide-in h-full flex flex-col max-w-xs shadow-2xl bg-white" id="mobile-sidebar-drawer">
            <Sidebar 
              activeTab={activeTab} 
              setActiveTab={setActiveTab} 
              isMobile={true} 
              onClose={() => setIsSidebarOpen(false)} 
            />
          </div>
        </div>
      )}

      {/* 3. Main Content Wrapper */}
      <div className="flex-1 flex flex-col h-full overflow-hidden min-w-0" id="main-content-scaler-wrapper">
        
        {/* Top Header Section */}
        <header className="flex justify-between items-center px-8 border-b border-slate-200 h-20 shrink-0 bg-white sticky top-0 z-40" id="top-navbar">
          
          {/* Mobile Hamburger toggle and branding */}
          <div className="flex items-center gap-3 md:hidden" id="mobile-hamburger-panel">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-1.5 focus:outline-none hover:bg-slate-150 rounded-sm text-slate-500 transition-all"
              aria-label="Open navigation menu"
              id="hamburger-btn"
            >
              <span className="material-symbols-outlined text-[24px]">menu</span>
            </button>
            <div className="flex items-center gap-1.5" id="mobile-brand-tag">
              <span className="material-symbols-outlined text-blue-600 text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>security</span>
              <span className="font-extrabold text-slate-900 text-md font-sans">NexusAuth</span>
            </div>
          </div>

          {/* Clean Realtime Search Panel */}
          <div className="hidden sm:flex flex-1 items-center max-w-md" id="search-input-panel">
            <div className="relative w-full focus-within:ring-2 focus-within:ring-blue-600/20 rounded-sm bg-slate-50 flex items-center px-4 h-11 transition-all border border-slate-200">
              <span className="material-symbols-outlined text-slate-400 text-[20px] mr-2">search</span>
              <input 
                className="bg-transparent border-none focus:ring-0 w-full text-sm text-slate-800 outline-none placeholder-slate-400" 
                placeholder={
                  activeTab === 'home' || activeTab === 'customer' 
                    ? "Search partners, industries..." 
                    : activeTab === 'product' || activeTab2('inventory')
                    ? "Search product criteria..."
                    : "Search..."
                }
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                id="search-input"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="p-1 hover:bg-slate-200 rounded-sm text-slate-500"
                  id="search-clear-btn"
                >
                  <span className="material-symbols-outlined text-[16px]">close</span>
                </button>
              )}
            </div>
          </div>

          {/* Top Actions Panel */}
          <div className="flex items-center gap-4 ml-auto" id="top-actions-panel">
            {/* Quick search on mobile modal */}
            <div className="sm:hidden" id="mobile-search-indicator">
              <button 
                onClick={() => {
                  const query = prompt('Enter keyword to search:', searchQuery);
                  if (query !== null) setSearchQuery(query);
                }}
                className="p-2 text-slate-500 hover:text-blue-600 transition-all relative focus:outline-none rounded-sm hover:bg-slate-50"
                id="mobile-search-prompt"
              >
                <span className="material-symbols-outlined text-[20px]">search</span>
                {searchQuery && <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-blue-600 rounded-full"></span>}
              </button>
            </div>

            <button 
              onClick={() => alert(`NexusAuth Assistance\n\n- Welcome back! Use the sidebar navigation tabs to view your product data bases.\n- Dynamic tables support inline filters via the top search bar.\n- Click "Low Stock Items" to initiate instantaneous restocking processes.`)}
              className="p-2 text-slate-500 hover:text-blue-600 transition-all rounded-sm hover:bg-slate-50 focus:outline-none"
              title="Documentation Assistance"
              id="doc-assistance-btn"
            >
              <span className="material-symbols-outlined text-[20px]">help_outline</span>
            </button>
            
            <div className="relative shrink-0" id="notification-wrapper">
              <button 
                onClick={() => setSelectedLowStockModal(true)}
                className="p-2 text-slate-500 hover:text-blue-600 transition-all rounded-sm hover:bg-slate-50 relative focus:outline-none"
                title={`${lowStockItems.length} Low Stock alerts active!`}
                id="notifications-btn"
              >
                <span className="material-symbols-outlined text-[20px]">notifications</span>
                {lowStockItems.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-600 rounded-full ring-2 ring-white animate-bounce"></span>
                )}
              </button>
            </div>

            <div className="h-6 w-px bg-slate-200" id="divider-actions"></div>
            
            <button 
              onClick={() => setActiveTab('account')}
              className="flex items-center gap-2 focus:outline-none p-1 rounded-sm hover:bg-slate-50 transition-all"
              title="View Profile Account"
              id="avatar-button"
            >
              <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs">
                EP
              </div>
            </button>
          </div>
        </header>

        {/* Dashboard Responsive Canvas */}
        <main className="flex-1 overflow-y-auto px-8 py-10 bg-slate-50 relative" id="scrollable-canvas">
          <div className="max-w-[1400px] mx-auto flex flex-col gap-8" id="inner-page-layout">
            
            {/* Tab 1: HOME DASHBOARD */}
            {activeTab === 'home' && (
              <div className="flex flex-col gap-8 animate-fade-in" id="dashboard-view-segment">
                
                {/* Welcoming Page Title */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0" id="view-header-title">
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Friday, June 12, 2026</p>
                    <h2 className="text-3xl font-light text-slate-800 mt-1">Good Morning, <span className="font-semibold text-slate-900">E. Mitchell</span></h2>
                  </div>
                  <div className="bg-white border border-slate-200 px-5 py-3 flex flex-col items-start md:items-end gap-1 rounded-none shadow-none">
                    <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">System Status</p>
                    <span className="text-xs text-blue-600 font-extrabold uppercase tracking-widest flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                      Core Control Active
                    </span>
                  </div>
                </div>

                {/* Bento Grid layout Row 1: Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" id="bento-summary-cards">
                  
                  {/* Card A: Total Customers */}
                  <div 
                    onClick={() => setActiveTab('customer')}
                    className="glass-card rounded-2xl p-6 flex flex-col justify-between h-[155px] cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden text-left"
                    id="card-total-customers"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-secondary-container/10 rounded-bl-full group-hover:scale-110 transition-transform"></div>
                    <div className="flex justify-between items-start z-10">
                      <div className="w-10 h-10 rounded-xl bg-surface-container-high flex items-center justify-center shadow-sm">
                        <span className="material-symbols-outlined text-secondary text-[22px]">group</span>
                      </div>
                      <span className="text-[11px] font-bold text-green-700 flex items-center gap-0.5 bg-green-100 px-2.5 py-1 rounded-full shadow-sm">
                        <span className="material-symbols-outlined text-[12px] font-bold">trending_up</span> +5.2%
                      </span>
                    </div>
                    <div className="mt-4 z-10">
                      <p className="text-xs font-bold text-on-surface-variant tracking-wide uppercase">Total Customers</p>
                      <h3 className="text-3xl font-extrabold text-on-background mt-1">{totalCustomersCount}</h3>
                    </div>
                    <div className="absolute bottom-2 right-4 flex items-center gap-1 text-[10px] text-primary opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                      <span>View Customers</span>
                      <span className="material-symbols-outlined text-[10px]">arrow_forward</span>
                    </div>
                  </div>

                  {/* Card B: Total Products */}
                  <div 
                    onClick={() => setActiveTab('product')}
                    className="glass-card rounded-2xl p-6 flex flex-col justify-between h-[155px] cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-300 group relative overflow-hidden text-left"
                    id="card-total-products"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary-container/5 rounded-bl-full group-hover:scale-110 transition-transform"></div>
                    <div className="flex justify-between items-start z-10">
                      <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center shadow-sm text-primary">
                        <span className="material-symbols-outlined text-primary text-[22px]">inventory_2</span>
                      </div>
                      <span className="text-[11px] font-bold text-green-700 flex items-center gap-0.5 bg-green-100 px-2.5 py-1 rounded-full shadow-sm">
                        <span className="material-symbols-outlined text-[12px] font-bold">trending_up</span> +12.4%
                      </span>
                    </div>
                    <div className="mt-4 z-10">
                      <p className="text-xs font-bold text-on-surface-variant tracking-wide uppercase">Total Products</p>
                      <h3 className="text-3xl font-extrabold text-on-background mt-1">8,430</h3>
                    </div>
                    <div className="absolute bottom-2 right-4 flex items-center gap-1 text-[10px] text-primary opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                      <span>View Catalog</span>
                      <span className="material-symbols-outlined text-[10px]">arrow_forward</span>
                    </div>
                  </div>

                  {/* Card C: Low Stock Warning Card */}
                  <div 
                    onClick={() => setSelectedLowStockModal(true)}
                    className="bg-error-container hover:bg-error-container/90 rounded-2xl p-6 flex flex-col justify-between h-[155px] cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group border border-red-200/50 text-left"
                    title="Click to check details"
                    id="card-low-stock-alert"
                  >
                    <div className="absolute top-0 right-0 w-28 h-28 bg-error/10 rounded-bl-full group-hover:scale-115 transition-transform duration-500"></div>
                    <div className="flex justify-between items-start relative z-10">
                      <div className="w-10 h-10 rounded-xl bg-white/75 flex items-center justify-center shadow-sm text-error">
                        <span className="material-symbols-outlined text-error text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                      </div>
                      <span className="text-[11px] font-bold text-on-error-container bg-white/60 px-2.5 py-1 rounded-full shadow-sm border border-red-300/30">Action Required</span>
                    </div>
                    <div className="relative z-10 mt-4">
                      <p className="text-xs font-bold text-on-error-container/80 tracking-wide uppercase">Low Stock Items</p>
                      <h3 className="text-3xl font-extrabold text-[#93000a] mt-1">
                        {lowStockItems.length} <span className="text-sm font-semibold opacity-85">SKUs</span>
                      </h3>
                    </div>
                    <div className="absolute bottom-2 right-4 flex items-center gap-1 text-[10px] text-[#93000a] font-bold group-hover:underline transition-all">
                      <span>Trigger Restock Matrix</span>
                      <span className="material-symbols-outlined text-[10px]">flash_on</span>
                    </div>
                  </div>

                </div>

                {/* Bento Grid Row 2: Charts Area */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="bento-charts-layout">
                  
                  {/* Chart Block A: Top Products Sales (Donut Circle Representation) */}
                  <div className="lg:col-span-4 glass-card rounded-2xl p-6 flex flex-col border border-surface-container shadow-sm hover:shadow-md transition-shadow text-left" id="chart-top-products">
                    <div className="flex justify-between items-center mb-6" id="chart-top-prod-header">
                      <div>
                        <h3 className="text-lg font-bold text-on-background tracking-tight">Top Products</h3>
                        <p className="text-xs text-on-surface-variant font-medium">By lifetime sales volume</p>
                      </div>
                      
                      <div className="relative" id="product-menu-trigger">
                        <button 
                          onClick={() => alert('Top products statistics are calculated using active orders filtered by high sales rate. Currently showing aggregated catalog distribution.')}
                          className="w-8 h-8 rounded-full hover:bg-surface-container flex items-center justify-center transition-colors text-outline"
                          title="View Info"
                          id="btn-more-product"
                        >
                          <span className="material-symbols-outlined text-[18px]">info</span>
                        </button>
                      </div>
                    </div>

                    {/* Donut graphic chart structure centered */}
                    <div className="flex-1 flex flex-col items-center justify-center relative min-h-[220px]" id="donut-svg-wrapper">
                      <div className="relative w-44 h-44" id="donut-graph-container">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          {/* Segment 1 */}
                          <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#eceef0" strokeWidth="4" />
                          {/* Segment 2 - Electronics */}
                          <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#142175" strokeWidth="4" strokeDasharray="40 100" strokeDashoffset="0" className="transition-all hover:stroke-[5] cursor-pointer" />
                          {/* Segment 3 - Software */}
                          <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#2e3a8c" strokeWidth="4" strokeDasharray="25 100" strokeDashoffset="-40" className="transition-all hover:stroke-[5] cursor-pointer" />
                          {/* Segment 4 - Hardware */}
                          <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#505f76" strokeWidth="4" strokeDasharray="20 100" strokeDashoffset="-65" className="transition-all hover:stroke-[5] cursor-pointer" />
                          {/* Segment 5 - Others */}
                          <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#b7c8e1" strokeWidth="4" strokeDasharray="15 100" strokeDashoffset="-85" className="transition-all hover:stroke-[5] cursor-pointer" />
                        </svg>

                        {/* Central Label inside Donut circle */}
                        <div className="absolute inset-0 flex items-center justify-center flex-col pointer-events-none" id="donut-central-meta">
                          <span className="text-2xl font-black text-primary leading-none">10</span>
                          <span className="text-[10px] text-secondary font-bold uppercase tracking-wider mt-1">Categories</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer Labels list mapping layout */}
                    <div className="grid grid-cols-4 gap-1 pt-4 border-t border-outline-variant/40 mt-4 text-center" id="donut-product-labels">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-[#142175]">PR-1</span>
                        <span className="text-[9px] text-[#505f76] font-medium uppercase mt-0.5">Cloud</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-extrabold text-primary">PR-2</span>
                        <span className="text-[9px] text-primary/80 font-medium uppercase mt-0.5">AI Core</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-[#505f76]">PR-3</span>
                        <span className="text-[9px] text-[#505f76] font-medium uppercase mt-0.5">Router</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-[#b7c8e1]">PR-4</span>
                        <span className="text-[9px] text-[#505f76]/70 font-medium uppercase mt-0.5">SaaS</span>
                      </div>
                    </div>
                  </div>

                  {/* Chart Block B: Area Chart Visualizer (Financial Overview) */}
                  <div className="lg:col-span-8 glass-card rounded-2xl p-6 flex flex-col border border-surface-container shadow-sm hover:shadow-md transition-all text-left" id="financial-overview-block">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4" id="chart-financial-header">
                      <div>
                        <h3 className="text-lg font-bold text-on-background tracking-tight">Financial Overview</h3>
                        <p className="text-xs text-on-surface-variant font-medium">Income cash flow vs operational spend metrics</p>
                      </div>

                      {/* Timeframe selector dropdown pills */}
                      <div className="flex items-center bg-surface-container rounded-lg p-0.5 border border-outline-variant/40 self-start" id="timeframe-pills">
                        <button 
                          onClick={() => setFinancialTimeframe('month')}
                          className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${financialTimeframe === 'month' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-secondary hover:text-primary'}`}
                          id="btn-timeframe-month"
                        >
                          Month
                        </button>
                        <button 
                          onClick={() => setFinancialTimeframe('quarter')}
                          className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${financialTimeframe === 'quarter' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-secondary hover:text-primary'}`}
                          id="btn-timeframe-quarter"
                        >
                          Quarter
                        </button>
                        <button 
                          onClick={() => setFinancialTimeframe('year')}
                          className={`px-3 py-1 text-xs font-semibold rounded-md transition-all ${financialTimeframe === 'year' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-secondary hover:text-primary'}`}
                          id="btn-timeframe-year"
                        >
                          Year
                        </button>
                      </div>
                    </div>

                    {/* Legendary Info Pill Metrics */}
                    <div className="flex gap-6 mb-4 mt-2" id="chart-financial-legends">
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-low rounded-lg" id="legend-income">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-sm"></div>
                        <div className="flex flex-col text-left">
                          <span className="text-[10px] text-secondary font-bold uppercase leading-none">Total Income</span>
                          <span className="text-xs font-black text-primary mt-1">{financialData.incomeTotal}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 bg-surface-container-low rounded-lg" id="legend-spend">
                        <div className="w-2.5 h-2.5 rounded-full bg-error border border-error shadow-sm"></div>
                        <div className="flex flex-col text-left">
                          <span className="text-[10px] text-secondary font-bold uppercase leading-none">Total Spend</span>
                          <span className="text-xs font-black text-error mt-1">{financialData.spendTotal}</span>
                        </div>
                      </div>
                    </div>

                    {/* Responsive Area Chart Container mockup using full scalable interactive SVG coordinates with dynamic state */}
                    <div className="flex-1 relative min-h-[220px] w-full bg-surface-container-lowest rounded-xl overflow-hidden border border-surface-container/70" id="area-chart-svg-container">
                      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                        <defs>
                          <linearGradient id="income-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#dfe0ff" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#dfe0ff" stopOpacity="0.0" />
                          </linearGradient>
                          <linearGradient id="spend-grad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#ffdad6" stopOpacity="0.5" />
                            <stop offset="100%" stopColor="#ffdad6" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        
                        {/* Spend Area Representation (Backplate Curve) */}
                        <path d={financialData.spendPath} fill="url(#spend-grad)" />
                        <path d={financialData.spendLine} fill="none" stroke="#ba1a1a" strokeWidth="1.5" strokeDasharray="1,1" className="animate-pulse" />

                        {/* Income Area Representation (Frontplate Curve) */}
                        <path d={financialData.incomePath} fill="url(#income-grad)" />
                        <path d={financialData.incomeLine} fill="none" stroke="#142175" strokeWidth="2.5" />

                        {/* Visual guide markers */}
                        <line x1="25" y1="0" x2="25" y2="100" stroke="#eceef0" strokeWidth="0.5" strokeDasharray="3,3" />
                        <line x1="50" y1="0" x2="50" y2="100" stroke="#eceef0" strokeWidth="0.5" strokeDasharray="3,3" />
                        <line x1="75" y1="0" x2="75" y2="100" stroke="#eceef0" strokeWidth="0.5" strokeDasharray="3,3" />
                      </svg>

                      {/* Floating tooltip indicating live value calculation */}
                      <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-[#191c1e] text-[#f7f9fb] px-2.5 py-1 rounded-md text-[10px] font-mono shadow-md flex items-center gap-1.5 pointer-events-none z-10" id="chart-tooltip-bubble">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        <span>Performance Threshold: Peak Optimal</span>
                      </div>

                      {/* X-Axis labels mapping */}
                      <div className="absolute bottom-2 left-0 right-0 flex justify-between px-6 text-[10px] font-black text-secondary font-mono" id="chart-x-axis">
                        {financialData.months.map((m, i) => (
                          <span key={i}>{m}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Bento Grid Row 3: Live table and category dominance mapping */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6" id="bento-tables-layout">
                  
                  {/* Part A: Top Customers Matrix Table */}
                  <div className="lg:col-span-8 glass-card rounded-2xl p-6 border border-surface-container shadow-sm hover:shadow-md transition-shadow text-left" id="customers-table-panel">
                    <div className="flex justify-between items-center mb-5" id="customers-header">
                      <div>
                        <h3 className="text-lg font-bold text-on-background tracking-tight">Top Customers</h3>
                        <p className="text-xs text-on-surface-variant font-medium">Ranked by total enterprise lifetime value</p>
                      </div>
                      <div className="flex items-center gap-2" id="customers-header-actions">
                        <button 
                          onClick={() => {
                            setAddCustomerModal(true);
                          }}
                          className="px-3 py-1.5 bg-primary hover:bg-primary-container text-white text-xs font-semibold rounded-lg transition-all shadow-sm flex items-center gap-1"
                          id="btn-add-customer-trigger"
                        >
                          <span className="material-symbols-outlined text-[14px]">add</span> Add
                        </button>
                        <button 
                          onClick={() => setViewAllCustomersModal(true)}
                          className="hover:bg-surface-container text-primary text-xs font-bold px-3 py-2 rounded-lg transition-colors shrink-0"
                          id="btn-view-all-cust"
                        >
                          View All
                        </button>
                      </div>
                    </div>

                    {/* Table Render Wrapper */}
                    <div className="overflow-x-auto" id="customers-table-container">
                      <table className="w-full text-left border-collapse" id="customers-table">
                        <thead>
                          <tr className="border-b border-[#eceef0] bg-surface-container-low/50" id="table-head-row">
                            <th className="py-2.5 px-4 text-xs font-bold text-secondary uppercase tracking-wider w-16">Rank</th>
                            <th className="py-2.5 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Customer Name</th>
                            <th className="py-2.5 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Industry</th>
                            <th className="py-2.5 px-4 text-xs font-bold text-secondary uppercase tracking-wider text-right">Total Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredCustomers.slice(0, 3).map((cust) => (
                            <tr 
                              key={cust.id} 
                              className="border-b border-surface-container-highest/60 hover:bg-surface-container-low/30 transition-colors"
                              id={`customer-row-${cust.id}`}
                            >
                              <td className="py-3 px-4 text-sm font-extrabold text-on-background">#{cust.rank}</td>
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold shadow-sm shrink-0 ${cust.avatarBg}`}>
                                    {cust.avatar}
                                  </div>
                                  <div className="flex flex-col min-w-0">
                                    <span className="text-sm font-semibold text-on-background truncate">{cust.name}</span>
                                    <span className="text-[10px] text-secondary truncate">{cust.email}</span>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-surface-container text-[#454651] border border-outline-variant/30">
                                  {cust.industry}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-sm font-bold text-primary text-right font-mono">
                                ${cust.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Table status count pill */}
                    <div className="mt-4 flex items-center justify-between text-xs text-secondary font-medium" id="table-customer-footer-meta">
                      <span>Showing top 3 active accounts</span>
                      <span className="font-mono">Total Registry: {customers.length}</span>
                    </div>
                  </div>

                  {/* Part B: Category Dominance Distribution Pie */}
                  <div className="lg:col-span-4 glass-card rounded-2xl p-6 flex flex-col border border-surface-container shadow-sm hover:shadow-md transition-shadow text-left" id="category-dominance-panel">
                    <div className="mb-4" id="category-dominance-header">
                      <h3 className="text-lg font-bold text-on-background tracking-tight">Category Dominance</h3>
                      <p className="text-xs text-on-surface-variant font-medium">Distribution of top 10 products categories</p>
                    </div>

                    {/* Absolute dynamic list map rendering svg segmented layers */}
                    <div className="flex-1 flex items-center justify-center relative min-h-[200px]" id="pie-interactive-wrapper">
                      <div className="relative w-40 h-40" id="pie-segments-radial">
                        <svg className="w-full h-full transform rotate-45" viewBox="0 0 32 32">
                          {/* Segment 1 - Electronics */}
                          <circle cx="16" cy="16" r="14" fill="transparent" stroke="#142175" strokeWidth="4" strokeDasharray="45 100" strokeDashoffset="0" />
                          {/* Segment 2 - Software */}
                          <circle cx="16" cy="16" r="14" fill="transparent" stroke="#2e3a8c" strokeWidth="4" strokeDasharray="25 100" strokeDashoffset="-45" />
                          {/* Segment 3 - Hardware */}
                          <circle cx="16" cy="16" r="14" fill="transparent" stroke="#505f76" strokeWidth="4" strokeDasharray="20 100" strokeDashoffset="-70" />
                          {/* Segment 4 - Others */}
                          <circle cx="16" cy="16" r="14" fill="transparent" stroke="#b7c8e1" strokeWidth="4" strokeDasharray="10 100" strokeDashoffset="-90" />
                        </svg>

                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-surface-container-lowest rounded-full w-24 h-24 m-auto shadow-sm" id="pie-center-disc">
                          <span className="text-xl font-black text-primary leading-none">
                            {categoryCounts.Software + categoryCounts.Electronics + categoryCounts.Hardware + categoryCounts.Others}
                          </span>
                          <span className="text-[10px] text-secondary font-bold uppercase tracking-wider mt-1">Catalogs</span>
                        </div>
                      </div>
                    </div>

                    {/* Responsive Grid list of sectors with precise calculations */}
                    <div className="grid grid-cols-2 gap-2.5 mt-4 pt-4 border-t border-[#eceef0]" id="pie-legend-grid">
                      <div className="flex items-center gap-2 p-1 hover:bg-surface-container-low rounded-lg transition-colors" id="category-electronics-pill">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#142175] shrink-0"></div>
                        <div className="flex flex-col text-left">
                          <span className="text-[10px] text-secondary font-bold">Electronics</span>
                          <span className="text-xs font-extrabold text-on-background mt-0.5">{categoryCounts.Electronics} items</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-1 hover:bg-surface-container-low rounded-lg transition-colors" id="category-software-pill">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#2e3a8c] shrink-0"></div>
                        <div className="flex flex-col text-left">
                          <span className="text-[10px] text-secondary font-bold">Software</span>
                          <span className="text-xs font-extrabold text-on-background mt-0.5">{categoryCounts.Software} items</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-1 hover:bg-surface-container-low rounded-lg transition-colors" id="category-hardware-pill">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#505f76] shrink-0"></div>
                        <div className="flex flex-col text-left">
                          <span className="text-[10px] text-secondary font-bold">Hardware</span>
                          <span className="text-xs font-extrabold text-on-background mt-0.5">{categoryCounts.Hardware} items</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 p-1 hover:bg-surface-container-low rounded-lg transition-colors" id="category-others-pill">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#b7c8e1] shrink-0"></div>
                        <div className="flex flex-col text-left">
                          <span className="text-[10px] text-secondary font-bold">Others</span>
                          <span className="text-xs font-extrabold text-on-background mt-0.5">{categoryCounts.Others} items</span>
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            )}


            {/* Tab 2: PRODUCT MANAGEMENT & CATALOG TAB */}
            {activeTab === 'product' && (
              <div className="flex flex-col gap-6 animate-fade-in" id="product-list-view">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" id="inventory-header">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#142175]">Product Catalog</h2>
                    <p className="text-sm text-on-surface-variant mt-1">Configure item descriptions, pricing registers, and active volumes.</p>
                  </div>
                  <button 
                    onClick={() => {
                      setAddProductModal(true);
                    }}
                    className="self-start sm:self-center px-4 py-2 bg-primary hover:bg-primary-container text-white text-sm font-bold rounded-xl transition-all shadow-md flex items-center gap-2"
                    id="btn-create-prod"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span> Add Product
                  </button>
                </div>

                {/* Main list view block */}
                <div className="glass-card rounded-2xl p-6 border border-surface-container shadow-sm text-left" id="prod-table-wrapper">
                  <div className="mb-4 flex flex-col md:flex-row md:items-center justify-between gap-4" id="prod-table-filters">
                    <span className="text-sm font-extrabold text-secondary">Active Stock Repositories ({filteredProducts.length})</span>
                    {searchQuery && (
                      <span className="text-xs bg-primary-fixed text-primary px-3 py-1 rounded-full font-semibold">
                        Filtering by: "{searchQuery}"
                      </span>
                    )}
                  </div>

                  <div className="overflow-x-auto" id="prod-table-container">
                    <table className="w-full text-left border-collapse" id="products-full-table">
                      <thead>
                        <tr className="border-b border-[#eceef0] bg-surface-container-low/50">
                          <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider w-24">Code</th>
                          <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Product Name</th>
                          <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Category</th>
                          <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider text-right">Unit Price</th>
                          <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider text-right">Stock Level</th>
                          <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Status</th>
                          <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredProducts.map((p) => {
                          const isLow = p.stock < p.minStock;
                          return (
                            <tr key={p.id} className="border-b border-surface-container-highest/60 hover:bg-surface-container-low/30 transition-colors">
                              <td className="py-3 px-4 text-sm font-mono font-bold text-primary">{p.code}</td>
                              <td className="py-3 px-4">
                                <span className="text-sm font-bold text-on-background line-clamp-1">{p.name}</span>
                              </td>
                              <td className="py-3 px-4">
                                <span className="text-xs font-bold uppercase text-secondary px-2.5 py-0.5 rounded bg-surface-container-low border border-outline-variant/35">
                                  {p.category}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-sm font-bold text-right font-mono text-[#505f76]">
                                ${p.price.toFixed(2)}
                              </td>
                              <td className="py-3 px-4 text-right font-mono text-sm">
                                <span className={`font-bold ${isLow ? 'text-error animate-pulse' : 'text-on-background'}`}>
                                  {p.stock}
                                </span>
                                <span className="text-xs text-secondary tracking-tight"> / {p.minStock} min</span>
                              </td>
                              <td className="py-3 px-4">
                                {isLow ? (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-on-error-container bg-error-container px-2.5 py-1 rounded-full">
                                    <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
                                    Low Stock Warning
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-green-800 bg-green-100 px-2.5 py-1 rounded-full">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-600"></span>
                                    In Stock
                                  </span>
                                )}
                              </td>
                              <td className="py-3 px-4 text-center">
                                {isLow ? (
                                  <button 
                                    onClick={() => handleRestock(p.id)}
                                    className="px-3 py-1 bg-primary hover:bg-primary-container text-white text-[11px] font-bold rounded-lg transition-all shadow-sm"
                                    id={`restock-action-${p.id}`}
                                  >
                                    Restock +10
                                  </button>
                                ) : (
                                  <button 
                                    onClick={() => {
                                      setProducts(prev => prev.map(item => item.id === p.id ? { ...item, stock: item.stock + 5 } : item))
                                    }}
                                    className="px-2 py-1 hover:bg-surface-container text-secondary hover:text-primary text-[11px] font-medium rounded-lg transition-all"
                                    title="Add 5 units"
                                    id={`add-five-${p.id}`}
                                  >
                                    Add 5
                                  </button>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Empty state visual */}
                  {filteredProducts.length === 0 && (
                    <div className="py-12 text-center" id="empty-product-state">
                      <span className="material-symbols-outlined text-outline text-[48px] block mb-2">inventory_2</span>
                      <p className="text-sm font-bold text-secondary">No products match your search query: "{searchQuery}"</p>
                      <button 
                        onClick={() => setSearchQuery('')}
                        className="mt-3 text-xs text-primary font-bold hover:underline"
                        id="reset-query-btn"
                      >
                        Reset Filters
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}


            {/* Tab 3: INVENTORY TRACKER BLOCK */}
            {activeTab === 'inventory' && (
              <div className="flex flex-col gap-6 animate-fade-in" id="inventory-view">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-primary">Warehouse Inventory Settings</h2>
                  <p className="text-sm text-on-surface-variant mt-1">Configure system alarms, watch list thresholds, and view warehouse capacities.</p>
                </div>

                {/* Warehouse Stats layout grids */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6" id="warehouse-stats-grid">
                  <div className="glass-card rounded-2xl p-6 text-left">
                    <span className="text-xs font-bold text-secondary tracking-wider uppercase">Total Items In Stock</span>
                    <h3 className="text-2xl font-black text-primary mt-2">{rawProductSum} units</h3>
                    <div className="w-full bg-surface-container rounded-full h-1.5 mt-3">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <span className="text-[10px] text-secondary mt-1 block">45% Capacity Active</span>
                  </div>
                  <div className="glass-card rounded-2xl p-6 text-left">
                    <span className="text-xs font-bold text-secondary tracking-wider uppercase">Critical Threshold SKUs</span>
                    <h3 className="text-2xl font-black text-error mt-2">{lowStockItems.length} SKUs</h3>
                    <div className="w-full bg-surface-container rounded-full h-1.5 mt-3">
                      <div className="bg-error h-1.5 rounded-full animate-pulse" style={{ width: `${(lowStockItems.length / products.length) * 100}%` }}></div>
                    </div>
                    <span className="text-[10px] text-[#ba1a1a] font-semibold mt-1 block">{((lowStockItems.length / products.length) * 100).toFixed(0)}% alarms active</span>
                  </div>
                  <div className="glass-card rounded-2xl p-6 text-left">
                    <span className="text-xs font-bold text-secondary tracking-wider uppercase">Average Selling Value</span>
                    <h3 className="text-2xl font-black text-primary mt-2">$780.00 / item</h3>
                    <p className="text-[10px] text-secondary mt-4 block">Calculated over all 10 key categories</p>
                  </div>
                  <div className="glass-card rounded-2xl p-6 text-left bg-gradient-to-br from-primary/5 to-surface-tint/10 border border-primary/20">
                    <span className="text-xs font-bold text-primary tracking-wider uppercase">Stock Alerts</span>
                    <button 
                      onClick={() => {
                        // Quick automatic boost helper
                        setProducts((prev) => prev.map((p) => ({ ...p, stock: p.stock < p.minStock ? p.minStock + 12 : p.stock })));
                        alert('Automatic Restock Sequence complete. All warnings have been cleared successfully.');
                      }}
                      className="mt-3 w-full bg-primary hover:bg-primary-container text-white py-2 px-3 rounded-lg text-xs font-bold transition-all shadow"
                      id="bulk-restock-btn"
                    >
                      Instant Bulk Restock All
                    </button>
                    <span className="text-[9px] text-secondary mt-2 block text-center">Safety buffer preset: 10 units</span>
                  </div>
                </div>

                {/* Low Stock alarms mapping */}
                <div className="glass-card rounded-2xl p-6 border border-surface-container text-left" id="alarms-mapping-container">
                  <h3 className="text-md font-extrabold text-on-background mb-4">Urgent Attention Alarms</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="alarms-grid">
                    {lowStockItems.map(p => (
                      <div key={p.id} className="flex justify-between items-center bg-error-container p-4 rounded-xl border border-red-300/40" id={`alarm-item-${p.id}`}>
                        <div>
                          <p className="text-sm font-bold text-[#93000a]">{p.name}</p>
                          <span className="text-xs text-on-error-container/80 font-mono">Code: {p.code} | Stock: {p.stock} critical</span>
                        </div>
                        <button 
                          onClick={() => handleRestock(p.id)}
                          className="px-3 py-1.5 bg-white/95 hover:bg-white text-[#93000a] text-xs font-extrabold rounded-lg hover:shadow-sm"
                          id={`alarm-restock-btn-${p.id}`}
                        >
                          Fill Stock
                        </button>
                      </div>
                    ))}
                    {lowStockItems.length === 0 && (
                      <div className="col-span-2 py-8 text-center" id="no-alarms-state">
                        <span className="material-symbols-outlined text-green-600 text-[36px] block">check_circle</span>
                        <p className="text-sm font-bold text-green-800 mt-2">All warehouse item counts are above warning thresholds. No warnings present.</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}


            {/* Tab 4: CUSTOMERS REGISTRY TAB */}
            {activeTab === 'customer' && (
              <div className="flex flex-col gap-6 animate-fade-in" id="customer-view-tab">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4" id="customer-header">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-[#142175]">Customer Registry</h2>
                    <p className="text-sm text-on-surface-variant mt-1">Manage active enterprise accounts, industry fields, and contract valuations.</p>
                  </div>
                  <button 
                    onClick={() => {
                      setAddCustomerModal(true);
                    }}
                    className="self-start sm:self-center px-4 py-2 bg-primary hover:bg-primary-container text-white text-sm font-bold rounded-xl transition-all shadow-md flex items-center gap-2"
                    id="btn-customer-new"
                  >
                    <span className="material-symbols-outlined text-[18px]">add</span> Register Customer
                  </button>
                </div>

                {/* Customer list matrix */}
                <div className="glass-card rounded-2xl p-6 border border-surface-container shadow-sm text-left" id="customer-matrix">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse" id="customers-full-registration-table">
                      <thead>
                        <tr className="border-b border-[#eceef0] bg-surface-container-low/50">
                          <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider w-16">Rank</th>
                          <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Customer Name</th>
                          <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Contact Email</th>
                          <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Industry Sector</th>
                          <th className="py-3 px-2 text-xs font-bold text-secondary uppercase tracking-wider text-right">Lifetime Deal Value</th>
                          <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider text-center">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCustomers.map((cust) => (
                          <tr key={cust.id} className="border-b border-surface-container-highest/60 hover:bg-surface-container-low/30 transition-colors">
                            <td className="py-3 px-4 text-sm font-extrabold text-on-background">#{cust.rank}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold shadow-sm shrink-0 ${cust.avatarBg}`}>
                                  {cust.avatar}
                                </div>
                                <span className="text-sm font-bold text-on-background">{cust.name}</span>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-xs font-mono text-secondary">{cust.email}</td>
                            <td className="py-3 px-4">
                              <span className="text-xs bg-surface-container-low px-2.5 py-1 rounded-full text-secondary font-semibold border border-outline-variant/30">
                                {cust.industry}
                              </span>
                            </td>
                            <td className="py-3 px-2 text-sm font-bold text-primary text-right font-mono">
                              ${cust.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <span className="inline-flex items-center gap-1 text-[10px] font-bold text-green-800 bg-green-100 px-2 py-0.5 rounded-full">
                                Active Partner
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}


            {/* Tab 5: SUPPLIER MANAGEMENT TAB */}
            {activeTab === 'supplier' && (
              <div className="flex flex-col gap-6 animate-fade-in" id="supplier-view-tab">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-[#142175]">Authorized Suppliers</h2>
                  <p className="text-sm text-on-surface-variant mt-1">Registry of contract microprocessors, logistics partners, and hardware manufacturers.</p>
                </div>

                <div className="glass-card rounded-2xl p-6 border border-surface-container shadow-sm text-left" id="supplier-matrix">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse" id="suppliers-table">
                      <thead>
                        <tr className="border-b border-[#eceef0] bg-surface-container-low/50">
                          <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider w-24">ID</th>
                          <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Supplier Name</th>
                          <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Industry Sector</th>
                          <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Reliability Score</th>
                          <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider">Contact Email</th>
                          <th className="py-3 px-4 text-xs font-bold text-secondary uppercase tracking-wider text-center">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {suppliers.map((s) => (
                          <tr key={s.id} className="border-b border-surface-container-highest/60 hover:bg-surface-container-low/30 transition-colors">
                            <td className="py-3 px-4 text-xs font-mono font-bold text-primary">{s.id}</td>
                            <td className="py-3 px-4 text-sm font-bold text-on-background">{s.name}</td>
                            <td className="py-3 px-4 text-xs text-secondary">{s.industry}</td>
                            <td className="py-3 px-4">
                              {s.reliability === 'Excellent' && (
                                <span className="text-[10px] bg-green-100 text-green-800 border border-green-200 font-bold px-2.5 py-0.5 rounded-full">
                                  Excellent Reliability
                                </span>
                              )}
                              {s.reliability === 'Good' && (
                                <span className="text-[10px] bg-blue-100 text-blue-800 border border-blue-200 font-bold px-2.5 py-0.5 rounded-full">
                                  Good Score
                                </span>
                              )}
                              {s.reliability === 'Average' && (
                                <span className="text-[10px] bg-yellow-100 text-yellow-800 border border-yellow-200 font-bold px-2.5 py-0.5 rounded-full">
                                  Average Rank
                                </span>
                              )}
                              {s.reliability === 'Risk' && (
                                <span className="text-[10px] bg-red-100 text-red-800 border border-red-200 font-bold px-2.5 py-0.5 rounded-full animate-pulse">
                                  Attention Risk
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-xs font-mono text-secondary">{s.contact}</td>
                            <td className="py-3 px-4 text-center">
                              <button 
                                onClick={() => alert(`Initiating direct secure communication dispatch to ${s.name} (${s.contact}) via NexusAuth Mail Tunnel.`)}
                                className="px-2.5 py-1 text-xs hover:bg-primary hover:text-white rounded-lg border border-outline-variant/60 text-secondary font-semibold transition-all"
                                id={`contact-sup-${s.id}`}
                              >
                                Dispatch Msg
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}


            {/* Tab 6: ACCOUNT PROFILE DETAILS */}
            {activeTab === 'account' && (
              <div className="flex flex-col gap-6 animate-fade-in text-left" id="account-view-tab">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-primary">User Profile Account</h2>
                  <p className="text-sm text-on-surface-variant mt-1">Credentials authorization profile card representing your active security clearance status.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6" id="account-main-grid">
                  
                  {/* Left Column Profile Card */}
                  <div className="md:col-span-4 glass-card rounded-2xl p-6 flex flex-col items-center justify-between text-center border border-surface-container" id="profile-card-col">
                    <div className="flex flex-col items-center w-full" id="profile-card-header">
                      <div className="w-20 h-20 rounded-full bg-primary text-white flex items-center justify-center font-black text-2xl shadow-md border-4 border-white mb-4">
                        EP
                      </div>
                      <h3 className="text-lg font-bold text-on-background">E. Mitchell</h3>
                      <p className="text-xs text-secondary font-semibold mt-1">Level 4 Access System Administrator</p>
                      
                      <div className="mt-4 flex items-center gap-1.5 bg-green-100 border border-green-300 text-green-800 text-xs font-extrabold px-3 py-1 rounded-full" id="status-clearance-pill">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-600 animate-ping"></span>
                        <span>Secured Online Entry</span>
                      </div>
                    </div>

                    <div className="w-full border-t border-[#eceef0] pt-4 mt-6 text-left space-y-3" id="profile-meta">
                      <div className="flex justify-between text-xs" id="profile-id-box">
                        <span className="text-secondary font-semibold">Employee ID:</span>
                        <span className="font-mono font-bold text-on-background">94028</span>
                      </div>
                      <div className="flex justify-between text-xs" id="profile-registered-box">
                        <span className="text-secondary font-semibold">Registered Branch:</span>
                        <span className="font-bold text-on-background">East Wing Headquarters</span>
                      </div>
                      <div className="flex justify-between text-xs" id="profile-crypt-box">
                        <span className="text-secondary font-semibold">Crypt Token:</span>
                        <span className="font-mono text-[10px] text-primary select-all">EP-94028-X8211</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Column Profile Settings */}
                  <div className="md:col-span-8 glass-card rounded-2xl p-6 border border-surface-container text-left" id="profile-config-form">
                    <h3 className="text-base font-extrabold text-on-background mb-4">Security Administration & Clearance Settings</h3>
                    
                    <div className="space-y-4 text-sm text-secondary" id="account-privileges-explain">
                      <p className="leading-relaxed">
                        Your account is automatically provisioned under the <strong>NexusAuth Professional Access framework</strong>. 
                        This grants you direct reading permissions to inventory levels, product catalog revisions, and wholesale transaction rankings.
                      </p>
                      
                      <div className="p-4 bg-surface-container-low rounded-xl border border-surface-container-highest/60 text-xs font-semibold text-on-secondary-container" id="admin-notice-box">
                        <span className="material-symbols-outlined text-[16px] mr-1 float-left text-primary">gavel</span>
                        <strong>Compliance Notice:</strong> Any alterations to price lists or restock mandates are logged directly to the server audit pipeline under compliance protocol SEC-91.
                      </div>

                      <div className="pt-2" id="key-actions">
                        <h4 className="text-xs font-bold uppercase text-on-background tracking-wider mb-2">Access Key Management</h4>
                        <div className="flex flex-col sm:flex-row gap-3" id="key-buttons-group">
                          <button 
                            onClick={() => alert('Cleared browser session variables. Access keys rotated successfully.')}
                            className="bg-primary hover:bg-primary-container text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
                            id="btn-rotate-key"
                          >
                            Rotate Authorization Token
                          </button>
                          <button 
                            onClick={() => alert(`Audit Logs Request\n\nGenerated audit reports for E. Mitchell (94028):\n- Checked Inventory (04:37:37)\n- Catalog restocked PR-2 (+10)\n- Rendered Dashboard area charts`)}
                            className="hover:bg-surface-container hover:text-primary text-secondary px-4 py-2 border border-outline-variant/60 rounded-xl text-xs font-bold transition-all"
                            id="btn-audit-log"
                          >
                            Download Activity Audit Log
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}


            {/* Tab 7: ADMIN CONTROL SETTINGS */}
            {activeTab === 'admin' && (
              <div className="flex flex-col gap-6 animate-fade-in text-left" id="admin-view-tab">
                <div>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-primary">Admin Control Center</h2>
                  <p className="text-sm text-on-surface-variant mt-1">Configure global server flags, security rules, and seed transaction parameters.</p>
                </div>

                <div className="glass-card rounded-2xl p-6 border border-surface-container shadow-sm space-y-6" id="admin-controls">
                  
                  {/* Parameter sliders */}
                  <div id="admin-parameters">
                    <h3 className="text-base font-extrabold text-on-background mb-3">Global Parameter Mocking</h3>
                    <p className="text-xs text-secondary leading-relaxed mb-4">
                      Simulate high volume product variations, edit totals, or trigger warning flags to demonstrate responsive UI changes.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="admin-slides-grid">
                      <div className="p-4 bg-surface-container-low rounded-xl border border-surface-container" id="mock-stock-slider">
                        <div className="flex justify-between items-center mb-1.5 text-xs font-bold text-on-background">
                          <span>Simulate Low Stock Alarms</span>
                          <span className="text-xs bg-error-container text-error px-2 py-0.5 rounded-full">
                            {products.filter(p => p.stock < p.minStock).length} alarms active
                          </span>
                        </div>
                        <p className="text-[10.5px] text-secondary mb-3">Instantly decrease stock on random items to trigger alerts.</p>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => {
                              // Force a few items to be low stock for warning visualization
                              setProducts(prev => prev.map((item, i) => i % 2 === 0 ? { ...item, stock: 2 } : item));
                            }}
                            className="bg-error hover:bg-error-container hover:text-error text-white text-xs px-3.5 py-1.5 rounded-lg transition-all font-bold"
                            id="trigger-low-stock-sim"
                          >
                            Trigger Low Stock Sim
                          </button>
                          <button 
                            onClick={() => {
                              // Recovery action
                              setProducts(prev => prev.map((item) => ({ ...item, stock: item.minStock + 20 })));
                            }}
                            className="bg-surface-container-highest hover:bg-surface-container text-on-surface text-xs px-3.5 py-1.5 rounded-lg transition-all font-bold"
                            id="clear-warnings-sim"
                          >
                            Clear Warnings (Full stock)
                          </button>
                        </div>
                      </div>

                      <div className="p-4 bg-surface-container-low rounded-xl border border-surface-container" id="restock-threshold-slider">
                        <div className="flex justify-between items-center mb-1.5 text-xs font-bold text-on-background">
                          <span>Global Enterprise Value Shift</span>
                          <span className="text-xs bg-primary-fixed text-primary px-2 py-0.5 rounded-full">Active</span>
                        </div>
                        <p className="text-[10.5px] text-secondary mb-3">Boost every registered client deal value by 20% to simulate trade growth.</p>
                        <button 
                          onClick={() => {
                            setCustomers(prev => prev.map(c => ({ ...c, value: Math.round(c.value * 1.20) })));
                            alert('All Lifetime Value sums have been scaled by +20% system-wide.');
                          }}
                          className="bg-primary hover:bg-primary-container text-white text-xs px-4 py-1.5 rounded-lg transition-all font-bold"
                          id="boost-customer-value"
                        >
                          Apply Scaled Trade (+20%)
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Security Clearance logs */}
                  <div className="border-t border-[#eceef0] pt-6" id="security-audit-subsegment">
                    <h3 className="text-base font-extrabold text-on-background mb-3">Compliance Firewalls</h3>
                    <div className="bg-primary/5 rounded-xl p-4 border border-primary/20 space-y-2 text-xs font-semibold text-primary" id="system-audit-shell">
                      <div className="flex gap-2">
                        <span className="text-secondary select-none font-mono text-[10px] shrink-0 font-medium">[SYSTEM: SEC]</span>
                        <span>Firewall checks successful. 100% data compliance validated.</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-secondary select-none font-mono text-[10px] shrink-0 font-medium">[SYSTEM: COM]</span>
                        <span>Express route server proxying is listening natively on internal PORT `3000`.</span>
                      </div>
                      <div className="flex gap-2">
                        <span className="text-secondary select-none font-mono text-[10px] shrink-0 font-medium">[SYSTEM: DB]</span>
                        <span>Client-side state persistence verified successfully. React state synced to views.</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            )}

            
          </div>
        </main>
      </div>


      {/* Modal 1: SPECIFIC "LOW STOCK ALERTS" MODAL POPUP */}
      {selectedLowStockModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" id="low-stock-modal-root">
          <div className="bg-surface-container-lowest rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl border border-surface-container text-left" id="low-stock-modal-card">
            
            <div className="p-6 bg-error-container/30 border-b border-red-100 flex justify-between items-center" id="low-stock-modal-header">
              <div className="flex items-center gap-2" id="low-stock-header-title">
                <span className="material-symbols-outlined text-error text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>warning</span>
                <span className="font-extrabold text-[#93000a] text-md">Low Stock Items Monitor</span>
              </div>
              <button 
                onClick={() => setSelectedLowStockModal(false)}
                className="p-1 hover:bg-white rounded-full text-[#93000a] transition-all focus:outline-none"
                aria-label="Close modal"
                id="close-low-stock-modal"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-6 space-y-4 max-h-[350px] overflow-y-auto" id="low-stock-modal-body">
              <p className="text-xs text-on-surface-variant font-semibold">
                The following products have dropped below their designated minimum threshold level. Instant restock orders will generate enough units to secure the safety buffer of 10 items.
              </p>

              <div className="space-y-3.5" id="low-stock-items-scroller">
                {lowStockItems.map((p) => (
                  <div key={p.id} className="flex justify-between items-center p-3.5 bg-error-container/40 rounded-xl border border-red-200/50" id={`low-stock-modal-item-${p.id}`}>
                    <div className="text-left">
                      <p className="text-sm font-extrabold text-on-background leading-normal shrink-1">{p.name}</p>
                      <span className="text-[10px] font-bold text-[#ba1a1a] uppercase bg-white/70 px-2 py-0.5 rounded border border-red-300 mt-1 inline-block">Code: {p.code}</span>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-sm font-black text-error font-mono">{p.stock} units left <span className="text-xs font-medium text-secondary"> / {p.minStock} min</span></span>
                      <button 
                        onClick={() => handleRestock(p.id)}
                        className="px-3 py-1.5 bg-error hover:bg-error/95 text-white text-xs font-black rounded-lg transition-all shadow-sm"
                        id={`modal-restock-btn-${p.id}`}
                      >
                        Restock
                      </button>
                    </div>
                  </div>
                ))}
                {lowStockItems.length === 0 && (
                  <div className="py-6 text-center text-sm font-bold text-green-800" id="modal-restocked-success">
                    <span className="material-symbols-outlined text-[36px] block text-green-600">check_circle</span>
                    <span className="mt-2 block">All product stock thresholds are perfectly met!</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-surface-container-low/60 border-t border-[#eceef0] flex justify-end gap-3" id="low-stock-modal-footer">
              {lowStockItems.length > 0 && (
                <button 
                  onClick={() => {
                    // Quick automatic boost helper
                    setProducts((prev) => prev.map((p) => ({ ...p, stock: p.stock < p.minStock ? p.minStock + 12 : p.stock })));
                    alert('Automatic Restock Sequence complete. All warnings have been cleared successfully.');
                    setSelectedLowStockModal(false);
                  }}
                  className="px-4 py-2 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                  id="btn-restock-all-modal"
                >
                  Restock All Items
                </button>
              )}
              <button 
                onClick={() => setSelectedLowStockModal(false)}
                className="px-4 py-2 hover:bg-surface-container text-secondary text-xs font-bold rounded-xl transition-colors"
                id="btn-close-low-stock-modal"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}


      {/* Modal 2: "VIEW ALL CUSTOMERS" SLIDER POPUP MODAL */}
      {viewAllCustomersModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-fade-in" id="all-customers-modal-root">
          <div className="bg-surface-container-lowest rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl border border-surface-container text-left" id="all-customers-modal-card">
            
            <div className="p-6 border-b border-[#eceef0] flex justify-between items-center" id="all-customers-modal-header">
              <div id="all-cust-header-title">
                <h3 className="text-lg font-bold text-on-background">Authorized Enterprise Registry</h3>
                <p className="text-xs text-secondary font-medium">Full listing of registered customers sorted on contract valuation</p>
              </div>
              <button 
                onClick={() => setViewAllCustomersModal(false)}
                className="p-1 hover:bg-surface-container rounded-full text-secondary hover:text-primary transition-all focus:outline-none"
                aria-label="Close modal"
                id="close-all-customers-modal"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="p-6 max-h-[400px] overflow-y-auto" id="all-customers-modal-body">
              <div className="overflow-x-auto" id="modal-cust-table-container">
                <table className="w-full text-left border-collapse" id="all-customers-matrix-table">
                  <thead>
                    <tr className="border-b border-[#eceef0] bg-surface-container-low/50">
                      <th className="py-2.5 px-3 text-xs font-bold text-secondary uppercase tracking-wider w-16">Rank</th>
                      <th className="py-2.5 px-3 text-xs font-bold text-secondary uppercase tracking-wider">Customer Company</th>
                      <th className="py-2.5 px-3 text-xs font-bold text-secondary uppercase tracking-wider">Industry</th>
                      <th className="py-2.5 px-3 text-xs font-bold text-secondary uppercase tracking-wider text-right">Lifetime Contract</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customers.map((cust) => (
                      <tr key={cust.id} className="border-b border-surface-container-highest/60 hover:bg-surface-container-low/30 transition-colors">
                        <td className="py-3 px-3 text-sm font-extrabold text-on-background">#{cust.rank}</td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-extrabold shadow-sm shrink-0 ${cust.avatarBg}`}>
                              {cust.avatar}
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-semibold text-on-background truncate">{cust.name}</span>
                              <span className="text-[9px] text-secondary truncate">{cust.email}</span>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="text-[10px] bg-surface-container-low px-2 py-0.5 rounded-full text-secondary font-semibold border border-outline-variant/30">
                            {cust.industry}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-xs font-extrabold text-primary text-right font-mono">
                          ${cust.value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="p-4 bg-surface-container-low/50 border-t border-[#eceef0] flex justify-end" id="all-customers-modal-footer">
              <button 
                onClick={() => setViewAllCustomersModal(false)}
                className="px-5 py-2 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                id="btn-close-all-cust-modal"
              >
                Close Registry
              </button>
            </div>

          </div>
        </div>
      )}


      {/* Modal 3: "ADD PRODUCT" FORM MODAL */}
      {addProductModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" id="add-product-modal-root">
          <div className="bg-surface-container-lowest rounded-2xl w-full max-w-md overflow-hidden shadow-2xl border border-surface-container text-left" id="add-product-modal-card">
            
            <div className="p-5 border-b border-[#eceef0] flex justify-between items-center bg-primary text-white" id="add-product-modal-header">
              <div className="flex items-center gap-2" id="add-product-header-title">
                <span className="material-symbols-outlined text-[20px]">add_box</span>
                <span className="font-extrabold text-white text-md">Register New Product</span>
              </div>
              <button 
                onClick={() => setAddProductModal(false)}
                className="p-1 hover:bg-white/10 rounded-full text-white transition-all focus:outline-none"
                aria-label="Close modal"
                id="close-add-product-modal"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddProduct} id="add-product-form">
              <div className="p-6 space-y-4" id="add-product-modal-body">
                
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Product Code</label>
                  <input 
                    type="text" 
                    required
                    className="w-full text-xs p-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-background focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                    value={newProduct.code}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, code: e.target.value }))}
                    id="new-product-code"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Product Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Meow Mix Classic Pro"
                    className="w-full text-xs p-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-background focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                    id="new-product-name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Category</label>
                    <select 
                      className="w-full text-xs p-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-background focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                      value={newProduct.category}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, category: e.target.value as any }))}
                      id="new-product-category"
                    >
                      <option value="Electronics">Electronics</option>
                      <option value="Software">Software</option>
                      <option value="Hardware">Hardware</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Unit Price ($)</label>
                    <input 
                      type="number" 
                      required
                      min="1"
                      className="w-full text-xs p-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-background focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                      value={newProduct.price}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, price: Number(e.target.value) }))}
                      id="new-product-price"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Starting Stock</label>
                    <input 
                      type="number" 
                      required
                      min="0"
                      className="w-full text-xs p-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-background focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                      value={newProduct.stock}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, stock: Number(e.target.value) }))}
                      id="new-product-stock"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Warning Threshold</label>
                    <input 
                      type="number" 
                      required
                      min="1"
                      className="w-full text-xs p-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-background focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                      value={newProduct.minStock}
                      onChange={(e) => setNewProduct(prev => ({ ...prev, minStock: Number(e.target.value) }))}
                      id="new-product-min-stock"
                    />
                  </div>
                </div>

              </div>

              <div className="p-4 bg-surface-container-low/60 border-t border-[#eceef0] flex justify-end gap-3" id="add-product-modal-footer">
                <button 
                  type="button"
                  onClick={() => setAddProductModal(false)}
                  className="px-4 py-2 hover:bg-surface-container text-secondary text-xs font-bold rounded-xl transition-colors"
                  id="btn-cancel-add-prod"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                  id="btn-save-new-prod"
                >
                  Add to Catalog
                </button>
              </div>
            </form>

          </div>
        </div>
      )}


      {/* Modal 4: "ADD CUSTOMER" FORM MODAL */}
      {addCustomerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in" id="add-customer-modal-root">
          <div className="bg-surface-container-lowest rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl border border-surface-container text-left" id="add-customer-modal-card">
            
            <div className="p-5 border-b border-[#eceef0] flex justify-between items-center bg-primary text-white" id="add-customer-modal-header">
              <div className="flex items-center gap-2" id="add-customer-header-title">
                <span className="material-symbols-outlined text-[20px]">person_add</span>
                <span className="font-extrabold text-white text-md">Register Active Partner</span>
              </div>
              <button 
                onClick={() => setAddCustomerModal(false)}
                className="p-1 hover:bg-white/10 rounded-full text-white transition-all focus:outline-none"
                aria-label="Close modal"
                id="close-add-customer-modal"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddCustomer} id="add-customer-form">
              <div className="p-5 space-y-4" id="add-customer-modal-body">
                
                <div>
                  <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Customer / Company Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Initech Corporation"
                    className="w-full text-xs p-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-background focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                    value={newCustomer.name}
                    onChange={(e) => setNewCustomer(prev => ({ ...prev, name: e.target.value }))}
                    id="new-customer-name"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Contact Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="e.g. operations@itech.com"
                    className="w-full text-xs p-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-background focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                    value={newCustomer.email}
                    onChange={(e) => setNewCustomer(prev => ({ ...prev, email: e.target.value }))}
                    id="new-customer-email"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Industry field</label>
                    <select 
                      className="w-full text-xs p-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-background focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                      value={newCustomer.industry}
                      onChange={(e) => setNewCustomer(prev => ({ ...prev, industry: e.target.value }))}
                      id="new-customer-industry"
                    >
                      <option value="Technology">Technology</option>
                      <option value="Shipping">Shipping</option>
                      <option value="Manufacturing">Manufacturing</option>
                      <option value="BioTech">BioTech</option>
                      <option value="Consumer Retail">Consumer Retail</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-secondary uppercase mb-1.5">Lifetime Contract ($)</label>
                    <input 
                      type="number" 
                      required
                      min="5000"
                      className="w-full text-xs p-2.5 rounded-lg border border-outline-variant bg-surface-container-lowest text-on-background focus:ring-1 focus:ring-primary focus:border-primary outline-none"
                      value={newCustomer.value}
                      onChange={(e) => setNewCustomer(prev => ({ ...prev, value: Number(e.target.value) }))}
                      id="new-customer-value"
                    />
                  </div>
                </div>

              </div>

              <div className="p-4 bg-surface-container-low/60 border-t border-[#eceef0] flex justify-end gap-3" id="add-customer-modal-footer">
                <button 
                  type="button"
                  onClick={() => setAddCustomerModal(false)}
                  className="px-4 py-2 hover:bg-surface-container text-secondary text-xs font-bold rounded-xl transition-colors"
                  id="btn-cancel-add-cust"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="px-5 py-2 bg-primary hover:bg-primary-container text-white text-xs font-bold rounded-xl transition-all shadow-sm"
                  id="btn-save-new-cust"
                >
                  Register Partner
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );

  // Quick safety check helper
  function activeTab2(tab: string) {
    return activeTab === tab;
  }
}
