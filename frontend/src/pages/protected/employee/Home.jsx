import { 
  Users, 
  Boxes, 
  AlertTriangle, 
  TrendingUp, 
  MoreVertical, 
  HelpCircle, 
  Bell,
  Search,
  ArrowRight
} from "lucide-react";

export default function Home({
  onNavigateToTab,
  productsCount,
  customers,
  lowStockItemsCount
}) {
  // Rank customers
  const topCustomers = [...customers]
    .slice(0, 3);

  // Constants mapping values
  const totalCustomersSum = customers.length * 110 + 1015; // default around 1,245

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div>
        <h2 className="font-sans font-bold text-3xl text-[#191c1e] tracking-tight">Dashboard Overview</h2>
        <p className="font-sans text-sm text-[#454651] mt-1">Welcome back, here's what's happening today.</p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Summary Cards Row (Span 12) */}
        <div className="col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Total Customers */}
          <div 
            onClick={() => onNavigateToTab("customer")}
            className="glass-card rounded-xl p-6 flex flex-col justify-between h-[150px] hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-[#c6c5d3]/30"
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-lg bg-[#eceef0] flex items-center justify-center">
                <Users className="w-5 h-5 text-[#505f76]" />
              </div>
              <span className="font-sans text-xs font-semibold text-[#505f76] flex items-center gap-1 bg-[#eceef0] px-2 py-1 rounded-md">
                <TrendingUp className="w-3.5 h-3.5 text-green-600" /> +5.2%
              </span>
            </div>
            <div>
              <p className="font-sans text-xs font-semibold text-[#454651] uppercase tracking-wider">Total Customers</p>
              <h3 className="font-sans font-bold text-3xl text-[#191c1e] mt-1">{totalCustomersSum.toLocaleString()}</h3>
            </div>
          </div>

          {/* Total Products */}
          <div 
            onClick={() => onNavigateToTab("product")}
            className="glass-card rounded-xl p-6 flex flex-col justify-between h-[150px] hover:-translate-y-1 transition-all duration-300 cursor-pointer border border-[#c6c5d3]/30"
          >
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 rounded-lg bg-[#dfe0ff] flex items-center justify-center">
                <Boxes className="w-5 h-5 text-[#142175]" />
              </div>
              <span className="font-sans text-xs font-semibold text-[#505f76] flex items-center gap-1 bg-[#eceef0] px-2 py-1 rounded-md">
                <TrendingUp className="w-3.5 h-3.5 text-green-600" /> +12.4%
              </span>
            </div>
            <div>
              <p className="font-sans text-xs font-semibold text-[#454651] uppercase tracking-wider">Total Products</p>
              <h3 className="font-sans font-bold text-3xl text-[#191c1e] mt-1">{productsCount * 30 + 8410}</h3>
            </div>
          </div>

          {/* Low Stock Highlight */}
          <div 
            onClick={() => onNavigateToTab("inventory")}
            className="bg-[#ffdad6] rounded-xl p-6 flex flex-col justify-between h-[150px] hover:-translate-y-1 transition-all duration-300 relative overflow-hidden cursor-pointer shadow-sm border border-red-200"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/5 rounded-bl-full pointer-events-none"></div>
            <div className="flex justify-between items-start relative z-10">
              <div className="w-10 h-10 rounded-lg bg-white/60 flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-[#ba1a1a]" />
              </div>
              <span className="font-sans text-[11px] font-bold text-[#93000a] bg-white/40 px-2.5 py-1 rounded-md backdrop-blur-sm">Action Required</span>
            </div>
            <div className="relative z-10">
              <p className="font-sans text-xs font-bold text-[#93000a]/80 uppercase tracking-wider">Low Stock Items</p>
              <h3 className="font-sans font-bold text-3xl text-[#ba1a1a] mt-1">
                {lowStockItemsCount} <span className="text-sm font-normal text-[#93000a] opacity-80">SKUs</span>
              </h3>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        {/* Top Products segment */}
        <div className="col-span-12 lg:col-span-4 glass-card rounded-xl p-6 flex flex-col border border-[#c6c5d3]/30">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-sans font-bold text-lg text-[#191c1e]">Top Products</h3>
              <p className="font-sans text-xs text-[#454651]">By sales volume</p>
            </div>
            <button className="w-8 h-8 rounded-full hover:bg-[#eceef0] flex items-center justify-center transition-colors">
              <MoreVertical className="w-4 h-4 text-[#767682]" />
            </button>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center relative min-h-[220px] py-2">
            <svg className="w-40 h-44 transform -rotate-90" viewBox="0 0 32 32">
              <circle cx="16" cy="16" r="16" fill="#eceef0"></circle>
              {/* Outer stroke showing colors matching the mockup */}
              <circle cx="16" cy="16" r="11" fill="transparent" stroke="#142175" strokeWidth="10" strokeDasharray="38 100" strokeDashoffset="0"></circle>
              <circle cx="16" cy="16" r="11" fill="transparent" stroke="#2e3a8c" strokeWidth="10" strokeDasharray="28 100" strokeDashoffset="-38"></circle>
              <circle cx="16" cy="16" r="11" fill="transparent" stroke="#505f76" strokeWidth="10" strokeDasharray="18 100" strokeDashoffset="-66"></circle>
              <circle cx="16" cy="16" r="11" fill="transparent" stroke="#b7c8e1" strokeWidth="10" strokeDasharray="16 100" strokeDashoffset="-84"></circle>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-white rounded-full w-24 h-24 flex flex-col items-center justify-center shadow-lg border border-[#eceef0]">
                <span className="font-sans font-bold text-2xl text-[#142175]">10</span>
                <span className="font-sans text-xs font-semibold text-[#505f76]">Cats</span>
              </div>
            </div>
          </div>

          <div className="flex justify-between mt-3 px-2 border-t border-[#eceef0] pt-3">
            <span className="font-sans text-[11px] text-[#767682]">PR-1 (38%)</span>
            <span className="font-sans text-[11px] text-[#142175] font-bold">PR-2 (28%)</span>
            <span className="font-sans text-[11px] text-[#505f76]">PR-3 (18%)</span>
            <span className="font-sans text-[11px] text-[#b7c8e1] font-semibold">PR-4 (16%)</span>
          </div>
        </div>

        {/* Financial Overview (Area Chart Mock) */}
        <div className="col-span-12 lg:col-span-8 glass-card rounded-xl p-6 flex flex-col border border-[#c6c5d3]/30">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h3 className="font-sans font-bold text-lg text-[#191c1e]">Financial Overview</h3>
              <p className="font-sans text-xs text-[#454651]">Income vs Spend</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#142175] inline-block"></span>
                <span className="font-sans text-xs font-medium text-[#454651]">Income</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-[#ffdad6] border border-[#ba1a1a] inline-block"></span>
                <span className="font-sans text-xs font-medium text-[#454651]">Spend</span>
              </div>
            </div>
          </div>

          <div className="flex-1 relative h-64 w-full bg-[#f2f4f6]" style={{ minHeight: "220px" }}>
            <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
              {/* Grid Lines */}
              <line x1="0" y1="20" x2="100" y2="20" stroke="#eceef0" strokeWidth="0.5" strokeDasharray="2,2" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="#eceef0" strokeWidth="0.5" strokeDasharray="2,2" />
              <line x1="0" y1="80" x2="100" y2="80" stroke="#eceef0" strokeWidth="0.5" strokeDasharray="2,2" />

              {/* Spend Area (Red Gradient/Fill) */}
              <path d="M0,75 L0,55 Q15,70 35,45 T75,60 T100,50 L100,100 L0,100 Z" fill="#ffdad6" fillOpacity="0.5"></path>
              <path d="M0,55 Q15,70 35,45 T75,60 T100,50" fill="none" stroke="#ba1a1a" strokeWidth="1.5" strokeLinecap="round" opacity="0.75"></path>

              {/* Income Area (Blue Gradient/Fill) */}
              <path d="M0,90 Q15,65 35,75 T75,35 T100,45 L100,100 L0,100 Z" fill="#dfe0ff" fillOpacity="0.7"></path>
              <path d="M0,90 Q15,65 35,75 T75,35 T100,45" fill="none" stroke="#142175" strokeWidth="2.5" strokeLinecap="round"></path>
            </svg>
            <div className="absolute bottom-2 left-2 px-1 py-0.5 rounded bg-white/70 backdrop-blur-sm text-[10px] font-sans text-[#767682]">Jan - Jun Trend</div>
          </div>
        </div>

        {/* Tables Row */}
        <div className="col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Top Customers Table */}
          <div className="lg:col-span-8 glass-card rounded-xl p-6 border border-[#c6c5d3]/30">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-sans font-bold text-lg text-[#191c1e]">Top Customers</h3>
                <p className="font-sans text-xs text-[#454651]">Ranked by total lifetime value</p>
              </div>
              <button 
                onClick={() => onNavigateToTab("customer")}
                className="font-sans text-xs font-bold text-[#142175] hover:text-[#2e3a8c] flex items-center gap-1 transition-colors"
              >
                View All <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#eceef0]">
                    <th className="py-2.5 px-3 font-sans text-xs font-bold text-[#767682] w-16">Rank</th>
                    <th className="py-2.5 px-3 font-sans text-xs font-bold text-[#767682]">Customer Name</th>
                    <th className="py-2.5 px-3 font-sans text-xs font-bold text-[#767682]">Email</th>
                    <th className="py-2.5 px-3 font-sans text-xs font-bold text-[#767682] text-right">Total Value</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#eceef0]/60">
                  {topCustomers.map((cust, idx) => (
                    <tr key={cust.id} className="hover:bg-[#f2f4f6]/50 transition-colors">
                      <td className="py-3 px-3 font-sans font-bold text-sm text-[#191c1e]">
                        #{idx + 1}
                      </td>
                      <td className="py-3 px-3">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-sans font-bold text-xs ${
                            idx === 0 ? "bg-[#d0e1fb] text-[#0b1c30]" :
                            idx === 1 ? "bg-amber-100 text-[#723603]" :
                            "bg-[#dfe0ff] text-[#000d60]"
                          }`}>
                            {cust.name.substring(0, 2).toUpperCase()}
                          </div>
                          <span className="font-sans text-sm font-semibold text-[#191c1e]">
                            {cust.name}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-3 font-sans text-xs text-[#505f76] truncate max-w-[150px]">
                        {cust.email}
                      </td>
                      <td className="py-3 px-3 font-sans font-bold text-sm text-[#142175] text-right">
                        ${(450000 - idx * 69500).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                    </tr>
                  ))}
                  {topCustomers.length === 0 && (
                    <tr>
                      <td colSpan={4} className="py-4 text-center font-sans text-sm text-[#505f76]">
                        No customers registered.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Category Dominance Pie Chart */}
          <div className="lg:col-span-4 glass-card rounded-xl p-6 flex flex-col border border-[#c6c5d3]/30">
            <div className="mb-4">
              <h3 className="font-sans font-bold text-lg text-[#191c1e]">Category Dominance</h3>
              <p className="font-sans text-xs text-[#454651]">Distribution of top categories</p>
            </div>
            
            <div className="flex-grow flex items-center justify-center relative min-h-[180px]">
              <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 32 32">
                <circle cx="16" cy="16" r="16" fill="#eceef0"></circle>
                <circle cx="16" cy="16" r="12" fill="transparent" stroke="#142175" strokeWidth="8" strokeDasharray="40 100" strokeDashoffset="0"></circle>
                <circle cx="16" cy="16" r="12" fill="transparent" stroke="#2e3a8c" strokeWidth="8" strokeDasharray="25 100" strokeDashoffset="-40"></circle>
                <circle cx="16" cy="16" r="12" fill="transparent" stroke="#505f76" strokeWidth="8" strokeDasharray="20 100" strokeDashoffset="-65"></circle>
                <circle cx="16" cy="16" r="12" fill="transparent" stroke="#e0e3e5" strokeWidth="8" strokeDasharray="15 100" strokeDashoffset="-85"></circle>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white rounded-full w-20 h-24 flex flex-col items-center justify-center shadow-lg border border-[#eceef0]">
                  <span className="font-sans font-bold text-xl text-[#142175] leading-none">10</span>
                  <span className="font-sans text-[10px] text-[#505f76] mt-0.5 font-bold">Categories</span>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-xs border-t border-[#eceef0] pt-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#142175]"></span>
                <span className="font-sans text-[11px] text-[#454651]">Electronics (40%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2e3a8c]"></span>
                <span className="font-sans text-[11px] text-[#454651]">Software (25%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#505f76]"></span>
                <span className="font-sans text-[11px] text-[#454651]">Hardware (20%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#e0e3e5]"></span>
                <span className="font-sans text-[11px] text-[#454651]">Others (15%)</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
