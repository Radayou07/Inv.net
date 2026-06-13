import { 
  ShieldCheck, 
  LayoutDashboard, 
  Boxes, 
  Warehouse, 
  Users, 
  Truck, 
  UserRoundCog, 
  Settings, 
  LogOut,
  // TbBrandCpp
} from "lucide-react";

export default function Sidebar({
  currentTab,
  onTabChange,
  avatarText = "EP",
  employeeName = "E. Mitchell",
  employeeId = "94028"
}) {
  const menuItems = [
    { id: "home", label: "Home", icon: LayoutDashboard },
    { id: "product", label: "Product", icon: Boxes },
    { id: "inventory", label: "Inventory", icon: Warehouse },
    { id: "customer", label: "Customer", icon: Users },
    { id: "supplier", label: "Supplier", icon: Truck },
  ];

  const subItems = [
    { id: "account", label: "Account", icon: UserRoundCog },
    { id: "admin", label: "Admin", icon: Settings },
  ];

  return (
    <aside className="fixed left-0 top-0 h-full flex flex-col w-64 border-r border-[#c6c5d3] bg-white shadow-sm z-50">
      {/* Brand Header */}
      <div className="p-6 flex items-center gap-3 border-b border-[#c6c5d3] h-16 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-[#142175] flex items-center justify-center text-white">
          <ShieldCheck className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="font-sans font-bold text-lg text-[#142175] tracking-tight leading-none">Inv-NET</h1>
          <p className="font-sans text-[11px] font-medium text-[#505f76] mt-0.5">Enterprise Access</p>
        </div>
      </div>

      {/* Primary Links */}
      <nav className="flex-1 overflow-y-auto py-4 flex flex-col gap-1 px-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                isActive
                  ? "text-[#142175] font-bold border-r-4 border-[#142175] bg-[#f2f4f6]"
                  : "text-[#54647a] hover:bg-[#eceef0] hover:text-[#191c1e]"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-[#142175]" : "text-[#505f76]"}`} />
              <span className="font-sans text-sm font-semibold">{item.label}</span>
            </button>
          );
        })}

        <div className="my-2 border-t border-[#c6c5d3]"></div>

        {subItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                isActive
                  ? "text-[#142175] font-bold border-r-4 border-[#142175] bg-[#f2f4f6]"
                  : "text-[#54647a] hover:bg-[#eceef0] hover:text-[#191c1e]"
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? "text-[#142175]" : "text-[#505f76]"}`} />
              <span className="font-sans text-sm font-semibold">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User Info Footer */}
      <div className="p-4 border-t border-[#c6c5d3] shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#d0e1fb] flex items-center justify-center text-[#54647a] font-bold font-sans text-sm">
              {avatarText}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-sans text-xs font-bold text-[#191c1e] truncate">{employeeName}</span>
              <span className="font-sans text-[11px] text-[#505f76]">ID: {employeeId}</span>
            </div>
          </div>
          <button 
            title="Sign Out"
            onClick={() => alert("Successfully signed out of secure session")}
            className="p-1 rounded hover:bg-[#f2f4f6] text-[#505f76] hover:text-red-700 transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
