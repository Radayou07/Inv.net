import { 
  UserCheck, 
  ShieldCheck, 
  MoreVertical, 
  Plus, 
  UserMinus 
} from "lucide-react";

export default function AdminPage({
  employees,
  onOpenAddEmployeeModal,
  onRemoveEmployee
}) {
  
  const getAvatarInitials = (name) => {
    return name.split(" ").map(n => n[0]).join("").toUpperCase();
  };

  const getRandomColorClass = (idx) => {
    const list = [
      "bg-[#d0e1fb] text-[#142175]",
      "bg-[#ffdad6] text-[#93000a]",
      "bg-[#dfe0ff] text-[#333f91]",
      "bg-[#e0e3e5] text-[#454651]"
    ];
    return list[idx % list.length];
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="font-sans font-bold text-3xl text-[#191c1e] tracking-tight">Admin Panel</h2>
          <p className="font-sans text-sm text-[#454651] mt-1">Manage platform access, roles, and security policies.</p>
        </div>
        <button 
          onClick={onOpenAddEmployeeModal}
          className="bg-[#142175] text-white hover:bg-[#2e3a8c] px-6 py-2.5 rounded-lg font-sans font-semibold text-sm shadow-sm transition-all duration-200 flex items-center gap-2 border border-transparent"
        >
          <Plus className="w-4 h-4 text-white" />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Bento Grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Personnel Table - Spans 2 column on large display */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-[#c6c5d3]/50 overflow-hidden flex flex-col">
          <div className="px-6 py-4 border-b border-[#c6c5d3]/30 flex justify-between items-center bg-[#f7f9fb]/50">
            <h3 className="font-sans font-bold text-[#191c1e] text-base">Active Personnel</h3>
            <span className="font-sans text-xs font-bold text-[#142175] bg-[#dfe0ff] px-2.5 py-1 rounded">
              {employees.length} Personnel Registered
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f2f4f6]/50 border-b border-[#c6c5d3]/30">
                  <th className="px-6 py-3 font-sans text-xs font-bold text-[#454651] uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-3 font-sans text-xs font-bold text-[#454651] uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 font-sans text-xs font-bold text-[#454651] uppercase tracking-wider">Access Level</th>
                  <th className="px-6 py-3 font-sans text-xs font-bold text-[#454651] uppercase tracking-wider">Last Active</th>
                  <th className="px-6 py-3 font-sans text-xs font-bold text-[#454651] uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#c6c5d3]/20">
                {employees.map((emp, index) => (
                  <tr key={emp.id} className="hover:bg-[#f7f9fb]/50 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs ${getRandomColorClass(index)}`}>
                          {getAvatarInitials(emp.name)}
                        </div>
                        <div className="ml-3">
                          <p className="font-sans text-sm font-bold text-[#191c1e]">{emp.name}</p>
                          <p className="font-sans text-xs text-[#505f76]">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-sans text-xs font-semibold text-[#505f76]">
                       {emp.role}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2.5 py-1 inline-flex text-xs leading-5 font-bold rounded-full ${
                        emp.accessLevel.includes("1") || emp.accessLevel.toLowerCase().includes("admin")
                          ? "bg-[#ffdad6] text-[#93000a]"
                          : emp.accessLevel.includes("2")
                          ? "bg-[#d0e1fb] text-[#142175]"
                          : "bg-[#e0e3e5] text-[#454651]"
                      }`}>
                        {emp.accessLevel}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-sans text-xs text-[#505f76]">
                      {emp.lastActive}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <button 
                        onClick={() => {
                          if (confirm(`Remove active security credentials for ${emp.name}?`)) {
                            onRemoveEmployee(emp.id);
                          }
                        }}
                        className="p-1 px-2 rounded-lg text-[#505f76] hover:text-[#ba1a1a] hover:bg-[#ffdad6]/20 transition-all flex items-center gap-1.5 ml-auto text-xs font-bold"
                        title="Revoke access"
                      >
                        <UserMinus className="w-3.5 h-3.5" />
                        <span>Revoke</span>
                      </button>
                    </td>
                  </tr>
                ))}

                {employees.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-8 text-center font-sans text-sm text-[#505f76]">
                      No active operational personnel. Click "Add Employee" on the right to append.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Side panel: Role definitions & Information policy rules */}
        <div className="flex flex-col gap-6">
          <div className="bg-[#f7f9fb] border border-[#eceef0] rounded-xl p-6 shadow-sm space-y-4">
            <h3 className="font-sans font-bold text-[#142175] text-sm uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#142175]" />
              <span>Permission Policies</span>
            </h3>
            <div className="text-xs space-y-3 font-sans text-[#454651] leading-relaxed">
              <p>The system utilizes hierarchical Role-Based Access Control (RBAC) configured relative to high-security compliance keys.</p>
              <div className="p-3 bg-white rounded border border-[#eceef0] space-y-2">
                <p className="font-bold text-[#191c1e]">Tier 1 (Root Access):</p>
                <p className="text-[11px] text-[#505f76]">Full system-wide administrative control, catalog deletes, accounting audits, and personnel permission creation.</p>
              </div>
              <div className="p-3 bg-white rounded border border-[#eceef0] space-y-2">
                <p className="font-bold text-[#191c1e]">Tier 2 (Security Access):</p>
                <p className="text-[11px] text-[#505f76]">Read, write, edit catalog specifications, warehouse locations and quantity, customer accounts, and settling bills.</p>
              </div>
              <div className="p-3 bg-white rounded border border-[#eceef0] space-y-2">
                <p className="font-bold text-[#191c1e]">Tier 3 (View-Only / Operator):</p>
                <p className="text-[11px] text-[#505f76]">Read-only analytics view, basic stock tracking updates, and personal profile maintenance.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
