import { useState, useMemo } from "react";
import { 
  Warehouse as WarehouseIcon, 
  MapPin, 
  Globe, 
  Plus, 
  Filter, 
  Download, 
  ChevronLeft, 
  ChevronRight,
  Server,
  Database,
  Cpu,
  Router,
  Cable
} from "lucide-react";

export default function InventoryPage({
  warehouses,
  stockDetails,
  onOpenAddWarehouseModal
}) {
  const [selectedWarehouseFilter, setSelectedWarehouseFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filtered stocks based on chosen warehouse card
  const filteredStocks = useMemo(() => {
    if (selectedWarehouseFilter === "All") return stockDetails;
    return stockDetails.filter(s => s.location.toLowerCase() === selectedWarehouseFilter.toLowerCase());
  }, [stockDetails, selectedWarehouseFilter]);

  // Paginated elements
  const paginatedStocks = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredStocks.slice(start, start + itemsPerPage);
  }, [filteredStocks, currentPage]);

  const totalPages = Math.ceil(filteredStocks.length / itemsPerPage) || 1;

  const handleDownloadCSV = () => {
    // Basic mock CSV download
    const headers = "Product Name,SKU,Location,Quantity,Status\n";
    const rows = filteredStocks.map(s => `"${s.productName}",${s.sku},"${s.location}",${s.quantity},${s.status}`).join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", `stock_report_${selectedWarehouseFilter.toLowerCase().replace(" ", "_")}.csv`);
    a.click();
  };

  const getStockItemIcon = (name) => {
    const l = name.toLowerCase();
    if (l.includes("router")) return Router;
    if (l.includes("server") || l.includes("rack")) return Server;
    if (l.includes("ethernet") || l.includes("cable") || l.includes("spool")) return Cable;
    return Cpu;
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-sans font-bold text-3xl text-[#191c1e] tracking-tight">Inventory Management</h2>
          <p className="font-sans text-sm text-[#505f76] mt-1">Monitor stock levels across all distribution centers.</p>
        </div>
        <button 
          onClick={onOpenAddWarehouseModal}
          className="flex items-center gap-2 bg-[#142175] text-white px-4 py-2.5 rounded-lg font-sans font-semibold text-sm hover:bg-[#2e3a8c] transition-colors shadow-sm"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Add Warehouse</span>
        </button>
      </div>

      {/* Warehouse Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {warehouses.map((wh) => {
          const isSelected = selectedWarehouseFilter.toLowerCase() === wh.name.toLowerCase();
          const isGlobal = wh.name.toLowerCase().includes("global");
          
          return (
            <div 
              key={wh.id}
              onClick={() => {
                setSelectedWarehouseFilter(selectedWarehouseFilter === wh.name ? "All" : wh.name);
                setCurrentPage(1);
              }}
              className={`bg-white rounded-xl p-6 border shadow-sm flex flex-col gap-4 relative overflow-hidden group cursor-pointer transition-all duration-300 ${
                isSelected 
                  ? "border-[#142175] ring-2 ring-[#142175]/10 scale-[1.02]" 
                  : "border-[#c6c5d3] hover:border-[#142175]"
              }`}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#142175]/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110 pointer-events-none"></div>
              
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#eceef0] flex items-center justify-center text-[#142175]">
                    {isGlobal ? <Globe className="w-5 h-5 text-[#142175]" /> : <WarehouseIcon className="w-5 h-5 text-[#142175]" />}
                  </div>
                  <div>
                    <h3 className="font-sans font-bold text-lg text-[#191c1e]">{wh.name}</h3>
                    <p className="font-sans text-xs text-[#505f76] flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#505f76]" /> {wh.location}
                    </p>
                  </div>
                </div>

                {wh.isPrimary && (
                  <span className="inline-flex items-center px-2 py-1 rounded bg-[#f2f4f6] text-[#505f76] font-sans text-[11px] font-bold border border-[#c6c5d3]">
                    Primary
                  </span>
                )}
              </div>

              <div className="mt-2">
                <p className="font-sans font-bold text-3xl text-[#191c1e]">{wh.units.toLocaleString()}</p>
                <p className="font-sans text-xs font-semibold text-[#505f76] mt-0.5">Total Units in Stock</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Stock Table Section */}
      <div className="bg-white rounded-lg border border-[#c6c5d3]/50 shadow-sm overflow-hidden flex flex-col">
        {/* Table Title and toolbar info */}
        <div className="p-4 border-b border-[#c6c5d3]/30 flex justify-between items-center bg-white">
          <div>
            <h3 className="font-sans font-bold text-lg text-[#191c1e]">Current Stock Details</h3>
            <p className="font-sans text-xs text-[#505f76] mt-0.5">
              Filtered by: <span className="font-bold text-[#142175]">{selectedWarehouseFilter}</span>
            </p>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={() => setSelectedWarehouseFilter("All")}
              title="Reset Filters"
              className="p-2 rounded-lg border border-[#c6c5d3] text-[#505f76] hover:bg-[#eceef0] transition-colors"
            >
              <Filter className="w-4 h-4" />
            </button>
            <button 
              onClick={handleDownloadCSV}
              title="Download stock CSV reports"
              className="p-2 rounded-lg border border-[#c6c5d3] text-[#505f76] hover:bg-[#eceef0] transition-colors"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Table Body structure */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f2f4f6] border-b border-[#c6c5d3]/50">
                <th className="py-3 px-6 font-sans text-xs font-bold text-[#505f76] uppercase tracking-wider">Product Name</th>
                <th className="py-3 px-6 font-sans text-xs font-bold text-[#505f76] uppercase tracking-wider">SKU</th>
                <th className="py-3 px-6 font-sans text-xs font-bold text-[#505f76] uppercase tracking-wider">Location</th>
                <th className="py-3 px-6 font-sans text-xs font-bold text-[#505f76] uppercase tracking-wider text-right">Quantity</th>
                <th className="py-3 px-6 font-sans text-xs font-bold text-[#505f76] uppercase tracking-wider text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eceef0] bg-white">
              {paginatedStocks.map((stock) => {
                const ItemIcon = getStockItemIcon(stock.productName);
                return (
                  <tr key={stock.id} className="hover:bg-[#f7f9fb] transition-colors">
                    {/* Icon and Name */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded bg-[#f2f4f6] flex items-center justify-center text-[#142175]">
                          <ItemIcon className="w-4.5 h-4.5" />
                        </div>
                        <span className="font-sans text-sm font-semibold text-[#191c1e]">{stock.productName}</span>
                      </div>
                    </td>

                    {/* SKU */}
                    <td className="py-4 px-6 font-sans text-sm text-[#505f76]">{stock.sku}</td>

                    {/* DC Location */}
                    <td className="py-4 px-6 font-sans text-sm text-[#505f76]">{stock.location}</td>

                    {/* Units Quantity */}
                    <td className="py-4 px-6 font-sans text-sm font-bold text-[#191c1e] text-right">
                      {stock.quantity.toLocaleString()}
                    </td>

                    {/* Dynamic Status Badges matching styles */}
                    <td className="py-4 px-6 text-center">
                      {stock.status === "Optimal" ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#d0e1fb]/40 text-[#142175] border border-[#142175]/10">
                          Optimal
                        </span>
                      ) : stock.status === "Low Stock" ? (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#ffdad6] text-[#93000a] border border-[#ba1a1a]/10">
                          Low Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-[#e0e3e5] text-[#454651] border border-[#767682]/10">
                          Out of Stock
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}

              {paginatedStocks.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center font-sans text-sm text-[#505f76]">
                    No stock details available for {selectedWarehouseFilter}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-[#c6c5d3]/30 bg-white flex items-center justify-between text-xs text-[#505f76]">
          <span>
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredStocks.length)} of {filteredStocks.length} entries
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 bg-white border border-[#c6c5d3] rounded text-[#505f76] font-semibold hover:bg-[#eceef0] disabled:opacity-40 transition-colors"
            >
              Prev
            </button>
            <span className="self-center font-sans font-bold px-1 text-[#191c1e]">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 bg-white border border-[#c6c5d3] rounded text-[#505f76] font-semibold hover:bg-[#eceef0] disabled:opacity-40 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
