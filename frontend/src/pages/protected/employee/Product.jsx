import { useState, useMemo } from "react";
import { 
  Search, 
  Plus, 
  ChevronLeft, 
  ChevronRight, 
  Edit3, 
  Server, 
  Terminal, 
  Cpu, 
  Router,
  SlidersHorizontal
} from "lucide-react";

export default function ProductPage({
  products,
  onOpenEditModal,
  onOpenAddModal
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [sortBy, setSortBy] = useState("default");
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter Products
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const matchesSearch = 
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.sku.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === "" || prod.category.toLowerCase() === selectedCategory.toLowerCase();
      
      const matchesBrand = 
        selectedBrand === "" || prod.brand.toLowerCase() === selectedBrand.toLowerCase();
      
      return matchesSearch && matchesCategory && matchesBrand;
    });
  }, [products, searchQuery, selectedCategory, selectedBrand]);

  // Sort Products
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    if (sortBy === "price_asc") {
      return list.sort((a, b) => {
        const pA = parseFloat(a.price.replace(/[^0-9.]/g, "")) || 0;
        const pB = parseFloat(b.price.replace(/[^0-9.]/g, "")) || 0;
        return pA - pB;
      });
    } else if (sortBy === "price_desc") {
      return list.sort((a, b) => {
        const pA = parseFloat(a.price.replace(/[^0-9.]/g, "")) || 0;
        const pB = parseFloat(b.price.replace(/[^0-9.]/g, "")) || 0;
        return pB - pA;
      });
    } else if (sortBy === "name_asc") {
      return list.sort((a, b) => a.name.localeCompare(b.name));
    }
    return list;
  }, [filteredProducts, sortBy]);

  // Paginated Products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedProducts, currentPage]);

  const totalPages = Math.ceil(sortedProducts.length / itemsPerPage) || 1;

  // Render a specific category avatar element
  const getProductIcon = (category) => {
    const lower = category.toLowerCase();
    if (lower.includes("hardware") || lower.includes("infrastructure")) {
      return {
        bg: "bg-[#d0e1fb] text-[#142175]",
        icon: Server
      };
    } else if (lower.includes("software")) {
      return {
        bg: "bg-[#dfe0ff] text-[#2e3a8c]",
        icon: Terminal
      };
    } else if (lower.includes("electronic") || lower.includes("cpu")) {
      return {
        bg: "bg-[#ffdad6] text-[#93000a]",
        icon: Cpu
      };
    } else {
      return {
        bg: "bg-[#ffdbc7] text-[#6d3200]",
        icon: Router
      };
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-sans font-bold text-3xl text-[#191c1e] tracking-tight">Product Management</h2>
          <p className="font-sans text-sm text-[#454651] mt-1">Manage your catalog, inventory levels, and product details.</p>
        </div>
        <button 
          onClick={onOpenAddModal}
          className="bg-[#142175] text-white px-5 py-2.5 rounded-lg font-sans font-semibold text-sm hover:bg-[#2e3a8c] transition-all flex items-center gap-2 shadow-[0_4px_14px_0_rgba(20,33,117,0.2)]"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>New Product</span>
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-[#c6c5d3]/30 flex flex-col lg:flex-row gap-4 items-center">
        {/* Search */}
        <div className="relative w-full lg:flex-1">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-[#767682]" />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search products by name or SKU..."
            className="w-full pl-10 pr-4 py-2 bg-[#f2f4f6] border border-[#c6c5d3]/50 rounded-lg font-sans text-sm outline-none focus:ring-2 focus:ring-[#142175] focus:border-transparent transition-all placeholder-[#767682]"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap w-full lg:w-auto gap-3">
          <select 
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 bg-white border border-[#c6c5d3] rounded-lg font-sans text-sm text-[#191c1e] focus:ring-1 focus:ring-[#142175] outline-none cursor-pointer min-w-[140px]"
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="software">Software</option>
            <option value="hardware">Hardware</option>
            <option value="networking">Networking</option>
          </select>

          <select 
            value={selectedBrand}
            onChange={(e) => {
              setSelectedBrand(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 bg-white border border-[#c6c5d3] rounded-lg font-sans text-sm text-[#191c1e] focus:ring-1 focus:ring-[#142175] outline-none cursor-pointer min-w-[140px]"
          >
            <option value="">All Brands</option>
            <option value="nexus">Nexus</option>
            <option value="acme">Acme Corp</option>
            <option value="techco">TechCo</option>
          </select>

          <select 
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-2 bg-white border border-[#c6c5d3] rounded-lg font-sans text-sm text-[#191c1e] focus:ring-1 focus:ring-[#142175] outline-none cursor-pointer min-w-[160px]"
          >
            <option value="default">Sort By: Default</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
            <option value="name_asc">Name: A to Z</option>
          </select>
        </div>
      </div>

      {/* Product Display Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-[#c6c5d3]/30">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#eceef0] border-b border-[#c6c5d3]/50">
                <th className="p-4 font-sans text-xs font-bold text-[#454651] uppercase tracking-wider">Product Name</th>
                <th className="p-4 font-sans text-xs font-bold text-[#454651] uppercase tracking-wider">Category</th>
                <th className="p-4 font-sans text-xs font-bold text-[#454651] uppercase tracking-wider">Brand</th>
                <th className="p-4 font-sans text-xs font-bold text-[#454651] uppercase tracking-wider">Price</th>
                <th className="p-4 font-sans text-xs font-bold text-[#454651] uppercase tracking-wider">Stock Level</th>
                <th className="p-4 font-sans text-xs font-bold text-[#454651] uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#eceef0]">
              {paginatedProducts.map((prod) => {
                const iconMeta = getProductIcon(prod.category);
                const IconComp = iconMeta.icon;
                
                return (
                  <tr key={prod.id} className="hover:bg-[#f7f9fb] transition-colors group">
                    {/* Item Avatar & SKU */}
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded ${iconMeta.bg} flex items-center justify-center`}>
                          <IconComp className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-sans text-sm font-bold text-[#191c1e]">{prod.name}</p>
                          <p className="font-sans text-xs text-[#505f76] mt-0.5">SKU: {prod.sku}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="p-4 font-sans text-xs font-semibold text-[#505f76]">{prod.category}</td>

                    {/* Brand */}
                    <td className="p-4 font-sans text-xs text-[#505f76]">{prod.brand}</td>

                    {/* Price */}
                    <td className="p-4 font-sans text-sm font-bold text-[#191c1e]">{prod.price}</td>

                    {/* Stock Level with Pill Indicator */}
                    <td className="p-4">
                      {prod.stockLevel === "Digital" ? (
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#142175]"></span>
                          <span className="font-sans text-xs font-bold text-[#142175]">Digital</span>
                        </div>
                      ) : prod.stockLevel <= 4 ? (
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#ba1a1a]"></span>
                          <span className="font-sans text-xs font-bold text-[#ba1a1a]">{prod.stockLevel} Low Stock</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                          <span className="font-sans text-xs font-medium text-[#191c1e]">{prod.stockLevel} In Stock</span>
                        </div>
                      )}
                    </td>

                    {/* Action Button */}
                    <td className="p-4 text-right">
                      <button 
                        onClick={() => onOpenEditModal(prod)}
                        className="text-[#454651] hover:text-[#142175] transition-colors p-2 rounded-lg hover:bg-[#eceef0]"
                        title="Edit specifications"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}

              {sortedProducts.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center font-sans text-sm text-[#505f76]">
                    No products found matching your active filter constraints.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="p-4 border-t border-[#eceef0] flex items-center justify-between bg-white text-xs text-[#505f76]">
          <span>
            Showing {sortedProducts.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedProducts.length)} of {sortedProducts.length} results
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-[#c6c5d3] text-[#454651] hover:bg-[#eceef0] disabled:opacity-40 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="self-center font-sans font-bold px-2 text-[#191c1e]">
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-[#c6c5d3] text-[#454651] hover:bg-[#eceef0] disabled:opacity-40 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
