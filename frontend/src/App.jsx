import { useState } from "react";
import { 
  Search, 
  HelpCircle, 
  Bell, 
  X, 
  Trash2, 
  MapPin, 
  Info, 
  CloudUpload
} from "lucide-react";

import Sidebar from "./components/Sidebar";
import Home from "./pages/protected/employee/Home";
import ProductPage from "./pages/protected/employee/Product";
import InventoryPage from "./pages/protected/employee/Inventory";
import CustomerPage from "./pages/protected/employee/Customer";
import SupplierPage from "./pages/protected/employee/Supplier";
import AccountPage from "./pages/protected/employee/Account";
import AdminPage from "./pages/protected/employee/Admin";

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState("home");

  // Global Mock States
  const [products, setProducts] = useState([
    {
      id: "p1",
      name: "Enterprise Server Rack",
      sku: "NEX-SRV-001",
      category: "Hardware",
      brand: "Nexus",
      price: "$4,500.00",
      stockLevel: 42,
      buyPrice: "$3,200.00",
      sellPrice: "$4,500.00",
      supplierName: "Global Tech Logistics Corp",
      description: "High-density server cabinet featuring advanced thermal management, integrated cable routing guidelines, and ambient heat shield vents.",
      serviceExpiryDate: "2026-12-31"
    },
    {
      id: "p2",
      name: "NexusOS License - Pro",
      sku: "NEX-SFT-042",
      category: "Software",
      brand: "Nexus",
      price: "$299.99/yr",
      stockLevel: "Digital",
      buyPrice: "$100.00",
      sellPrice: "$299.99",
      supplierName: "Nexus Systems",
      description: "Pro-edition enterprise operating system licensing key. Includes standard security updates and live cluster management logs.",
      serviceExpiryDate: "2027-06-30"
    },
    {
      id: "p3",
      name: "Quantum Core Processor",
      sku: "ACM-QCP-99",
      category: "Electronics",
      brand: "Acme Corp",
      price: "$1,250.00",
      stockLevel: 2,
      buyPrice: "$900.00",
      sellPrice: "$1,250.00",
      supplierName: "Global Tech Logistics Corp",
      description: "128-qubit quantum processing core for secure on-site authentication key computations.",
      serviceExpiryDate: "2026-08-15"
    },
    {
      id: "p4",
      name: "Gigabit Edge Router",
      sku: "TCH-RTR-110",
      category: "Networking",
      brand: "TechCo",
      price: "$850.00",
      stockLevel: 156,
      buyPrice: "$500.00",
      sellPrice: "$850.00",
      supplierName: "TechCo Supply Chain",
      description: "Hardened multi-wan edge routing appliance with Gigabit Ethernet ports, isolated hardware security boundaries, and failover lines.",
      serviceExpiryDate: "2026-11-20"
    }
  ]);

  const [warehouses, setWarehouses] = useState([
    { id: "w1", name: "Warehouse A", location: "North America", units: 12450, isPrimary: true },
    { id: "w2", name: "Warehouse B", location: "Europe", units: 8920 },
    { id: "w3", name: "Global Dist.", location: "APAC Region", units: 4105 }
  ]);

  const [stockDetails, setStockDetails] = useState([
    { id: "s1", productName: "Enterprise Router X1", sku: "NX-R-1042", location: "Warehouse A", quantity: 1240, status: "Optimal" },
    { id: "s2", productName: "Server Rack Unit 4U", sku: "NX-S-4000", location: "Warehouse B", quantity: 85, status: "Low Stock" },
    { id: "s3", productName: "Cat6a Ethernet Spool", sku: "NX-C-600A", location: "Global Dist.", quantity: 4500, status: "Optimal" },
    { id: "s4", productName: "Crypto Processor Alpha", sku: "NX-P-990", location: "Warehouse A", quantity: 0, status: "Out of Stock" }
  ]);

  const [customers, setCustomers] = useState([
    { id: "c1", name: "Acme Corp", customerCode: "CUS-8492", email: "jane.doe@acme.com", phone: "+1 (555) 123-4567", joinDate: "Oct 12, 2023", status: "Active" },
    { id: "c2", name: "Global Industries", customerCode: "CUS-7731", email: "admin@globalind.net", phone: "+44 20 7946 0958", joinDate: "Nov 05, 2023", status: "Inactive" },
    { id: "c3", name: "Nexus Logistics", customerCode: "CUS-9012", email: "contact@nexuslog.com", phone: "+1 (415) 555-0198", joinDate: "Jan 22, 2024", status: "Active" },
    { id: "c4", name: "Global Solutions", customerCode: "CUS-5542", email: "contact@globalsolutions.io", phone: "+1 (310) 998-2231", joinDate: "Feb 14, 2024", status: "Active" },
    { id: "c5", name: "TechNova Systems", customerCode: "CUS-1120", email: "info@technova.com", phone: "+1 (650) 443-1122", joinDate: "Mar 02, 2024", status: "Active" },
    { id: "c6", name: "Heritage Bank", customerCode: "CUS-8890", email: "support@heritage.com", phone: "+1 (212) 555-0987", joinDate: "Mar 28, 2024", status: "Inactive" },
    { id: "c7", name: "Skyward Aviation", customerCode: "CUS-3341", email: "operations@skyward.aero", phone: "+1 (303) 441-2233", joinDate: "Apr 15, 2024", status: "Active" }
  ]);

  const [suppliers, setSuppliers] = useState([
    { id: "sup1", name: "Apex Electronics Inc.", category: "Hardware Components", totalSpend: 1245000, pending: 45200, overdueCount: 3 },
    { id: "sup2", name: "Global Metals Corp", category: "Raw Materials", totalSpend: 890500, pending: 0, overdueCount: 0 },
    { id: "sup3", name: "SysLogic Solutions", category: "Software Licensing", totalSpend: 420000, pending: 12500, overdueCount: 1 },
    { id: "sup4", name: "Nexo Logistics", category: "Shipping & Freight", totalSpend: 315200, pending: 8100, overdueCount: 1 }
  ]);

  const [employees, setEmployees] = useState([
    { id: "e1", name: "Jane Doe", email: "jane.d@nexusauth.com", role: "System Admin", accessLevel: "Tier 1 (Root)", lastActive: "2 mins ago" },
    { id: "e2", name: "Michael Smith", email: "m.smith@nexusauth.com", role: "Security Analyst", accessLevel: "Tier 2", lastActive: "1 hour ago" },
    { id: "e3", name: "Alice Wong", email: "a.wong@nexusauth.com", role: "Network Engineer", accessLevel: "Tier 3", lastActive: "Yesterday" }
  ]);

  const [profile, setProfile] = useState({
    name: "Eleanor Mitchell",
    title: "Senior Systems Engineer",
    employeeId: "EMP-94028",
    role: "Sale",
    email: "e.mitchell@nexusauth.corp",
    phone: "+1 (555) 019-4822",
    location: "HQ - North Wing, Floor 4"
  });

  // Modal Control Triggers
  const [activeModal, setActiveModal] = useState(null);
  const [selectedProductToEdit, setSelectedProductToEdit] = useState(null);

  // New item form inputs
  const [newProdName, setNewProductName] = useState("");
  const [newProdPrice, setNewProductPrice] = useState("");
  const [newProdExpiryDate, setNewProductExpiryDate] = useState("2026-12-31");
  const [newProdBrand, setNewProductBrand] = useState("Nexus");
  const [newProdCategory, setNewProductCategory] = useState("Hardware");
  const [newProdSupplier, setNewProductSupplier] = useState("Global Tech Logistics Corp");
  const [newProdDescription, setNewProductDescription] = useState("");

  // New customer input fields
  const [newCustName, setNewCustName] = useState("");
  const [newCustPhone, setNewCustPhone] = useState("");
  const [newCustEmail, setNewCustEmail] = useState("");
  const [newCustAddress, setNewCustAddress] = useState("");

  // New warehouse input fields
  const [newWhName, setNewWhName] = useState("");
  const [newWhLocation, setNewWhLocation] = useState("");
  const [newWhCapacity, setNewWhCapacity] = useState("not_full");
  const [newWhManager, setNewWhManager] = useState("Marcus Wright");

  // New employee input fields
  const [newEmpName, setNewEmpName] = useState("");
  const [newEmpPhone, setNewEmpPhone] = useState("");
  const [newEmpEmail, setNewEmpEmail] = useState("");
  const [newEmpRole, setNewEmpManagerRole] = useState("Staff");

  // Add stock quantity input for Edit Product Modal
  const [addStockQuantity, setAddStockQuantity] = useState(0);

  // Quick State Action Handlers
  const handlePayPending = (supplierId) => {
    setSuppliers(prev => prev.map(s => {
      if (s.id === supplierId) {
        return { ...s, pending: 0, overdueCount: 0 };
      }
      return s;
    }));
    alert("Payment authorized successfully! Overdue invoice settled to $0.00.");
  };

  const handleUpdateProfile = (updated) => {
    setProfile(updated);
    alert(" Eleanor Mitchell's professional profile updated successfully!");
  };

  const handleRemoveEmployee = (id) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
  };

  const handleDeleteCustomer = (id) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
  };

  // Submit Operations
  const submitNewProduct = (e) => {
    e.preventDefault();
    if (!newProdName.trim()) {
      alert("Product Name is required");
      return;
    }
    const newPriceText = newProdPrice.startsWith("$") ? newProdPrice : `$${parseFloat(newProdPrice || "0").toLocaleString("en-US", { minimumFractionDigits: 2 })}`;
    const newProd = {
      id: "p_" + Date.now(),
      name: newProdName,
      sku: "NEX-" + newProdName.substring(0, 3).toUpperCase() + "-" + Math.floor(Math.random() * 900 + 100),
      category: newProdCategory,
      brand: newProdBrand,
      price: newPriceText,
      stockLevel: Math.floor(Math.random() * 80 + 10),
      buyPrice: `$${parseFloat((parseFloat(newProdPrice) * 0.7).toString() || "0").toFixed(2)}`,
      sellPrice: newPriceText,
      supplierName: newProdSupplier,
      description: newProdDescription || "Enterprise cloud and isolated hardware integration layer.",
      serviceExpiryDate: newProdExpiryDate
    };
    
    setProducts(prev => [newProd, ...prev]);
    setActiveModal(null);
    // Reset fields
    setNewProductName("");
    setNewProductPrice("");
    setNewProductDescription("");
    alert(`Product ${newProdName} registered successfully!`);
  };

  const submitEditProduct = (e) => {
    e.preventDefault();
    if (!selectedProductToEdit) return;

    setProducts(prev => prev.map(p => {
      if (p.id === selectedProductToEdit.id) {
        let updatedStock = p.stockLevel;
        if (p.stockLevel !== "Digital" && addStockQuantity > 0) {
          updatedStock = Number(p.stockLevel) + Number(addStockQuantity);
        }
        return {
          ...p,
          name: selectedProductToEdit.name,
          price: selectedProductToEdit.price,
          category: selectedProductToEdit.category,
          brand: selectedProductToEdit.brand,
          description: selectedProductToEdit.description,
          supplierName: selectedProductToEdit.supplierName,
          serviceExpiryDate: selectedProductToEdit.serviceExpiryDate,
          buyPrice: selectedProductToEdit.buyPrice,
          sellPrice: selectedProductToEdit.sellPrice,
          stockLevel: updatedStock
        };
      }
      return p;
    }));

    // Reset stock adjustment state
    setAddStockQuantity(0);
    setActiveModal(null);
    alert("Specifications updated successfully!");
  };

  const submitDeleteProduct = (id) => {
    if (confirm("Are you sure you want to permanently revoke this product catalog listing?")) {
      setProducts(prev => prev.filter(p => p.id !== id));
      setActiveModal(null);
      alert("Product listing removed.");
    }
  };

  const submitNewCustomer = () => {
    if (!newCustName.trim()) {
      alert("Customer Name is required");
      return;
    }
    const newCust = {
      id: "c_" + Date.now(),
      name: newCustName,
      customerCode: "CUS-" + Math.floor(Math.random() * 9000 + 1000),
      email: newCustEmail || "contact@" + newCustName.toLowerCase().replace(/[^a-z0-9]/g, "") + ".com",
      phone: newCustPhone || "+1 (555) " + Math.floor(Math.random() * 900 + 100) + "-4822",
      joinDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      status: "Active"
    };

    setCustomers(prev => [newCust, ...prev]);
    setActiveModal(null);
    setNewCustName("");
    setNewCustEmail("");
    setNewCustPhone("");
    alert(`Customer account for ${newCustName} registered.`);
  };

  const submitNewWarehouse = () => {
    if (!newWhName.trim()) {
      alert("Warehouse Name is required");
      return;
    }
    const newWh = {
      id: "w_" + Date.now(),
      name: newWhName,
      location: newWhLocation || "Global Network DC",
      units: Math.floor(Math.random() * 5000 + 1000)
    };

    const newStock = {
      id: "s_" + Date.now(),
      productName: "Server Asset " + newWhName.replace("Warehouse", "").trim(),
      sku: "NX-W-" + Math.floor(Math.random() * 9000 + 1000),
      location: newWhName,
      quantity: Math.floor(Math.random() * 1500 + 100),
      status: "Optimal"
    };

    setWarehouses(prev => [...prev, newWh]);
    setStockDetails(prev => [newStock, ...prev]);
    setActiveModal(null);
    setNewWhName("");
    setNewWhLocation("");
    alert(`DC Resource "${newWhName}" deployed. Notification sent to Operations Manager.`);
  };

  const submitNewEmployee = () => {
    if (!newEmpName.trim()) {
      alert("Employee Name is required");
      return;
    }
    const newEmp = {
      id: "e_" + Date.now(),
      name: newEmpName,
      email: newEmpEmail || newEmpName.toLowerCase().replace(/[^a-z0-9]/g, "") + "@nexusauth.com",
      role: newEmpRole,
      accessLevel: newEmpRole === "Admin" ? "Tier 1 (Root)" : newEmpRole === "Manager" ? "Tier 2" : "Tier 3",
      lastActive: "Just now"
    };

    setEmployees(prev => [...prev, newEmp]);
    setActiveModal(null);
    setNewEmpName("");
    setNewEmpEmail("");
    alert(`Active personnel listing created for ${newEmpName}.`);
  };

  // Compute stats for Dashboard
  const lowStockItemsCount = stockDetails.filter(s => s.status === "Low Stock" || s.quantity < 100).length;

  return (
    <div className="flex h-screen overflow-hidden bg-[#f7f9fb] antialiased">
      
      {/* SideNavBar kept in src/components */}
      <Sidebar 
        currentTab={currentTab} 
        onTabChange={(tab) => setCurrentTab(tab)} 
        avatarText="EP"
        employeeName={profile.name}
        employeeId={profile.employeeId}
      />

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col h-full overflow-hidden">
        
        {/* TopNavBar */}
        <header className="flex justify-between items-center px-6 sticky top-0 z-40 w-full h-16 bg-white border-b border-[#c6c5d3]/50">
          <div className="flex-grow flex items-center">
            <div className="relative w-full max-w-sm flex items-center bg-[#f2f4f6] rounded-full px-4 h-10 border border-transparent focus-within:border-[#142175] transition-all">
              <Search className="w-5 h-5 text-[#767682] mr-2" />
              <input 
                type="text" 
                placeholder="Search resources, SKUs, or logs..."
                className="bg-transparent border-none focus:ring-0 w-full font-sans text-xs text-[#191c1e] outline-none placeholder-[#767682]"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-[#454651] hover:text-[#142175] transition-colors focus:outline-none relative">
              <span className="sr-only">Notifications</span>
              <Bell className="w-5 h-5 text-[#505f76]" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-[#ba1a1a] rounded-full"></span>
            </button>
            <button 
              onClick={() => alert("Secure session terminal logs with NexusAuth authentication policies are verified active.")}
              className="text-[#454651] hover:text-[#142175] transition-colors focus:outline-none"
            >
              <HelpCircle className="w-5 h-5 text-[#505f76]" />
            </button>
            <div className="h-6 w-px bg-[#c6c5d3]"></div>
            
            {/* Eleanor Mitchell Profile Mini widget */}
            <button 
              onClick={() => setCurrentTab("account")}
              className="flex items-center gap-2 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-[#d0e1fb] overflow-hidden flex items-center justify-center text-[#54647a] font-bold text-xs select-none">
                EP
              </div>
              <span className="hidden sm:inline font-sans text-xs font-bold text-[#191c1e]">{profile.name}</span>
            </button>
          </div>
        </header>

        {/* Dynamic Pages Stage */}
        <main className="flex-grow overflow-y-auto p-6 bg-[#f7f9fb]">
          <div className="max-w-7xl mx-auto">
            {currentTab === "home" && (
              <Home 
                onNavigateToTab={(tab) => setCurrentTab(tab)}
                productsCount={products.length}
                customers={customers}
                lowStockItemsCount={lowStockItemsCount}
              />
            )}
            
            {currentTab === "product" && (
              <ProductPage 
                products={products}
                onOpenEditModal={(prod) => {
                  setSelectedProductToEdit(prod);
                  setAddStockQuantity(0);
                  setActiveModal("edit-product");
                }}
                onOpenAddModal={() => setActiveModal("add-product")}
              />
            )}

            {currentTab === "inventory" && (
              <InventoryPage 
                warehouses={warehouses}
                stockDetails={stockDetails}
                onOpenAddWarehouseModal={() => setActiveModal("add-warehouse")}
              />
            )}

            {currentTab === "customer" && (
              <CustomerPage 
                customers={customers}
                onOpenAddCustomerModal={() => setActiveModal("add-customer")}
                onDeleteCustomer={handleDeleteCustomer}
              />
            )}

            {currentTab === "supplier" && (
              <SupplierPage 
                suppliers={suppliers}
                onPayPending={handlePayPending}
              />
            )}

            {currentTab === "account" && (
              <AccountPage 
                profile={profile}
                onUpdateProfile={handleUpdateProfile}
                onOpenAddEmployeeModal={() => setActiveModal("add-employee")}
              />
            )}

            {currentTab === "admin" && (
              <AdminPage 
                employees={employees}
                onOpenAddEmployeeModal={() => setActiveModal("add-employee")}
                onRemoveEmployee={handleRemoveEmployee}
              />
            )}
          </div>
        </main>
      </div>

      {/* OVERLAY MODAL MANAGER */}
      {activeModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center animate-in fade-in duration-300">
          
          {/* Backdrop blur element */}
          <div 
            onClick={() => setActiveModal(null)}
            className="absolute inset-0 bg-[#191c1e]/50 backdrop-blur-sm"
          ></div>

          {/* New Product Modal */}
          {activeModal === "add-product" && (
            <div className="relative bg-white w-full max-w-lg rounded-xl shadow-2xl overflow-hidden border border-[#c6c5d3] flex flex-col max-h-[90vh]">
              <div className="p-6 border-b border-[#c6c5d3] flex justify-between items-center bg-white shrink-0">
                <div>
                  <h3 className="font-sans font-bold text-lg text-[#142175]">Add New Product</h3>
                  <p className="font-sans text-xs text-[#505f76] mt-0.5">Register a brand new operational asset.</p>
                </div>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="text-[#505f76] hover:text-[#ba1a1a] transition-all p-1 rounded-full hover:bg-[#eceef0]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={submitNewProduct} className="p-6 space-y-4 overflow-y-auto w-full">
                <div className="flex flex-col gap-1.5 w-full">
                  <label className="font-sans font-bold text-xs text-[#454651] uppercase">Product Name</label>
                  <input 
                    type="text"
                    required
                    value={newProdName}
                    onChange={(e) => setNewProductName(e.target.value)}
                    placeholder="e.g. High-Performance Server X2"
                    className="w-full px-4 py-2 border border-[#c6c5d3] rounded-lg text-sm bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="font-sans font-bold text-xs text-[#454651] uppercase">Product Price</label>
                    <div className="relative w-full">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#767682] font-semibold">$</span>
                      <input 
                        type="number"
                        required
                        step="0.01"
                        value={newProdPrice}
                        onChange={(e) => setNewProductPrice(e.target.value)}
                        placeholder="0.00"
                        className="w-full pl-8 pr-4 py-2 border border-[#c6c5d3] rounded-lg text-sm bg-white"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="font-sans font-bold text-xs text-[#454651] uppercase">Service Expiration</label>
                    <input 
                      type="date"
                      value={newProdExpiryDate}
                      onChange={(e) => setNewProductExpiryDate(e.target.value)}
                      className="w-full px-4 py-2 border border-[#c6c5d3] rounded-lg text-sm bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="font-sans font-bold text-xs text-[#454651] uppercase">Product Brand</label>
                    <select
                      value={newProdBrand}
                      onChange={(e) => setNewProductBrand(e.target.value)}
                      className="w-full px-4 py-2 border border-[#c6c5d3] rounded-lg text-sm bg-white"
                    >
                      <option value="Nexus">Nexus</option>
                      <option value="Acme Corp">Acme Corp</option>
                      <option value="TechCo">TechCo</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="font-sans font-bold text-xs text-[#454651] uppercase">Category</label>
                    <select
                      value={newProdCategory}
                      onChange={(e) => setNewProductCategory(e.target.value)}
                      className="w-full px-4 py-2 border border-[#c6c5d3] rounded-lg text-sm bg-white"
                    >
                      <option value="Hardware">Hardware</option>
                      <option value="Software">Software</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Networking">Networking</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 w-full">
                  <label className="font-sans font-bold text-xs text-[#454651] uppercase">Supplier Vendor</label>
                  <select
                    value={newProdSupplier}
                    onChange={(e) => setNewProductSupplier(e.target.value)}
                    className="w-full px-4 py-2 border border-[#c6c5d3] rounded-lg text-sm bg-white"
                  >
                    <option value="Global Tech Logistics Corp">Global Tech Logistics Corp</option>
                    <option value="Nexus Systems">Nexus Systems</option>
                    <option value="TechCo Supply Chain">TechCo Supply Chain</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5 w-full">
                  <label className="font-sans font-bold text-xs text-[#454651] uppercase">Description specifications</label>
                  <textarea 
                    value={newProdDescription}
                    onChange={(e) => setNewProductDescription(e.target.value)}
                    placeholder="Enter complete description specs notes..."
                    rows={2}
                    className="w-full px-4 py-1.5 border border-[#c6c5d3] rounded-lg text-sm bg-white min-h-[80px]"
                  />
                </div>

                <div className="p-4 bg-[#f2f4f6]/55 rounded-lg flex items-start gap-3 border border-[#eceef0] shrink-0 w-full">
                  <Info className="w-5 h-5 text-[#142175] flex-shrink-0 mt-0.5" />
                  <p className="font-sans text-xs text-[#505f76] leading-relaxed">
                    Appended catalog listings are made globally visible. Appropriate stock units allocation is computed on inventory screens.
                  </p>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-[#eceef0] shrink-0 w-full">
                  <button 
                    type="button" 
                    onClick={() => setActiveModal(null)}
                    className="px-5 py-2 border border-[#c6c5d3] text-[#505f76] rounded-lg font-sans text-sm hover:bg-[#f2f4f6]"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit" 
                    className="px-6 py-2 bg-[#142175] text-white hover:bg-[#2e3a8c] rounded-lg font-sans text-sm font-semibold shadow"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Edit Product Modal */}
          {activeModal === "edit-product" && selectedProductToEdit && (
            <div className="relative bg-white w-full max-w-[560px] rounded-xl shadow-2xl overflow-hidden border border-[#c6c5d3] flex flex-col max-h-[90vh]">
              <div className="p-6 border-b border-[#c6c5d3] flex justify-between items-center bg-white shrink-0">
                <div>
                  <h3 className="font-sans font-bold text-lg text-[#142175]">Edit Product Specifications</h3>
                  <p className="font-sans text-xs text-[#505f76] mt-0.5">Adapt pricing details and stock units levels.</p>
                </div>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="text-[#505f76] hover:text-[#ba1a1a] transition-all p-1 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={submitEditProduct} className="p-6 space-y-4 overflow-y-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-4 w-full">
                  <div className="md:col-span-6 flex flex-col gap-1 w-full">
                    <label className="font-sans font-bold text-xs text-[#454651]">Product Name</label>
                    <input 
                      type="text"
                      className="w-full px-3 py-2 border border-[#c6c5d3] rounded-lg text-sm bg-[#f2f4f6]"
                      value={selectedProductToEdit.name}
                      onChange={(e) => setSelectedProductToEdit({ ...selectedProductToEdit, name: e.target.value })}
                    />
                  </div>

                  <div className="md:col-span-3 flex flex-col gap-1 w-full">
                    <label className="font-sans font-bold text-xs text-[#454651]">Product Price (Sell)</label>
                    <input 
                      type="text"
                      className="w-full px-3 py-2 border border-[#c6c5d3] rounded-lg text-sm bg-white"
                      value={selectedProductToEdit.price}
                      onChange={(e) => setSelectedProductToEdit({ ...selectedProductToEdit, price: e.target.value })}
                    />
                  </div>

                  <div className="md:col-span-3 flex flex-col gap-1 w-full">
                    <label className="font-sans font-bold text-xs text-[#454651]">Service Expiration</label>
                    <input 
                      type="date"
                      className="w-full px-3 py-2 border border-[#c6c5d3] rounded-lg text-sm bg-white"
                      value={selectedProductToEdit.serviceExpiryDate || ""}
                      onChange={(e) => setSelectedProductToEdit({ ...selectedProductToEdit, serviceExpiryDate: e.target.value })}
                    />
                  </div>

                  <div className="md:col-span-3 flex flex-col gap-1 w-full">
                    <label className="font-sans font-bold text-xs text-[#454651]">Product Brand</label>
                    <input 
                      type="text"
                      className="w-full px-3 py-2 border border-[#c6c5d3] rounded-lg text-sm bg-white"
                      value={selectedProductToEdit.brand}
                      onChange={(e) => setSelectedProductToEdit({ ...selectedProductToEdit, brand: e.target.value })}
                    />
                  </div>

                  <div className="md:col-span-3 flex flex-col gap-1 w-full">
                    <label className="font-sans font-bold text-xs text-[#454651]">Category</label>
                    <select
                      className="w-full px-3 py-2 border border-[#c6c5d3] rounded-lg text-sm bg-white"
                      value={selectedProductToEdit.category}
                      onChange={(e) => setSelectedProductToEdit({ ...selectedProductToEdit, category: e.target.value })}
                    >
                      <option value="Hardware">Hardware</option>
                      <option value="Software">Software</option>
                      <option value="Electronics">Electronics</option>
                      <option value="Networking">Networking</option>
                    </select>
                  </div>

                  <div className="md:col-span-6 flex flex-col gap-1 w-full">
                    <label className="font-sans font-bold text-xs text-[#454651]">Supplier Partner</label>
                    <input 
                      type="text"
                      className="w-full px-3 py-2 border border-[#c6c5d3] rounded-lg text-sm bg-white"
                      value={selectedProductToEdit.supplierName || ""}
                      onChange={(e) => setSelectedProductToEdit({ ...selectedProductToEdit, supplierName: e.target.value })}
                    />
                  </div>

                  {/* Stock Levels modifier with indicator */}
                  <div className="md:col-span-6 grid grid-cols-2 gap-4 bg-[#f2f4f6] p-4 rounded-xl border border-[#c6c5d3]/60 w-full">
                    <div>
                      <p className="font-sans text-xs text-[#142175] font-bold">Current Stock Level</p>
                      <p className="font-sans font-bold text-xl text-[#191c1e] mt-1">
                        {selectedProductToEdit.stockLevel === "Digital" ? "Digital Key" : `${selectedProductToEdit.stockLevel} Units`}
                      </p>
                    </div>
                    <div>
                      <p className="font-sans text-xs text-[#142175] font-bold">Add Quantity Units</p>
                      <input 
                        type="number"
                        min="0"
                        placeholder="0"
                        disabled={selectedProductToEdit.stockLevel === "Digital"}
                        value={addStockQuantity || ""}
                        onChange={(e) => setAddStockQuantity(Math.max(0, parseInt(e.target.value) || 0))}
                        className="w-full px-3 py-1.5 border border-[#c6c5d3] rounded-lg text-sm bg-white mt-1 disabled:opacity-40"
                      />
                    </div>
                  </div>

                  {/* Margin structures calculation */}
                  <div className="md:col-span-6 pt-2 border-t border-[#c6c5d3]/50 w-full">
                    <h4 className="font-sans text-xs font-bold text-[#142175] uppercase tracking-wider mb-2">Pricing & Margins</h4>
                    <div className="grid grid-cols-3 gap-3 w-full">
                      <div>
                        <label className="text-[10px] text-[#505f76] font-sans font-bold">Buy Unit Cost</label>
                        <input 
                          type="text" 
                          className="w-full px-2 py-1.5 border border-[#c6c5d3] rounded text-xs bg-white"
                          value={selectedProductToEdit.buyPrice || "$3,200.00"}
                          onChange={(e) => setSelectedProductToEdit({ ...selectedProductToEdit, buyPrice: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#505f76] font-sans font-bold">Sell Unit Price</label>
                        <input 
                          type="text" 
                          className="w-full px-2 py-1.5 border border-[#c6c5d3] rounded text-xs bg-white"
                          value={selectedProductToEdit.price || "$4,500.00"}
                          onChange={(e) => setSelectedProductToEdit({ ...selectedProductToEdit, price: e.target.value })}
                        />
                      </div>
                      <div>
                        <label className="text-[10px] text-[#505f76] font-sans font-bold">Gain Per Unit</label>
                        <div className="px-2 py-1.5 bg-[#eceef0] rounded text-xs font-bold text-[#142175]">
                          $1,300.00
                        </div>
                      </div>
                      <div>
                        <label className="text-[10px] text-[#505f76] font-sans font-bold">Buy Total (LTD)</label>
                        <div className="px-2 py-1.5 bg-[#eceef0] rounded text-xs text-[#191c1e]">$134.4k</div>
                      </div>
                      <div>
                        <label className="text-[10px] text-[#505f76] font-sans font-bold">Sell Total (LTD)</label>
                        <div className="px-2 py-1.5 bg-[#eceef0] rounded text-xs text-[#191c1e]">$189.0k</div>
                      </div>
                      <div>
                        <label className="text-[10px] text-[#505f76] font-sans font-bold text-[#2e3a8c]">Gain Total</label>
                        <div className="px-2 py-1.5 bg-[#2e3a8c] text-[#dfe0ff] rounded text-xs font-bold">
                          $54.6k
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="md:col-span-6 flex flex-col gap-1 w-full">
                    <label className="font-sans font-bold text-xs text-[#454651]">Specs Notes</label>
                    <textarea 
                      rows={2}
                      className="w-full px-3 py-2 border border-[#c6c5d3] rounded-lg text-sm bg-white"
                      value={selectedProductToEdit.description || ""}
                      onChange={(e) => setSelectedProductToEdit({ ...selectedProductToEdit, description: e.target.value })}
                    />
                  </div>
                </div>

                {/* Footer Controls */}
                <div className="px-1 py-4 border-t border-[#eceef0] flex items-center justify-between shrink-0 w-full">
                  <button 
                    type="button" 
                    onClick={() => submitDeleteProduct(selectedProductToEdit.id)}
                    className="flex items-center gap-1.5 px-3 py-2 border border-[#ba1a1a] text-[#ba1a1a] font-sans font-bold text-xs rounded-lg hover:bg-[#ffdad6]/20 transition-all"
                  >
                    <Trash2 className="w-4 h-4 text-[#ba1a1a]" />
                    <span>Delete</span>
                  </button>
                  <div className="flex gap-2">
                    <button 
                      type="button" 
                      onClick={() => setActiveModal(null)}
                      className="px-4 py-2 text-[#505f76] font-semibold text-xs hover:text-[#191c1e]"
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="px-6 py-2 bg-[#142175] text-white font-sans font-bold text-xs rounded-lg hover:bg-[#2e3a8c] shadow-md"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}

          {/* Add Customer Modal */}
          {activeModal === "add-customer" && (
            <div className="relative bg-white w-full max-w-[440px] rounded-xl shadow-2xl overflow-hidden border border-[#c6c5d3] scale-100 opacity-100 flex flex-col max-h-[90vh]">
              <div className="px-6 py-5 flex justify-between items-center bg-white border-b border-[#eceef0] shrink-0">
                <div>
                  <h3 className="font-sans font-bold text-lg text-[#142175]">Add New Customer</h3>
                  <p className="font-sans text-xs text-[#505f76]">Create a client key authentication profile.</p>
                </div>
                <button 
                  onClick={() => setActiveModal(null)} 
                  className="p-1.5 hover:bg-[#f2f4f6] rounded-full text-[#767682]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto w-full">
                <div className="space-y-1.5 w-full">
                  <label className="font-sans font-bold text-xs text-[#454651] uppercase">Customer Name</label>
                  <input 
                    type="text" 
                    value={newCustName}
                    onChange={(e) => setNewCustName(e.target.value)}
                    placeholder="e.g. Acme Corp"
                    className="w-full px-4 py-3 rounded-lg border border-[#c6c5d3] bg-white outline-none focus:ring-2 focus:ring-[#142175] text-sm"
                  />
                </div>

                <div className="space-y-1.5 w-full">
                  <label className="font-sans font-bold text-xs text-[#454651] uppercase">Phone Number</label>
                  <input 
                    type="tel" 
                    value={newCustPhone}
                    onChange={(e) => setNewCustPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 rounded-lg border border-[#c6c5d3] bg-white outline-none focus:ring-2 focus:ring-[#142175] text-sm"
                  />
                </div>

                <div className="space-y-1.5 w-full">
                  <label className="font-sans font-bold text-xs text-[#454651] uppercase">Email Address</label>
                  <input 
                    type="email" 
                    value={newCustEmail}
                    onChange={(e) => setNewCustEmail(e.target.value)}
                    placeholder="email@company.com"
                    className="w-full px-4 py-3 rounded-lg border border-[#c6c5d3] bg-white outline-none focus:ring-2 focus:ring-[#142175] text-sm"
                  />
                </div>

                <div className="space-y-1.5 w-full">
                  <label className="font-sans font-bold text-xs text-[#454651] uppercase">Physical Address</label>
                  <input 
                    type="text" 
                    value={newCustAddress}
                    onChange={(e) => setNewCustAddress(e.target.value)}
                    placeholder="123 Business Way, Suite 100"
                    className="w-full px-4 py-3 rounded-lg border border-[#c6c5d3] bg-white outline-none focus:ring-2 focus:ring-[#142175] text-sm"
                  />
                </div>

                <div className="space-y-1.5 w-full">
                  <label className="font-sans font-bold text-xs text-[#454651] uppercase">Profile Image</label>
                  <div className="flex items-center gap-4 p-4 border-2 border-dashed border-[#c6c5d3] rounded-lg bg-[#f2f4f6]/60 hover:bg-[#eceef0] transition-colors cursor-pointer w-full">
                    <CloudUpload className="w-8 h-8 text-[#767682]" />
                    <span className="font-sans text-xs font-semibold text-[#505f76]">Drag & drop or Click to upload avatar photo</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#eceef0] flex gap-3 w-full">
                  <button 
                    onClick={() => setActiveModal(null)}
                    className="flex-1 bg-white border border-[#c6c5d3] text-[#505f76] text-xs font-bold py-3 rounded-lg hover:bg-[#eceef0] transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={submitNewCustomer}
                    className="flex-1 bg-[#142175] text-white text-xs font-bold py-3 rounded-lg hover:bg-[#2e3a8c] transition-colors shadow-sm"
                  >
                    Add Customer
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Add Warehouse Modal */}
          {activeModal === "add-warehouse" && (
            <div className="relative bg-white w-full max-w-[440px] rounded-xl shadow-2xl overflow-hidden border border-[#c6c5d3] scale-100 opacity-100 flex flex-col max-h-[90vh]">
              <div className="px-6 py-5 flex justify-between items-center bg-white border-b border-[#eceef0] shrink-0">
                <h3 className="font-sans font-bold text-lg text-[#142175]">Create Warehouse</h3>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="p-1.5 hover:bg-[#f2f4f6] rounded-full text-[#767682]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto w-full">
                <div className="space-y-1.5 w-full">
                  <label className="font-sans font-bold text-xs text-[#454651] uppercase">Warehouse Name</label>
                  <input 
                    type="text" 
                    value={newWhName}
                    onChange={(e) => setNewWhName(e.target.value)}
                    placeholder="e.g. Northern Distribution Hub"
                    className="w-full px-4 py-3 rounded-lg border border-[#c6c5d3] bg-white outline-none focus:ring-2 focus:ring-[#142175] text-sm"
                  />
                </div>

                <div className="space-y-1.5 w-full">
                  <label className="font-sans font-bold text-xs text-[#454651] uppercase">Location</label>
                  <div className="relative w-full">
                    <input 
                      type="text" 
                      value={newWhLocation}
                      onChange={(e) => setNewWhLocation(e.target.value)}
                      placeholder="e.g. Toronto, Canada"
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-[#c6c5d3] bg-white outline-none focus:ring-2 focus:ring-[#142175] text-sm"
                    />
                    <MapPin className="w-4.5 h-4.5 text-[#767682] absolute left-3 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="space-y-1.5 w-full">
                    <label className="font-sans font-bold text-xs text-[#454651] uppercase">Capacity</label>
                    <select
                      value={newWhCapacity}
                      onChange={(e) => setNewWhCapacity(e.target.value)}
                      className="w-full px-3 py-3 border border-[#c6c5d3] rounded-lg text-sm bg-white"
                    >
                      <option value="not_full">Not Full</option>
                      <option value="full">Full</option>
                    </select>
                  </div>
                  <div className="space-y-1.5 w-full">
                    <label className="font-sans font-bold text-xs text-[#454651] uppercase">Manager</label>
                    <select
                      value={newWhManager}
                      onChange={(e) => setNewWhManager(e.target.value)}
                      className="w-full px-3 py-3 border border-[#c6c5d3] rounded-lg text-sm bg-white"
                    >
                      <option value="Sarah Chen">Sarah Chen</option>
                      <option value="Marcus Wright">Marcus Wright</option>
                      <option value="Elena Rodriguez">Elena Rodriguez</option>
                    </select>
                  </div>
                </div>

                <div className="bg-[#dfe0ff] p-4 rounded-lg flex gap-3 items-start border border-[#333f91]/10 w-full">
                  <Info className="w-5 h-5 text-[#000d60] flex-shrink-0 mt-0.5" />
                  <p className="font-sans text-xs text-[#333f91] font-semibold leading-relaxed">
                    Adding a warehouse will notify the selected manager immediately to begin onboarding local inventory stock.
                  </p>
                </div>

                <div className="pt-4 border-t border-[#eceef0] flex gap-3 shrink-0 w-full">
                  <button 
                    onClick={() => setActiveModal(null)}
                    className="flex-1 bg-white border border-[#c6c5d3] text-[#505f76] text-xs font-bold py-3 rounded-lg hover:bg-[#eceef0] transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={submitNewWarehouse}
                    className="flex-grow bg-[#142175] text-white text-xs font-bold py-3 rounded-lg hover:bg-[#2e3a8c] transition-colors shadow-sm"
                  >
                    Create Warehouse
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Add Employee Modal */}
          {activeModal === "add-employee" && (
            <div className="relative bg-white w-full max-w-[500px] rounded-xl shadow-2xl overflow-hidden border border-[#c6c5d3] scale-100 opacity-100 flex flex-col max-h-[90vh]">
              <div className="px-6 py-5 flex justify-between items-center bg-white border-b border-[#eceef0] shrink-0">
                <h2 className="font-sans font-bold text-lg text-[#142175]">Add Employee</h2>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="p-1.5 hover:bg-[#f2f4f6] rounded-full text-[#767682]"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 space-y-4 overflow-y-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="font-sans font-bold text-xs text-[#505f76] uppercase">Full Name</label>
                    <input 
                      type="text" 
                      value={newEmpName}
                      onChange={(e) => setNewEmpName(e.target.value)}
                      placeholder="e.g. John Doe"
                      className="w-full px-3 py-2 border border-[#c6c5d3] bg-white rounded-lg text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="font-sans font-bold text-xs text-[#505f76] uppercase">Phone Number</label>
                    <input 
                      type="text" 
                      value={newEmpPhone}
                      onChange={(e) => setNewEmpPhone(e.target.value)}
                      placeholder="e.g. 012345678"
                      className="w-full px-3 py-2 border border-[#c6c5d3] bg-white rounded-lg text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="font-sans font-bold text-xs text-[#505f76] uppercase">Email Address</label>
                    <input 
                      type="email" 
                      value={newEmpEmail}
                      onChange={(e) => setNewEmpEmail(e.target.value)}
                      placeholder="e.g. name@email.com"
                      className="w-full px-3 py-2 border border-[#c6c5d3] bg-white rounded-lg text-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 w-full">
                    <label className="font-sans font-bold text-xs text-[#505f76] uppercase">Role</label>
                    <select
                      value={newEmpRole}
                      onChange={(e) => setNewEmpManagerRole(e.target.value)}
                      className="w-full px-3 py-2 border border-[#c6c5d3] bg-white rounded-lg text-sm"
                    >
                      <option value="Staff">Staff</option>
                      <option value="Manager">Manager</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5 md:col-span-2 w-full">
                    <label className="font-sans font-bold text-xs text-[#505f76] uppercase">Profile Image</label>
                    <div className="w-full border-2 border-dashed border-[#c6c5d3] rounded-lg p-6 flex flex-col items-center justify-center gap-2 bg-[#f2f4f6]/50 hover:bg-[#eceef0] transition-colors cursor-pointer">
                      <CloudUpload className="w-8 h-8 text-[#505f76]" />
                      <div className="text-center">
                        <p className="font-sans text-xs text-[#191c1e] font-bold">Click to upload or drag and drop</p>
                        <p className="font-sans text-[10px] text-[#505f76] mt-0.5">SVG, PNG, JPG or GIF (max. 800x400px)</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#eceef0] flex justify-end gap-3 shrink-0 w-full">
                  <button 
                    onClick={() => setActiveModal(null)}
                    className="px-4 py-2 border border-[#c6c5d3] text-[#505f76] rounded-lg font-sans text-xs hover:bg-[#f2f4f6]"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={submitNewEmployee}
                    className="px-5 py-2 bg-[#142175] text-white hover:bg-[#2e3a8c] rounded-lg font-sans text-xs font-bold shadow-sm"
                  >
                    Add Employee
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}
