import { useState, useMemo } from "react";
import { 
  Search, 
  Plus, 
  SlidersHorizontal, 
  ChevronLeft, 
  ChevronRight, 
  MoreVertical,
  Mail,
  Phone
} from "lucide-react";

export default function CustomerPage({
  customers,
  onOpenAddCustomerModal,
  onDeleteCustomer
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter
  const filteredCustomers = useMemo(() => {
    return customers.filter((cust) => {
      const matchesSearch = 
        cust.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cust.customerCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cust.email.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = 
        statusFilter === "All" || cust.status.toLowerCase() === statusFilter.toLowerCase();
      
      return matchesSearch && matchesStatus;
    });
  }, [customers, searchQuery, statusFilter]);

  // Paginated Output
  const paginatedCustomers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredCustomers.slice(start, start + itemsPerPage);
  }, [filteredCustomers, currentPage]);

  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage) || 1;

  // Color mappings for initial avatars
  const getAvatarCombo = (idx) => {
    const combos = [
      "bg-[#d0e1fb] text-[#142175]",
      "bg-[#ffdbc7] text-[#723603]",
      "bg-[#dfe0ff] text-[#333f91]",
      "bg-[#e6e8ea] text-[#454651]",
      "bg-amber-100 text-amber-800",
      "bg-emerald-100 text-emerald-800"
    ];
    return combos[idx % combos.length];
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-sans font-bold text-3xl text-[#191c1e] tracking-tight">Customers</h1>
          <p className="font-sans text-sm text-[#505f76] mt-1">Manage and view your customer base.</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Active Search Component on Top of Desk */}
          <div className="relative w-full max-w-xs hidden md:flex items-center bg-[#f2f4f6] border border-[#c6c5d3]/50 rounded-lg focus-within:ring-2 focus-within:ring-[#142175] transition-all duration-200">
            <Search className="absolute left-3 text-[#505f76] w-4.5 h-4.5" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search customers..."
              className="w-full bg-transparent border-none pl-10 pr-4 py-2 font-sans text-sm text-[#191c1e] placeholder-[#767682] outline-none"
            />
          </div>

          <button 
            onClick={() => {
              setStatusFilter(prev => prev === "Active" ? "Inactive" : prev === "Inactive" ? "All" : "Active");
              setCurrentPage(1);
            }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#c6c5d3] bg-white text-[#191c1e] hover:bg-[#eceef0] transition-colors font-sans font-semibold text-sm"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#505f76]" />
            <span>Filter: {statusFilter}</span>
          </button>

          <button 
            onClick={onOpenAddCustomerModal}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#142175] text-white hover:bg-[#2e3a8c] transition-colors shadow-sm font-sans font-semibold text-sm"
          >
            <Plus className="w-4 h-4 text-white" />
            <span>Add Customer</span>
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-[#c6c5d3]/30 overflow-hidden">
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse font-sans">
            <thead>
              <tr className="border-b border-[#eceef0] bg-[#f2f4f6]/50">
                <th className="py-4 px-6 text-xs font-bold text-[#454651] uppercase tracking-wider">Customer</th>
                <th className="py-4 px-6 text-xs font-bold text-[#454651] uppercase tracking-wider">Contact</th>
                <th className="py-4 px-6 text-xs font-bold text-[#454651] uppercase tracking-wider">Join Date</th>
                <th className="py-4 px-6 text-xs font-bold text-[#454651] uppercase tracking-wider">Status</th>
                <th className="py-4 px-6 text-xs font-bold text-[#454651] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eceef0]/60">
              {paginatedCustomers.map((cust, idx) => (
                <tr key={cust.id} className="hover:bg-[#f7f9fb]/80 transition-colors group">
                  {/* Name and Circle Code */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold font-sans text-xs ${getAvatarCombo(idx)}`}>
                        {cust.name.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="font-sans text-sm font-bold text-[#191c1e]">{cust.name}</div>
                        <div className="font-sans text-xs text-[#505f76] mt-0.5">ID: {cust.customerCode}</div>
                      </div>
                    </div>
                  </td>

                  {/* Mail & Phones */}
                  <td className="py-4 px-6 text-sm">
                    <div className="flex items-center gap-1.5 text-[#191c1e]">
                      <Mail className="w-3.5 h-3.5 text-[#767682]" />
                      <span className="truncate max-w-[200px]">{cust.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#505f76] mt-1 text-xs">
                      <Phone className="w-3 h-3 text-[#767682]" />
                      <span>{cust.phone}</span>
                    </div>
                  </td>

                  {/* Date */}
                  <td className="py-4 px-6 text-sm text-[#191c1e]">{cust.joinDate}</td>

                  {/* Status indicator Pill */}
                  <td className="py-4 px-6">
                    {cust.status === "Active" ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Active
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold border border-red-200">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                        Inactive
                      </span>
                    )}
                  </td>

                  {/* Actions Kebab or quick deletion */}
                  <td className="py-4 px-6 text-right">
                    <button 
                      onClick={() => {
                        if (onDeleteCustomer && confirm(`Are you sure you want to remove customer ${cust.name}?`)) {
                          onDeleteCustomer(cust.id);
                        }
                      }}
                      className="p-1.5 text-[#505f76] hover:text-[#ba1a1a] rounded hover:bg-[#eceef0] transition-colors"
                      title="Delete Customer Account"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}

              {paginatedCustomers.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-[#505f76] text-sm">
                    No customers found matching the search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer Numbers Navigation */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#eceef0] bg-white text-xs text-[#505f76]">
          <span>
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredCustomers.length)} of {filteredCustomers.length} entries
          </span>
          <div className="flex items-center gap-1 sm:gap-2">
            <button 
              onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1 rounded-md text-[#505f76] hover:bg-[#eceef0] disabled:opacity-30 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-md font-sans text-xs flex items-center justify-center font-bold ${
                  currentPage === i + 1 
                    ? "bg-[#142175] text-white" 
                    : "text-[#505f76] hover:bg-[#eceef0]"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button 
              onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1 rounded-md text-[#505f76] hover:bg-[#eceef0] disabled:opacity-30 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
