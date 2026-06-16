import { useState } from "react";
import { 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  MapPin, 
  Trash2, 
  MoreVertical,
  User,
  Users
} from "lucide-react";

export default function CustomerPage({
  customers,
  onOpenAddCustomerModal,
  onDeleteCustomer
}) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.customerCode?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-sans font-bold text-3xl text-[#191c1e] tracking-tight">Customer Directory</h2>
          <p className="font-sans text-sm text-[#505f76] mt-1">Manage client relationships and communication logs.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative bg-white border border-[#c6c5d3] rounded-lg flex items-center px-3 h-10 focus-within:ring-2 focus-within:ring-[#142175] transition-shadow">
            <Search className="w-4 h-4 text-[#767682] mr-2" />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search customers..."
              className="bg-transparent border-none outline-none text-sm text-[#191c1e] placeholder-[#767682] font-sans w-48"
            />
          </div>
          <button 
            onClick={onOpenAddCustomerModal}
            className="bg-[#142175] text-white font-sans font-bold text-xs h-10 px-4 rounded-lg flex items-center gap-2 hover:bg-[#2e3a8c] transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Customer</span>
          </button>
        </div>
      </div>

      {/* Customer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCustomers.map((customer) => (
          <div key={customer.id} className="bg-white border border-[#eceef0] rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow group">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-full bg-[#dfe0ff] flex items-center justify-center text-[#142175]">
                  {customer.image ? (
                    <img src={customer.image} alt={customer.name} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <User className="w-6 h-6" />
                  )}
                </div>
                <button className="text-[#767682] hover:text-[#191c1e] p-1">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              
              <h3 className="font-sans font-bold text-lg text-[#191c1e]">{customer.name}</h3>
              <p className="text-xs font-bold text-[#142175] uppercase tracking-wider mb-4">{customer.customerCode || "REGULAR CLIENT"}</p>
              
              <div className="space-y-2.5">
                <div className="flex items-center gap-2 text-sm text-[#505f76]">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{customer.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#505f76]">
                  <Phone className="w-4 h-4" />
                  <span>{customer.number}</span>
                </div>
                <div className="flex items-start gap-2 text-sm text-[#505f76]">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  <span className="leading-tight">{customer.address || "No address provided"}</span>
                </div>
              </div>
            </div>
            
            <div className="px-6 py-4 bg-[#f7f9fb] border-t border-[#eceef0] flex justify-between items-center">
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                customer.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-[#e0e3e5] text-[#505f76]'
              }`}>
                {customer.status || 'Active'}
              </span>
              <button 
                onClick={() => onDeleteCustomer(customer.id)}
                className="text-[#ba1a1a] hover:bg-red-50 p-1.5 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-dashed border-[#c6c5d3]">
          <Users className="w-12 h-12 text-[#c6c5d3] mx-auto mb-3" />
          <h3 className="font-sans font-bold text-[#505f76]">No customers found</h3>
          <p className="text-sm text-[#767682]">Try adjusting your search or add a new customer.</p>
        </div>
      )}
    </div>
  );
}
