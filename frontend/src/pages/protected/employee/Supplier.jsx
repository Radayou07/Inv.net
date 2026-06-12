import { useState } from "react";
import { 
  Search, 
  Plus, 
  CheckCircle, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingUp, 
  ChevronDown 
} from "lucide-react";

export default function SupplierPage({
  suppliers,
  onOpenAddSupplierModal,
  onPayPending
}) {
  const [selectedSupplierId, setSelectedSupplierId] = useState(suppliers[0]?.id || "");
  const [searchQuery, setSearchQuery] = useState("");

  const activeSupplier = suppliers.find(s => s.id === selectedSupplierId) || suppliers[0];

  const filteredSuppliers = suppliers.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getAvatarInitials = (name) => {
    return name.substring(0, 2).toUpperCase();
  };

  const getRandomColorClass = (idx) => {
    const list = [
      "bg-[#d0e1fb] text-[#142175]",
      "bg-[#ffdbc7] text-[#723603]",
      "bg-[#dfe0ff] text-[#000d60]",
      "bg-[#e0e3e5] text-[#454651]"
    ];
    return list[idx % list.length];
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#eceef0] pb-4">
        <div>
          <h2 className="font-sans font-bold text-3xl text-[#191c1e] tracking-tight">Supplier Management</h2>
          <p className="font-sans text-sm text-[#505f76] mt-1">Review performance and outstanding balances across your network.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Quick inline search */}
          <div className="relative bg-white border border-[#c6c5d3] rounded-lg flex items-center px-3 h-10 focus-within:ring-2 focus-within:ring-[#142175] transition-shadow">
            <Search className="w-4 h-4 text-[#767682] mr-2" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search suppliers..."
              className="bg-transparent border-none outline-none text-sm text-[#191c1e] placeholder-[#767682] font-sans w-40"
            />
          </div>

          <button 
            onClick={() => alert("Add Supplier modal can be integrated or custom trigger is set.")} 
            className="bg-[#142175] text-white font-sans font-bold text-xs h-10 px-4 rounded-lg flex items-center gap-2 hover:bg-[#2e3a8c] transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Supplier</span>
          </button>
        </div>
      </div>

      {/* Bento Layout Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        
        {/* Left Master List */}
        <div className="xl:col-span-2 flex flex-col bg-white border border-[#eceef0] rounded-xl shadow-sm overflow-hidden min-h-[400px]">
          {/* Table Header */}
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[#f7f9fb] border-b border-[#eceef0] font-sans text-xs font-bold text-[#505f76] uppercase tracking-wider">
            <div className="col-span-5">Supplier Name</div>
            <div className="col-span-3">Category</div>
            <div className="col-span-2 text-right">Total Spend (YTD)</div>
            <div className="col-span-2 text-right">Pending</div>
          </div>

          {/* Lines */}
          <div className="flex-grow divide-y divide-[#eceef0]">
            {filteredSuppliers.map((supp, index) => {
              const isSelected = supp.id === selectedSupplierId;
              return (
                <div 
                  key={supp.id}
                  onClick={() => setSelectedSupplierId(supp.id)}
                  className={`grid grid-cols-12 gap-4 px-6 py-4 cursor-pointer hover:bg-[#f7f9fb] transition-colors items-center border-l-4 ${
                    isSelected 
                      ? "bg-[#142175]/5 border-l-[#142175]" 
                      : "border-l-transparent text-[#191c1e]"
                  }`}
                >
                  {/* Name and Circle Badge */}
                  <div className="col-span-5 flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-sans font-bold text-xs ${getRandomColorClass(index)}`}>
                      {getAvatarInitials(supp.name)}
                    </div>
                    <span className="font-sans text-sm font-semibold text-[#191c1e]">{supp.name}</span>
                  </div>

                  {/* Category */}
                  <div className="col-span-3 font-sans text-xs text-[#505f76] truncate">
                    {supp.category}
                  </div>

                  {/* Cash Spend */}
                  <div className="col-span-2 text-right font-sans text-sm font-bold text-[#191c1e]">
                    ${supp.totalSpend.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>

                  {/* Pending Balances with responsive red colors if above zero */}
                  <div className={`col-span-2 text-right font-sans text-sm font-semibold ${supp.pending > 0 ? "text-[#ba1a1a]" : "text-[#505f76]"}`}>
                    ${supp.pending.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                </div>
              );
            })}

            {filteredSuppliers.length === 0 && (
              <div className="p-8 text-center font-sans text-sm text-[#505f76]">
                No supplier registered with that constraint name.
              </div>
            )}
          </div>
        </div>

        {/* Right Detail Pane */}
        {activeSupplier && (
          <div className="xl:col-span-1 bg-[#f7f9fb] border border-[#eceef0] rounded-xl shadow-sm p-6 flex flex-col gap-6 relative overflow-hidden">
            {/* Soft Ambient Light Gradient */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#142175]/5 rounded-full blur-3xl pointer-events-none"></div>

            {/* Pane Header */}
            <div className="flex items-start justify-between relative z-10 border-b border-[#c6c5d3]/30 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#d0e1fb] text-[#142175] flex items-center justify-center font-sans font-bold text-lg">
                  {getAvatarInitials(activeSupplier.name)}
                </div>
                <div>
                  <h3 className="font-sans font-bold text-[#191c1e] text-base leading-tight">{activeSupplier.name}</h3>
                  <div className="flex items-center gap-1.5 text-[#505f76] mt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#142175]" />
                    <span className="font-sans text-xs font-semibold">Verified Partner - Tier 1</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-1 gap-4 relative z-10 flex-grow">
              
              {/* Metric Spend */}
              <div className="bg-white border border-[#c6c5d3]/50 rounded-lg p-4 flex flex-col justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-sans text-xs font-semibold text-[#505f76]">Total Spend (YTD)</span>
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <div className="font-sans font-bold text-2xl text-[#191c1e]">
                  ${activeSupplier.totalSpend.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className="mt-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#d0e1fb] text-[#142175]">+12% vs last year</span>
                </div>
              </div>

              {/* Metric Overdue Alert / Complete Panel */}
              <div className={`border rounded-lg p-4 flex flex-col justify-between relative overflow-hidden transition-all ${
                activeSupplier.pending > 0 
                  ? "bg-[#ffdad6]/40 border-[#ba1a1a]/20" 
                  : "bg-emerald-50/50 border-emerald-200"
              }`}>
                {/* Active alert indicator */}
                <div className={`absolute left-0 top-0 bottom-0 w-1 ${activeSupplier.pending > 0 ? "bg-[#ba1a1a]" : "bg-emerald-500"}`}></div>
                
                <div className="flex items-center justify-between mb-2 pl-2">
                  <span className={`font-sans text-xs font-bold ${activeSupplier.pending > 0 ? "text-[#ba1a1a]" : "text-emerald-800"}`}>
                    {activeSupplier.pending > 0 ? "Total Outstanding Pending" : "Invoices Fully Paid"}
                  </span>
                  {activeSupplier.pending > 0 ? (
                    <AlertTriangle className="w-4 h-4 text-[#ba1a1a]" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  )}
                </div>

                <div className="font-sans font-bold text-2xl text-[#191c1e] pl-2">
                  ${activeSupplier.pending.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>

                <div className="font-sans text-xs text-[#505f76] pl-2 mt-2">
                  {activeSupplier.pending > 0 
                    ? `${activeSupplier.overdueCount} invoices overdue (>30 days)`
                    : "No accounting actions pending."
                  }
                </div>
              </div>

              {/* Action Operations */}
              <div className="mt-auto pt-6 flex gap-3">
                <button 
                  onClick={() => alert(`Details and full historic logs for ${activeSupplier.name} can be viewed here.`)}
                  className="flex-1 bg-white border border-[#c6c5d3] text-[#191c1e] font-sans font-bold text-xs h-10 rounded-lg hover:bg-[#eceef0] transition-colors text-center flex items-center justify-center"
                >
                  View Profile
                </button>
                <button 
                  onClick={() => onPayPending(activeSupplier.id)}
                  disabled={activeSupplier.pending === 0}
                  className={`flex-1 font-sans font-bold text-xs h-10 rounded-lg transition-colors text-center flex items-center justify-center shadow-sm ${
                    activeSupplier.pending > 0
                      ? "bg-[#142175] text-white hover:bg-[#2e3a8c]"
                      : "bg-[#e0e3e5] text-[#767682] cursor-not-allowed"
                  }`}
                >
                  {activeSupplier.pending > 0 ? "Pay Pending" : "Fully Settled"}
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
